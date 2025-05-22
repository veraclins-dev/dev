import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@veraclins-dev/utils';

// Type definitions
type Display =
  | 'block'
  | 'inline'
  | 'inline-block'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'none';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

type Spacing =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24
  | 32
  | 40
  | 48;

type Color =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'inherit';

export const spaces = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56,
  60, 64, 72, 80, 96,
] as const;

export type Spaces = (typeof spaces)[number];

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  component?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({
  component = 'div',
  className,
  children,
  ...props
}) => {
  const Component = component;

  return (
    <Component data-slot="box" className={cn(className)} {...props}>
      {children}
    </Component>
  );
};

export { Box, BoxProps };
