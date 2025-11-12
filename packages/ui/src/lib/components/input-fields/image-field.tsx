import { useInputControl } from '@conform-to/react';
import { useEffect, useState } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type MaybeString } from '../../types';
import { Box, Typography } from '../../ui';
import { ErrorList } from '../error-list';

import { type TextFieldProps } from './textfield';
import { getInputProps, useFieldProperties } from './utils';

export interface ImageFieldProps extends Omit<TextFieldProps, 'value'> {
  defaultValue?: string;
  previewClasses?: string;
  loading?: boolean;
  value?: MaybeString;
  children?: React.ReactNode;
  loadingIndicator?: React.ReactNode;
}

export const ImageField = ({
  labelProps,
  className,
  previewClasses,
  field,
  onChange,
  loading,
  value: supplied,
  name,
  disabled,
  children,
  loadingIndicator,
  ...others
}: ImageFieldProps) => {
  const val = supplied ?? field?.initialValue ?? others.defaultValue ?? '';
  delete others.defaultValue;
  delete field?.initialValue;
  const { errorId, id, errors } = useFieldProperties(field);

  const [value, setValue] = useState(val);

  const { key, ...formProps } = getInputProps({ field, name });

  const props = {
    ...others,
    ...formProps,
  };

  delete props.defaultValue;

  const input = useInputControl({
    initialValue: val,
    key: key ?? '',
    name: props.name ?? '',
    formId: props.form ?? '',
  });

  useEffect(() => {
    input.change(val);
    input.blur();
    setValue(val);
  }, [val, input]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange?.(event);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setValue(result);
        input.change(result);
      };
      reader.readAsDataURL(file);
    } else {
      setValue('');
    }
  };

  return (
    <Box display="flex" flexDirection="column" className="h-full w-full">
      <label
        htmlFor={id}
        aria-invalid={errorId ? true : undefined}
        {...labelProps}
        className={cn(
          'relative block h-full w-full cursor-pointer font-medium',
          className,
        )}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Preview"
              className={cn('h-full w-full object-cover', previewClasses)}
            />
            {loading && (
              <Box
                display="flex"
                items="center"
                gap={2}
                className="absolute bottom-4 right-1/2 translate-x-1/2 transform rounded border bg-neutral px-1 py-0.5 text-neutral-foreground"
              >
                {loadingIndicator && loadingIndicator}
                <Typography variant="body2" className="text-nowrap">
                  Please wait...
                </Typography>
              </Box>
            )}
          </>
        ) : (
          children
        )}
        <input
          aria-label="Image"
          className="absolute left-0 top-0 z-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleChange}
          id={id}
          accept="image/*"
          type="file"
          title=""
          disabled={disabled}
        />
        <input
          className="absolute left-0 top-0 z-0 opacity-0"
          {...props}
          value={input.value}
          type="text"
          onChange={(e) => input.change(e.target.value)}
        />
      </label>
      {errorId ? (
        <Box className="py-1">
          <ErrorList id={errorId} errors={errors} />
        </Box>
      ) : null}
    </Box>
  );
};
