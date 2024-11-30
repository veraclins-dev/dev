import { forwardRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { BaseButton, type ButtonProps } from './button';

export interface IconButtonProps extends ButtonProps {
  rounded?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ rounded = false, className, children, ...props }, ref) => {
    return (
      <BaseButton
        {...props}
        className={cn(
          'flex flex-nowrap items-center p-1',
          rounded ? 'rounded-full' : '',
          className,
        )}
        variant="outline"
        ref={ref}
      >
        {children}
      </BaseButton>
    );
  },
);

IconButton.displayName = 'IconButton';
