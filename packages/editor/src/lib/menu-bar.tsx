import { Box } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

export type MenuBarProps = {
  /** The set of controls (buttons, etc) to include in the menu bar. */
  children?: React.ReactNode;
  /** Class applied to the outermost `root` element. */
  className?: string;
};

/**
 * An optionally-sticky container for showing editor controls atop
 * the editor content.
 */
export function MenuBar({ children, className }: MenuBarProps) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      items="center"
      gap={2}
      className={cn('z-50 min-h-10 rounded-t-sm border-b p-1', className)}
    >
      {children}
    </Box>
  );
}
