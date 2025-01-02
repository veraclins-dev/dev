import * as Flags from 'country-flag-icons/react/3x2';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import Input, {
  getCountries,
  getCountryCallingCode,
  type Props,
} from 'react-phone-number-input/input';

import { cn } from '@veraclins-dev/utils';

import 'react-phone-number-input/style.css';

import { Select } from '../../ui';
import { Divider } from '../divider';

import { type TextFieldProps } from './textfield';
import {
  getInputProps,
  useFieldProperties,
  useInputControlProps,
} from './utils';
import { InputWrapper } from './wrapper';

type CountryCode = Parameters<typeof getCountryCallingCode>[0];

const CountryLabel = ({ value }: { value: CountryCode }) => {
  const CountryFlag = Flags[value];
  return (
    <label className="grid grid-cols-3 items-center">
      <span className="col-span-2">+{getCountryCallingCode(value)}</span>

      <CountryFlag className="col-span-1 h-4" />
    </label>
  );
};

interface CountrySelectProps {
  countries: CountryCode[];
  value: CountryCode;
  onChange: (value: CountryCode) => void;
}

const CountrySelect = ({ countries, value, onChange }: CountrySelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      options={countries.map((option) => ({
        label: <CountryLabel value={option} key={option} />,
        value: option,
      }))}
      showLabel
      disabled
      className="h-full flex-1 self-center bg-inherit px-1 py-2 text-base leading-normal focus:outline-none focus:ring-0 lg:w-full lg:px-2.5"
    />
  );
};

type PhoneFieldProps = Omit<
  Props<TextFieldProps>,
  'onChange' | 'leftIcon' | 'rightIcon'
> & { rightAddon?: React.ReactNode };

export const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(
  (
    {
      name,
      label,
      labelProps,
      topText,
      type = 'text',
      className = 'h-10',
      borderless = true,
      inputRef,
      field,
      bgClass = 'bg-input',
      inputClass,
      defaultCountry = 'NG',
      country,
      international = true,
      placeholder,
      rightAddon,
      autoFocus,
      ...props
    },
    ref,
  ) => {
    const [localCountryValue, setLocalCountryValue] = useState<CountryCode>(
      country ?? defaultCountry,
    );
    const [formValue, setFormValue] = useState<string>('');
    const { errorId, id } = useFieldProperties(field);

    const { control, ...controlProps } = useInputControlProps(
      field ?? { formId: '', name: name ?? '' },
    );
    const { key, ...inputProps } = getInputProps({
      field,
      type,
      name,
    });

    const countryChange = useCallback(
      (value: CountryCode) => {
        control?.change('');
        setLocalCountryValue(value);
      },
      [localCountryValue],
    );

    useEffect(() => {
      if (control?.value) {
        const value =
          typeof control.value === 'string'
            ? control.value
            : control.value.join('|');
        setFormValue(value);
      }
    }, [control?.value]);

    return (
      <InputWrapper
        borderless={borderless}
        className={className}
        field={field}
        label={label}
        labelProps={labelProps}
        topText={topText}
        wrapperRef={ref}
        bgClass={bgClass}
      >
        <CountrySelect
          countries={getCountries()}
          onChange={countryChange}
          value={localCountryValue}
        />
        <Divider isVertical variant="full" />
        <Input
          {...controlProps}
          autoFocus={autoFocus}
          placeholder={placeholder}
          id={id}
          ref={inputRef}
          country={localCountryValue}
          international={international}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            'h-full w-full flex-1 self-center border-0 px-3 py-2 text-base leading-normal outline-none focus:ring-0',
            bgClass,
            inputClass,
          )}
          maxLength={12}
        />
        {rightAddon}
        <input
          {...props}
          {...inputProps}
          key={key}
          value={formValue}
          type="text"
          className="h-0 w-0 border-none p-0"
          readOnly
        />
      </InputWrapper>
    );
  },
);

PhoneField.displayName = 'PhoneField';
