import { Cookie, SetCookie } from '@mjackson/headers';
import createDebug from 'debug';
import { Strategy } from 'remix-auth/strategy';

import { emailToUserName } from '@veraclins-dev/utils';

import {
  type ConstructorOptions,
  generateCodeVerifier,
  generateState,
  Google,
  OAuth2RequestError,
  redirect,
  request as fetchRequest,
  type VerifyOptions,
} from '../common';

import { type GoogleProfile, type Scope } from './types';

const debug = createDebug('GoogleStrategy');

export const GoogleStrategyDefaultScopes: Scope[] = [
  'openid',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

const userInfoURL = 'https://www.googleapis.com/oauth2/v3/userinfo';

export class GoogleStrategy<User> extends Strategy<User, VerifyOptions> {
  name = 'google';

  protected client: Google;

  protected scopes: Scope[];

  constructor(
    protected options: ConstructorOptions<Scope>,
    verify: Strategy.VerifyFunction<User, VerifyOptions>,
  ) {
    super(verify);

    this.client = new Google(
      options.clientId,
      options.clientSecret,
      options.redirectURI.toString(),
    );
    this.scopes = this.getScope(options.scopes);
  }

  private get cookieName() {
    if (typeof this.options.cookie === 'string') {
      return this.options.cookie || 'google';
    }
    return this.options.cookie?.name ?? 'google';
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

      const codeVerifier = generateCodeVerifier();

      const url = this.client.createAuthorizationURL(
        state,
        codeVerifier,
        this.scopes,
      );

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

    const codeVerifier = params.get(stateUrl) ?? '';

    if (!codeVerifier) {
      throw new ReferenceError('Missing code verifier on cookie.');
    }

    debug('Validating authorization code');
    const tokens = await this.client.validateAuthorizationCode(
      code,
      codeVerifier,
    );

    debug('Verifying the user profile');

    const profile = await fetchRequest<GoogleProfile>(userInfoURL, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });

    console.log('Profile > Google', profile);

    const user = await this.verify({
      request,
      tokens,
      profile: {
        provider: 'google',
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
      return GoogleStrategyDefaultScopes;
    } else if (typeof scope === 'string') {
      return scope.split(',') as Scope[];
    }

    return scope;
  }
}
