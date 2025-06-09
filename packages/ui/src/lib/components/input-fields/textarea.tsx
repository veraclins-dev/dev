import { cn } from '@veraclins-dev/utils';

import { INPUT_CLASS_OVERRIDES, Textarea, Typography } from '../../ui';

import {
  type BaseInputProps,
  getInputProps,
  useFieldProperties,
} from './utils';
import { InputWrapper } from './wrapper';

export interface TextareaFieldProps
  extends Omit<React.ComponentProps<'textarea'>, 'ref'>,
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
    <InputWrapper
      className={className}
      field={field}
      label={label}
      labelProps={labelProps}
      topText={topText}
      wrapperClassName={wrapperClassName}
      ref={ref}
    >
      <Textarea
        {...props}
        key={key}
        {...inputProps}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        id={id}
        rows={rows}
        className={cn(INPUT_CLASS_OVERRIDES, inputClass)}
      />
      {rightInlay ? (
        <Typography className="absolute bottom-0.5 right-0.5">
          {rightInlay}
        </Typography>
      ) : null}
    </InputWrapper>
  );
};
