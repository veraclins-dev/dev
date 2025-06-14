import { getFormProps } from '@conform-to/react';
import {
  Form as RouterForm,
  type FormProps as RouterFormProps,
  useSearchParams,
} from 'react-router';
import { HoneypotInputs } from 'remix-utils/honeypot/react';

import {
  type useConform,
  type useCustomFetcher,
  useDelayedIsPending,
} from '@veraclins-dev/react-utils';
import { cn } from '@veraclins-dev/utils';

import { ErrorList } from '../error-list';

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
        className="flex h-full w-full flex-col gap-y-4"
        disabled={disabled}
      >
        {children}
      </fieldset>
      {!noError && form.errors?.length ? (
        <div className="flex items-center py-1">
          <ErrorList errors={form.errors} id={form.errorId} />
        </div>
      ) : null}

      {!noButtons &&
        (actionButtons ?? (
          <div className="w-full">
            <FormSubmitButton
              className="w-full min-w-[200px] px-6 py-3 sm:px-12"
              loading={loading}
              disabled={disabled}
              action={props.action}
            >
              {submitText}
            </FormSubmitButton>
          </div>
        ))}
    </Comp>
  );
};
export { Form, type FormProps };
