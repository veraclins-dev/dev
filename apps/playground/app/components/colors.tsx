import {
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Colors() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Colors" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Color Palette
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Comprehensive color system with semantic meanings, accessibility
        guidelines, and real-world usage examples.
      </Typography>

      {/* Basic Color Swatches */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Color Swatches</CardTitle>
          <CardDescription>
            Core color tokens used throughout the design system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Typography variant="h2" className="mb-4">
            Colors
          </Typography>
          <Box display="flex" flexDirection="row" gap={4} flexWrap="wrap">
            <Box className="bg-foreground p-2 rounded-md">
              <Box p={4} py={2} className="bg-background rounded-md">
                Main Background
              </Box>
            </Box>
            <Box className="bg-background border p-2 rounded-md">
              <Box className="bg-foreground text-background p-4 py-2 rounded-md">
                Main Foreground (text color)
              </Box>
            </Box>
            <Box p={4} className="bg-card text-card-foreground rounded-md">
              Card
            </Box>
            <Box className="bg-card p-2 rounded-md">
              <Box className="bg-card-inner text-card-inner-foreground p-4 py-2 rounded-md">
                Card Inner
              </Box>
            </Box>

            <Box
              display="flex"
              p={4}
              className="bg-popover text-popover-foreground rounded-md"
            >
              Popover
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-primary text-primary-foreground rounded-md"
            >
              Primary
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-primary-hover text-primary-foreground-hover rounded-md"
            >
              Primary Hover
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-secondary text-secondary-foreground rounded-md"
            >
              Secondary
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-secondary-hover text-secondary-foreground-hover rounded-md"
            >
              Secondary Hover
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-destructive text-destructive-foreground rounded-md"
            >
              Destructive
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-destructive-hover text-destructive-foreground-hover rounded-md"
            >
              Destructive Hover
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-success text-success-foreground rounded-md"
            >
              Success
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-success-hover text-success-foreground-hover rounded-md"
            >
              Success Hover
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-warning text-warning-foreground rounded-md"
            >
              Warning
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-warning-hover text-warning-foreground-hover rounded-md"
            >
              Warning Hover
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-info text-info-foreground rounded-md"
            >
              Info
            </Box>
            <Box
              display="flex"
              p={4}
              className="bg-info-hover text-info-foreground-hover rounded-md"
            >
              Info Hover
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Design System Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Design System Guidelines</CardTitle>
          <CardDescription>
            Semantic color mapping and usage guidelines for consistent design
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Semantic Colors */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Semantic Color Mapping
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <Box className="w-4 h-4 bg-primary rounded-full" />
                  <Box>
                    <Typography
                      variant="body1"
                      className="font-medium text-primary"
                    >
                      Primary
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      Main actions, links, and brand elements
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                  <Box className="w-4 h-4 bg-secondary rounded-full" />
                  <Box>
                    <Typography
                      variant="body1"
                      className="font-medium text-secondary"
                    >
                      Secondary
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      Supporting actions and subtle elements
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                  <Box className="w-4 h-4 bg-success rounded-full" />
                  <Box>
                    <Typography
                      variant="body1"
                      className="font-medium text-success"
                    >
                      Success
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      Positive states, confirmations, and achievements
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                  <Box className="w-4 h-4 bg-warning rounded-full" />
                  <Box>
                    <Typography
                      variant="body1"
                      className="font-medium text-warning"
                    >
                      Warning
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      Caution states and important notices
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg">
                  <Box className="w-4 h-4 bg-destructive rounded-full" />
                  <Box>
                    <Typography
                      variant="body1"
                      className="font-medium text-destructive"
                    >
                      Destructive
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      Errors, deletions, and dangerous actions
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Usage Guidelines */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Usage Guidelines
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography variant="h5" className="mb-2">
                    Text Colors
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box className="p-2 bg-background border rounded">
                      <Typography variant="body2" className="text-primary">
                        Primary text color
                      </Typography>
                    </Box>
                    <Box className="p-2 bg-background border rounded">
                      <Typography variant="body2" className="text-secondary">
                        Secondary text color
                      </Typography>
                    </Box>
                    <Box className="p-2 bg-background border rounded">
                      <Typography variant="body2" className="text-primary">
                        Link and accent text
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h5" className="mb-2">
                    Background Hierarchy
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box className="p-3 bg-background border rounded">
                      <Typography variant="body2">Main background</Typography>
                    </Box>
                    <Box className="p-3 bg-card border rounded">
                      <Typography variant="body2">Card background</Typography>
                    </Box>
                    <Box className="p-3 bg-card-inner border rounded">
                      <Typography variant="body2">
                        Nested card background
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Theme Switching Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Switching</CardTitle>
          <CardDescription>
            Examples of how colors adapt to different themes and contexts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Light Theme Example */}
            <Box className="p-6 bg-background dark:bg-foreground dark:text-background border rounded-lg">
              <Typography variant="h5" className="mb-4">
                Light Theme
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box className="p-3 bg-primary border rounded">
                  <Typography variant="body2" className="text-foreground">
                    Primary text
                  </Typography>
                </Box>
                <Box className="p-3 bg-primary/10 border rounded">
                  <Typography variant="body2" className="text-primary">
                    Primary accent
                  </Typography>
                </Box>
                <Box className="p-3 bg-secondary/10 border rounded">
                  <Typography variant="body2" className="text-muted-foreground">
                    Secondary text
                  </Typography>
                </Box>
                <Box className="flex gap-2">
                  <Button size="sm" variant="solid" color="primary">
                    Primary Action
                  </Button>
                  <Button size="sm" variant="outline">
                    Secondary Action
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Dark Theme Example */}
            <Box className="p-6 bg-foreground dark:bg-background dark:text-foreground border rounded-lg">
              <Typography variant="h5" className="mb-4">
                Dark Theme
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box className="p-3 bg-primary border rounded">
                  <Typography variant="body2" className="text-foreground">
                    Primary text
                  </Typography>
                </Box>
                <Box className="p-3 bg-primary/20 border rounded">
                  <Typography variant="body2" className="text-primary">
                    Primary accent
                  </Typography>
                </Box>
                <Box className="p-3 bg-secondary/20 border rounded">
                  <Typography variant="body2" className="text-muted-foreground">
                    Secondary text
                  </Typography>
                </Box>
                <Box className="flex gap-2">
                  <Button size="sm" variant="solid" color="primary">
                    Primary Action
                  </Button>
                  <Button size="sm" variant="outline">
                    Secondary Action
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Seasonal Themes */}
          <Box className="mt-6">
            <Typography variant="h5" className="mb-4">
              Semantic Color Variations
            </Typography>
            <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Box className="p-4 bg-destructive/10 border rounded-lg text-center">
                <Typography variant="h6" className="text-destructive mb-2">
                  Destructive
                </Typography>
                <Typography variant="body2" className="text-destructive">
                  Errors & warnings
                </Typography>
              </Box>
              <Box className="p-4 bg-success/10 border rounded-lg text-center">
                <Typography variant="h6" className="text-success mb-2">
                  Success
                </Typography>
                <Typography variant="body2" className="text-success">
                  Positive states
                </Typography>
              </Box>
              <Box className="p-4 bg-warning/10 border rounded-lg text-center">
                <Typography variant="h6" className="text-warning mb-2">
                  Warning
                </Typography>
                <Typography variant="body2" className="text-warning">
                  Caution states
                </Typography>
              </Box>
              <Box className="p-4 bg-info/10 border rounded-lg text-center">
                <Typography variant="h6" className="text-info mb-2">
                  Info
                </Typography>
                <Typography variant="body2" className="text-info">
                  Information states
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Accessibility Considerations */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Color Contrast</CardTitle>
          <CardDescription>
            WCAG compliance examples and colorblind-friendly considerations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contrast Examples */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Color Contrast Examples
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box className="p-3 bg-primary rounded-lg">
                  <Typography
                    variant="body2"
                    className="text-primary-foreground font-medium"
                  >
                    ✅ High Contrast - WCAG AA Compliant
                  </Typography>
                </Box>
                <Box className="p-3 bg-secondary rounded-lg">
                  <Typography
                    variant="body2"
                    className="text-secondary-foreground font-medium"
                  >
                    ✅ Medium Contrast - WCAG AA Large Text
                  </Typography>
                </Box>
                <Box className="p-3 bg-muted rounded-lg">
                  <Typography
                    variant="body2"
                    className="text-muted-foreground font-medium"
                  >
                    ⚠️ Low Contrast - Not Accessible
                  </Typography>
                </Box>
                <Box className="p-3 bg-warning rounded-lg">
                  <Typography
                    variant="body2"
                    className="text-warning-foreground font-medium"
                  >
                    ✅ High Contrast Warning - Good for Alerts
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Colorblind Considerations */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Colorblind-Friendly Design
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography variant="h5" className="mb-2">
                    Status Indicators
                  </Typography>
                  <Box display="flex" gap={3}>
                    <Box className="flex items-center gap-2">
                      <Box className="w-3 h-3 bg-success rounded-full" />
                      <Typography variant="body2">Success ✓</Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Box className="w-3 h-3 bg-destructive rounded-full" />
                      <Typography variant="body2">Error ✗</Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Box className="w-3 h-3 bg-warning rounded-full" />
                      <Typography variant="body2">Warning ⚠</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h5" className="mb-2">
                    Data Visualization
                  </Typography>
                  <Box className="grid grid-cols-2 gap-2">
                    <Box className="p-2 bg-primary/10 border rounded text-center">
                      <Typography variant="body2" className="text-primary">
                        Category A
                      </Typography>
                    </Box>
                    <Box className="p-2 bg-secondary/10 border rounded text-center">
                      <Typography
                        variant="body2"
                        className="text-secondary-foreground"
                      >
                        Category B
                      </Typography>
                    </Box>
                    <Box className="p-2 bg-success/10 border rounded text-center">
                      <Typography variant="body2" className="text-success">
                        Category C
                      </Typography>
                    </Box>
                    <Box className="p-2 bg-info/10 border rounded text-center">
                      <Typography variant="body2" className="text-info">
                        Category D
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* High Contrast Mode */}
          <Box className="mt-6">
            <Typography variant="h5" className="mb-4">
              High Contrast Mode
            </Typography>
            <Box className="p-4 bg-foreground border-2 border-background rounded-lg">
              <Typography variant="body1" className="text-background mb-3">
                High contrast mode provides maximum readability for users with
                visual impairments.
              </Typography>
              <Box className="flex gap-3">
                <Button
                  variant="solid"
                  color="primary"
                  className="bg-background text-foreground border-background"
                >
                  Primary Action
                </Button>
                <Button
                  variant="outline"
                  className="border-background text-background"
                >
                  Secondary Action
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Brand Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Guidelines</CardTitle>
          <CardDescription>
            Primary brand colors, secondary palette, and accent color usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Brand Colors */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Primary Brand Colors
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box className="p-4 bg-primary rounded-lg">
                  <Typography
                    variant="body1"
                    className="text-primary-foreground font-medium mb-1"
                  >
                    Primary
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-primary-foreground/80"
                  >
                    Main brand color for logos, CTAs, and key elements
                  </Typography>
                </Box>
                <Box className="p-4 bg-primary-hover rounded-lg">
                  <Typography
                    variant="body1"
                    className="text-primary-foreground-hover font-medium mb-1"
                  >
                    Primary Hover
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-primary-foreground-hover/80"
                  >
                    Hover states and secondary actions
                  </Typography>
                </Box>
                <Box className="p-4 bg-secondary rounded-lg">
                  <Typography
                    variant="body1"
                    className="text-secondary-foreground font-medium mb-1"
                  >
                    Secondary
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-secondary-foreground/80"
                  >
                    Supporting elements and subtle actions
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Semantic Palette */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Semantic Palette
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box className="p-4 bg-muted rounded-lg">
                  <Typography
                    variant="body1"
                    className="text-muted-foreground font-medium mb-1"
                  >
                    Neutral
                  </Typography>
                  <Typography variant="body2" className="text-muted-foreground">
                    Text, borders, and subtle elements
                  </Typography>
                </Box>
                <Box className="p-4 bg-success rounded-lg">
                  <Typography
                    variant="body1"
                    className="text-success-foreground font-medium mb-1"
                  >
                    Success
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-success-foreground/80"
                  >
                    Positive actions and confirmations
                  </Typography>
                </Box>
                <Box className="p-4 bg-destructive rounded-lg">
                  <Typography
                    variant="body1"
                    className="text-destructive-foreground font-medium mb-1"
                  >
                    Destructive
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-destructive-foreground/80"
                  >
                    Errors, warnings, and destructive actions
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Accent Colors */}
          <Box className="mt-6">
            <Typography variant="h5" className="mb-4">
              Accent Colors
            </Typography>
            <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Box className="p-3 bg-warning/10 border rounded-lg text-center">
                <Typography
                  variant="body2"
                  className="text-warning font-medium"
                >
                  Warning
                </Typography>
                <Typography variant="caption" className="text-warning">
                  Caution states
                </Typography>
              </Box>
              <Box className="p-3 bg-info/10 border rounded-lg text-center">
                <Typography variant="body2" className="text-info font-medium">
                  Info
                </Typography>
                <Typography variant="caption" className="text-info">
                  Information
                </Typography>
              </Box>
              <Box className="p-3 bg-success/10 border rounded-lg text-center">
                <Typography
                  variant="body2"
                  className="text-success font-medium"
                >
                  Success
                </Typography>
                <Typography variant="caption" className="text-success">
                  Positive states
                </Typography>
              </Box>
              <Box className="p-3 bg-destructive/10 border rounded-lg text-center">
                <Typography
                  variant="body2"
                  className="text-destructive font-medium"
                >
                  Destructive
                </Typography>
                <Typography variant="caption" className="text-destructive">
                  Errors & warnings
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
