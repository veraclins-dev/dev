import { forwardRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { ButtonBase, type ButtonBaseProps } from '../ui/button';
import { ComposedTooltip } from '../ui/tooltip';

interface ButtonProps extends ButtonBaseProps {
  rounded?: boolean;
  tooltip?: React.ReactNode;
}

const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ tooltip, ...props }, ref) => {
    return tooltip ? (
      <ComposedTooltip
        Trigger={ButtonBase}
        TriggerProps={props}
        content={tooltip}
        triggerRef={ref}
      />
    ) : (
      <ButtonBase ref={ref} {...props} />
    );
  },
);

BaseButton.displayName = 'BaseButton';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ rounded = false, className, children, ...props }, ref) => {
    return (
      <BaseButton
        {...props}
        ref={ref}
        className={cn(rounded ? 'rounded-full' : 'rounded-md', className)}
      >
        {children}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';

export { BaseButton, Button, type ButtonProps };
