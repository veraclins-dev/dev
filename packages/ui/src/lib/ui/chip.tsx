import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type ChipVariants, chipVariants } from './utils/variants';
import { Box } from './box';
import { Icon } from './icon';

/**
 * Props for the Chip component.
 * Extends HTML div attributes and ChipVariants with additional properties.
 */
interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    ChipVariants {
  /** The content to display in the chip */
  label: string | React.ReactNode;
  /** Optional callback function when the remove icon is clicked */
  onRemove?: React.MouseEventHandler<SVGSVGElement>;
}

/**
 * Chip component for displaying compact elements that can represent input, attribute, or action.
 * Supports different variants, colors, and sizes, with an optional remove action.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Chip label="Basic" />
 *
 * // With remove action
 * <Chip
 *   label="Removable"
 *   onRemove={() => console.log('Removed')}
 * />
 *
 * // With custom styling
 * <Chip
 *   label="Custom"
 *   variant="outline"
 *   color="primary"
 *   size="lg"
 * />
 *
 * // With custom content
 * <Chip
 *   label={<span>Custom <strong>Content</strong></span>}
 * />
 * ```
 *
 * @param props - Props for the Chip component
 * @returns A styled chip element with optional remove action
 */
const Chip = memo(
  ({
    className,
    variant,
    color,
    size = 'md',
    onRemove,
    label,
    ...props
  }: ChipProps) => {
    return (
      <Box
        className={cn(chipVariants({ variant, color, size }), className)}
        {...props}
      >
        <span className="align-middle">{label}</span>
        {onRemove && (
          <Icon
            className={cn(
              'cursor-pointer opacity-60 p-0.5 hover:opacity-100 focus:outline-none size-4',
              size === 'sm' && 'size-4',
              size === 'md' && 'size-5',
              size === 'lg' && 'size-6',
              size === 'xl' && 'size-7',
            )}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(e);
            }}
            name="cancel"
            aria-label="Remove"
            tooltip="Remove"
          />
        )}
      </Box>
    );
  },
);

Chip.displayName = 'Chip';

export { Chip, type ChipProps };
