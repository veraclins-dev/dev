import { getFormProps } from '@conform-to/react';
import {
  Form as RouterForm,
  type FormProps as RouterFormProps,
  useSearchParams,
} from 'react-router';
import { HoneypotInputs } from 'remix-utils/honeypot/react';

import { useDelayedIsPending } from '@veraclins-dev/react-utils';
import { Box, ErrorList } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { type useConform } from '../hooks/use-conform';
import { type useCustomFetcher } from '../hooks/use-custom-fetcher';

import { FormSubmitButton } from './submit-button';

interface FormProps extends Omit<RouterFormProps, 'method'> {
  submitText?: React.ReactNode;
  actionButtons?: React.ReactNode;
  redirectTo?: string | null;
  redirectToField?: string;
  form: ReturnType<typeof useConform>['form'];
  fetcher?: ReturnType<typeof useCustomFetcher>;
  disabled?: boolean;
  noButtons?: boolean;
  noError?: boolean;
  contentClassName?: string;
}

const Form = ({
  children,
  submitText = 'Submit',
  actionButtons,
  form,
  className,
  redirectTo,
  disabled,
  noButtons,
  noError,
  fetcher,
  redirectToField = 'redirectTo',
  contentClassName,
  ...props
}: FormProps) => {
  const isPending = useDelayedIsPending({ formAction: props.action });
  const [searchParams] = useSearchParams();

  const Comp = fetcher ? fetcher.Form : RouterForm;

  const loading = fetcher?.loading ?? isPending;

  return (
    <Comp
      method="POST"
      className={cn(
        'flex w-full flex-col items-center gap-y-4 lg:gap-y-6',
        className,
      )}
      {...props}
      {...getFormProps(form)}
    >
      <input
        type="hidden"
        name="redirectTo"
        value={redirectTo || searchParams.get(redirectToField) || undefined}
      />
      <HoneypotInputs />
      <fieldset
        className={cn('flex h-full w-full flex-col gap-y-4', contentClassName)}
        disabled={disabled}
      >
        {children}
      </fieldset>
      {!noError && form.errors?.length ? (
        <Box display="flex" items="center" py={1}>
          <ErrorList errors={form.errors} id={form.errorId} />
        </Box>
      ) : null}

      {!noButtons &&
        (actionButtons ?? (
          <FormSubmitButton
            w="full"
            px={{ xs: 6, sm: 12 }}
            py={3}
            className="min-w-[200px]"
            loading={loading}
            disabled={disabled}
            action={props.action}
          >
            {submitText}
          </FormSubmitButton>
        ))}
    </Comp>
  );
};

export { Form, type FormProps };
