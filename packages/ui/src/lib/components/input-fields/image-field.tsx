import { useEffect, useState } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon } from '../../ui/icon';
import { ErrorList } from '../error-list';

import { type TextFieldProps } from './textfield';
import { getInputProps, useFieldProperties } from './utils';

export interface ImageFieldProps extends Omit<TextFieldProps, 'value'> {
  defaultValue?: string;
  previewClasses?: string;
  loading?: boolean;
  value?: string | null;
}

export const ImageField = ({
  labelProps,
  className,
  previewClasses,
  field,
  onChange,
  loading,
  value: supplied,
  ...props
}: ImageFieldProps) => {
  const val = supplied ?? field?.initialValue ?? '';
  delete props.defaultValue;
  delete field?.initialValue;
  const { errorId, id, errors } = useFieldProperties(field);

  const [value, setValue] = useState(val);

  useEffect(() => {
    if (val && val !== value) {
      setValue(val);
    }
  }, [val]);

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        aria-invalid={errorId ? true : undefined}
        {...labelProps}
        className={cn('relative block cursor-pointer font-medium', className)}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Preview"
              className={cn('h-full w-full object-cover', previewClasses)}
            />
            <span className="absolute bottom-4 right-1/2 translate-x-1/2 transform rounded border bg-muted px-1 py-0.5 text-muted-foreground">
              {loading ? (
                <Icon name="rings">please wait...</Icon>
              ) : (
                <Icon name="pencil-1">change</Icon>
              )}
            </span>
          </>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-muted-foreground text-4xl text-muted-foreground">
            <Icon name="camera" />
          </div>
        )}
        <input
          aria-label="Image"
          className="absolute left-0 top-0 z-0 h-full w-full cursor-pointer opacity-0"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              onChange?.(event);
              const reader = new FileReader();
              reader.onloadend = () => {
                setValue(reader.result as string);
              };
              reader.readAsDataURL(file);
            } else {
              setValue('');
            }
          }}
          accept="image/*"
          type="file"
        />
        <input
          aria-label="Image"
          className="absolute left-0 top-0 z-0 h-full w-full cursor-pointer opacity-0"
          {...props}
          {...(field ? getInputProps(field) : {})}
          value={value}
          type="hidden"
        />
      </label>
      {errorId ? (
        <div className="py-1">
          <ErrorList id={errorId} errors={errors} />
        </div>
      ) : null}
    </div>
  );
};
