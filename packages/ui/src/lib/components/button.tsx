import { ButtonBase, type ButtonBaseProps } from '../ui/button';
import { ComposedTooltip } from '../ui/tooltip';

interface ButtonProps extends ButtonBaseProps {
  tooltip?: React.ReactNode;
}

/**
 * Button component that renders a button with children and additional props.
 * @param param0 - Props for the button component.
 * @returns The button component with children.
 */
function Button({ tooltip, ...props }: ButtonProps) {
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

export { Button, type ButtonProps };
