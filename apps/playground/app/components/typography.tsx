import { Image } from '@veraclins-dev/image';
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  Link,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function TypographyShowcase() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Typography" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Typography Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Text components for managing headings, body text, and various typography
        styles.
      </Typography>

      {/* Basic Typography Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Typography Variants</CardTitle>
          <CardDescription>
            Different typography styles and their use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Headings */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Headings
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h1">
                  Heading 1 - Main Page Title
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 36px (2.25rem) • Weight: 700 (Bold) • Line Height:
                    1.25 (Tight)
                  </Typography>
                </Typography>
                <Typography variant="h2">
                  Heading 2 - Section Title
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 30px (1.875rem) • Weight: 700 (Bold) • Line Height:
                    1.25 (Tight)
                  </Typography>
                </Typography>
                <Typography variant="h3">
                  Heading 3 - Subsection Title
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 24px (1.5rem) • Weight: 600 (Semibold) • Line Height:
                    1.375 (Snug)
                  </Typography>
                </Typography>
                <Typography variant="h4">
                  Heading 4 - Card Title
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 20px (1.25rem) • Weight: 600 (Semibold) • Line Height:
                    1.375 (Snug)
                  </Typography>
                </Typography>
                <Typography variant="h5">
                  Heading 5 - Small Title
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 18px (1.125rem) • Weight: 500 (Medium) • Line Height:
                    1.5 (Normal)
                  </Typography>
                </Typography>
                <Typography variant="h6">
                  Heading 6 - Tiny Title
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 16px (1rem) • Weight: 500 (Medium) • Line Height: 1.5
                    (Normal)
                  </Typography>
                </Typography>
              </Box>
            </Box>

            {/* Subtitles */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Subtitles
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="subtitle1">
                  Subtitle 1 - Section Subtitle
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 16px (1rem) • Weight: 500 (Medium) • Line Height: 1.5
                    (Normal)
                  </Typography>
                </Typography>
                <Typography variant="subtitle2">
                  Subtitle 2 - Small Subtitle
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 14px (0.875rem) • Weight: 500 (Medium) • Line Height:
                    1.5 (Normal)
                  </Typography>
                </Typography>
              </Box>
            </Box>

            {/* Body Text */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Body Text
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Typography variant="body1">
                  This is body1 text - the default body text size. It's used for
                  most content on the page, including paragraphs, descriptions,
                  and general text content. This variant provides good
                  readability and is suitable for most reading contexts.
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 16px (1rem) • Weight: 400 (Normal) • Line Height:
                    1.625 (Relaxed)
                  </Typography>
                </Typography>
                <Typography variant="body2">
                  This is body2 text - a smaller variant used for secondary
                  content, captions, and less prominent information. It's
                  perfect for metadata, timestamps, and supplementary details
                  that don't need the same visual weight as primary content.
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 14px (0.875rem) • Weight: 400 (Normal) • Line Height:
                    1.625 (Relaxed)
                  </Typography>
                </Typography>
                <Typography variant="caption">
                  This is caption text - the smallest text variant used for very
                  small details like copyright notices, fine print, and metadata
                  that should be present but not prominent.
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 12px (0.75rem) • Weight: 400 (Normal) • Line Height:
                    1.5 (Normal)
                  </Typography>
                </Typography>
                <Typography variant="overline">
                  This is overline text - used for labels, categories, and small
                  uppercase text that appears above content. It's perfect for
                  section labels, tags, and metadata that need to be visually
                  distinct but not prominent.
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    Font: 12px (0.75rem) • Weight: 400 (Normal) • Line Height:
                    1.5 (Normal) • Uppercase • Letter Spacing: 0.05em
                  </Typography>
                </Typography>
              </Box>
            </Box>

            {/* Inherit Variant */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Inherit Variant
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography
                  variant="inherit"
                  className="text-lg font-bold text-primary"
                >
                  Inherit variant - inherits styles from parent element
                  <Typography
                    variant="caption"
                    className="block text-muted-foreground mt-1"
                  >
                    This variant inherits all typography styles from its parent
                    element
                  </Typography>
                </Typography>
              </Box>
            </Box>

            {/* Text Alignment */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Text Alignment
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Left aligned (default):
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    className="border p-2"
                  >
                    This text is left aligned. This is the default alignment for
                    most text content. When text wraps to multiple lines, each
                    line starts at the left margin, creating a ragged right
                    edge. This alignment is commonly used for body text,
                    paragraphs, and general content where readability is the
                    primary concern.
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Center aligned:
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    className="border p-2"
                  >
                    This text is center aligned. Perfect for headings and
                    important messages. When text wraps to multiple lines, each
                    line is centered within the container, creating ragged edges
                    on both sides. This alignment is often used for titles,
                    headings, and content that needs to be visually balanced and
                    prominent.
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Right aligned:
                  </Typography>
                  <Typography
                    variant="body1"
                    align="right"
                    className="border p-2"
                  >
                    This text is right aligned. Often used for numbers and
                    dates. When text wraps to multiple lines, each line ends at
                    the right margin, creating a ragged left edge. This
                    alignment is commonly used for numerical data, timestamps,
                    and content that needs to be aligned with the right side of
                    a container.
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Justified:
                  </Typography>
                  <Typography
                    variant="body1"
                    align="justify"
                    className="border p-2"
                  >
                    This text is justified. It creates even margins on both
                    sides and is often used for longer paragraphs and articles.
                    When text wraps to multiple lines, the spacing between words
                    is adjusted so that each line (except the last line) extends
                    to both the left and right margins. This creates a clean,
                    block-like appearance that is commonly used in newspapers,
                    magazines, and formal documents.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Gutter Bottom */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Gutter Bottom
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body1" gutterBottom>
                  This text has gutter bottom enabled (adds margin-bottom)
                </Typography>
                <Typography variant="body1">
                  This text follows the one above with gutter bottom
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Another text with gutter bottom
                </Typography>
                <Typography variant="body1">
                  This text follows the one above with gutter bottom
                </Typography>
              </Box>
            </Box>

            {/* No Wrap */}
            <Box>
              <Typography variant="h4" className="mb-4">
                No Wrap (Truncate)
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography
                  variant="body1"
                  noWrap
                  className="border p-2 max-w-xs"
                >
                  This is a very long text that will be truncated with ellipsis
                  when it exceeds the container width
                </Typography>
                <Typography variant="body1" className="border p-2 max-w-xs">
                  This is a very long text that will wrap to multiple lines when
                  it exceeds the container width
                </Typography>
              </Box>
            </Box>

            {/* Text Colors */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Text Colors
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body1">Default text color</Typography>
                <Typography variant="body1" className="text-muted-foreground">
                  Muted foreground text
                </Typography>
                <Typography variant="body1" className="text-primary">
                  Primary colored text
                </Typography>
                <Typography variant="body1" className="text-secondary">
                  Secondary colored text
                </Typography>
                <Typography variant="body1" className="text-destructive">
                  Destructive colored text
                </Typography>
                <Typography variant="body1" className="text-success">
                  Success colored text
                </Typography>
                <Typography variant="body1" className="text-warning">
                  Warning colored text
                </Typography>
                <Typography variant="body1" className="text-info">
                  Info colored text
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Article Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Article Layout</CardTitle>
          <CardDescription>
            How typography works together in a real article or blog post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Typography variant="h1">
              The Future of Web Development: Embracing Modern Technologies
            </Typography>

            <Box display="flex" gap={3} className="items-center">
              <Typography variant="body2" className="text-muted-foreground">
                By John Doe
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                •
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                March 15, 2024
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                •
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                5 min read
              </Typography>
            </Box>

            <Typography variant="body1">
              Web development has evolved dramatically over the past decade,
              with new frameworks, tools, and methodologies emerging constantly.
              This article explores the current state of web development and
              what the future holds for developers and businesses alike.
            </Typography>

            <Typography variant="h2">The Rise of Modern Frameworks</Typography>

            <Typography variant="body1">
              React, Vue, and Angular have revolutionized how we build user
              interfaces. These frameworks provide powerful abstractions that
              make it easier to create complex, interactive applications while
              maintaining code quality and developer productivity.
            </Typography>

            <Typography variant="h3">Performance Optimization</Typography>

            <Typography variant="body1">
              Modern web applications must be fast and responsive. Techniques
              like code splitting, lazy loading, and server-side rendering have
              become essential for delivering optimal user experiences across
              all devices and network conditions.
            </Typography>

            <Box className="bg-muted p-4 rounded-lg">
              <Typography variant="body2" className="italic">
                "The best code is no code at all. The second best code is code
                that's easy to understand and maintain." - Unknown
              </Typography>
            </Box>

            <Typography variant="h2">Looking Ahead</Typography>

            <Typography variant="body1">
              As we look to the future, emerging technologies like WebAssembly,
              Progressive Web Apps, and AI-powered development tools will
              continue to shape the landscape of web development, offering new
              opportunities and challenges for developers.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Product Page */}
      <Card>
        <CardHeader>
          <CardTitle>Product Page Layout</CardTitle>
          <CardDescription>
            Typography hierarchy in an e-commerce product page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <Image
              src="https://picsum.photos/400/400?random=20"
              alt="Premium Wireless Headphones"
              width={400}
              height={400}
              className="w-full h-auto rounded-lg"
            />

            {/* Product Details */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Box>
                <Typography variant="h2" className="mb-2">
                  Premium Wireless Headphones
                </Typography>
                <Typography variant="h3" className="text-primary mb-2">
                  $299.99
                </Typography>
                <Box display="flex" gap={2} className="items-center">
                  <Box display="flex" gap={1}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="star"
                        className="size-4 text-yellow-500"
                      />
                    ))}
                  </Box>
                  <Typography variant="body2" className="text-muted-foreground">
                    (128 reviews)
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body1" className="mb-3">
                  Experience crystal-clear sound with our premium wireless
                  headphones. Featuring active noise cancellation, 30-hour
                  battery life, and premium comfort for extended listening
                  sessions.
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography
                    variant="body2"
                    className="flex items-center gap-2"
                  >
                    <Icon name="check" className="size-4 text-success" />
                    Active Noise Cancellation
                  </Typography>
                  <Typography
                    variant="body2"
                    className="flex items-center gap-2"
                  >
                    <Icon name="check" className="size-4 text-success" />
                    30-hour battery life
                  </Typography>
                  <Typography
                    variant="body2"
                    className="flex items-center gap-2"
                  >
                    <Icon name="check" className="size-4 text-success" />
                    Premium comfort design
                  </Typography>
                  <Typography
                    variant="body2"
                    className="flex items-center gap-2"
                  >
                    <Icon name="check" className="size-4 text-success" />
                    Wireless charging compatible
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  className="text-muted-foreground mb-2"
                >
                  Available Colors:
                </Typography>
                <Box display="flex" gap={2}>
                  <Badge variant="outline">Black</Badge>
                  <Badge variant="outline">White</Badge>
                  <Badge variant="outline">Blue</Badge>
                </Box>
              </Box>

              <Box display="flex" gap={3}>
                <Button color="primary" buttonSize="lg">
                  Add to Cart
                </Button>
                <Button variant="outline" buttonSize="lg">
                  <Icon name="heart" className="mr-2" />
                  Wishlist
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Dashboard Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Layout</CardTitle>
          <CardDescription>
            Typography in a dashboard interface with data and metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Dashboard Header */}
            <Box>
              <Typography variant="h2" className="mb-2">
                Analytics Dashboard
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                Last updated: 2 minutes ago
              </Typography>
            </Box>

            {/* Metrics Grid */}
            <Box className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <Typography
                  variant="body2"
                  className="text-muted-foreground mb-1"
                >
                  Total Users
                </Typography>
                <Typography variant="h3" className="text-primary">
                  12,847
                </Typography>
                <Typography variant="caption" className="text-success">
                  +12% from last month
                </Typography>
              </Card>

              <Card className="p-4">
                <Typography
                  variant="body2"
                  className="text-muted-foreground mb-1"
                >
                  Revenue
                </Typography>
                <Typography variant="h3" className="text-primary">
                  $45,231
                </Typography>
                <Typography variant="caption" className="text-success">
                  +8% from last month
                </Typography>
              </Card>

              <Card className="p-4">
                <Typography
                  variant="body2"
                  className="text-muted-foreground mb-1"
                >
                  Orders
                </Typography>
                <Typography variant="h3" className="text-primary">
                  1,234
                </Typography>
                <Typography variant="caption" className="text-destructive">
                  -3% from last month
                </Typography>
              </Card>

              <Card className="p-4">
                <Typography
                  variant="body2"
                  className="text-muted-foreground mb-1"
                >
                  Conversion Rate
                </Typography>
                <Typography variant="h3" className="text-primary">
                  3.2%
                </Typography>
                <Typography variant="caption" className="text-success">
                  +0.5% from last month
                </Typography>
              </Card>
            </Box>

            {/* Recent Activity */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Recent Activity
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box display="flex" gap={3} className="items-start">
                  <Box className="bg-primary rounded-full p-2">
                    <Icon name="user" className="size-4 text-white" />
                  </Box>
                  <Box flex="1">
                    <Typography variant="body2">
                      <strong>New user registered:</strong> john.doe@example.com
                    </Typography>
                    <Typography
                      variant="caption"
                      className="text-muted-foreground"
                    >
                      2 minutes ago
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" gap={3} className="items-start">
                  <Box className="bg-success rounded-full p-2">
                    <Icon name="check" className="size-4 text-white" />
                  </Box>
                  <Box flex="1">
                    <Typography variant="body2">
                      <strong>Order completed:</strong> #ORD-2024-001
                    </Typography>
                    <Typography
                      variant="caption"
                      className="text-muted-foreground"
                    >
                      5 minutes ago
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" gap={3} className="items-start">
                  <Box className="bg-warning rounded-full p-2">
                    <Icon
                      name="exclamation-triangle"
                      className="size-4 text-white"
                    />
                  </Box>
                  <Box flex="1">
                    <Typography variant="body2">
                      <strong>Payment failed:</strong> Transaction declined
                    </Typography>
                    <Typography
                      variant="caption"
                      className="text-muted-foreground"
                    >
                      10 minutes ago
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Form Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Form Layout</CardTitle>
          <CardDescription>
            Typography in forms and user input interfaces
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Typography variant="h3">Create New Account</Typography>

            <Typography variant="body2" className="text-muted-foreground">
              Fill out the form below to create your account. All fields marked
              with an asterisk (*) are required.
            </Typography>

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body2" className="font-medium">
                  First Name *
                </Typography>
                <Box className="h-10 bg-muted rounded border" />
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body2" className="font-medium">
                  Last Name *
                </Typography>
                <Box className="h-10 bg-muted rounded border" />
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body2" className="font-medium">
                  Email Address *
                </Typography>
                <Box className="h-10 bg-muted rounded border" />
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body2" className="font-medium">
                  Phone Number
                </Typography>
                <Box className="h-10 bg-muted rounded border" />
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="body2" className="font-medium">
                Password *
              </Typography>
              <Box className="h-10 bg-muted rounded border" />
              <Typography variant="caption" className="text-muted-foreground">
                Password must be at least 8 characters long and contain at least
                one uppercase letter, one lowercase letter, and one number.
              </Typography>
            </Box>

            <Box display="flex" gap={3}>
              <Button color="primary">Create Account</Button>
              <Button variant="outline">Cancel</Button>
            </Box>

            <Box className="border-t pt-4">
              <Typography variant="body2" className="text-muted-foreground">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-primary">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary">
                  Privacy Policy
                </Link>
                .
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            Typography in search results with subtitles and multi-line content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={4}>
            <Typography variant="h4" className="mb-4">
              Search Results for "React Components"
            </Typography>

            {/* Search Result Item 1 */}
            <Box className="border-b pb-4">
              <Typography variant="subtitle1" className="text-primary mb-1">
                React Component Best Practices
              </Typography>
              <Typography
                variant="body2"
                className="text-muted-foreground mb-2"
              >
                https://example.com/react-best-practices
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                Learn the essential best practices for creating React components
                that are maintainable, performant, and follow industry
                standards. This comprehensive guide covers component structure,
                prop validation, state management, and performance optimization
                techniques.
              </Typography>
            </Box>

            {/* Search Result Item 2 */}
            <Box className="border-b pb-4">
              <Typography variant="subtitle1" className="text-primary mb-1">
                Building Reusable UI Components
              </Typography>
              <Typography
                variant="body2"
                className="text-muted-foreground mb-2"
              >
                https://example.com/reusable-components
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                Discover how to build a robust component library that can be
                shared across multiple projects. This tutorial covers component
                design patterns, documentation strategies, and testing
                approaches to ensure your components are reliable and easy to
                use.
              </Typography>
            </Box>

            {/* Search Result Item 3 */}
            <Box className="border-b pb-4">
              <Typography variant="subtitle1" className="text-primary mb-1">
                React Component Lifecycle Methods
              </Typography>
              <Typography
                variant="body2"
                className="text-muted-foreground mb-2"
              >
                https://example.com/lifecycle-methods
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                Understand the complete lifecycle of React components from
                mounting to unmounting. This detailed guide explains when and
                how to use lifecycle methods, hooks, and modern React patterns
                for optimal component behavior and performance.
              </Typography>
            </Box>

            {/* Search Result Item 4 */}
            <Box className="border-b pb-4">
              <Typography variant="subtitle1" className="text-primary mb-1">
                TypeScript with React Components
              </Typography>
              <Typography
                variant="body2"
                className="text-muted-foreground mb-2"
              >
                https://example.com/typescript-react
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                Master TypeScript integration with React components for better
                type safety and developer experience. Learn how to properly type
                props, state, events, and complex component patterns while
                maintaining clean and readable code.
              </Typography>
            </Box>

            {/* Search Result Item 5 */}
            <Box>
              <Typography variant="subtitle1" className="text-primary mb-1">
                Testing React Components
              </Typography>
              <Typography
                variant="body2"
                className="text-muted-foreground mb-2"
              >
                https://example.com/testing-components
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                Comprehensive guide to testing React components using Jest,
                React Testing Library, and other modern testing tools. Learn
                unit testing, integration testing, and end-to-end testing
                strategies to ensure your components work correctly in all
                scenarios.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Code Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>Code Documentation</CardTitle>
          <CardDescription>
            Typography in technical documentation and code examples
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Typography variant="h3">Getting Started with React</Typography>

            <Typography variant="body1">
              React is a JavaScript library for building user interfaces. This
              guide will help you get started with React development.
            </Typography>

            <Typography variant="h4">Installation</Typography>

            <Typography variant="body2" className="mb-2">
              To create a new React project, run the following command:
            </Typography>

            <Box className="bg-muted p-4 rounded-lg">
              <Typography variant="body2" className="font-mono">
                npx create-react-app my-app
              </Typography>
            </Box>

            <Typography variant="h4">Basic Component</Typography>

            <Typography variant="body2" className="mb-2">
              Here's a simple React component:
            </Typography>

            <Box className="bg-muted p-4 rounded-lg">
              <Typography variant="body2" className="font-mono">
                {`function Welcome() {
  return <h1>Hello, World!</h1>;
}`}
              </Typography>
            </Box>

            <Typography variant="h4">Props</Typography>

            <Typography variant="body1">
              Props allow you to pass data from parent components to child
              components. They are read-only and help make your components
              reusable.
            </Typography>

            <Box className="bg-muted p-4 rounded-lg">
              <Typography variant="body2" className="font-mono">
                {`function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

<Greeting name="React" />`}
              </Typography>
            </Box>

            <Box className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <Typography variant="body2" className="text-blue-800">
                <strong>Note:</strong> This is a basic example. For production
                applications, consider using TypeScript for better type safety
                and developer experience.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
