import { type ActionFunctionArgs, redirect } from 'react-router';

import { authenticator } from '../../utils/auth/auth.server';
import { ProviderName } from '../../utils/auth/connections/common';

export async function loader() {
  return redirect('/');
}

export async function action({ request, params }: ActionFunctionArgs) {
  const providerName = ProviderName.parse(params.provider);
  try {
    // await handleMockAction(providerName, request);
    return await authenticator.authenticate(providerName, request);
  } catch (error: unknown) {
    if (error instanceof Response) {
      const formData = await request.formData();
      console.error(
        'Error authenticating with provider',
        formData.entries(),
        error,
      );
    }
    throw error;
  }
}
