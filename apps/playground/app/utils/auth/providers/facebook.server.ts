import { createId as cuid } from '@paralleldrive/cuid2';
import { redirect } from '@remix-run/node';

import { FacebookStrategy } from '@veraclins-dev/remix-auth-social';
import { emailToUserName, invariant } from '@veraclins-dev/utils';

import { getCallback } from '../connections/common';
import { connectionSessionStorage } from '../connections/connection.server';

import { type AuthProvider } from './provider';

const shouldMock = process.env.FACEBOOK_CLIENT_ID?.startsWith('MOCK_');

const callbackURL = getCallback('facebook');

export class FacebookProvider implements AuthProvider {
  getAuthStrategy() {
    invariant(process.env.FACEBOOK_CLIENT_ID, 'FACEBOOK CLIENT ID must be set');
    invariant(
      process.env.FACEBOOK_CLIENT_SECRET,
      'FACEBOOK CLIENT SECRET must be set',
    );
    return new FacebookStrategy(
      {
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        redirectURI: callbackURL,
      },
      async ({ profile }) => {
        console.log('Facebook profile', profile);
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
    const code = 'MOCK_CODE_FACEBOOK_CLIENT';
    const searchParams = new URLSearchParams({ code, state });
    throw redirect(`${callbackURL}?${searchParams}`, {
      headers: {
        'set-cookie':
          await connectionSessionStorage.commitSession(connectionSession),
      },
    });
  }
}
