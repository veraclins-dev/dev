import createDebug from 'debug';
import crypto from 'node:crypto';
import { Strategy } from 'remix-auth/strategy';
import { TwitterApi } from 'twitter-api-v2';

import { emailToUserName } from '@veraclins-dev/utils';

import {
  type ConstructorOptions,
  OAuth2RequestError,
  redirect,
  type VerifyOptions,
} from '../common';
import { StateStore } from '../common/store';

import { type Scope } from './types';

const debug = createDebug('TwitterStrategy');

const requestTokenURL = 'https://api.x.com/oauth/request_token';
const authorizationURL = 'https://api.x.com/oauth/authorize';
const authenticationURL = 'https://api.x.com/oauth/authenticate';
const tokenURL = 'https://api.x.com/oauth/access_token';

export const Twitter1StrategyDefaultName = 'twitter1';

export function fixedEncodeURIComponent(str: string) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Twitter's OAuth 1.0a login (https://developer.x.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens)
 *
 * Applications must supply a `verify` callback, for which the function signature is:
 *
 *     function({accessToken, accessTokenSecret, profile}) { ... }
 *
 * The verify callback is responsible for finding or creating the user, and
 * returning the resulting user object to be stored in session.
 *
 * An AuthorizationError should be raised to indicate an authentication failure.
 *
 * Options:
 * - `consumerKey`        "API Key" under "Consumer Keys", which identifies client to service provider
 * - `clientSecret`       "API Secret" under "Consumer Keys", which is a secret used to establish ownership of the client identifier
 * - `callbackURL`        URL to which the service provider will redirect the user after obtaining authorization
 * - `alwaysReauthorize`  If set to true, always as app permissions. This was v1 behavior.
 *                        If false, just let them login if they've once accepted the permission. (optional. default: false)
 *
 * @example
 * authenticator.use(new TwitterStrategy(
 *   {
 *     consumerKey: '123-456-789',
 *     consumerSecret: 'shhh-its-a-secret',
 *     callbackURL: 'https://www.example.net/auth/example/callback',
 *   },
 *   async ({ accessToken, accessTokenSecret, profile }) => {
 *     return await User.findOrCreate(profile.id, profile.email, ...);
 *   }
 * ));
 */
export class Twitter1Strategy<User> extends Strategy<User, VerifyOptions> {
  name = Twitter1StrategyDefaultName;

  protected consumerKey: string;
  protected consumerSecret: string;
  protected callbackURL: string;
  protected alwaysReauthorize: boolean;

  constructor(
    protected options: ConstructorOptions<Scope> & {
      alwaysReauthorize?: boolean;
    },
    verify: Strategy.VerifyFunction<User, VerifyOptions>,
  ) {
    super(verify);
    this.consumerKey = options.clientId;
    this.consumerSecret = options.clientSecret;
    this.callbackURL = options.redirectURI.toString();
    this.alwaysReauthorize = options.alwaysReauthorize || false;
  }

  async authenticate(request: Request): Promise<User> {
    debug('Request URL', request.url.toString());
    const url = new URL(request.url);

    const callbackURL = this.getCallbackURL(url);
    debug('Callback URL', callbackURL.toString());

    // Before user navigates to login page: Redirect to login page
    if (url.pathname !== callbackURL.pathname) {
      // Unlike OAuth2, we first hit the request token endpoint
      const { requestToken, callbackConfirmed } =
        await this.fetchRequestToken(callbackURL);

      const store = StateStore.fromRequest(request, this.cookieName);

      if (!callbackConfirmed) {
        throw new OAuth2RequestError(
          'Callback not confirmed',
          'Please try again',
          null,
          null,
        );
      }

      // Then let user authorize the app
      throw redirect(this.getAuthURL(requestToken).toString(), {
        headers: {
          'Set-Cookie': store
            .toSetCookie(this.cookieName, this.cookieOptions)
            .toString(),
        },
      });
    }

    // Validations of the callback URL params

    const denied = url.searchParams.get('denied');
    if (denied) {
      debug('Denied');
      throw new OAuth2RequestError(
        denied,
        'Please authorize the app',
        null,
        url.searchParams.get('state'),
      );
    }
    const oauthToken = url.searchParams.get('oauth_token');
    const oauthVerifier = url.searchParams.get('oauth_verifier');

    if (!oauthToken || !oauthVerifier)
      throw new OAuth2RequestError(
        'Missing oauth params from auth response',
        'Please try again',
        null,
        url.searchParams.get('state'),
      );

    // Get the access token
    const params = new URLSearchParams();
    params.set('oauth_token', oauthToken);
    params.set('oauth_verifier', oauthVerifier);

    const { accessToken, accessTokenSecret } =
      await this.fetchAccessTokenAndProfile(params);

    // Verify the user and return it, or redirect
    const userClient = new TwitterApi({
      accessToken,
      accessSecret: accessTokenSecret,
      appKey: this.consumerKey,
      appSecret: this.consumerSecret,
    });
    const profile = await userClient.v1.verifyCredentials({
      include_email: true,
    });

    const email = profile.email ?? '';
    const user = await this.verify({
      request,
      profile: {
        email,
        providerId: profile.id_str,
        username: profile.screen_name ?? emailToUserName(email),
        photo: profile.profile_image_url_https,
        name: profile.name,
        provider: 'x',
        bio: profile.description,
        location: profile.location,
      },
    });

    debug('User authenticated');
    return user;
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

  private getCallbackURL(url: URL) {
    if (
      this.callbackURL.startsWith('http:') ||
      this.callbackURL.startsWith('https:')
    ) {
      return new URL(this.callbackURL);
    }
    if (this.callbackURL.startsWith('/')) {
      return new URL(this.callbackURL, url);
    }
    return new URL(`${url.protocol}//${this.callbackURL}`);
  }

  private static generateTimestamp() {
    return `${Math.floor(Date.now() / 1000)}`;
  }

  /**
   * Step 1: oauth/request_token
   */
  private async fetchRequestToken(callbackUrl: URL): Promise<{
    requestToken: string;
    requestTokenSecret: string;
    callbackConfirmed: boolean;
  }> {
    const parameters = this.signRequest(
      { oauth_callback: callbackUrl.toString() },
      'GET',
      requestTokenURL,
    );
    const url = new URL(requestTokenURL);
    url.search = new URLSearchParams(parameters).toString();
    const urlString = url.toString();
    debug('Fetching request token', urlString);
    const response = await fetch(urlString, {
      method: 'POST',
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Response(body, { status: 401 });
    }
    const text = await response.text();
    const body: { [key: string]: string } = {};
    for (const pair of text.split('&')) {
      const [key, value] = pair.split('=');
      body[key] = value;
    }

    return {
      requestToken: body['oauth_token'] as string,
      requestTokenSecret: body['oauth_token_secret'] as string,
      callbackConfirmed: body['oauth_callback_confirmed'] === 'true',
    };
  }

  /**
   * Generate signature with HMAC-SHA1 algorithm
   */
  signRequest(
    headers: { [key: string]: string },
    method: 'GET' | 'POST',
    url: string,
    accessTokenSecret?: string,
  ) {
    const params = {
      ...headers,
      oauth_consumer_key: this.consumerKey,
      oauth_nonce: Twitter1Strategy.generateNonce(),
      oauth_timestamp: Twitter1Strategy.generateTimestamp(),
      oauth_version: '1.0',
      oauth_signature_method: 'HMAC-SHA1',
    };
    // Convert to "key=value, key=value" format
    const parameters = Object.entries(params)
      .sort(([k1], [k2]) => k1.localeCompare(k2))
      .map(
        ([key, value]) =>
          `${fixedEncodeURIComponent(key)}=${fixedEncodeURIComponent(value)}`,
      )
      .join('&');
    const signature_base = `${method}&${fixedEncodeURIComponent(
      url,
    )}&${fixedEncodeURIComponent(parameters)}`;
    const signing_key = `${this.consumerSecret}&${accessTokenSecret || ''}`;
    const hmac = crypto.createHmac('sha1', signing_key);
    hmac.update(signature_base);
    const signed = hmac.digest('base64');
    return {
      ...params,
      oauth_signature: signed,
      oauth_signature_method: 'HMAC-SHA1',
    };
  }

  /**
   * Step 2: Let user authorize
   */
  private getAuthURL(requestToken: string) {
    const params = new URLSearchParams();
    params.set('oauth_token', requestToken);

    const url = new URL(
      this.alwaysReauthorize ? authorizationURL : authenticationURL,
    );
    url.search = params.toString();

    return url;
  }

  /**
   * Step 3: Fetch access token to do anything
   */
  private async fetchAccessTokenAndProfile(params: URLSearchParams): Promise<{
    accessToken: string;
    accessTokenSecret: string;
    userId: string;
    screenName: string;
  }> {
    params.set('oauth_consumer_key', this.consumerKey);

    debug('Fetch access token', tokenURL, params.toString());
    const response = await fetch(tokenURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    if (!response.ok) {
      const body = await response.text();
      debug('error! ' + body);
      throw new Response(body, { status: 401 });
    }

    return await this.extractAccessTokenAndProfile(
      response.clone() as unknown as Response,
    );
  }

  protected async extractAccessTokenAndProfile(response: Response): Promise<{
    accessToken: string;
    accessTokenSecret: string;
    userId: string;
    screenName: string;
  }> {
    const text = await response.text();
    const obj: { [key: string]: string } = {};
    for (const pair of text.split('&')) {
      const [key, value] = pair.split('=');
      obj[key] = value;
    }

    return {
      accessToken: obj['oauth_token'] as string,
      accessTokenSecret: obj['oauth_token_secret'] as string,
      userId: obj['user_id'] as string,
      screenName: obj['screen_name'] as string,
    } as const;
  }

  private static generateNonce() {
    return crypto.randomBytes(16).toString('hex');
  }
}
