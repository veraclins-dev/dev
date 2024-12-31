import { forwardRef, useRef, useState } from 'react';
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
  editorProps?: Except<EditorProps, 'content' | 'onChange' | 'attributes'>;
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
      ...rest
    },
    ref,
  ) => {
    const [formValue, setFormValue] = useState<string>(value ?? '');
    const mainRef = useRef<HTMLTextAreaElement | null>(null);

    const { errorId } = useFieldProperties(field);

    const { key, ...formProps } = getInputProps({ field, name });
    delete formProps.defaultValue;

    const handleBlur = (content: string) => {
      setFormValue(content);
      mainRef.current?.focus();

      mainRef.current?.blur();
    };

    console.log('formProps', formProps, value, name);

    // useEffect(() => {
    //   if (value) setFormValue(value);
    // }, [value]);

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
          className="inline h-0 w-0 border-0 border-none p-0"
          readOnly
        />
        <Editor
          {...editorProps}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          content={formValue}
          onChange={handleBlur}
          placeholder={placeholder}
          attributes={{
            'data-testid': formProps.name ?? 'editor-field',
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
