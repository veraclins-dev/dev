import { type MaybeString } from '../common';

export type GithubProfile = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id?: MaybeString;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name?: MaybeString;
  company?: MaybeString;
  blog?: MaybeString;
  location?: MaybeString;
  email: string;
  hireable?: boolean | null;
  bio?: MaybeString;
  twitter_username?: MaybeString;
  notification_email?: MaybeString;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

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
