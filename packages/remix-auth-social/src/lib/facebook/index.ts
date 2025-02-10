import createDebug from 'debug';
import { Strategy } from 'remix-auth/strategy';

import { emailToUserName } from '@veraclins-dev/utils';

import {
  type ConstructorOptions,
  Facebook,
  generateState,
  OAuth2RequestError,
  redirect,
  request as fetchRequest,
  type VerifyOptions,
} from '../common';
import { StateStore } from '../common/store';

import { type FacebookProfile, type Scope } from './types';

const debug = createDebug('FacebookStrategy');

const baseProfileFields = [
  'id',
  'email',
  'name',
  'first_name',
  'middle_name',
  'last_name',
  'picture',
] as const;

const FacebookStrategyDefaultScopes: Scope[] = ['public_profile', 'email'];
const userInfoURL = 'https://graph.facebook.com/me';

export class FacebookStrategy<User> extends Strategy<User, VerifyOptions> {
  name = 'facebook';

  protected client: Facebook;

  protected scopes: Scope[];

  constructor(
    protected options: ConstructorOptions<Scope>,
    verify: Strategy.VerifyFunction<User, VerifyOptions>,
  ) {
    super(verify);

    this.client = new Facebook(
      options.clientId,
      options.clientSecret,
      options.redirectURI.toString(),
    );
    this.scopes = this.getScope(options.scopes);
  }

  private get cookieName() {
    if (typeof this.options.cookie === 'string') {
      return this.options.cookie || 'facebook';
    }
    return this.options.cookie?.name ?? 'facebook';
  }

  private get cookieOptions() {
    if (typeof this.options.cookie !== 'object') return {};
    return this.options.cookie ?? {};
  }

  override async authenticate(request: Request): Promise<User> {
    debug('Request URL', request.url);

    const url = new URL(request.url);

    const stateUrl = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    if (error) {
      const description = url.searchParams.get('error_description');
      const uri = url.searchParams.get('error_uri');
      throw new OAuth2RequestError(error, description, uri, stateUrl);
    }

    if (!stateUrl) {
      debug('No state found in the URL, redirecting to authorization endpoint');

      const { url, state } = this.createAuthorizationURL();

      debug('State', state);

      url.search = this.authorizationParams(url.searchParams).toString();

      debug('Authorization URL', url.toString());

      const store = StateStore.fromRequest(request, this.cookieName);

      store.set(state, 'random');

      throw redirect(url.toString(), {
        headers: {
          'Set-Cookie': store
            .toSetCookie(this.cookieName, this.cookieOptions)
            .toString(),
        },
      });
    }

    const code = url.searchParams.get('code');

    if (!code) throw new ReferenceError('Missing code in the URL');

    const store = StateStore.fromRequest(request, this.cookieName);

    if (!store.has()) {
      throw new ReferenceError('Missing state on cookie.');
    }

    if (!store.has(stateUrl)) {
      throw new RangeError("State in URL doesn't match state in cookie.");
    }

    debug('Validating authorization code');
    const tokens = await this.validateAuthorizationCode(code);

    debug('Getting the user profile');
    const requestParams = `?fields=${baseProfileFields.join(',')}`;
    const requestUrl = `${userInfoURL}${requestParams}`;

    const profile = await fetchRequest<FacebookProfile>(requestUrl, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });

    debug('Verifying the user profile');
    const user = await this.verify({
      request,
      tokens,
      profile: {
        provider: 'facebook',
        providerId: profile.id,
        name: profile.name,
        photo: profile.picture.data.url,
        email: profile.email,
        username: emailToUserName(profile.email),
      },
    });

    debug('User authenticated');
    return user;
  }

  /**
   * Return extra parameters to be included in the authorization request.
   *
   * Some OAuth 2.0 providers allow additional, non-standard parameters to be
   * included when requesting authorization.  Since these parameters are not
   * standardized by the OAuth 2.0 specification, OAuth 2.0-based authentication
   * strategies can override this function in order to populate these
   * parameters as required by the provider.
   */
  protected authorizationParams(
    params: URLSearchParams,
    // request: Request,
  ): URLSearchParams {
    return new URLSearchParams(params);
  }

  /**
   * Allow users the option to pass a typed scope string, or typed array;
   *
   * @param scope
   * @returns Array<Scope>
   */
  private getScope(scope?: ConstructorOptions<Scope>['scopes']): Scope[] {
    if (!scope) {
      return FacebookStrategyDefaultScopes;
    } else if (typeof scope === 'string') {
      return scope.split(',') as Scope[];
    }

    return scope;
  }

  protected createAuthorizationURL() {
    const state = generateState();

    const url = this.client.createAuthorizationURL(state, this.scopes);

    return { state, url };
  }

  protected validateAuthorizationCode(code: string) {
    return this.client.validateAuthorizationCode(code);
  }
}
