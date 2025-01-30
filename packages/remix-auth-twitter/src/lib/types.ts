import { type OAuth2Strategy } from 'remix-auth-oauth2';

/**
 * @see https://developer.twitter.com/en/docs/authentication/oauth-2-0/authorization-code
 */
export type TwitterScope =
  | 'tweet.read'
  | 'tweet.write'
  | 'tweet.moderate.write'
  | 'users.read'
  | 'follows.read'
  | 'follows.write'
  | 'offline.access'
  | 'space.read'
  | 'mute.read'
  | 'mute.write'
  | 'like.read'
  | 'like.write'
  | 'list.read'
  | 'list.write'
  | 'block.read'
  | 'block.write'
  | 'bookmark.read'
  | 'bookmark.write';

export type TwitterStrategyOptions = {
  clientId: string;
  clientSecret: string;
  redirectURI: string;
  /**
   * @default ['users.read', 'tweet.read']
   */
  scopes?: TwitterScope[] | TwitterScope;
  cookie?: OAuth2Strategy.ConstructorOptions['cookie'];
};

export type TwitterProfile = {
  id: string;
  username: string;
  name: string;
  profile_image_url: string;
  _json: {
    id: string;
    name: string;
    username: string;
    picture: string;
    locale: string;
    email: string;
    email_verified: boolean;
    hd: string;
  };
  provider: 'twitter';
};

export type TwitterExtraParams = {
  expires_in: 3920;
  token_type: 'Bearer';
  scope: string;
  id_token: string;
} & Record<string, string | number>;

export type Profile<U> = U & TwitterProfile & TwitterExtraParams;
