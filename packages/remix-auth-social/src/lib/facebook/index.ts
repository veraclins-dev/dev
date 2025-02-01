import { Cookie, SetCookie } from '@mjackson/headers';
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

      const state = generateState();

      debug('Generated State', state);

      const url = this.client.createAuthorizationURL(state, this.scopes);

      url.search = this.authorizationParams(
        url.searchParams,
        // request,
      ).toString();

      debug('Authorization URL', url.toString());

      const header = new SetCookie({
        name: this.cookieName,
        value: new URLSearchParams({ state }).toString(),
        httpOnly: true, // Prevents JavaScript from accessing the cookie
        maxAge: 60 * 5, // 5 minutes
        path: '/', // Allow the cookie to be sent to any path
        sameSite: 'Lax', // Prevents it from being sent in cross-site requests
        ...this.cookieOptions,
      });

      throw redirect(url.toString(), {
        headers: { 'Set-Cookie': header.toString() },
      });
    }

    const code = url.searchParams.get('code');

    if (!code) throw new ReferenceError('Missing code in the URL');

    const cookie = new Cookie(request.headers.get('cookie') ?? '');
    const params = new URLSearchParams(cookie.get(this.cookieName));

    if (!params.has('state')) {
      throw new ReferenceError('Missing state on cookie.');
    }

    if (params.get('state') !== stateUrl) {
      throw new RangeError("State in URL doesn't match state in cookie.");
    }

    debug('Validating authorization code');
    const tokens = await this.client.validateAuthorizationCode(code);

    debug('Verifying the user profile');
    const requestParams = `?fields=${baseProfileFields.join(',')}`;
    const requestUrl = `${userInfoURL}${requestParams}`;

    const profile = await fetchRequest<FacebookProfile>(requestUrl, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });

    console.log('Profile', profile);

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
}
