import { cn } from '@veraclins-dev/utils';

import {
  INPUT_CLASS_OVERRIDES,
  Textarea,
  type TextareaProps,
  Typography,
} from '../../ui';

import { InputFieldWrapper } from './input-field-wrapper';
import {
  type BaseInputProps,
  getInputProps,
  useFieldProperties,
} from './utils';

export interface TextareaFieldProps
  extends Omit<TextareaProps, 'ref'>,
    Pick<React.ComponentProps<'div'>, 'ref'>,
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
  ref,
  ...props
}: TextareaFieldProps) => {
  const { errorId, id } = useFieldProperties(field);
  const { key, ...inputProps } = getInputProps({ field, name });

  return (
    <InputFieldWrapper
      className={className}
      field={field}
      label={label}
      labelProps={labelProps}
      topText={topText}
      wrapperClassName={wrapperClassName}
      ref={ref}
      inputProps={props}
    >
      <Textarea
        {...props}
        key={key}
        {...inputProps}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        id={id}
        rows={rows}
        className={cn('h-full', INPUT_CLASS_OVERRIDES, inputClass)}
      />
      {rightInlay ? (
        <Typography className="absolute bottom-0.5 right-0.5">
          {rightInlay}
        </Typography>
      ) : null}
    </InputFieldWrapper>
  );
};
