import {
  Box,
  Card as CardUI,
  CardContent,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardDescription,
  CardFooter,
  CardAction,
  CardImage,
  type CardProps as CardPropsUI,
  type CustomComponent,
  type ContainerElement,
} from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'

/**
 * Base card component props that extend the UI library's CardProps.
 * This type excludes the 'title' prop to allow for more flexible title handling.
 *
 * @template P - The container element type or custom component type
 * @extends CardPropsUI<P> - Extends the base UI card props
 */
type BaseCardProps<P extends ContainerElement | CustomComponent = typeof Box> =
  Omit<CardPropsUI<P>, 'title'>

/**
 * Comprehensive props for the composed Card component.
 * This component provides a flexible, composable card interface with support for
 * all card sections (header, content, footer, image) and their individual props.
 *
 * @template P - The container element type or custom component type
 * @extends BaseCardProps<P> - Extends the base card props
 */
export type CardProps<
  P extends ContainerElement | CustomComponent = typeof Box,
> = BaseCardProps<P> & {
  /** Props to pass to the CardContent component */
  contentProps?: React.ComponentProps<typeof CardContent>

  /** Props to pass to the CardHeader component */
  headerProps?: React.ComponentProps<typeof CardHeader>

  /** The main title content for the card header */
  title?: React.ReactNode
  /** Props to pass to the CardTitle component */
  titleProps?: React.ComponentProps<typeof CardTitle>

  /** The subtitle content for the card header */
  subtitle?: React.ReactNode
  /** Props to pass to the CardSubtitle component */
  subtitleProps?: React.ComponentProps<typeof CardSubtitle>

  /** The action content for the card header */
  headerAction?: React.ReactNode
  /** Props to pass to the CardAction component */
  headerActionProps?: React.ComponentProps<typeof CardAction>

  /** The description content for the card header */
  description?: React.ReactNode
  /** Props to pass to the CardDescription component */
  descriptionProps?: React.ComponentProps<typeof CardDescription>

  /** The footer content for the card */
  footer?: React.ReactNode
  /** Props to pass to the CardFooter component */
  footerProps?: React.ComponentProps<typeof CardFooter>

  /** The action content (typically buttons) for the card footer */
  action?: React.ReactNode
  /** Props to pass to the CardAction component */
  actionProps?: React.ComponentProps<typeof CardAction>

  /** The image content for the card */
  image?: React.ReactNode
  /** Props to pass to the CardImage component */
  imageProps?: React.ComponentProps<typeof CardImage>
}

/**
 * A comprehensive, composable Card component that provides a flexible interface
 * for creating cards with various content sections.
 *
 * This component automatically handles the layout and rendering of card sections
 * based on the provided props. It supports:
 * - Header section with title, subtitle, and description
 * - Main content area
 * - Footer section with optional action buttons
 * - Optional image section
 *
 * The component uses conditional rendering to only show sections when content
 * is provided, ensuring clean and semantic markup.
 *
 * @template P - The container element type or custom component type
 * @param props - The card component props
 * @param props.children - The main content to render inside the card
 * @param props.className - Additional CSS classes for styling
 * @param props.contentProps - Props to pass to the CardContent component
 * @param props.headerProps - Props to pass to the CardHeader component
 * @param props.title - The main title content for the card header
 * @param props.titleProps - Props to pass to the CardTitle component
 * @param props.subtitle - The subtitle content for the card header
 * @param props.subtitleProps - Props to pass to the CardSubtitle component
 * @param props.headerAction - The action content for the card header
 * @param props.headerActionProps - Props to pass to the CardAction component
 * @param props.description - The description content for the card header
 * @param props.descriptionProps - Props to pass to the CardDescription component
 * @param props.footer - The footer content for the card
 * @param props.footerProps - Props to pass to the CardFooter component
 * @param props.action - The action content (typically buttons) for the card footer
 * @param props.actionProps - Props to pass to the CardAction component
 * @param props.image - The image content for the card
 * @param props.imageProps - Props to pass to the CardImage component
 * @param props.cardProps - Additional props to pass to the underlying CardUI component
 *
 * @returns A fully composed card component with appropriate sections rendered
 *
 * @example
 * ```tsx
 * // Basic card with title and content
 * <Card title="Card Title">
 *   <Typography>This is the card content.</Typography>
 * </Card>
 *
 * // Card with all sections
 * <Card
 *   title="Product Card"
 *   subtitle="Premium Plan"
 *   description="Get access to all features"
 *   image={<img src="/product.jpg" alt="Product" />}
 *   footer="Price: $99"
 *   action={<Button>Buy Now</Button>}
 * >
 *   <Typography>Product description goes here.</Typography>
 * </Card>
 *
 * // Card with custom props
 * <Card
 *   title="Custom Card"
 *   titleProps={{ className: "text-blue-500" }}
 *   contentProps={{ className: "p-6" }}
 *   headerProps={{ className: "bg-gray-50" }}
 * >
 *   <Typography>Custom styled content.</Typography>
 * </Card>
 * ```
 */
export const Card = <
  P extends ContainerElement | CustomComponent = typeof Box,
>({
  children,
  className,
  contentProps,
  headerProps,
  title,
  titleProps,
  subtitle,
  subtitleProps,
  description,
  descriptionProps,
  footer,
  footerProps,
  action,
  actionProps,
  image,
  imageProps,
  headerAction,
  headerActionProps,
  ...cardProps
}: CardProps<P>) => {
  // Determine which sections should be rendered based on content
  const hasHeaderContent = title || subtitle || description || headerAction
  const hasFooter = footer || action
  const hasImage = image

  return (
    <CardUI className={className} {...cardProps}>
      {/* Render image section if provided */}
      {hasImage && <CardImage {...imageProps}>{image}</CardImage>}

      {/* Render header section if any header content is provided */}
      {hasHeaderContent && (
        <CardHeader
          {...headerProps}
          className={cn(
            'min-w-fit',
            headerAction ? 'flex justify-between' : '',
            headerProps?.className,
          )}
        >
          <Box>
            {title && <CardTitle {...titleProps}>{title}</CardTitle>}
            {subtitle && (
              <CardSubtitle {...subtitleProps}>{subtitle}</CardSubtitle>
            )}
            {description && (
              <CardDescription {...descriptionProps}>
                {description}
              </CardDescription>
            )}
          </Box>
          {headerAction && <Box {...headerActionProps}>{headerAction}</Box>}
        </CardHeader>
      )}

      {/* Main content area with flex layout and spacing */}
      <CardContent
        display="flex"
        flexDirection="column"
        gapY={3}
        {...contentProps}
        className={cn('w-full', contentProps?.className)}
      >
        {children}
      </CardContent>

      {/* Render footer section if footer content or action is provided */}
      {hasFooter && (
        <CardFooter {...footerProps}>
          {footer}
          {action && <CardAction {...actionProps}>{action}</CardAction>}
        </CardFooter>
      )}
    </CardUI>
  )
}
