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
    <div
      className={cn(
        'z-50 flex min-h-10 flex-wrap items-center gap-2 rounded-t-sm border-b bg-card p-1',
        className,
      )}
    >
      {children}
    </div>
  );
}
