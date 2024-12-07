import { TextField, type TextFieldProps } from './textfield';

export interface LabeledTextFieldProps extends TextFieldProps {
  label: string | React.ReactNode;
}

export const LabeledTextField = (props: LabeledTextFieldProps) => (
  <TextField {...props} />
);
