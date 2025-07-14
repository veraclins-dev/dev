import { cn } from '@veraclins-dev/utils';

import { Box, Typography } from '../ui';
import { INPUT_CONTAINER_CLASSES } from '../ui';
import { Label } from '../ui/label';

import { ErrorList } from './error-list';
import { type BaseInputProps } from './input-fields';

export interface InputWrapperProps
  extends React.ComponentProps<'div'>,
    Omit<BaseInputProps, 'field'> {
  children: React.ReactNode;
  plain?: boolean;
  errorId?: string;
  id: string;
  errors?: string[];
  containerRef?: React.Ref<HTMLDivElement>;
}

export const InputWrapper = ({
  className,
  children,
  label,
  labelProps,
  topText,
  ref,
  wrapperClassName,
  plain,
  errorId,
  id,
  errors,
  containerRef,
  ...props
}: InputWrapperProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      className={cn('relative w-full', wrapperClassName)}
      ref={ref}
      data-slot="input-wrapper"
      {...props}
    >
      {(label || topText) && (
        <Box display="flex" justify="between">
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
            <Typography variant="caption" className="justify-self-end italic">
              {topText}
            </Typography>
          )}
        </Box>
      )}
      <Box
        aria-invalid={errorId ? true : undefined}
        data-state={errorId ? 'error' : undefined}
        className={cn(!plain && INPUT_CONTAINER_CLASSES, className)}
        ref={containerRef}
      >
        {children}
      </Box>
      {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
    </Box>
  );
};
