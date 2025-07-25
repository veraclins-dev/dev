import { cn } from '@veraclins-dev/utils';

import { Box, extractStyleProps, Typography } from '../ui';
import { Label } from '../ui/label';
import { inputContainerVariants } from '../ui/utils/variants/input';

import { ErrorList } from './error-list';
import { type InputFieldWrapperProps } from './input-fields';

export interface InputWrapperProps
  extends Omit<InputFieldWrapperProps, 'field'> {
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
  inputProps,
  ...props
}: InputWrapperProps) => {
  const { styleProps, others } = extractStyleProps(inputProps ?? {});
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
        className={cn(
          !plain &&
            inputContainerVariants({
              ...styleProps,
              inputSize: others.inputSize,
              className: others.className,
            }),
          className,
        )}
        ref={containerRef}
      >
        {children}
      </Box>
      {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
    </Box>
  );
};
