import { cn } from '@veraclins-dev/utils';

type DividerProps = {
  isVertical?: boolean;
  opaque?: boolean;
  variant?: 'full' | 'middle';
};
export const Divider = ({
  isVertical = true,
  opaque,
  variant = 'middle',
}: DividerProps) => {
  const padding = isVertical ? 'py-1' : 'px-1';
  return (
    <div
      className={cn(
        isVertical ? 'h-full' : 'w-full',
        variant === 'middle' ? padding : '',
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
  isVertical = false,
  ...others
}: DividerWithTextProps) => {
  return (
    <div
      className={cn(
        'flex items-center',
        isVertical ? 'h-full flex-col gap-y-0.5' : 'w-full flex-row gap-x-0.5',
      )}
    >
      <Divider {...others} isVertical={isVertical} />
      <span className="text-nowrap text-sm">{text}</span>
      <Divider {...others} isVertical={isVertical} />
    </div>
  );
};
