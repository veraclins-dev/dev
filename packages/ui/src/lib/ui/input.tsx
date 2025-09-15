import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { INPUT_CLASS_OVERRIDES } from './utils/styles';
import { extractStyleProps } from './utils/variants';
import { type InputVariants, inputVariants } from './utils/variants/input';
import { Box } from './box';
import { Icon, type IconProps } from './icon';

export type InputProps = React.ComponentProps<'input'> &
  InputVariants & {
    leftIcon?: IconProps;
    rightIcon?: IconProps;
  };

function Input({
  className,
  type,
  ref,
  inputSize,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  const { styleProps, others } = extractStyleProps(props);
  const hasIcons = leftIcon || rightIcon;

  return !hasIcons ? (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(inputVariants({ ...styleProps, className, inputSize }))}
      {...others}
    />
  ) : (
    <Box
      display="flex"
      items="center"
      gap={2}
      className={cn(inputVariants({ ...styleProps, className, inputSize }))}
    >
      {leftIcon && <Icon {...leftIcon} />}
      <input
        ref={ref}
        type={type}
        data-slot="input"
        // className={cn(inputVariants({ ...styleProps, className, inputSize }))}
        className={cn(
          inputVariants({ ...styleProps, className, inputSize }),
          INPUT_CLASS_OVERRIDES,
        )}
        {...others}
      />
      {rightIcon && <Icon {...rightIcon} />}
    </Box>
  );
}

export { Input };
