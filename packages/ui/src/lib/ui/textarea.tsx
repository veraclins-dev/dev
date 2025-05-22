import { cn } from '@veraclins-dev/utils';

import { inputClasses } from './styles';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea className={cn('resize-none', inputClasses, className)} {...props} />
);

export { Textarea };
