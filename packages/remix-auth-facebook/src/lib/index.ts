import { type Strategy } from 'remix-auth/strategy';

import {
  OAuth2Strategy,
  type OAuth2VerifyOptions,
} from '@veraclins-dev/remix-auth-oauth2';

import type {
  AdditionalFacebookProfileField,
  FacebookProfile,
  FacebookScope,
  FacebookStrategyOptions,
} from './types';

export * from './types';

export const baseProfileFields = [
  'id',
  'email',
  'name',
  'first_name',
  'middle_name',
  'last_name',
  'picture',
] as const;

export const FacebookStrategyName = 'facebook';
export const FacebookStrategyDefaultScopes: FacebookScope[] = [
  'public_profile',
  'email',
];

const userInfoURL = 'https://graph.facebook.com/me';

export const FacebookStrategyScopeSeparator = ',';
export type FacebookProfileFields = [
  ...typeof baseProfileFields,
  ...AdditionalFacebookProfileField[],
];

export class FacebookStrategy<User> extends OAuth2Strategy<
  User,
  FacebookProfile
> {
  public override name = FacebookStrategyName;
  private readonly scope: FacebookScope[];

  private readonly profileFields: FacebookProfileFields;

  constructor(
    {
      clientId,
      clientSecret,
      redirectURI,
      scope,
      extraProfileFields,
      cookie = 'facebook',
    }: FacebookStrategyOptions,
    verify: Strategy.VerifyFunction<User, OAuth2VerifyOptions<FacebookProfile>>,
  ) {
    super(
      {
        clientId,
        clientSecret,
        redirectURI,
        authorizationEndpoint: `https://facebook.com/v14.0/dialog/oauth`,
        tokenEndpoint: `https://graph.facebook.com/v14.0/oauth/access_token`,
        userInfoURL,
        cookie,
      },
      verify,
    );
    this.scope = this.getScope(scope);
    console.log('this.scope', clientId, clientSecret);
    // Ensure unique entries in case they include the base fields
    this.profileFields = [
      ...new Set([...baseProfileFields, ...(extraProfileFields || [])]),
    ] as FacebookProfileFields;
  }

  // Allow users the option to pass a scope string, or typed array
  private getScope(scope: FacebookStrategyOptions['scope']) {
    if (!scope) {
      return FacebookStrategyDefaultScopes;
    } else if (typeof scope === 'string') {
      return scope.split(FacebookStrategyScopeSeparator) as FacebookScope[];
    }

    return scope;
  }

  protected override authorizationParams(
    params: URLSearchParams,
  ): URLSearchParams {
    const all = new URLSearchParams({
      ...params,
      scope: this.scope.join(FacebookStrategyScopeSeparator),
    });

    return all;
  }

  protected override async userProfile(
    accessToken: string,
  ): Promise<FacebookProfile> {
    const requestParams = `?fields=${this.profileFields.join(',')}`;
    const requestUrl = `${userInfoURL}${requestParams}`;
    const response = await fetch(requestUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const raw: FacebookProfile['_json'] = await response.json();
    const profile: FacebookProfile = {
      provider: 'facebook',
      providerId: raw.id,
      fullName: raw.name,
      name: {
        familyName: raw.last_name,
        givenName: raw.first_name,
      },
      emails: [raw.email],
      photos: [raw.picture.data.url],
      _json: raw,
    };
    return profile;
  }
}
