import { type FieldMetadata, useInputControl } from '@conform-to/react';
import { getInputProps, useFieldProperties } from './textfield';
import { cn } from '@veraclins-dev/utils';
import { ErrorList } from './error-list';
import { Checkbox, CheckboxProps } from '../ui/checkbox';

interface Props extends CheckboxProps {
  field?: FieldMetadata<string | boolean | string[]>;
  label?: string | React.ReactNode;
  labelProps?: JSX.IntrinsicElements['label'];
  inputClassName?: string;
}

export function CheckboxField({
  field,
  labelProps,
  label,
  value,
  defaultChecked,
  key,
  className,
  ...others
}: Props) {
  const checkedValue = value ?? 'on';

  const props = {
    ...others,
    ...(field ? getInputProps({ field, type: 'checkbox' }) : {}),
  };
  const input = useInputControl({
    key,
    name: props.name ?? '',
    formId: props.form ?? '',
    initialValue: defaultChecked ? checkedValue : undefined,
  });
  const { errorId, id, errors } = useFieldProperties(field);

  return (
    <div className={cn('mb-2', className)}>
      <div className="flex items-center gap-2">
        <Checkbox
          {...props}
          id={id}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          checked={input.value === checkedValue}
          onCheckedChange={(state) => {
            input.change(state.valueOf() ? checkedValue : '');
            props.onCheckedChange?.(state);
          }}
          onFocus={(event) => {
            input.focus();
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            input.blur();
            props.onBlur?.(event);
          }}
          type="button"
          value={checkedValue}
        />
        <label htmlFor={id} {...labelProps} className="self-center text-sm ">
          {label}
        </label>
      </div>
      {errorId ? (
        <div className="py-1">
          <ErrorList id={errorId} errors={errors} />
        </div>
      ) : null}
    </div>
  );
}
