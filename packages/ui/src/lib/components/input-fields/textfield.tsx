import { forwardRef, type PropsWithoutRef, useCallback, useState } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';

import {
  type BaseInputProps,
  getInputProps,
  type InputFieldProps,
  useFieldProperties,
} from './utils';
import { InputWrapper, type InputWrapperProps } from './wrapper';

export interface TextFieldProps
  extends PropsWithoutRef<React.JSX.IntrinsicElements['input']>,
    BaseInputProps {
  inputRef?: React.Ref<HTMLInputElement>;
  type?: InputFieldProps['type'];
  wrapperProps?: InputWrapperProps['wrapperProps'];
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      label,
      leftIcon,
      rightIcon,
      type = 'text',
      labelProps,
      topText,
      className,
      borderless = true,
      inputRef,
      field,
      bgClass = 'bg-input',
      inputClass,
      rightAddon,
      wrapperProps,
      ...props
    },
    ref,
  ) => {
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
    const passwordIcon = hidden ? 'eye-open' : 'eye-none';

    const { key, ...inputProps } = getInputProps({ field, type, name });

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
        wrapperProps={wrapperProps}
      >
        {leftIcon && <Icon name={leftIcon} className="ml-3" size="sm" />}
        <Input
          {...props}
          {...inputProps}
          key={key}
          ref={inputRef}
          id={id}
          aria-describedby={errorId}
          aria-invalid={errorId ? true : undefined}
          type={isPassword && !hidden ? 'text' : type}
          className={cn(bgClass, inputClass)}
        />
        {isPassword ? (
          <Icon
            size="md"
            name={passwordIcon}
            className="mr-3 cursor-pointer"
            onClick={toggleHidden}
          />
        ) : rightIcon ? (
          <Icon
            size="md"
            name={rightIcon}
            className="mr-3 cursor-pointer"
            onClick={toggleHidden}
          />
        ) : null}
        {rightAddon}
      </InputWrapper>
    );
  },
);

TextField.displayName = 'TextField';
