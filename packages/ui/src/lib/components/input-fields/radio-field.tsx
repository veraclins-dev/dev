import { type OptionWithId } from '../../types';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import {
  extractRadioGroupItemVariants,
  type RadioGroupItemVariants,
} from '../../ui/utils/variants/input';

import { InputFieldWrapper } from './input-field-wrapper';
import { type TextFieldProps } from './textfield';
import {
  getInputProps,
  getOptionId,
  getOptionLabel,
  getOptionValue,
  useFieldProperties,
  useInputControlProps,
} from './utils';

type Options = OptionWithId<React.ReactNode>[];

type RadioGroupProps = React.ComponentProps<typeof RadioGroup>;

interface RadioFieldProps
  extends Omit<RadioGroupProps, 'onChange' | 'defaultChecked'>,
    RadioGroupItemVariants,
    Pick<
      TextFieldProps,
      'label' | 'labelProps' | 'field' | 'inputClass' | 'wrapperClassName'
    > {
  options: Options;
  value?: string;
  defaultValue?: string;
  shouldReset?: boolean;
  onChange?: (value: string) => void;
  itemProps?: React.ComponentProps<typeof RadioGroupItem>;
}

const RadioField = ({
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
  wrapperClassName,
  ref,
  itemProps,
  ...props
}: RadioFieldProps) => {
  const { errorId, id } = useFieldProperties(field);

  const defaultValue = supplied ?? field?.initialValue ?? undefined;

  delete field?.initialValue;

  const { key, ...formProps } = getInputProps({ field, name });
  delete formProps.defaultValue;

  const { control, ...controlProps } = useInputControlProps(field, name);

  return (
    <InputFieldWrapper
      className={className}
      field={field}
      label={label}
      labelProps={labelProps}
      wrapperClassName={wrapperClassName}
      plain
      ref={ref}
    >
      <RadioGroup
        {...props}
        {...formProps}
        onValueChange={(val) => {
          control?.change(val);
          onChange?.(val);
        }}
        onFocus={(event) => {
          control?.focus();
          props['onFocus']?.(event);
        }}
        onBlur={(event) => {
          control?.blur();
          props['onBlur']?.(event);
        }}
        defaultValue={defaultValue}
        className={inputClass}
        value={controlProps.value ?? value}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        id={id}
      >
        {options.map((option) => (
          <RadioGroupItem
            key={getOptionId(option)}
            id={getOptionId(option)}
            aria-invalid={errorId ? true : undefined}
            value={getOptionValue(option)}
            label={getOptionLabel(option)}
            {...extractRadioGroupItemVariants(props)}
            {...itemProps}
          />
        ))}
      </RadioGroup>
    </InputFieldWrapper>
  );
};

export { RadioField, type RadioFieldProps };
