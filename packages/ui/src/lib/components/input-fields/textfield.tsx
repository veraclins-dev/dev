import { useCallback, useState } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon, Input, INPUT_CLASS_OVERRIDES, type InputProps } from '../../ui';

import { InputFieldWrapper } from './input-field-wrapper';
import {
  type BaseInputProps,
  getInputProps,
  type InputFieldProps,
  useFieldProperties,
} from './utils';

export interface TextFieldProps extends InputProps, BaseInputProps {
  inputRef?: React.Ref<HTMLInputElement>;
  type?: InputFieldProps['type'];
}

export const TextField = ({
  name,
  label,
  leftIcon,
  rightIcon,
  type = 'text',
  labelProps,
  topText,
  className,
  inputRef,
  field,
  inputClass,
  rightAddon,
  wrapperClassName,
  ref,
  ...props
}: TextFieldProps) => {
  const isPassword = type === 'password';
  const [hidden, setHidden] = useState(isPassword);
  const toggleHidden: React.MouseEventHandler<SVGElement> = useCallback(
    (e) => {
      e.preventDefault();
      setHidden(!hidden);
    },
    [hidden],
  );
  const { errorId, id } = useFieldProperties(field);
  const passwordIcon = hidden ? 'eye-open' : 'eye-slash';

  const { key, ...inputProps } = getInputProps({ field, type, name });

  return (
    <InputFieldWrapper
      className={cn('gap-2', className)}
      field={field}
      label={label}
      labelProps={labelProps}
      topText={topText}
      wrapperClassName={wrapperClassName}
      ref={ref}
      inputProps={props}
    >
      {leftIcon && <Icon name={leftIcon} size="sm" />}
      <Input
        {...props}
        {...inputProps}
        key={key}
        ref={inputRef}
        id={id}
        aria-describedby={errorId}
        aria-invalid={errorId ? true : undefined}
        type={isPassword && !hidden ? 'text' : type}
        className={cn(INPUT_CLASS_OVERRIDES, inputClass)}
      />
      {isPassword ? (
        <Icon
          onClick={toggleHidden}
          size="sm"
          name={passwordIcon}
          className="cursor-pointer"
        />
      ) : rightIcon ? (
        <Icon size="sm" name={rightIcon} className="cursor-pointer" />
      ) : null}
      {rightAddon}
    </InputFieldWrapper>
  );
};
