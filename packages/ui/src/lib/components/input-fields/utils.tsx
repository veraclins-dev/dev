import {
  type FieldMetadata,
  getInputProps as conformGetInputProps,
} from '@conform-to/react';
import { useId } from 'react';

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
