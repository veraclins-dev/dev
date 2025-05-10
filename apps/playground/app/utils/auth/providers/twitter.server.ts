import { createId as cuid } from '@paralleldrive/cuid2';
import { redirect } from 'react-router';

import { Twitter1Strategy } from '@veraclins-dev/remix-auth-social';
import { invariant } from '@veraclins-dev/utils';

import { getCallback } from '../connections/common';
import { connectionSessionStorage } from '../connections/connection.server';

import { type AuthProvider } from './provider';

const shouldMock = process.env.TWITTER_CONSUMER_KEY?.startsWith('MOCK_');

const callbackURL = getCallback('twitter');

export class TwitterProvider implements AuthProvider {
  getAuthStrategy() {
    invariant(
      process.env.TWITTER_CONSUMER_KEY,
      'TWITTER CLIENT ID must be set',
    );
    invariant(
      process.env.TWITTER_CONSUMER_SECRET,
      'TWITTER CLIENT SECRET must be set',
    );
    return new Twitter1Strategy(
      {
        clientId: process.env.TWITTER_CONSUMER_KEY,
        clientSecret: process.env.TWITTER_CONSUMER_SECRET,
        redirectURI: 'http://192.168.2.82:3000/twitter/callback',
      },
      async ({ profile }) => {
        return profile;
      },
    );
  }

  async handleMockAction(request: Request) {
    if (!shouldMock) return;

    const connectionSession = await connectionSessionStorage.getSession(
      request.headers.get('cookie'),
    );
    const state = cuid();
    connectionSession.set('oauth2:state', state);
    const code = 'MOCK_CODE_TWITTER_CLIENT';
    const searchParams = new URLSearchParams({ code, state });
    throw redirect(`${callbackURL}?${searchParams}`, {
      headers: {
        'set-cookie':
          await connectionSessionStorage.commitSession(connectionSession),
      },
    });
  }
}
