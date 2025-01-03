import { forwardRef, type PropsWithoutRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import {
  inputClasses,
  Select,
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
  extends PropsWithoutRef<JSX.IntrinsicElements['select']>,
    Omit<BaseInputProps, 'value'> {
  placeholder?: string;
  defaultValue?: BaseSelectProps['defaultValue'];
  dir?: BaseSelectProps['dir'];
}

type Props = BaseSelectProps & SelectFieldProps;

export const SelectField = forwardRef<HTMLDivElement, Props>(
  (
    {
      name,
      label,
      labelProps,
      topText,
      className,
      borderless = true,
      field,
      bgClass = 'bg-input',
      inputClass,
      defaultValue,
      value,
      dir,
      ...props
    },
    ref,
  ) => {
    const { errorId } = useFieldProperties(field);

    const controlProps = useSelectControlProps(
      field ?? { formId: '', name: name ?? '' },
    );

    const { key, ...formProps } = field ? getSelectProps(field) : {};

    return (
      <InputWrapper
        borderless={borderless}
        className={className}
        field={field}
        label={label}
        labelProps={{
          ...labelProps,
          htmlFor: name,
        }}
        topText={topText}
        bgClass={bgClass}
        wrapperRef={ref}
      >
        <Select
          {...props}
          {...formProps}
          {...controlProps}
          key={key}
          value={controlProps.value}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          className={cn('w-full', inputClasses, bgClass, inputClass)}
          defaultValue={defaultValue}
          dir={dir}
        />
      </InputWrapper>
    );
  },
);

SelectField.displayName = 'SelectField';
