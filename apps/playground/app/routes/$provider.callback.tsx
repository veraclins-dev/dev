import { type LoaderFunctionArgs } from 'react-router';

import { authenticator } from '../utils/auth/auth.server';
import { providerLabels, ProviderName } from '../utils/auth/connections/common';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const providerName = ProviderName.parse(params.provider);
  const label = providerLabels[providerName];

  const authResult = await authenticator
    .authenticate(providerName, request)
    .then(
      (data) => (({
        success: true,
        data
      }) as const),
      (error) => (({
        success: false,
        error,
        data: null
      }) as const),
    );

  if (!authResult.success) {
    console.error(authResult.error);
    // throw await redirectWithToast(
    //   '/auth/login',
    //   {
    //     title: 'Auth Failed',
    //     description: `There was an error authenticating with ${label}.`,
    //     type: 'error',
    //   },
    //   { headers: destroyRedirectTo },
    // );
  }

  const { data: profile } = authResult;

  // const [existingConnection, userId] = await Promise.all([
  //   getConnection(providerName, profile.id),
  //   getUserId(request),
  // ]);

  // If we're already logged in and connection exists, then throw an error
  // if (existingConnection && userId) {
  //   if (existingConnection.userId === userId) {
  //     return redirectWithToast(
  //       '/settings/profile/connections',
  //       {
  //         title: 'Already Connected',
  //         description: `Your "${profile.username}" ${label} account is already connected.`,
  //       },
  //       { headers: destroyRedirectTo },
  //     );
  //   } else {
  //     return redirectWithToast(
  //       '/settings/profile/connections',
  //       {
  //         title: 'Already Connected',
  //         description: `The "${profile.username}" ${label} account is already connected to another account.`,
  //       },
  //       { headers: destroyRedirectTo },
  //     );
  //   }
  // }

  // If we're already logged in, then link the account
  // if (userId) {
  //   await createConnection(providerName, profile.id, userId);
  //   return redirectWithToast(
  //     '/settings/profile/connections',
  //     {
  //       title: 'Connected',
  //       type: 'success',
  //       description: `Your "${profile.username}" ${label} account has been connected.`,
  //     },
  //     { headers: destroyRedirectTo },
  //   );
  // }

  // Connection exists already? Make a new session
  // if (existingConnection) {
  //   return makeUserSession({
  //     request,
  //     userId: existingConnection.userId,
  //     redirectTo,
  //   });
  // }

  // // if the email matches a user in the db, then link the account and
  // // make a new session
  // const user = await getUser({
  //   select: { id: true },
  //   where: { email: profile.email.toLowerCase() },
  // });
  // if (user) {
  //   await createConnection(providerName, profile.id, user.id);
  //   return makeUserSession(
  //     { request, userId: user.id, redirectTo },
  //     {
  //       headers: await createToastHeaders({
  //         title: 'Connected',
  //         description: `Your "${profile.username}" ${label} account has been connected.`,
  //       }),
  //     },
  //   );
  // }

  // // this is a new user, so let's get them onboarded
  // const verifySession = await verifySessionStorage.getSession();
  // verifySession.set(onboardingEmailSessionKey, profile.email);
  // verifySession.set(prefilledProfileKey, {
  //   ...profile,
  //   email: profile.email.toLowerCase(),
  //   username: profile.username?.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase(),
  // });
  // verifySession.set(providerIdKey, profile.id);
  // const onboardingRedirect = [
  //   `/auth/${providerName}/onboarding`,
  //   redirectTo ? new URLSearchParams({ redirectTo }) : null,
  // ]
  //   .filter(Boolean)
  //   .join('?');
  // return redirect(onboardingRedirect, {
  //   headers: combineHeaders(
  //     { 'set-cookie': await verifySessionStorage.commitSession(verifySession) },
  //     destroyRedirectTo,
  //   ),
  // });
  return {};
}

// async function makeUserSession(
//   {
//     request,
//     userId,
//     redirectTo,
//   }: { request: Request; userId: string; redirectTo?: MaybeString },
//   responseInit?: ResponseInit,
// ) {
//   redirectTo ??= '/';
//   const session = await makeSession(userId);
//   return handleNewSession(
//     { request, session, redirectTo, remember: true },
//     { headers: combineHeaders(responseInit?.headers, destroyRedirectTo) },
//   );
// }
