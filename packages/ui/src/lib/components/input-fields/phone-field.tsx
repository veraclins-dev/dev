import * as Flags from 'country-flag-icons/react/3x2';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import Input, {
  getCountries,
  getCountryCallingCode,
  type Props,
} from 'react-phone-number-input/input';

import { cn } from '@veraclins-dev/utils';

import 'react-phone-number-input/style.css';

import { ComposedSelect, inputClasses } from '../../ui';

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
    <ComposedSelect
      value={value}
      onValueChange={onChange}
      options={countries.map((option) => ({
        label: <CountryLabel value={option} key={option} />,
        value: option,
      }))}
      showLabel
      disabled
      className="max-w-32"
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
      className = 'h-full',
      inputRef,
      field,
      inputClass,
      defaultCountry = 'NG',
      country,
      international = true,
      placeholder,
      rightAddon,
      autoFocus,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const [localCountryValue, setLocalCountryValue] = useState<CountryCode>(
      country ?? defaultCountry,
    );
    const [formValue, setFormValue] = useState<string>('');
    const { errorId, id } = useFieldProperties(field);

    const { control, ...controlProps } = useInputControlProps(field, name);
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
        className={className}
        field={field}
        label={label}
        labelProps={labelProps}
        topText={topText}
        wrapperRef={ref}
        wrapperClassName={wrapperClassName}
      >
        <CountrySelect
          countries={getCountries()}
          onChange={countryChange}
          value={localCountryValue}
        />
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
          className={cn(inputClasses, 'rounded-l-none border-l', inputClass)}
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
