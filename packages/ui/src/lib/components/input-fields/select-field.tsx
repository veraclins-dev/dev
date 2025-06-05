import { cn } from '@veraclins-dev/utils';

import {
  ComposedSelect,
  INPUT_CLASS_OVERRIDES,
  type SelectProps as BaseSelectProps,
} from '../../ui';

import {
  type BaseInputProps,
  getSelectProps,
  useFieldProperties,
  useSelectControlProps,
} from './utils';
import { InputWrapper } from './wrapper';

interface SelectFieldProps
  extends React.ComponentProps<'select'>,
    Omit<BaseInputProps, 'value'> {
  placeholder?: string;
  defaultValue?: BaseSelectProps['defaultValue'];
  dir?: BaseSelectProps['dir'];
}

type Props = BaseSelectProps & SelectFieldProps;

const SelectField = ({
  name,
  label,
  labelProps,
  topText,
  className,
  field,
  inputClass,
  defaultValue,
  value,
  dir,
  wrapperClassName,
  ref,
  ...props
}: Props) => {
  const { errorId } = useFieldProperties(field);

  const controlProps = useSelectControlProps(field, name);

  const { key, ...formProps } = field ? getSelectProps(field) : {};

  return (
    <InputWrapper
      className={className}
      field={field}
      wrapperClassName={wrapperClassName}
      label={label}
      labelProps={{
        ...labelProps,
        htmlFor: name,
      }}
      topText={topText}
      plain
    >
      <ComposedSelect
        {...props}
        {...formProps}
        {...controlProps}
        key={key}
        value={controlProps.value}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        className={cn('w-full', inputClass)}
        defaultValue={defaultValue}
        dir={dir}
        sideOffset={0}
      />
    </InputWrapper>
  );
};

export { SelectField };
