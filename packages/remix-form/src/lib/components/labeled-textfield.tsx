import {
  type TextareaFieldProps,
  type TextFieldProps,
  TextareaField,
  TextField,
} from './text-field';

export interface LabeledTextFieldProps extends TextFieldProps {
  label: string | React.ReactNode;
}
export interface LabeledTextareaProps extends TextareaFieldProps {
  label: string | React.ReactNode;
}

export const LabeledTextField = (props: LabeledTextFieldProps) => (
  <TextField {...props} />
);

export const LabeledTextarea = (props: LabeledTextareaProps) => (
  <TextareaField {...props} />
);
