import React from 'react';

import { cn } from '@veraclins-dev/utils';

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
