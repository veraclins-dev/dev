import { Form } from '@remix-run/react';

import { Button, Icon } from '@veraclins-dev/ui';

import { type ProviderName } from './common';

export type ConnectionType = 'Connect' | 'Login' | 'Signup';

export const ProviderConnectionForm = ({
  redirectTo,
  providerName,
}: {
  redirectTo?: MaybeString;
  providerName: ProviderName;
}) => {
  const formAction = `/${providerName}`;

  return (
    <Form className="flex w-full" action={formAction} method="POST">
      {redirectTo ? (
        <input type="hidden" name="redirectTo" value={redirectTo} />
      ) : null}
      <Button
        variant="outline"
        className="items-center justify-center rounded-full border-0 p-0 focus:outline-none"
        type="submit"
      >
        <span className="inline-flex items-center gap-1.5">
          <Icon name={`${providerName}-logo`} size="lg" />
        </span>
      </Button>
    </Form>
  );
};
