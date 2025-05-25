import { useCallback, useState } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon, Input, inputClassOverrides } from '../../ui';
import { IconButton } from '../icon-button';

import {
  type BaseInputProps,
  getInputProps,
  type InputFieldProps,
  useFieldProperties,
} from './utils';
import { InputWrapper, type InputWrapperProps } from './wrapper';

export interface TextFieldProps
  extends React.ComponentProps<'input'>,
    BaseInputProps {
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
  ...props
}: TextFieldProps) => {
  const isPassword = type === 'password';
  const [hidden, setHidden] = useState(isPassword);
  const toggleHidden: React.MouseEventHandler<HTMLButtonElement> = useCallback(
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
    <InputWrapper
      className={className}
      field={field}
      label={label}
      labelProps={labelProps}
      topText={topText}
      wrapperClassName={wrapperClassName}
    >
      {leftIcon && <Icon name={leftIcon} className="mr-3" size="sm" />}
      <Input
        {...props}
        {...inputProps}
        key={key}
        ref={inputRef}
        id={id}
        aria-describedby={errorId}
        aria-invalid={errorId ? true : undefined}
        type={isPassword && !hidden ? 'text' : type}
        className={cn(inputClass, inputClassOverrides)}
      />
      <IconButton onClick={toggleHidden} variant="text" className="p-1" rounded>
        {isPassword ? (
          <Icon size="md" name={passwordIcon} className="cursor-pointer" />
        ) : rightIcon ? (
          <Icon size="md" name={rightIcon} className="cursor-pointer" />
        ) : null}
      </IconButton>
      {rightAddon}
    </InputWrapper>
  );
};
