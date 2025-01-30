import { type OAuth2Strategy } from 'remix-auth-oauth2';

/**
 * @see https://developers.google.com/identity/protocols/oauth2/scopes
 */
export type GoogleScope = string;

export type GoogleStrategyOptions = {
  clientId: string;
  clientSecret: string;
  redirectURI: string;
  /**
   * @default "openid profile email"
   */
  scopes?: GoogleScope[] | string;
  accessType?: 'online' | 'offline';
  includeGrantedScopes?: boolean;
  prompt?: 'none' | 'consent' | 'select_account';
  hd?: string;
  loginHint?: string;
  cookie?: OAuth2Strategy.ConstructorOptions['cookie'];
};

export type GoogleProfile = {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: [{ value: string }];
  photos: [{ value: string }];
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
    email: string;
    email_verified: boolean;
    hd: string;
  };
  provider: 'google';
};

export type GoogleExtraParams = {
  expires_in: 3920;
  token_type: 'Bearer';
  scope: string;
  id_token: string;
} & Record<string, string | number>;

export type Profile<U> = U & GoogleProfile & GoogleExtraParams;
