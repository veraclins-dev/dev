import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { inputClasses } from './styles';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputClasses, className)}
      {...props}
    />
  );
}

export { Input };
