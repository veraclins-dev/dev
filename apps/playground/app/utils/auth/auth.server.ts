import { Authenticator } from 'remix-auth';

import { invariant } from '@veraclins-dev/utils';

import { providers } from './connections/connection.server';
import { type ProviderUser } from './providers/provider';

type ErrorResponse = {
  message: string;
  errors: Record<string, string>;
};

export type SocialAuthResponse = {
  userId: string;
  isNew?: boolean;
  error?: string | ErrorResponse;
};

// export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30;
// export const getSessionExpirationDate = () =>
//   new Date(Date.now() + SESSION_EXPIRATION_TIME);

invariant(process.env.HOST, 'HOST url is missing');

export const authenticator = new Authenticator<ProviderUser>();

for (const [providerName, provider] of Object.entries(providers)) {
  authenticator.use(provider.getAuthStrategy(), providerName);
}

// export async function signupWithConnection({
//   email,
//   username,
//   name,
//   id: providerId,
//   providerName,
//   imageUrl,
// }: Required<ProviderUser> & {
//   providerName: Connection['providerName'];
// }) {
//   const referralCode = generateReferralCode();
//   const session = await db.session.create({
//     data: {
//       expirationDate: getSessionExpirationDate(),
//       user: {
//         create: {
//           email: email.trim(),
//           username: username.trim(),
//           role: { connect: { name: 'user' } },
//           name,
//           connections: { create: { providerId, providerName } },
//           profileImage: imageUrl ?? null,
//           referralCode,
//         },
//       },
//     },
//     select: { id: true, expirationDate: true },
//   });

//   return session;
// }
