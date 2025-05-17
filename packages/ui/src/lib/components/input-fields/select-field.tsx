import { type PropsWithoutRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import {
  ComposedSelect,
  inputClassOverrides,
  type SelectProps as BaseSelectProps,
} from '../../ui';

import {
  type BaseInputProps,
  getSelectProps,
  useFieldProperties,
  useSelectControlProps,
} from './utils';
import { InputWrapper } from './wrapper';

interface SelectFieldProps
  extends PropsWithoutRef<React.JSX.IntrinsicElements['select']>,
    Omit<BaseInputProps, 'value'> {
  placeholder?: string;
  defaultValue?: BaseSelectProps['defaultValue'];
  dir?: BaseSelectProps['dir'];
}

type Props = BaseSelectProps & SelectFieldProps;

const SelectField = ({
  name,
  label,
  labelProps,
  topText,
  className,
  field,
  inputClass,
  defaultValue,
  value,
  dir,
  wrapperClassName,
  ...props
}: Props) => {
  const { errorId } = useFieldProperties(field);

  const controlProps = useSelectControlProps(field, name);

  const { key, ...formProps } = field ? getSelectProps(field) : {};

  return (
    <InputWrapper
      className={className}
      field={field}
      wrapperClassName={wrapperClassName}
      label={label}
      labelProps={{
        ...labelProps,
        htmlFor: name,
      }}
      topText={topText}
    >
      <ComposedSelect
        {...props}
        {...formProps}
        {...controlProps}
        key={key}
        value={controlProps.value}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        className={cn('w-full', inputClassOverrides, inputClass)}
        defaultValue={defaultValue}
        dir={dir}
        sideOffset={10}
      />
    </InputWrapper>
  );
};

export { SelectField };
