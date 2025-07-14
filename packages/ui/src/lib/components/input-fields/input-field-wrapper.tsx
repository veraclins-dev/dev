import { InputWrapper } from '../input-wrapper';

import { type BaseInputProps, useFieldProperties } from './utils';

export interface InputFieldWrapperProps
  extends React.ComponentProps<'div'>,
    BaseInputProps {
  children: React.ReactNode;
  plain?: boolean;
}

export const InputFieldWrapper = ({
  field,
  ...props
}: InputFieldWrapperProps) => {
  const { errorId, id, errors } = useFieldProperties(field);

  return <InputWrapper id={id} errors={errors} errorId={errorId} {...props} />;
};
