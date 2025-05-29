import { ButtonBase, type ButtonBaseProps } from '../ui/button';
import { ComposedTooltip } from '../ui/tooltip';

interface ButtonProps extends ButtonBaseProps {
  tooltip?: React.ReactNode;
}
/**
 * Base button component that wraps the ButtonBase with a tooltip if provided.
 * @param param0 - Props for the button component.
 * @returns The button component with optional tooltip.
 */
function BaseButton({ tooltip, ...props }: ButtonProps) {
  return tooltip ? (
    <ComposedTooltip
      Trigger={ButtonBase}
      TriggerProps={props}
      content={tooltip}
    />
  ) : (
    <ButtonBase {...props} />
  );
}

/**
 * Button component that renders a button with children and additional props.
 * @param param0 - Props for the button component.
 * @returns The button component with children.
 */
function Button({ className, children, ...props }: ButtonProps) {
  return (
    <BaseButton {...props} className={className}>
      {children}
    </BaseButton>
  );
}

export { BaseButton, Button, type ButtonProps };
