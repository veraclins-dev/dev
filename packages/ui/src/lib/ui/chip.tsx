import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon } from './icon';
import { type ChipVariants, chipVariants } from './variants';

interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    ChipVariants {
  label: string | React.ReactNode;
  onRemove?: React.MouseEventHandler<SVGSVGElement>;
}

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
      <div
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
            onClick={onRemove}
            name="cancel"
            aria-label="Remove"
            tooltip="Remove"
          />
        )}
      </div>
    );
  },
);

Chip.displayName = 'Chip';

export { Chip, type ChipProps };
