import { cn } from '@veraclins-dev/utils';

import { INPUT_CLASSES } from './styles';

/**
 * Props for the Textarea component.
 * Extends the native textarea HTML attributes.
 */
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Textarea component for multi-line text input.
 * Provides a styled textarea with consistent styling across the application.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Textarea placeholder="Enter your message" />
 *
 * // With rows and max length
 * <Textarea
 *   rows={4}
 *   maxLength={500}
 *   placeholder="Enter your message (max 500 characters)"
 * />
 *
 * // With custom styling
 * <Textarea
 *   className="border-blue-500 focus:ring-blue-500"
 *   placeholder="Custom styled textarea"
 * />
 *
 * // Disabled state
 * <Textarea
 *   disabled
 *   placeholder="This textarea is disabled"
 * />
 * ```
 *
 * @param props - Props for the Textarea component
 * @returns A styled textarea element
 */
const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
    className={cn('resize-none', INPUT_CLASSES, className)}
    {...props}
  />
);

export { Textarea };
