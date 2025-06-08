import { cn } from '@veraclins-dev/utils';

import { Box } from './box';
import { Typography, type TypographyProps } from './typography';

/**
 * Card component suite for building card UI elements.
 *
 * @remarks
 * Provides a set of composable components to construct cards with headers, titles, subtitles, descriptions, actions, content, and footers.
 * Each component is styled and can be customized via className and other props.
 *
 * @packageDocumentation
 */

/**
 * Renders a card container with optional borderless style.
 *
 * @param props - Standard div props and an optional `borderless` boolean to remove the border.
 * @returns The card container element.
 */
function Card({
  className,
  borderless = true,
  ...props
}: React.ComponentProps<typeof Box> & { borderless?: boolean }) {
  return (
    <Box
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground gap-4 rounded-xl border py-4 shadow-sm',
        borderless && 'border-0',
        className,
      )}
      flexDirection="column"
      display="flex"
      {...props}
    />
  );
}
/**
 * Renders the header section of the card.
 *
 * @param props - Standard div props.
 * @returns The card header element.
 */
function CardHeader({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-4',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the card title using the Typography component.
 *
 * @param props - TypographyProps for customizing the title.
 * @returns The card title element.
 */
function CardTitle({ className, ...props }: TypographyProps) {
  return <Typography data-slot="card-title" variant="h3" {...props} />;
}
/**
 * Renders the card subtitle using the Typography component.
 *
 * @param props - TypographyProps for customizing the subtitle.
 * @returns The card subtitle element.
 */
function CardSubtitle({ className, ...props }: TypographyProps) {
  return (
    <Typography
      data-slot="card-subtitle"
      variant="subtitle1"
      className={cn('text-sm text-neutral-foreground', className)}
      {...props}
    />
  );
}
/**
 * Renders a description section within the card.
 *
 * @param props - Standard div props.
 * @returns The card description element.
 */
function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="card-description"
      className={cn('text-neutral-foreground text-sm', className)}
      {...props}
    />
  );
}
/**
 * Renders an action area in the card header, typically for buttons or menus.
 *
 * @param props - Standard div props.
 * @returns The card action element.
 */
function CardAction({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="card-action"
      className={cn('flex self-end justify-self-end gap-3', className)}
      {...props}
    />
  );
}
/**
 * Renders the main content area of the card.
 * This is where the primary information or media of the card is displayed.
 * @param props - Standard div props.
 * @returns The card content element.
 */

function CardContent({
  className,
  ...props
}: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="card-content"
      className={cn('px-4', className)}
      {...props}
    />
  );
}
/**
 * Renders the footer section of the card, typically for actions or summary.
 * the action is usually placed inside the footer.
 * @param props - Standard div props.
 * @returns The card footer element.
 */
function CardFooter({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="card-footer"
      className={cn(
        'flex w-full items-center px-4 [.border-t]:pt-4',
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
};
