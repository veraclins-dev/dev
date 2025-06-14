import { useIsPending } from '@veraclins-dev/react-utils';

import { Button, type ButtonProps } from '../../ui';

import { type FormProps } from './form';

interface FormSubmitButtonProps
  extends ButtonProps,
    Pick<FormProps, 'action'> {}

const FormSubmitButton = ({
  children = 'Submit',
  className,
  loading,
  id,
  action,
  ...props
}: FormSubmitButtonProps) => {
  const isPending = useIsPending({
    formAction: action,
  });

  const isLoading = loading || isPending;
  return (
    <Button
      id={id ?? ''}
      className={className}
      type="submit"
      loading={isLoading}
      variant="solid"
      color="primary"
      {...props}
    >
      {children}
    </Button>
  );
};

export { FormSubmitButton, FormSubmitButtonProps };
