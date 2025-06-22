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
                </Typography>
                <Typography variant="h2">Heading 2 - Section Title</Typography>
                <Typography variant="h3">
                  Heading 3 - Subsection Title
                </Typography>
                <Typography variant="h4">Heading 4 - Card Title</Typography>
                <Typography variant="h5">Heading 5 - Small Title</Typography>
                <Typography variant="h6">Heading 6 - Tiny Title</Typography>
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
                </Typography>
                <Typography variant="body2">
                  This is body2 text - a smaller variant used for secondary
                  content, captions, and less prominent information. It's
                  perfect for metadata, timestamps, and supplementary details
                  that don't need the same visual weight as primary content.
                </Typography>
                <Typography variant="caption">
                  This is caption text - the smallest text variant used for very
                  small details like copyright notices, fine print, and metadata
                  that should be present but not prominent.
                </Typography>
                <Typography variant="overline">
                  This is overline text - used for labels, categories, and small
                  uppercase text that appears above content. It's perfect for
                  section labels, tags, and metadata that need to be visually
                  distinct but not prominent.
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
            {/* Product Image Placeholder */}
            <Box className="bg-muted rounded-lg p-8 flex items-center justify-center">
              <Typography variant="body2" className="text-muted-foreground">
                Product Image
              </Typography>
            </Box>

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
                <Button color="primary" size="lg">
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
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
