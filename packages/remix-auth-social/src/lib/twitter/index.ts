import createDebug from 'debug';
import { Strategy } from 'remix-auth/strategy';

import {
  type ConstructorOptions,
  generateCodeVerifier,
  generateState,
  OAuth2RequestError,
  redirect,
  request as fetchRequest,
  Twitter,
  type VerifyOptions,
} from '../common';
import { StateStore } from '../common/store';

import { type Scope, type TwitterProfile } from './types';

const debug = createDebug('TwitterStrategy');

export const TwitterStrategyDefaultScopes: Scope[] = [
  'users.read',
  'tweet.read',
];

const userInfoURL = 'https://api.x.com/2/users/me';

export class TwitterStrategy<User> extends Strategy<User, VerifyOptions> {
  name = 'twitter';

  protected client: Twitter;

  protected scopes: Scope[];

  constructor(
    protected options: ConstructorOptions<Scope>,
    verify: Strategy.VerifyFunction<User, VerifyOptions>,
  ) {
    super(verify);

    this.client = new Twitter(
      options.clientId,
      options.clientSecret,
      options.redirectURI.toString(),
    );
    this.scopes = this.getScope(options.scopes);
  }

  private get cookieName() {
    if (typeof this.options.cookie === 'string') {
      return this.options.cookie || 'twitter';
    }
    return this.options.cookie?.name ?? 'twitter';
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

      const { url, codeVerifier, state } = this.createAuthorizationURL();

      debug('State', state);
      debug('Code verifier', codeVerifier);

      url.search = this.authorizationParams(url.searchParams).toString();

      debug('Authorization URL', url.toString());

      const store = StateStore.fromRequest(request, this.cookieName);
      store.set(state, codeVerifier);

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

    const codeVerifier = store.get(stateUrl);

    if (!codeVerifier) {
      throw new ReferenceError('Missing code verifier on cookie.');
    }

    debug('Validating authorization code');
    const tokens = await this.validateAuthorizationCode(code, codeVerifier);

    debug('Getting the user profile');
    const requestParams =
      '?user.fields=profile_image_url,username,name,id,location';

    const { data } = await fetchRequest<TwitterProfile>(
      `${userInfoURL}${requestParams}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken()}`,
        },
      },
    );

    debug('Verifying the user profile');
    const user = await this.verify({
      request,
      tokens,
      profile: {
        provider: 'twitter',
        providerId: data.id,
        name: data.name,
        photo: data.profile_image_url,
        email: '',
        username: data.username,
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
      return TwitterStrategyDefaultScopes;
    } else if (typeof scope === 'string') {
      return scope.split(',') as Scope[];
    }

    return scope;
  }

  protected createAuthorizationURL() {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = this.client.createAuthorizationURL(
      state,
      codeVerifier,
      this.scopes,
    );

    return { state, codeVerifier, url };
  }

  protected validateAuthorizationCode(code: string, codeVerifier: string) {
    return this.client.validateAuthorizationCode(code, codeVerifier);
  }
}
