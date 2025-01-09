import { forwardRef } from 'react';

import { type OptionWithId } from '../../types';
import {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupProps,
} from '../../ui/radio-group';

import { type TextFieldProps } from './textfield';
import {
  getInputProps,
  getOptionId,
  getOptionLabel,
  getOptionValue,
  useFieldProperties,
  useInputControlProps,
} from './utils';
import { InputWrapper } from './wrapper';

type Options = OptionWithId[];

interface RadioFieldProps
  extends Omit<RadioGroupProps, 'onChange' | 'defaultChecked'>,
    Pick<TextFieldProps, 'label' | 'labelProps' | 'field' | 'inputClass'> {
  options: Options;
  value?: string;
  defaultValue?: string;
  shouldReset?: boolean;
  onChange?: (value: string) => void;
}

const RadioField = forwardRef<HTMLDivElement, RadioFieldProps>(
  (
    {
      className,
      options,
      label,
      name,
      labelProps,
      field,
      inputClass,
      defaultValue: supplied,
      value,
      onChange,
      shouldReset,
      ...props
    },
    ref,
  ) => {
    const { errorId } = useFieldProperties(field);

    const defaultValue = supplied ?? field?.initialValue ?? undefined;

    delete field?.initialValue;

    const { key, ...formProps } = getInputProps({ field, name });
    delete formProps.defaultValue;

    const { control, ...controlProps } = useInputControlProps(field, name);

    return (
      <InputWrapper
        borderless
        className={className}
        field={field}
        label={label}
        labelProps={labelProps}
        wrapperRef={ref}
      >
        <RadioGroup
          {...props}
          {...formProps}
          onValueChange={(val) => {
            console.log(val, controlProps.value, value);
            control?.change(val);
            onChange?.(val);
          }}
          onFocus={(event) => {
            control?.focus();
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            control?.blur();
            props.onBlur?.(event);
          }}
          defaultValue={defaultValue}
          className={inputClass}
          value={controlProps.value ?? value}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
        >
          {options.map((option) => (
            <RadioGroupItem
              key={getOptionId(option)}
              id={getOptionId(option)}
              value={getOptionValue(option)}
              label={getOptionLabel(option)}
            />
          ))}
        </RadioGroup>
      </InputWrapper>
    );
  },
);

RadioField.displayName = 'RadioField';

export { RadioField, type RadioFieldProps };
