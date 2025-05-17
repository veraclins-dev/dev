import { Textarea } from '../../ui/textarea';

import {
  type BaseInputProps,
  getInputProps,
  useFieldProperties,
} from './utils';
import { InputWrapper } from './wrapper';

export interface TextareaFieldProps
  extends React.ComponentProps<'textarea'>,
    BaseInputProps {
  rightInlay?: React.ReactNode;
  inputRef?: React.Ref<HTMLTextAreaElement>;
}

export const TextareaField = ({
  label,
  labelProps,
  topText,
  className,
  rows = 4,
  rightInlay,
  inputRef,
  field,
  inputClass,
  name,
  wrapperClassName,
  ...props
}: TextareaFieldProps) => {
  const { errorId, id } = useFieldProperties(field);
  const { key, ...inputProps } = getInputProps({ field, name });

  return (
    <InputWrapper
      className={className}
      field={field}
      label={label}
      labelProps={labelProps}
      topText={topText}
      wrapperClassName={wrapperClassName}
    >
      <Textarea
        {...props}
        key={key}
        {...inputProps}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        id={id}
        rows={rows}
        className={inputClass}
      />
      {rightInlay ? (
        <span className="absolute bottom-0.5 right-0.5">{rightInlay}</span>
      ) : null}
    </InputWrapper>
  );
};
