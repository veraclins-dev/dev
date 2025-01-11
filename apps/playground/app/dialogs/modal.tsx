import {
  type ButtonProps,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { CancelButton } from './cancel-button';
import { ConfirmButton } from './confirm-button';

type ModalDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  confirmButtonProps: ButtonProps & { hidden?: boolean };
  cancelButtonProps?: ButtonProps & { hidden?: boolean };
  className?: string;
  contentClassName?: string;
}>;

export function ModalDialog({
  open,
  onOpenChange,
  title,
  subtitle,
  children,
  contentClassName,
  cancelButtonProps: { hidden: cancelHidden, ...cancelButtonProps } = {},
  confirmButtonProps: { hidden: confirmHidden, ...confirmButtonProps } = {
    children: 'Confirm',
  },
  className,
}: ModalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('max-w-2xl', className)}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeader>
        <div
          className={cn(
            'flex max-w-full flex-1 flex-col overflow-scroll',
            contentClassName,
          )}
        >
          {children}
        </div>
        <DialogFooter>
          {!cancelHidden && (
            <DialogClose asChild>
              <CancelButton {...cancelButtonProps} />
            </DialogClose>
          )}
          {!confirmHidden && <ConfirmButton {...confirmButtonProps} />}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
