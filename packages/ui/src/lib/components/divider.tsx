import { cn } from '@veraclins-dev/utils';

type DividerProps = {
  orientation?: 'vertical' | 'horizontal';
  opaque?: boolean;
  variant?: 'full' | 'middle';
  className?: string;
};

export const Divider = ({
  orientation = 'vertical',
  opaque,
  variant = 'middle',
  className,
}: DividerProps) => {
  const isVertical = orientation === 'vertical';
  const padding = isVertical ? 'py-1' : 'px-1';
  return (
    <div
      className={cn(
        isVertical ? 'h-full' : 'w-full',
        variant === 'middle' ? padding : '',
        className,
      )}
    >
      <div
        className={cn(
          isVertical ? 'h-full w-[1px] min-h-4' : 'h-[1px] w-full min-w-4',
          opaque ? 'bg-foreground' : 'bg-border opacity-65',
        )}
      />
    </div>
  );
};

type DividerWithTextProps = DividerProps & {
  text: string;
};

export const DividerWithText = ({
  text,
  orientation = 'horizontal',
  ...others
}: DividerWithTextProps) => (
  <div
    className={cn(
      'flex items-center',
      orientation === 'vertical'
        ? 'h-full flex-col gap-y-0.5'
        : 'w-full flex-row gap-x-0.5',
    )}
  >
    <Divider {...others} orientation={orientation} />
    <span className="text-nowrap text-sm">{text}</span>
    <Divider {...others} orientation={orientation} />
  </div>
);
