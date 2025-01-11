import { Button, type ButtonProps } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

export const ConfirmButton = ({ className, ...props }: ButtonProps) => {
  return <Button {...props} className={cn('px-6 py-2', className)} />;
};
