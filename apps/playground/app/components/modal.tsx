import {
  Box,
  Button,
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
      <DialogContent className={cn('', className)}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeader>
        <Box
          display="flex"
          flexDirection="column"
          flex="1"
          className={cn('max-w-full overflow-scroll', contentClassName)}
        >
          {children}
        </Box>
        <DialogFooter>
          {!cancelHidden && (
            <DialogClose asChild>
              <Button {...cancelButtonProps} />
            </DialogClose>
          )}
          {!confirmHidden && <Button {...confirmButtonProps} />}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
