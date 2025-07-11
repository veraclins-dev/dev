import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { INPUT_CLASSES } from './utils/styles';

export type InputProps = React.ComponentProps<'input'>;

function Input({ className, type, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(INPUT_CLASSES, className)}
      {...props}
    />
  );
}

export { Input };
