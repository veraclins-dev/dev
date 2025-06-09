import { cn } from '@veraclins-dev/utils';

import { Box, Typography } from '../../ui';
import { INPUT_CONTAINER_CLASSES } from '../../ui';
import { Label } from '../../ui/label';
import { ErrorList } from '../error-list';

import { type BaseInputProps, useFieldProperties } from './utils';

export interface InputWrapperProps
  extends React.ComponentProps<'div'>,
    BaseInputProps {
  children: React.ReactNode;
  plain?: boolean;
}

export const InputWrapper = ({
  className,
  children,
  label,
  labelProps,
  topText,
  field,
  ref,
  wrapperClassName,
  plain,
}: InputWrapperProps) => {
  const { errorId, id, errors } = useFieldProperties(field);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      className={cn('relative w-full', wrapperClassName)}
      ref={ref}
      data-slot="input-wrapper"
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
      >
        {children}
      </Box>
      {errorId ? (
        <Box>
          <ErrorList id={errorId} errors={errors} />
        </Box>
      ) : null}
    </Box>
  );
};
