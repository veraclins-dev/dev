import { cn } from '@veraclins-dev/utils';

export type FieldContainerProps = {
  children: React.ReactNode;
  className?: string;
  focused?: boolean;
  disabled?: boolean;
};

/**
 * Renders an element with classes and styles that correspond to the state and
 * style-variant of a user-input field, the content of which should be passed in as
 * `children`.
 */
export function FieldContainer({
  children,
  focused,
  disabled,
  className,
}: FieldContainerProps) {
  return (
    <div
      className={cn(
        'rounded-lg rounded-t-sm border w-full',
        {
          'outline-hidden': focused,
          'cursor-not-allowed opacity-50': disabled,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
