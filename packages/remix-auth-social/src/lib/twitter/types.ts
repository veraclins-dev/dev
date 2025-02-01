/**
 * @see https://developer.twitter.com/en/docs/authentication/oauth-2-0/authorization-code
 */
export type Scope =
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

export type TwitterProfile = {
  data: {
    profile_image_url: string;
    location: string;
    name: string;
    id: string;
    username: string;
  };
};

export type TwitterExtraParams = {
  expires_in: 3920;
  token_type: 'Bearer';
  scope: string;
  id_token: string;
} & Record<string, string | number>;
