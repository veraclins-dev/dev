import { type FieldMetadata } from '@conform-to/react';

import {
  Box,
  Checkbox,
  type CheckboxProps,
  type CheckedState,
  type CheckedValue,
  Label,
} from '../../ui';

import { InputFieldWrapper } from './input-field-wrapper';
import { type TextFieldProps } from './textfield';
import {
  getInputProps,
  useFieldProperties,
  useInputControlProps,
} from './utils';

interface CheckboxFieldProps
  extends Omit<CheckboxProps, 'onChange' | 'onCheckedChange' | 'ref'>,
    Pick<React.ComponentProps<'div'>, 'ref'>,
    Pick<
      TextFieldProps,
      'label' | 'labelProps' | 'inputClass' | 'wrapperClassName'
    > {
  field?: FieldMetadata<CheckedValue>;
  label?: string | React.ReactNode;
  labelProps?: React.JSX.IntrinsicElements['label'];
  onChange?: (value: CheckedValue) => void;
  inputClassName?: string;
}

const getCheckedValue = (value: CheckedState) => {
  if (value === 'indeterminate') {
    return value;
  }
  return value ? 'on' : 'off';
};

export function CheckboxField({
  field,
  labelProps,
  label,
  defaultValue: supplied,
  value,
  defaultChecked,
  name,
  onChange,
  className,
  wrapperClassName,
  ref,
  ...others
}: CheckboxFieldProps) {
  // delete field?.initialValue;
  const { control, ...controlProps } = useInputControlProps(field, name);

  const defaultValue = supplied ?? field?.initialValue ?? undefined;

  const { key, ...formProps } = getInputProps({ field, name });

  const props = {
    ...others,
    ...formProps,
  };

  const { errorId, id } = useFieldProperties(field);
  return (
    <InputFieldWrapper
      className={className}
      field={field}
      wrapperClassName={wrapperClassName}
      plain
      ref={ref}
    >
      <Box display="flex" items="center" gap={2}>
        <Checkbox
          {...props}
          id={id}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          onCheckedChange={(state) => {
            const val = getCheckedValue(state);
            control?.change(val);
            onChange?.(val);
          }}
          defaultChecked={value === 'on'}
          onFocus={(event) => {
            control?.focus();
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            control?.blur();
            props.onBlur?.(event);
          }}
          defaultValue={defaultValue}
          value={(controlProps.value as CheckedValue) ?? value}
          type="button"
        />
        <Label htmlFor={id} {...labelProps} className="self-center text-sm">
          {label}
        </Label>
      </Box>
    </InputFieldWrapper>
  );
}
