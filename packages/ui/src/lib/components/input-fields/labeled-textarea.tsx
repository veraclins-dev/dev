import { TextareaField, type TextareaFieldProps } from './textarea';

export interface LabeledTextareaProps extends TextareaFieldProps {
  label: string | React.ReactNode;
}

export const LabeledTextarea = (props: LabeledTextareaProps) => (
  <TextareaField {...props} />
);
