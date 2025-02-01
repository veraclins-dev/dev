import { type SetCookieInit } from '@mjackson/headers';
import { type OAuth2Tokens } from 'arctic';
import { type Strategy } from 'remix-auth/strategy';

type URLConstructor = ConstructorParameters<typeof URL>[0];

export type MaybeString = string | null;

export interface VerifyOptions<P extends AuthProfile = AuthProfile> {
  /** The request that triggered the verification flow */
  request: Request;
  /** The OAuth2 tokens retrieved from the identity provider */
  tokens: OAuth2Tokens;

  profile: P | null;
}

export type AuthStrategy = Strategy<
  AuthProfile | null,
  VerifyOptions<AuthProfile>
>;

export interface ConstructorOptions<S extends string> {
  /**
   * The name of the cookie used to keep state and code verifier around.
   *
   * The OAuth2 flow requires generating a random state and code verifier, and
   * then checking that the state matches when the user is redirected back to
   * the application. This is done to prevent CSRF attacks.
   *
   * The state and code verifier are stored in a cookie, and this option
   * allows you to customize the name of that cookie if needed.
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
  clientSecret: string;

  /**
   * The URL of your application where the Identity Provider will redirect the
   * user after they've logged in or authorized your application.
   */
  redirectURI: URLConstructor;

  /**
   * The scopes you want to request from the Identity Provider, this is a list
   * of strings that represent the permissions you want to request from the
   * user.
   */
  scopes?: S[] | `${S},${S}`;
}

export type AuthProfile = {
  providerId: string;
  username: string;
  name?: string;
  email: string;
  photo: string;
  provider: string;
  bio?: MaybeString;
  location?: MaybeString;
};
