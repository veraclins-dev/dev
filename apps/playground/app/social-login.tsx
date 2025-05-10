import { useSearchParams } from 'react-router';

import { DividerWithText } from '@veraclins-dev/ui';

import { providerNames } from './utils/auth/connections/common';
import { ProviderConnectionForm } from './utils/auth/connections/connections';

export const SocialLogin = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div className="flex flex-col items-center gap-y-4 lg:gap-y-6">
      <DividerWithText opaque text="or" />
      <div className="flex items-center justify-center gap-5">
        {providerNames.map((providerName) => (
          <ProviderConnectionForm
            key={providerName}
            providerName={providerName}
            redirectTo={redirectTo}
          />
        ))}
      </div>
    </div>
  );
};
