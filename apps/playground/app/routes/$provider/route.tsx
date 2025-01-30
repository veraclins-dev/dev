import { type ActionFunctionArgs, redirect } from '@remix-run/node';

import { authenticator } from '../../../utils/auth/auth.server.ts';
import { ProviderName } from '../../../utils/auth/connections/common.ts';
import { handleMockAction } from '../../../utils/auth/connections/connection.server.ts';
import { REDIRECT_TO_FIELD } from '../../../utils/constants.ts';
import { getReferrerRoute } from '../../../utils/misc.ts';
import { getRedirectCookieHeader } from '../../../utils/redirect-cookie.server.ts';

export async function loader() {
  return redirect('/auth/login');
}

export async function action({ request, params }: ActionFunctionArgs) {
  const providerName = ProviderName.parse(params.provider);
  try {
    await handleMockAction(providerName, request);
    return await authenticator.authenticate(providerName, request);
  } catch (error: unknown) {
    if (error instanceof Response) {
      const formData = await request.formData();
      const rawRedirectTo = formData.get(REDIRECT_TO_FIELD);
      const redirectTo =
        typeof rawRedirectTo === 'string'
          ? rawRedirectTo
          : getReferrerRoute(request);
      const redirectToCookie = getRedirectCookieHeader(redirectTo);
      if (redirectToCookie) {
        error.headers.append('set-cookie', redirectToCookie);
      }
    }
    throw error;
  }
}
