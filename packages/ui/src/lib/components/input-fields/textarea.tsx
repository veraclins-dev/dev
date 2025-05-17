import { forwardRef, type PropsWithoutRef } from 'react';

import { Textarea } from '../../ui/textarea';

import {
  type BaseInputProps,
  getInputProps,
  useFieldProperties,
} from './utils';
import { InputWrapper } from './wrapper';

export interface TextareaFieldProps
  extends PropsWithoutRef<React.JSX.IntrinsicElements['textarea']>,
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
      inputRef,
      field,
      inputClass,
      name,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const { errorId, id } = useFieldProperties(field);
    const { key, ...inputProps } = getInputProps({ field, name });

    return (
      <InputWrapper
        className={className}
        field={field}
        label={label}
        labelProps={labelProps}
        topText={topText}
        wrapperRef={ref}
        wrapperClassName={wrapperClassName}
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
          className={inputClass}
        />
        {rightInlay ? (
          <span className="absolute bottom-0.5 right-0.5">{rightInlay}</span>
        ) : null}
      </InputWrapper>
    );
  },
);

TextareaField.displayName = 'TextareaField';
