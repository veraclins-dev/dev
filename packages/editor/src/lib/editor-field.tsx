import { type Except } from 'type-fest';

import {
  getInputProps,
  InputFieldWrapper,
  type TextareaFieldProps,
  useControlProps,
  useFieldProperties,
} from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { Editor, type EditorProps } from './editor';

type EditorFieldProps = Except<
  TextareaFieldProps,
  'value' | 'onChange' | 'onBlur' | 'defaultValue'
> & {
  value?: string;
  defaultValue?: string;
  shouldReset?: EditorProps['shouldReset'];
  editorProps?: Except<
    EditorProps,
    'content' | 'onChange' | 'attributes' | 'shouldReset'
  >;
};

const EditorField = ({
  label,
  labelProps,
  name,
  value,
  defaultValue,
  className = 'editor-field',
  placeholder = 'Type something here',
  field,
  topText,
  editorProps,
  shouldReset,
  wrapperClassName,
  ref,
  ...rest
}: EditorFieldProps) => {
  const { key, ...formProps } = getInputProps({ field, name });
  const val =
    value ??
    formProps.defaultValue ??
    field?.initialValue ??
    defaultValue ??
    '';

  const { errorId } = useFieldProperties(field);

  const {
    change,
    blur,
    value: controlValue,
    register,
  } = useControlProps({ defaultValue, value: val });

  delete formProps.defaultValue;

  const handleBlur = (content: string) => {
    change(content);
    blur();
  };

  return (
    <InputFieldWrapper
      className={cn('px-0 py-0', className)}
      wrapperClassName={wrapperClassName}
      field={field}
      label={label}
      labelProps={labelProps}
      topText={topText}
      ref={ref}
      inputProps={rest}
    >
      <textarea
        {...rest}
        {...formProps}
        ref={register}
        key={key}
        className="inline h-0 w-0 border-0 border-none p-0"
        readOnly
      />
      <Editor
        {...editorProps}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        content={String(controlValue)}
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
    </InputFieldWrapper>
  );
};

export { EditorField, type EditorFieldProps };
