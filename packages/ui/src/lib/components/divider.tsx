import { cn } from '@veraclins-dev/utils';

import { Box, Typography } from '../ui';

type DividerProps = {
  orientation?: 'vertical' | 'horizontal';
  opaque?: boolean;
  variant?: 'full' | 'middle';
  className?: string;
};

/**
 * Divider component that renders a visual separator.
 * @param param0 - Props for the divider component.
 * @returns The divider component.
 */
function Divider({
  orientation = 'vertical',
  opaque,
  variant = 'middle',
  className,
}: DividerProps) {
  const isVertical = orientation === 'vertical';
  const padding = isVertical ? 'py-1' : 'px-1';
  return (
    <Box
      className={cn(
        isVertical ? 'h-full' : 'w-full',
        variant === 'middle' ? padding : '',
        className,
      )}
    >
      <Box
        className={cn(
          isVertical ? 'h-full w-[1px] min-h-4' : 'h-[1px] w-full min-w-4',
          opaque ? 'bg-foreground' : 'bg-border opacity-65',
        )}
      />
    </Box>
  );
}

type DividerWithTextProps = DividerProps & {
  text: string;
};

/**
 * Divider component that renders a visual separator with optional text.
 * @param param0 - Props for the divider component.
 * @returns The divider component with optional text.
 */
function DividerWithText({
  text,
  orientation = 'horizontal',
  ...others
}: DividerWithTextProps) {
  return (
    <Box
      display="flex"
      items="center"
      className={cn(
        orientation === 'vertical'
          ? 'h-full flex-col gap-y-0.5'
          : 'w-full flex-row gap-x-0.5',
      )}
    >
      <Divider {...others} orientation={orientation} />
      <Typography variant="body2" noWrap>
        {text}
      </Typography>
      <Divider {...others} orientation={orientation} />
    </Box>
  );
}

export { Divider, DividerWithText };
