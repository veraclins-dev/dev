import {
  type FieldMetadata,
  getInputProps as conformGetInputProps,
  getSelectProps as conformGetSelectProps,
  useInputControl,
} from '@conform-to/react';
import { useId } from 'react';
import { type Value } from 'react-phone-number-input/input';

import { type IconName } from '../../icons';
import { type MaybeString } from '../../types';

export type InputFieldProps = ReturnType<typeof conformGetInputProps>;

type Params = Parameters<typeof conformGetInputProps>;

export type BaseInputProps<S = MaybeString> = {
  leftIcon?: IconName;
  rightIcon?: IconName;
  rightAddon?: React.ReactNode;
  name?: string;
  label?: string | React.ReactNode;
  topText?: string | React.ReactNode;
  borderless?: boolean;
  field?: FieldMetadata<S>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  bgClass?: string;
  inputClass?: string;
};

type GetPropsOptions = {
  field?: Params[0];
  name?: InputFieldProps['name'];
  id?: InputFieldProps['id'];
} & Partial<Omit<Params[1], 'ariaAttributes'>>;

export const getInputProps = ({
  type = 'text',
  field,
  name,
  id,
}: GetPropsOptions) => {
  if (!field) {
    return {
      type,
      key: undefined,
      defaultValue: undefined,
      name,
      'aria-label': name,
      id,
    };
  }
  const props = conformGetInputProps(field, { ariaAttributes: true, type });
  if (!props.name) {
    props.name = field.name ?? name;
  }
  if (!props.id) {
    props.id = field.id ?? id;
  }
  return props;
};

export function useFieldProperties<S = string>(
  field?: BaseInputProps<S>['field'],
) {
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

export const getSelectProps = (field: SelectParams[0]) => {
  const props = conformGetSelectProps(field);
  if (!props.name) {
    props.name = field.name;
  }

  return props;
};

export type ControlParams = Parameters<typeof useInputControl>;

export const useSelectControlProps = (field: ControlParams[0]) => {
  const control = useInputControl(field);
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

export const useInputControlProps = (field: ControlParams[0]) => {
  const control = useInputControl(field);
  if (!field)
    return {
      value: undefined,
      onChange: () => {
        // empty function
      },
    };

  return {
    onChange: (value?: Value) => {
      control.change(value);
    },
    onBlur: () => {
      control.blur();
    },
    control,
    value: control.value as Value,
  };
};
