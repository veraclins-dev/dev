import {
  getSelectProps as conformGetSelectProps,
  useInputControl,
} from '@conform-to/react';
import { forwardRef, type PropsWithoutRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Select, type SelectProps as BaseSelectProps } from '../../ui';

import {
  type BaseInputProps,
  getSelectProps,
  useControlProps,
  useFieldProperties,
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

    const controlProps = useControlProps(
      field ?? { formId: '', name: name ?? '' },
    );

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
          {...(field ? getSelectProps(field) : {})}
          {...controlProps}
          value={controlProps.value}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            'h-full w-full max-w-full flex-1 self-center border-0 px-3.5 py-2 text-base leading-normal focus:outline-none focus:ring-0',
            bgClass,
            inputClass,
          )}
          defaultValue={defaultValue}
          dir={dir}
        />
      </InputWrapper>
    );
  },
);

SelectField.displayName = 'SelectField';
