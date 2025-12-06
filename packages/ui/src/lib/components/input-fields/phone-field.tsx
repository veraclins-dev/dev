import * as Flags from 'country-flag-icons/react/3x2';
import { useCallback, useState } from 'react';
import Input, {
  getCountries,
  getCountryCallingCode,
  type Props,
} from 'react-phone-number-input/input';

import { cn } from '@veraclins-dev/utils';

import 'react-phone-number-input/style.css';

import { Box } from '../../ui/box';
import { ComposedSelect } from '../../ui/select';
import { Typography } from '../../ui/typography';
import { INPUT_CLASS_OVERRIDES } from '../../ui/utils/styles';

import { InputFieldWrapper } from './input-field-wrapper';
import { type TextFieldProps } from './textfield';
import {
  getInputProps,
  useFieldProperties,
  useInputControlProps,
} from './utils';

type CountryCode = Parameters<typeof getCountryCallingCode>[0];

const CountryLabel = ({ value }: { value: CountryCode }) => {
  const CountryFlag = Flags[value];
  return (
    <Box display="grid" className="grid-cols-3 items-center text-xs">
      <Typography variant="caption" className="col-span-2">
        +{getCountryCallingCode(value)}
      </Typography>
      <CountryFlag className="col-span-1 h-3" />
    </Box>
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
      className={cn('max-w-19', INPUT_CLASS_OVERRIDES)}
    />
  );
};

type PhoneFieldProps = Omit<
  Props<TextFieldProps>,
  'onChange' | 'leftIcon' | 'rightIcon'
> & { rightAddon?: React.ReactNode };

export const PhoneField = ({
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
  ref,
  ...props
}: PhoneFieldProps) => {
  const [localCountryValue, setLocalCountryValue] = useState<CountryCode>(
    country ?? defaultCountry,
  );
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
    [control],
  );

  // Compute formValue from control value during render
  const formValue = control?.value
    ? typeof control.value === 'string'
      ? control.value
      : control.value.join('|')
    : '';

  return (
    <InputFieldWrapper
      className={className}
      field={field}
      label={label}
      labelProps={labelProps}
      topText={topText}
      wrapperClassName={wrapperClassName}
      ref={ref}
      inputProps={props}
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
        className={cn(
          INPUT_CLASS_OVERRIDES,
          'flex-1 outline-none pl-2',
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
    </InputFieldWrapper>
  );
};
