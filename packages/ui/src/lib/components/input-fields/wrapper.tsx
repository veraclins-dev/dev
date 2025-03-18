import { cn } from '@veraclins-dev/utils';

import { Label } from '../../ui/label';
import { ErrorList } from '../error-list';

import { type BaseInputProps, useFieldProperties } from './utils';

export interface InputWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseInputProps {
  children: React.ReactNode;
  borderless?: boolean;
  wrapperRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: {
    className?: string;
  };
}

export const InputWrapper = ({
  className,
  borderless = true,
  children,
  label,
  labelProps,
  topText,
  field,
  wrapperRef,
  bgClass,
  wrapperProps: { className: wrapperClassName, ...wrapperProps } = {},
}: InputWrapperProps) => {
  const { errorId, id, errors } = useFieldProperties(field);

  return (
    <div
      {...wrapperProps}
      className={cn('relative flex w-full flex-col gap-2', wrapperClassName)}
      ref={wrapperRef}
    >
      {(label || topText) && (
        <div className="flex justify-between">
          {label && (
            <Label
              {...labelProps}
              htmlFor={id}
              className="block cursor-pointer font-medium"
            >
              {label}
            </Label>
          )}
          {topText && (
            <span className="justify-self-end text-sm italic">{topText}</span>
          )}
        </div>
      )}
      <div
        aria-invalid={errorId ? true : undefined}
        className={cn(
          'flex w-full flex-wrap items-center rounded-md border text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          borderless ? 'border-0' : 'border',
          bgClass,
          className,
        )}
      >
        {children}
      </div>
      {errorId ? (
        <div className="py-1">
          <ErrorList id={errorId} errors={errors} />
        </div>
      ) : null}
    </div>
  );
};
