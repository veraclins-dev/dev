import { forwardRef, useEffect, useRef, useState } from 'react';
import { type Except } from 'type-fest';

import {
  getInputProps,
  InputWrapper,
  type TextareaFieldProps,
  useFieldProperties,
} from '@veraclins-dev/ui';

import { Editor, type EditorProps } from './editor';

type EditorFieldProps = Except<
  TextareaFieldProps,
  'value' | 'onChange' | 'onBlur'
> & {
  value?: string;
  shouldReset?: EditorProps['shouldReset'];
  editorProps?: Except<
    EditorProps,
    'content' | 'onChange' | 'attributes' | 'shouldReset'
  >;
};

const EditorField = forwardRef<HTMLDivElement, EditorFieldProps>(
  (
    {
      label,
      labelProps,
      name,
      value,
      defaultValue,
      className = 'editor-field',
      placeholder = 'Type something here',
      bgClass,
      borderless,
      field,
      topText,
      editorProps,
      shouldReset,
      ...rest
    },
    ref,
  ) => {
    const { key, ...formProps } = getInputProps({ field, name });
    const val =
      value ??
      formProps.defaultValue ??
      field?.initialValue ??
      defaultValue ??
      '';

    const [formValue, setFormValue] = useState(val);
    const mainRef = useRef<HTMLTextAreaElement | null>(null);

    const { errorId } = useFieldProperties(field);

    delete formProps.defaultValue;

    const handleBlur = (content: string) => {
      setFormValue(content);
      mainRef.current?.focus();

      mainRef.current?.blur();
    };

    const reset = () => {
      setFormValue('');
    };

    useEffect(() => {
      if (val !== formValue) {
        setFormValue(val);
      }
    }, [val]);

    if (shouldReset) {
      setFormValue('');
    }

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
        <textarea
          {...rest}
          {...formProps}
          ref={mainRef}
          value={formValue}
          key={key}
          className="inline h-0 w-0 border-0 border-none p-0"
          readOnly
        />
        <Editor
          {...editorProps}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          content={String(formValue)}
          onChange={handleBlur}
          placeholder={placeholder}
          key={`${key}-editor`}
          shouldReset={shouldReset}
          attributes={{
            'data-testid': formProps.id ?? 'editor-field',
            ...(errorId
              ? { 'aria-invalid': 'true', 'aria-describedby': errorId }
              : {}),
          }}
        />
      </InputWrapper>
    );
  },
);

export { EditorField, type EditorFieldProps };
