import { type Strategy } from 'remix-auth/strategy';
import { OAuth2Strategy } from 'remix-auth-oauth2';

import {
  type GoogleProfile,
  type GoogleScope,
  type GoogleStrategyOptions,
  type Profile,
} from './types';

export * from './types';

const GoogleStrategyScopeSeparator = ' ';
export const GoogleStrategyDefaultScopes: GoogleScope[] = [
  'openid',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];
export const GoogleStrategyDefaultName = 'google';

function parseScope(scope: GoogleStrategyOptions['scopes']): GoogleScope[] {
  if (!scope) {
    return GoogleStrategyDefaultScopes;
  } else if (typeof scope === 'string') {
    return scope.split(GoogleStrategyScopeSeparator) as GoogleScope[];
  }
  return scope as GoogleScope[];
}

export class GoogleStrategy<User> extends OAuth2Strategy<Profile<User>> {
  public override name = GoogleStrategyDefaultName;

  private readonly accessType: string;

  private readonly prompt?: 'none' | 'consent' | 'select_account';

  private readonly includeGrantedScopes: boolean;

  private readonly hd?: string;

  private readonly loginHint?: string;

  private readonly userInfoURL =
    'https://www.googleapis.com/oauth2/v3/userinfo';

  constructor(
    {
      clientId,
      clientSecret,
      redirectURI,
      scopes,
      accessType,
      includeGrantedScopes,
      prompt,
      hd,
      loginHint,
      cookie = 'google',
    }: GoogleStrategyOptions,
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
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        cookie,
        scopes: parseScope(scopes),
      },
      verify,
    );
    this.accessType = accessType ?? 'online';
    this.includeGrantedScopes = includeGrantedScopes ?? false;
    this.prompt = prompt;
    this.hd = hd;
    this.loginHint = loginHint;
  }

  protected override authorizationParams(): URLSearchParams {
    const params = new URLSearchParams({
      access_type: this.accessType,
      include_granted_scopes: String(this.includeGrantedScopes),
    });

    if (this.prompt) {
      params.set('prompt', this.prompt);
    }
    if (this.hd) {
      params.set('hd', this.hd);
    }
    if (this.loginHint) {
      params.set('login_hint', this.loginHint);
    }
    return params;
  }

  protected async userProfile(accessToken: string): Promise<GoogleProfile> {
    const response = await fetch(this.userInfoURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const raw: GoogleProfile['_json'] = await response.json();
    const profile: GoogleProfile = {
      provider: 'google',
      id: raw.sub,
      displayName: raw.name,
      name: {
        familyName: raw.family_name,
        givenName: raw.given_name,
      },
      emails: [{ value: raw.email }],
      photos: [{ value: raw.picture }],
      _json: raw,
    };
    return profile;
  }
}
