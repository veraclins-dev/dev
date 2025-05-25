import { ButtonBase, type ButtonBaseProps } from '../ui/button';
import { ComposedTooltip } from '../ui/tooltip';

interface ButtonProps extends ButtonBaseProps {
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

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <BaseButton {...props} className={className}>
      {children}
    </BaseButton>
  );
};

export { BaseButton, Button, type ButtonProps };
