import { forwardRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { ButtonBase, type ButtonBaseProps } from '../ui/button';
import { ComposedTooltip } from '../ui/tooltip';

export interface ButtonProps extends ButtonBaseProps {
  rounded?: boolean;
  // name?: string
  tooltip?: React.ReactNode;
}

export const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ tooltip, ...props }, ref) => {
    return tooltip ? (
      <ComposedTooltip trigger={<ButtonBase {...props} />} content={tooltip} />
    ) : (
      <ButtonBase ref={ref} {...props} />
    );
  },
);

BaseButton.displayName = 'BaseButton';

export const Button = ({
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
