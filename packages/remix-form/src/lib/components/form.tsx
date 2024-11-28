import { getFormProps } from '@conform-to/react';
import {
  Form as RemixForm,
  type FormProps as RemixFormProps,
  useSearchParams,
} from '@remix-run/react';
import { forwardRef } from 'react';
import { HoneypotInputs } from 'remix-utils/honeypot/react';
import { ErrorList } from './error-list';
import { type useCustomFetcher } from '../hooks/useCustomFetcher';
import { type useConForm } from '../hooks/useConform';
import { REDIRECT_TO_FIELD } from '../constants';
import { cn } from '@veraclins-dev/utils';

export interface FormProps extends Omit<RemixFormProps, 'method'> {
  redirectTo?: string | null;
  form: ReturnType<typeof useConForm>['form'];
  fetcher?: ReturnType<typeof useCustomFetcher>;
  disabled?: boolean;
  noError?: boolean;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      children,
      form,
      className,
      redirectTo,
      disabled,
      noError,
      fetcher,
      ...props
    },
    ref,
  ) => {
    const [searchParams] = useSearchParams();
    const Comp = fetcher ? fetcher.Form : RemixForm;

    return (
      <Comp
        method="POST"
        className={cn('flex w-full flex-col items-center', className)}
        {...props}
        {...getFormProps(form)}
        ref={ref}
      >
        <input
          type="hidden"
          name="redirectTo"
          value={redirectTo ?? searchParams.get(REDIRECT_TO_FIELD) ?? undefined}
        />
        <HoneypotInputs />
        <fieldset disabled={disabled}>{children}</fieldset>
        {!noError && form.errors?.length ? (
          <div className="flex items-center py-1">
            <ErrorList errors={form.errors} id={form.errorId} />
          </div>
        ) : null}
      </Comp>
    );
  },
);

Form.displayName = 'Form';
