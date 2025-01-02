import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-full flex-1 rounded-md bg-input px-3 py-2 text-base leading-normal file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
