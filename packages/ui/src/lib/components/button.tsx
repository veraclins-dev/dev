import { cn } from '@veraclins-dev/utils';

import { ButtonBase, type ButtonBaseProps } from '../ui/button';
import { ComposedTooltip } from '../ui/tooltip';

interface ButtonProps extends ButtonBaseProps {
  rounded?: boolean;
  tooltip?: React.ReactNode;
}

const BaseButton = ({ tooltip, ...props }: ButtonProps) => {
  return tooltip ? (
    <ComposedTooltip
      Trigger={ButtonBase}
      TriggerProps={props}
      content={tooltip}
    />
  ) : (
    <ButtonBase {...props} />
  );
};

const Button = ({
  rounded = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <BaseButton
      {...props}
      className={cn(
        rounded || props.size === 'icon' ? 'rounded-full' : 'rounded-md',
        className,
      )}
    >
      {children}
    </BaseButton>
  );
};

export { BaseButton, Button, type ButtonProps };
