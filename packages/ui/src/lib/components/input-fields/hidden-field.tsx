import { type TextFieldProps } from './textfield';
import { getInputProps } from './utils';

export type HiddenFieldProps = Pick<TextFieldProps, 'field'>;

export const HiddenField = ({ field }: HiddenFieldProps) => {
  const { key, ...formProps } = getInputProps({ field, type: 'hidden' });

  return <input {...formProps} key={key} />;
};
