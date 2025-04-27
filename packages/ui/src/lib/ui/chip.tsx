import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon } from './icon';

const chipVariants = cva('flex max-w-fit items-center gap-1 rounded-md p-1', {
  variants: {
    variant: {
      default: 'bg-badge/60 text-badge-foreground/80',
      plain: 'bg-card-inner text-card-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  label: string | React.ReactNode;
  onRemove: React.MouseEventHandler<SVGSVGElement> | undefined;
}

function Chip({ className, variant, onRemove, label, ...props }: ChipProps) {
  return (
    <div className={cn(chipVariants({ variant }), className)} {...props}>
      <span className="align-middle">{label}</span>
      <Icon
        className={cn(
          'flex cursor-pointer opacity-60 items-center justify-center p-0.5 hover:!border-transparent focus:outline-hidden',
        )}
        onClick={onRemove}
        name="cancel"
        size="sm"
        tooltip="remove"
      />{' '}
    </div>
  );
}

export { Chip, chipVariants };
