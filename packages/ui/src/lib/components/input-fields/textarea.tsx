import { forwardRef, type PropsWithoutRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Textarea } from '../../ui/textarea';

import {
  type BaseInputProps,
  getInputProps,
  useFieldProperties,
} from './utils';
import { InputWrapper } from './wrapper';

export interface TextareaFieldProps
  extends PropsWithoutRef<JSX.IntrinsicElements['textarea']>,
    BaseInputProps {
  rightInlay?: React.ReactNode;
  inputRef?: React.Ref<HTMLTextAreaElement>;
}

export const TextareaField = forwardRef<HTMLDivElement, TextareaFieldProps>(
  (
    {
      label,
      labelProps,
      topText,
      className,
      rows = 4,
      rightInlay,
      borderless = true,
      inputRef,
      field,
      bgClass = 'bg-input',
      inputClass,
      name,
      ...props
    },
    ref,
  ) => {
    const { errorId, id } = useFieldProperties(field);
    const { key, ...inputProps } = getInputProps({ field, name });

    return (
      <InputWrapper
        borderless={borderless}
        className={className}
        field={field}
        label={label}
        labelProps={labelProps}
        topText={topText}
        wrapperRef={ref}
        bgClass={bgClass}
      >
        <Textarea
          {...props}
          key={key}
          {...inputProps}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          id={id}
          rows={rows}
          ref={inputRef}
          className={cn(
            'h-full w-full flex-1 self-center border-0 px-3.5 py-2 text-base leading-normal focus:outline-none focus:ring-0',
            bgClass,
            inputClass,
          )}
        />
        {rightInlay ? (
          <span className="absolute bottom-0.5 right-0.5">{rightInlay}</span>
        ) : null}
      </InputWrapper>
    );
  },
);

TextareaField.displayName = 'TextareaField';
