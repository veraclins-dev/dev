import { type Strategy } from 'remix-auth/strategy';
import { CodeChallengeMethod, OAuth2Strategy } from 'remix-auth-oauth2';

import {
  type Profile,
  type TwitterProfile,
  type TwitterScope,
  type TwitterStrategyOptions,
} from './types';

export * from './types';

export const TwitterStrategyScopeSeparator = ' ';
export const TwitterStrategyDefaultScopes: TwitterScope[] = [
  'users.read',
  'tweet.read',
];
export const TwitterStrategyDefaultName = 'twitter';

function parseScope(scope: TwitterStrategyOptions['scopes']): TwitterScope[] {
  if (!scope) {
    return TwitterStrategyDefaultScopes;
  } else if (typeof scope === 'string') {
    return scope.split(TwitterStrategyScopeSeparator) as TwitterScope[];
  }
  return scope as TwitterScope[];
}

export class TwitterStrategy<User> extends OAuth2Strategy<Profile<User>> {
  public override name = TwitterStrategyDefaultName;
  private readonly userInfoURL = 'https://api.x.com/2/users/me';

  constructor(
    {
      clientId,
      clientSecret,
      redirectURI,
      scopes,
      cookie = 'twitter',
    }: TwitterStrategyOptions,
    verify: Strategy.VerifyFunction<
      Profile<User>,
      OAuth2Strategy.VerifyOptions
    >,
  ) {
    super(
      {
        clientId,
        clientSecret,
        redirectURI,
        authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
        tokenEndpoint: 'https://api.twitter.com/2/oauth2/token',
        cookie,
        codeChallengeMethod: CodeChallengeMethod.Plain,
        scopes: parseScope(scopes),
      },
      verify,
    );
  }

  protected override authorizationParams(): URLSearchParams {
    const params = new URLSearchParams({
      response_type: 'code',
    });
    return params;
  }

  protected async userProfile(accessToken: string): Promise<TwitterProfile> {
    const requestParams = '?user.fields=profile_image_url,username,name,id';

    const response = await fetch(`${this.userInfoURL}${requestParams}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const raw: TwitterProfile = await response.json();
    const profile: TwitterProfile = {
      provider: 'twitter',
      id: raw.id,
      username: raw.username,
      name: raw.name,
      profile_image_url: raw.profile_image_url,
      photos: [{ value: raw.profile_image_url }],
      _json: {
        id: raw.id,
        name: raw.name,
        username: raw.username,
        picture: raw.profile_image_url,
        locale: 'en',
        email: '',
        email_verified: false,
        hd:
      },
    };
    return profile;
  }

  // Allow users the option to pass a scope string, or typed array
  private parseScope(scope: TwitterStrategyOptions['scopes']) {
    if (!scope) {
      return TwitterStrategyDefaultScopes;
    } else if (Array.isArray(scope)) {
      return scope.join(TwitterStrategyScopeSeparator);
    }
    return scope;
  }
}
