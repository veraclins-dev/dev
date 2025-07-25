import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { extractStyleProps } from './utils/variants';
import { type InputVariants, inputVariants } from './utils/variants/input';

export type InputProps = React.ComponentProps<'input'> & InputVariants;

function Input({ className, type, ref, inputSize, ...props }: InputProps) {
  const { styleProps, others } = extractStyleProps(props);
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(inputVariants({ ...styleProps, className, inputSize }))}
      {...others}
    />
  );
}

export { Input };
