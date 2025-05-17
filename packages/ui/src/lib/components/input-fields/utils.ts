import {
  type FieldMetadata,
  getInputProps as conformGetInputProps,
  getSelectProps as conformGetSelectProps,
  useInputControl,
} from '@conform-to/react';
import { useId } from 'react';

import { slugify } from '@veraclins-dev/utils';

import { type IconName } from '../../icons';
import {
  type InputLabel,
  type MaybeString,
  type Option,
  type OptionWithId,
} from '../../types';

type InputFieldProps = ReturnType<typeof conformGetInputProps>;

type Params = Parameters<typeof conformGetInputProps>;

type BaseInputProps<S = MaybeString> = {
  leftIcon?: IconName;
  rightIcon?: IconName;
  rightAddon?: React.ReactNode;
  name?: string;
  label?: string | React.ReactNode;
  topText?: string | React.ReactNode;
  field?: FieldMetadata<S>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputClass?: string;
  wrapperClassName?: string;
};

type GetPropsOptions<S = MaybeString> = {
  field?: FieldMetadata<S>;
  name?: InputFieldProps['name'];
  id?: InputFieldProps['id'];
} & Partial<Omit<Params[1], 'ariaAttributes'>>;

const getInputProps = <S = MaybeString>({
  type = 'text',
  field,
  name,
  id,
}: GetPropsOptions<S>): InputFieldProps & {
  'aria-label'?: string;
} => {
  if (!field) {
    return {
      type,
      key: undefined,
      defaultValue: undefined,
      name: name ?? '',
      'aria-label': name,
      id: id ?? '',
      form: '',
    };
  }

  const props = conformGetInputProps(field, { ariaAttributes: true, type });
  if (!props.name) {
    props.name = field.name ?? name;
  }
  if (props.maxLength) {
    delete props.maxLength;
  }
  if (!props.id) {
    props.id = field.id ?? id;
  }
  return props;
};

function useFieldProperties<S = string>(field?: BaseInputProps<S>['field']) {
  const fallbackId = useId();
  const id = field?.id ?? field?.name ?? fallbackId;
  const hasErrors = !!field?.errors?.length;
  return {
    errorId: hasErrors ? `${id}-error` : undefined,
    errors: field?.errors,
    id,
  };
}

type SelectParams = Parameters<typeof conformGetSelectProps>;

const getSelectProps = (field: SelectParams[0]) => {
  const props = conformGetSelectProps(field);
  if (!props.name) {
    props.name = field.name;
  }

  return props;
};

type ControlParams = Parameters<typeof useInputControl>;

const useSelectControlProps = (field?: ControlParams[0], name?: string) => {
  const control = useInputControl(field ?? { formId: '', name: name ?? '' });
  if (!field) return { value: undefined };

  return {
    onValueChange: (value: string) => {
      control.change(value);
    },
    onOpenChange: (open: boolean) => {
      if (!open) {
        control.blur();
      }
    },
    value: control.value as string | undefined,
  };
};

type Value = ReturnType<typeof useInputControl>['value'];

const useInputControlProps = <S extends Value = string>(
  field?: ControlParams[0],
  name?: string,
) => {
  const control = useInputControl(field ?? { formId: '', name: name ?? '' });
  if (!field)
    return {
      value: undefined,
      onChange: () => {
        // empty function
      },
    };

  return {
    onChange: (value?: string) => {
      control.change(value);
    },
    onBlur: () => {
      control.blur();
    },
    control,
    value: control.value as S,
  };
};

const isStringOption = <T extends InputLabel = string>(
  option: Option<T>,
): option is string => typeof option === 'string';

const getOptionLabel = <T extends InputLabel = string>(option: Option<T>) =>
  isStringOption(option) ? option : (option.label as T);

const getOptionValue = <T extends InputLabel = string>(option: Option<T>) =>
  isStringOption(option) ? option : option.value;
const getOptionId = (option: OptionWithId) =>
  isStringOption(option)
    ? slugify(option)
    : option.id
      ? option.id
      : slugify(option.value);

const scrollIntoView = <T extends Element>(ref: React.RefObject<T | null>) => {
  setTimeout(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, 2);
};

export {
  type BaseInputProps,
  getInputProps,
  getOptionId,
  getOptionLabel,
  getOptionValue,
  getSelectProps,
  type InputFieldProps,
  isStringOption,
  scrollIntoView,
  useFieldProperties,
  useInputControlProps,
  useSelectControlProps,
};
