import { createCookieSessionStorage } from '@remix-run/node';

import { FacebookProvider } from '../providers/facebook.server';
import { GitHubProvider } from '../providers/github.server';
import { GoogleProvider } from '../providers/google.server';
import { type AuthProvider } from '../providers/provider';
import { TwitterProvider } from '../providers/twitter.server';

import { type ProviderName } from './common';

export const connectionSessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'en_connection',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    secrets: process.env.SESSION_SECRET?.split(','),
    secure: process.env.NODE_ENV === 'production',
  },
});

export const providers: Record<ProviderName, AuthProvider<any>> = {
  github: new GitHubProvider(),
  google: new GoogleProvider(),
  facebook: new FacebookProvider(),
  twitter: new TwitterProvider(),
};

export function handleMockAction(providerName: ProviderName, request: Request) {
  return providers[providerName].handleMockAction(request);
}

// export const getConnection = async (
//   providerName: string,
//   providerId: string,
// ) => {
//   return db.connection.findUnique({
//     select: { userId: true },
//     where: {
//       providerName_providerId: { providerName, providerId },
//     },
//   });
// };
// export const createConnection = async (
//   providerName: string,
//   providerId: string,
//   userId: string,
// ) => {
//   return db.connection.create({
//     data: {
//       providerName,
//       providerId,
//       userId,
//     },
//   });
// };
