import { createId as cuid } from '@paralleldrive/cuid2';
import { redirect } from '@remix-run/node';

import { GitHubStrategy } from '@veraclins-dev/remix-auth-social';
import { invariant } from '@veraclins-dev/utils';

import { getCallback } from '../connections/common';
import { connectionSessionStorage } from '../connections/connection.server';

import { type AuthProvider } from './provider';

const shouldMock = process.env.GIT_AUTH_CLIENT_ID?.startsWith('MOCK_');

const callbackURL = getCallback('github');

export class GitHubProvider implements AuthProvider {
  getAuthStrategy() {
    invariant(process.env.GIT_AUTH_CLIENT_ID, 'GITHUB CLIENT ID must be set');
    invariant(
      process.env.GIT_AUTH_CLIENT_SECRET,
      'GITHUB CLIENT SECRET must be set',
    );
    return new GitHubStrategy(
      {
        clientId: process.env.GIT_AUTH_CLIENT_ID,
        clientSecret: process.env.GIT_AUTH_CLIENT_SECRET,
        redirectURI: callbackURL,
      },
      async ({ profile }) => {
        console.log('GitHub profile', profile);
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
    const code = 'MOCK_CODE_GIT_AUTH_CLIENT';
    const searchParams = new URLSearchParams({ code, state });
    throw redirect(`${callbackURL}?${searchParams}`, {
      headers: {
        'set-cookie':
          await connectionSessionStorage.commitSession(connectionSession),
      },
    });
  }
}
