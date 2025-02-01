import { createId as cuid } from '@paralleldrive/cuid2';
import { redirect } from '@remix-run/node';

import { TwitterStrategy } from '@veraclins-dev/remix-auth-social';
import { emailToUserName, invariant } from '@veraclins-dev/utils';

import { getCallback } from '../connections/common';
import { connectionSessionStorage } from '../connections/connection.server';

import { type AuthProvider } from './provider';

const shouldMock = process.env.TWITTER_CONSUMER_KEY?.startsWith('MOCK_');

const callbackURL = getCallback('twitter');

export class TwitterProvider implements AuthProvider {
  getAuthStrategy() {
    invariant(process.env.TWITTER_CLIENT_ID, 'TWITTER CLIENT ID must be set');
    invariant(
      process.env.TWITTER_CLIENT_SECRET,
      'TWITTER CLIENT SECRET must be set',
    );
    return new TwitterStrategy(
      {
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        redirectURI: 'http://127.0.0.1:3000/twitter/callback',
      },
      async ({ profile: first, ...rest }) => {
        console.log('before', first, rest);

        // const userClient = new TwitterApi({
        //   appKey: process.env.TWITTER_CONSUMER_KEY,
        //   appSecret: process.env.TWITTER_CONSUMER_SECRET,
        //   accessToken,
        //   accessSecret: accessTokenSecret,
        // });
        // const profile = await userClient.currentUser();
        // const { email, screen_name, profile_image_url_https, name, id_str } =
        //   profile;

        // if (!email) {
        //   throw redirectWithToast('/auth/login', {
        //     title: 'Cannot connect Twitter Account',
        //     description: 'You may not have a Twitter email',
        //     type: 'error',
        //   });
        // }
        return { ...first, ...rest } as any;
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
