import { Button, type ButtonProps } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

type CancelButtonProps = ButtonProps;

export const CancelButton = ({ className, ...props }: CancelButtonProps) => {
  return (
    <Button
      {...props}
      type="button"
      variant="outline"
      className={cn('px-6 py-2', className)}
    >
      Cancel
    </Button>
  );
};
