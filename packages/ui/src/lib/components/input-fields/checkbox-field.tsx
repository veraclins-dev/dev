import { type FieldMetadata } from '@conform-to/react';

import { cn } from '@veraclins-dev/utils';

import { Label } from '../../ui';
import {
  Checkbox,
  type CheckboxProps,
  type CheckedState,
  type CheckedValue,
} from '../../ui/checkbox';
import { ErrorList } from '../error-list';

import { type TextFieldProps } from './textfield';
import {
  getInputProps,
  useFieldProperties,
  useInputControlProps,
} from './utils';

interface CheckboxFieldProps
  extends Omit<CheckboxProps, 'onChange' | 'onCheckedChange'>,
    Pick<TextFieldProps, 'label' | 'labelProps' | 'inputClass'> {
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

  const { errorId, id, errors } = useFieldProperties(field);
  return (
    <div className={cn('mb-2', className)}>
      <div className="flex items-center gap-2">
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
          type="button"
          value={controlProps.value ?? value}
        />
        <Label htmlFor={id} {...labelProps} className="self-center text-sm ">
          {label}
        </Label>
      </div>
      {errorId ? (
        <div className="py-1">
          <ErrorList id={errorId} errors={errors} />
        </div>
      ) : null}
    </div>
  );
}
