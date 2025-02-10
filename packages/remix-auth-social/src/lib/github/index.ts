import createDebug from 'debug';
import { Strategy } from 'remix-auth/strategy';

import {
  type ConstructorOptions,
  generateState,
  GitHub,
  OAuth2RequestError,
  redirect,
  request as fetchRequest,
  type VerifyOptions,
} from '../common';
import { StateStore } from '../common/store';

import { type GithubProfile, type Scope } from './types';

const debug = createDebug('GitHubStrategy');
const userInfoURL = 'https://api.github.com/user';
const GitHubStrategyDefaultScopes: Scope[] = ['read:user'];

export class GitHubStrategy<User> extends Strategy<User, VerifyOptions> {
  name = 'github';

  protected client: GitHub;
  protected scopes: Scope[];

  constructor(
    protected options: ConstructorOptions<Scope>,
    verify: Strategy.VerifyFunction<User, VerifyOptions>,
  ) {
    super(verify);

    this.client = new GitHub(
      options.clientId,
      options.clientSecret,
      options.redirectURI.toString(),
    );
    this.scopes = this.getScope(options.scopes);
  }

  private get cookieName() {
    if (typeof this.options.cookie === 'string') {
      return this.options.cookie || 'github';
    }
    return this.options.cookie?.name ?? 'github';
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
    const profile = await fetchRequest<GithubProfile>(userInfoURL, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });

    debug('Verifying the user profile');
    const user = await this.verify({
      request,
      tokens,
      profile: {
        provider: 'github',
        providerId: `${profile.id}`,
        name: profile.name ?? '',
        email: profile.email ?? profile.notification_email,
        photo: profile.avatar_url,
        username: profile.login,
        bio: profile.bio,
        location: profile.location,
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
   * Get a new OAuth2 Tokens object using the refresh token once the previous
   * access token has expired.
   * @param refreshToken The refresh token to use to get a new access token
   * @returns The new OAuth2 tokens object
   * @example
   * ```ts
   * let tokens = await strategy.refreshToken(refreshToken);
   * console.log(tokens.accessToken());
   * ```
   */
  public refreshToken(refreshToken: string) {
    return this.client.refreshAccessToken(refreshToken);
  }

  /**
   * Allow users the option to pass a typed scope string, or typed array;
   *
   * @param scope
   * @returns Array<Scope>
   */
  private getScope(scope?: ConstructorOptions<Scope>['scopes']): Scope[] {
    if (!scope) {
      return GitHubStrategyDefaultScopes;
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
