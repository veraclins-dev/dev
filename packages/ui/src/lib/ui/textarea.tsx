import { cn } from '@veraclins-dev/utils';

import { INPUT_CLASSES } from './styles';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
    className={cn('resize-none', INPUT_CLASSES, className)}
    {...props}
  />
);

export { Textarea };
