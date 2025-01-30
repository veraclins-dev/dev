import { ObjectParser } from '@edgefirst-dev/data/parser';
import {
  CodeChallengeMethod,
  generateCodeVerifier,
  generateState,
  OAuth2Client,
  OAuth2RequestError,
  UnexpectedErrorResponseBodyError,
  UnexpectedResponseError,
} from 'arctic';
import createDebug from 'debug';
import { Strategy } from 'remix-auth/strategy';

import { redirect } from './redirect';
import { StateStore } from './store';
import {
  type OAuth2ConstructorOptions,
  type OAuth2Profile,
  type OAuth2VerifyOptions,
} from './types';

const debug = createDebug('OAuth2Strategy');

const WELL_KNOWN = '.well-known/openid-configuration';

export {
  CodeChallengeMethod,
  OAuth2RequestError,
  UnexpectedErrorResponseBodyError,
  UnexpectedResponseError,
};

export class OAuth2Strategy<
  User,
  Profile extends object = OAuth2Profile,
> extends Strategy<User, OAuth2VerifyOptions<Profile>> {
  override name = 'oauth2';

  protected client: OAuth2Client;

  constructor(
    protected options: OAuth2ConstructorOptions,
    verify: Strategy.VerifyFunction<User, OAuth2VerifyOptions<Profile>>,
  ) {
    console.log('OAuth2Strategy', options);
    super(verify);
    this.client = new OAuth2Client(
      options.clientId,
      options.clientSecret,
      options.redirectURI?.toString() ?? null,
    );
    console.log('OAuth2Strategy', options);
  }

  private get cookieName() {
    if (typeof this.options.cookie === 'string') {
      return this.options.cookie || 'oauth2';
    }
    return this.options.cookie?.name ?? 'oauth2';
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

      const { state, codeVerifier, url } = this.createAuthorizationURL();

      debug('State', state);
      debug('Code verifier', codeVerifier);

      url.search = this.authorizationParams(
        url.searchParams,
        request,
      ).toString();

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
    const profile = await this.userProfile(tokens.accessToken());

    debug('Verifying the user profile');
    const user = await this.verify({ request, tokens, profile });

    debug('User authenticated');
    return user;
  }

  protected createAuthorizationURL() {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = this.client.createAuthorizationURLWithPKCE(
      this.options.authorizationEndpoint.toString(),
      state,
      this.options.codeChallengeMethod ?? CodeChallengeMethod.S256,
      codeVerifier,
      this.options.scopes ?? [],
    );

    return { state, codeVerifier, url };
  }

  protected validateAuthorizationCode(code: string, codeVerifier: string) {
    return this.client.validateAuthorizationCode(
      this.options.tokenEndpoint.toString(),
      code,
      codeVerifier,
    );
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
    request: Request,
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
    return this.client.refreshAccessToken(
      this.options.tokenEndpoint.toString(),
      refreshToken,
      this.options.scopes ?? [],
    );
  }

  /**
   * Users the token revocation endpoint of the identity provider to revoke the
   * access token and make it invalid.
   *
   * @param token The access token to revoke
   * @example
   * ```ts
   * // Get it from where you stored it
   * let accessToken = await getAccessToken();
   * await strategy.revokeToken(tokens.access_token);
   * ```
   */
  public revokeToken(token: string) {
    const endpoint = this.options.tokenRevocationEndpoint;
    if (!endpoint) throw new Error('Token revocation endpoint is not set.');
    return this.client.revokeToken(endpoint.toString(), token);
  }

  /**
   * Discover the OAuth2 issuer and create a new OAuth2Strategy instance from
   * the OIDC configuration that is returned.
   *
   * This method will fetch the OIDC configuration from the issuer and create a
   * new OAuth2Strategy instance with the provided options and verify function.
   *
   * @param uri The URI of the issuer, this can be a full URL or just the domain
   * @param options The rest of the options to pass to the OAuth2Strategy constructor, clientId, clientSecret, redirectURI, and scopes are required.
   * @param verify The verify function to use with the OAuth2Strategy instance
   * @returns A new OAuth2Strategy instance
   * @example
   * ```ts
   * let strategy = await discover(
   *   "https://accounts.google.com",
   *   {
   *     clientId: "your-client-id",
   *     clientSecret: "your-client-secret",
   *     redirectURI: "https://your-app.com/auth/callback",
   *     scopes: ["openid", "email", "profile"],
   *   },
   *   async ({ tokens }) => {
   *     return getUserProfile(tokens.access_token);
   *   },
   * );
   */
  static async discover<
    U,
    P extends object = OAuth2Profile,
    M extends OAuth2Strategy<U, P> = OAuth2Strategy<U, P>,
  >(
    this: new (
      options: OAuth2ConstructorOptions,
      verify: Strategy.VerifyFunction<U, OAuth2VerifyOptions<P>>,
    ) => M,
    uri: string | URL,
    options: Pick<
      OAuth2ConstructorOptions,
      'clientId' | 'clientSecret' | 'cookie' | 'redirectURI' | 'scopes'
    > &
      Partial<
        Omit<
          OAuth2ConstructorOptions,
          'clientId' | 'clientSecret' | 'cookie' | 'redirectURI' | 'scopes'
        >
      >,
    verify: Strategy.VerifyFunction<U, OAuth2VerifyOptions<P>>,
  ) {
    // Parse the URI into a URL object
    const url = new URL(uri);

    if (!url.pathname.includes('well-known')) {
      // Add the well-known path to the URL if it's not already there
      url.pathname = url.pathname.endsWith('/')
        ? `${url.pathname}${WELL_KNOWN}`
        : `${url.pathname}/${WELL_KNOWN}`;
    }

    // Fetch the metadata from the issuer and validate it
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });

    // If the response is not OK, throw an error
    if (!response.ok) throw new Error(`Failed to discover issuer at ${url}`);

    // Parse the response body
    const parser = new ObjectParser(await response.json());

    // biome-ignore lint/complexity/noThisInStatic: This is need for subclasses
    return new this(
      {
        authorizationEndpoint: new URL(parser.string('authorization_endpoint')),
        tokenEndpoint: new URL(parser.string('token_endpoint')),
        userInfoURL: parser.has('user_info_endpoint')
          ? new URL(parser.string('user_info_endpoint'))
          : undefined,
        tokenRevocationEndpoint: parser.has('revocation_endpoint')
          ? new URL(parser.string('revocation_endpoint'))
          : undefined,
        codeChallengeMethod: parser.has('code_challenge_methods_supported')
          ? parser.array('code_challenge_methods_supported').includes('S256')
            ? CodeChallengeMethod.S256
            : CodeChallengeMethod.Plain
          : undefined,
        ...options,
      },
      verify,
    );
  }

  protected async userProfile(accessToken: string): Promise<Profile | null> {
    if (!this.options.userInfoURL) {
      return null;
    }
    const response = await fetch(this.options.userInfoURL.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const profile: Profile = await response.json();
    return profile;
  }
}

export * from './types';
