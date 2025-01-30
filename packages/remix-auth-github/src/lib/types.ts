import { type SetCookieInit } from '@mjackson/headers';
import { type OAuth2Tokens } from 'arctic';

type URLConstructor = ConstructorParameters<typeof URL>[0];

export interface VerifyOptions {
  /** The request that triggered the verification flow */
  request: Request;
  /** The OAuth2 tokens retrivied from the identity provider */
  tokens: OAuth2Tokens;
}

export interface ConstructorOptions {
  /**
   * The name of the cookie used to keep state and code verifier around.
   *
   * The OAuth2 flow requires generating a random state and code verifier, and
   * then checking that the state matches when the user is redirected back to
   * the application. This is done to prevent CSRF attacks.
   *
   * The state and code verifier are stored in a cookie, and this option
   * allows you to customize the name of that cookie if needed.
   * @default "github"
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
  scopes?: Scope[];
}

/**
 * @see https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes
 */
export type Scope =
  | 'repo'
  | 'repo:status'
  | 'repo_deployment'
  | 'public_repo'
  | 'repo:invite'
  | 'security_events'
  | 'admin:repo_hook'
  | 'write:repo_hook'
  | 'read:repo_hook'
  | 'admin:org'
  | 'write:org'
  | 'read:org'
  | 'admin:public_key'
  | 'write:public_key'
  | 'read:public_key'
  | 'admin:org_hook'
  | 'gist'
  | 'notifications'
  | 'user'
  | 'read:user'
  | 'user:email'
  | 'user:follow'
  | 'project'
  | 'read:project'
  | 'delete_repo'
  | 'write:packages'
  | 'read:packages'
  | 'delete:packages'
  | 'write:discussion'
  | 'read:discussion'
  | 'admin:gpg_key'
  | 'write:gpg_key'
  | 'read:gpg_key'
  | 'codespace'
  | 'workflow';
