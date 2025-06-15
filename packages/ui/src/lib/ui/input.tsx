import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { INPUT_CLASSES } from './utils/styles';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(INPUT_CLASSES, className)}
      {...props}
    />
  );
}

export { Input };
