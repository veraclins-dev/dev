import { cn } from '@veraclins-dev/utils';

export type MenuBarProps = {
  /** If true, the menu bar will be hidden. */
  sticky?: boolean;
  /** The set of controls (buttons, etc) to include in the menu bar. */
  children?: React.ReactNode;
  /** Class applied to the outermost `root` element. */
  className?: string;
};

/**
 * An optionally-sticky container for showing editor controls atop
 * the editor content.
 */
export function MenuBar({ sticky = false, children, className }: MenuBarProps) {
  return (
    <div
      className={cn(
        'z-50 flex min-h-12 flex-wrap items-center gap-2 rounded-t-sm border-b bg-card-inner p-2',
        className,
      )}
    >
      {children}
    </div>
  );
}
