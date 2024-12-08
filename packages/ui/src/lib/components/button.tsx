import { forwardRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { ButtonBase, type ButtonBaseProps } from '../ui/button';
import { ComposedTooltip } from '../ui/tooltip';

interface ButtonProps extends ButtonBaseProps {
  rounded?: boolean;
  // name?: string
  tooltip?: React.ReactNode;
}

const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ tooltip, ...props }, ref) => {
    return tooltip ? (
      <ComposedTooltip
        Trigger={ButtonBase}
        TriggerProps={props}
        content={tooltip}
        myRef={ref}
      />
    ) : (
      <ButtonBase ref={ref} {...props} />
    );
  },
);

BaseButton.displayName = 'BaseButton';

const Button = ({
  rounded = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <BaseButton
      {...props}
      className={cn(rounded ? 'rounded-full' : 'rounded-md', className)}
    >
      {children}
    </BaseButton>
  );
};

export { BaseButton, Button, type ButtonProps };
