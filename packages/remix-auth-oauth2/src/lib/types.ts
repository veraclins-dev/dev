import { type SetCookieInit } from '@mjackson/headers';
import { type CodeChallengeMethod, type OAuth2Tokens } from 'arctic';

type URLConstructor = ConstructorParameters<typeof URL>[0];

export interface OAuth2VerifyOptions<P extends object = OAuth2Profile> {
  /** The request that triggered the verification flow */
  request: Request;
  /** The OAuth2 tokens retrieved from the identity provider */
  tokens: OAuth2Tokens;

  profile: P | null;
}

export interface OAuth2ConstructorOptions {
  /**
   * The name of the cookie used to keep state and code verifier around.
   *
   * The OAuth2 flow requires generating a random state and code verifier, and
   * then checking that the state matches when the user is redirected back to
   * the application. This is done to prevent CSRF attacks.
   *
   * The state and code verifier are stored in a cookie, and this option
   * allows you to customize the name of that cookie if needed.
   * @default "oauth2"
   */
  cookie?: string | (Omit<SetCookieInit, 'value'> & { name: string });

  /**
   * This is the Client ID of your application, provided to you by the Identity
   * Provider you're using to authenticate users.
   */
  clientId: string;
  /**
   * This is the Client Secret of your application, provided to you by the
   * Identity Provider you're using to authenticate users.
   */
  clientSecret: string | null;

  /**
   * The endpoint the Identity Provider asks you to call to get the user's
   * profile information.
   */
  userInfoURL?: URLConstructor;
  /**
   * The endpoint the Identity Provider asks you to send users to log in, or
   * authorize your application.
   */
  authorizationEndpoint: URLConstructor;
  /**
   * The endpoint the Identity Provider uses to let's you exchange an access
   * code for an access and refresh token.
   */
  tokenEndpoint: URLConstructor;
  /**
   * The URL of your application where the Identity Provider will redirect the
   * user after they've logged in or authorized your application.
   */
  redirectURI: URLConstructor | null;

  /**
   * The endpoint the Identity Provider uses to revoke an access or refresh
   * token, this can be useful to log out the user.
   */
  tokenRevocationEndpoint?: URLConstructor;

  /**
   * The scopes you want to request from the Identity Provider, this is a list
   * of strings that represent the permissions you want to request from the
   * user.
   */
  scopes?: string[];

  /**
   * The code challenge method to use when sending the authorization request.
   * This is used when the Identity Provider requires a code challenge to be
   * sent with the authorization request.
   * @default "CodeChallengeMethod.S256"
   */
  codeChallengeMethod?: CodeChallengeMethod;
}

export type OAuth2Profile = {
  providerId: string;
  username?: string;
  fullName: string;
  emails: Array<string>;
  photos: Array<string>;
  provider: string;
};
