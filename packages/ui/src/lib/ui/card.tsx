import { createContext, useContext } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type CustomComponent, type OverrideComponentProps } from '../types';

import { type CardVariants, cardVariants } from './utils/variants/card';
import { Box, type ContainerElement } from './box';
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

// Create a context to track Card nesting depth
const CardDepthContext = createContext({ depth: 0 });

type CardProps<P extends ContainerElement | CustomComponent = typeof Box> =
  OverrideComponentProps<P, React.ComponentProps<typeof Box> & CardVariants>;

/**
 * Renders a card container with optional borderless style.
 *
 * @param props - Standard Box props and an optional `borderless` boolean to remove the border.
 * @returns The card container element.
 */
function Card<P extends ContainerElement | CustomComponent = typeof Box>({
  className,
  borderless,
  component,
  cardSize,
  elevated,
  ...props
}: CardProps<P>) {
  // Get the current depth from context
  const { depth } = useContext(CardDepthContext);
  const useCardBg = depth % 2 === 0;
  const bgClass = useCardBg ? 'bg-card' : 'bg-card-inner';
  return (
    <CardDepthContext.Provider value={{ depth: depth + 1 }}>
      <Box
        component={component}
        data-slot="card"
        data-size={cardSize}
        className={cn(
          cardVariants({ borderless, className: bgClass, cardSize, elevated }),
          className,
        )}
        flexDirection="column"
        display="flex"
        {...props}
      />
    </CardDepthContext.Provider>
  );
}

const sizeClasses =
  'group-data-[size=sm]:p-2 group-data-[size=md]:p-4 group-data-[size=lg]:p-6 group-data-[size=xl]:p-8';
/**
 * Renders the header section of the card.
 *
 * @param props - Standard Box props.
 * @returns The card header element.
 */
function CardHeader({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="card-header"
      display="grid"
      p={4}
      pb={0}
      items="start"
      minW="fit"
      className={cn(
        '@container/card-header auto-rows-min grid-rows-[auto_auto] has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-4',
        sizeClasses,
        'group-data-[size=sm]:pb-0 group-data-[size=md]:pb-0 group-data-[size=lg]:pb-0 group-data-[size=xl]:pb-0',
        className,
      )}
      {...props}
    />
  );
}

function CardImage({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="card-image"
      className={cn('object-cover', className)}
      w="full"
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
  return <Typography data-slot="card-title" variant="h4" {...props} />;
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
      className="className"
      {...props}
    />
  );
}
/**
 * Renders a description section within the card.
 *
 * @param props - Standard Box props.
 * @returns The card description element.
 */
function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      data-slot="card-description"
      className={cn('text-neutral-foreground text-sm', className)}
      {...props}
    />
  );
}
/**
 * Renders an action area in the card header, typically for buttons or menus.
 *
 * @param props - Standard Box props.
 * @returns The card action element.
 */
function CardAction({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      display="flex"
      gap={3}
      data-slot="card-action"
      className={cn('self-end justify-self-end', className)}
      {...props}
    />
  );
}
/**
 * Renders the main content area of the card.
 * This is where the primary information or media of the card is displayed.
 * @param props - Standard Box props.
 * @returns The card content element.
 */

function CardContent({
  className,
  ...props
}: React.ComponentProps<typeof Box>) {
  return (
    <Box
      p={4}
      flex="1"
      data-slot="card-content"
      className={cn(sizeClasses, className)}
      {...props}
    />
  );
}
/**
 * Renders the footer section of the card, typically for actions or summary.
 * the action is usually placed inside the footer.
 * @param props - Standard Box props.
 * @returns The card footer element.
 */
function CardFooter({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="card-footer"
      p={4}
      pt={0}
      display="flex"
      items="center"
      w="full"
      justify="between"
      className={cn(
        sizeClasses,
        '[.border-t]:pt-4',
        'group-data-[size=sm]:pt-0 group-data-[size=md]:pt-0 group-data-[size=lg]:pt-0 group-data-[size=xl]:pt-0',
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
  CardImage,
  CardProps,
  CardSubtitle,
  CardTitle,
};
