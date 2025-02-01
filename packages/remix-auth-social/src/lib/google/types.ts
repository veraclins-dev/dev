/**
 * @see https://developers.google.com/identity/protocols/oauth2/scopes
 */
export type Scope = string;

export type GoogleProfile = {
  id: string;
  email: string;
  name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  picture: {
    data: {
      height?: number;
      is_silhouette?: boolean;
      url: string;
      width?: number;
    };
  };
};

export type GoogleExtraParams = {
  expires_in: 3920;
  token_type: 'Bearer';
  scope: string;
  id_token: string;
} & Record<string, string | number>;
