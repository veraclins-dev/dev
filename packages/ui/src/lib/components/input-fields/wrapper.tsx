import { cn } from '@veraclins-dev/utils';

import { INPUT_CONTAINER_CLASSES } from '../../ui';
import { Label } from '../../ui/label';
import { ErrorList } from '../error-list';

import { type BaseInputProps, useFieldProperties } from './utils';

export interface InputWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseInputProps {
  children: React.ReactNode;
  wrapperRef?: React.Ref<HTMLDivElement>;
  plain?: boolean;
}

export const InputWrapper = ({
  className,
  children,
  label,
  labelProps,
  topText,
  field,
  wrapperRef,
  wrapperClassName,
  plain,
}: InputWrapperProps) => {
  const { errorId, id, errors } = useFieldProperties(field);

  return (
    <div
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
        data-state={errorId ? 'error' : undefined}
        className={cn(!plain && INPUT_CONTAINER_CLASSES, className)}
      >
        {children}
      </div>
      {errorId ? (
        <div className="">
          <ErrorList id={errorId} errors={errors} />
        </div>
      ) : null}
    </div>
  );
};
