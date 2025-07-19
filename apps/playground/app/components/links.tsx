import { Link as RouterLink } from 'react-router';

import {
  Badge,
  Box,
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

export function Links() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Links" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Link Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Navigation and interactive link components with various styles and
        behaviors.
      </Typography>

      {/* Basic Link Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Link Variants</CardTitle>
          <CardDescription>
            Different link styles and color variations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Solid Links */}
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Solid Links</Typography>
              <Link type="button" variant="solid">
                Default Color
              </Link>
              <Link type="button" variant="solid" color="primary">
                Primary
              </Link>
              <Link type="button" variant="solid" color="secondary">
                Secondary
              </Link>
              <Link type="button" variant="solid" color="destructive">
                Destructive
              </Link>
              <Link type="button" variant="solid" color="success">
                Success
              </Link>
              <Link type="button" variant="solid" color="warning">
                Warning
              </Link>
              <Link type="button" variant="solid" color="info">
                Info
              </Link>
            </Box>

            {/* Soft Links */}
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Soft Links</Typography>
              <Link type="button" variant="soft">
                Default Color
              </Link>
              <Link type="button" variant="soft" color="primary">
                Primary
              </Link>
              <Link type="button" variant="soft" color="secondary">
                Secondary
              </Link>
              <Link type="button" variant="soft" color="destructive">
                Destructive
              </Link>
              <Link type="button" variant="soft" color="success">
                Success
              </Link>
              <Link type="button" variant="soft" color="warning">
                Warning
              </Link>
              <Link type="button" variant="soft" color="info">
                Info
              </Link>
            </Box>

            {/* Outline Links */}
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Outline Links</Typography>
              <Link type="button" variant="outline">
                Default Color
              </Link>
              <Link type="button" variant="outline" color="primary">
                Primary
              </Link>
              <Link type="button" variant="outline" color="secondary">
                Secondary
              </Link>
              <Link type="button" variant="outline" color="destructive">
                Destructive
              </Link>
              <Link type="button" variant="outline" color="success">
                Success
              </Link>
              <Link type="button" variant="outline" color="warning">
                Warning
              </Link>
              <Link type="button" variant="outline" color="info">
                Info
              </Link>
            </Box>

            {/* Text Links */}
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Text Links</Typography>
              <Link type="button" variant="text">
                Default Color
              </Link>
              <Link
                type="button"
                underline="always"
                variant="text"
                color="primary"
              >
                Primary
              </Link>
              <Link type="button" variant="text" color="secondary">
                Secondary
              </Link>
              <Link type="button" variant="text" color="destructive">
                Destructive
              </Link>
              <Link type="button" variant="text" color="success">
                Success
              </Link>
              <Link type="button" variant="text" color="warning">
                Warning
              </Link>
              <Link type="button" variant="text" color="info">
                Info
              </Link>
            </Box>

            {/* Normal Links */}
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Normal Links</Typography>
              <Link href="/">Default Color</Link>
              <Link href="/primary" color="primary">
                Primary
              </Link>
              <Link underline="none" color="secondary">
                Secondary
              </Link>
              <Link color="destructive">Destructive</Link>
              <Link color="success">Success</Link>
              <Link underline="always" color="warning">
                Warning
              </Link>
              <Link color="info">Info</Link>
            </Box>

            {/* Router Links */}
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Router Links</Typography>
              <Link to="/" component={RouterLink}>
                Default Color
              </Link>
              <Link to="/primary" component={RouterLink} color="primary">
                Primary
              </Link>
              <Link to="/secondary" component={RouterLink} color="secondary">
                Secondary
              </Link>
              <Link
                to="/destructive"
                component={RouterLink}
                color="destructive"
              >
                Destructive
              </Link>
              <Link to="/success" component={RouterLink} color="success">
                Success
              </Link>
              <Link to="/warning" component={RouterLink} color="warning">
                Warning
              </Link>
              <Link to="/info" component={RouterLink} color="info">
                Info
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Navigation Menu */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Menu</CardTitle>
          <CardDescription>
            Common navigation patterns with links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Main Navigation */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Main Navigation
              </Typography>
              <Box
                display="flex"
                gap={4}
                flexWrap="wrap"
                className="border-b pb-4"
              >
                <Link
                  to="/"
                  component={RouterLink}
                  variant="text"
                  color="primary"
                >
                  Home
                </Link>
                <Link to="/products" component={RouterLink} variant="text">
                  Products
                </Link>
                <Link to="/services" component={RouterLink} variant="text">
                  Services
                </Link>
                <Link to="/about" component={RouterLink} variant="text">
                  About
                </Link>
                <Link to="/contact" component={RouterLink} variant="text">
                  Contact
                </Link>
                <Link to="/blog" component={RouterLink} variant="text">
                  Blog
                </Link>
              </Box>
            </Box>

            {/* User Menu */}
            <Box>
              <Typography variant="h4" className="mb-4">
                User Menu
              </Typography>
              <Box display="flex" gap={3} flexWrap="wrap">
                <Link to="/profile" component={RouterLink} variant="text">
                  <Icon name="user" className="mr-2" />
                  Profile
                </Link>
                <Link to="/settings" component={RouterLink} variant="text">
                  <Icon name="cog" className="mr-2" />
                  Settings
                </Link>
                <Link to="/notifications" component={RouterLink} variant="text">
                  <Icon name="bell" className="mr-2" />
                  Notifications
                </Link>
                <Link to="/help" component={RouterLink} variant="text">
                  <Icon name="question-mark-circled" className="mr-2" />
                  Help
                </Link>
                <Link
                  to="/logout"
                  component={RouterLink}
                  variant="text"
                  color="destructive"
                >
                  <Icon name="arrow-right-on-rectangle" className="mr-2" />
                  Logout
                </Link>
              </Box>
            </Box>

            {/* Breadcrumbs */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Breadcrumbs
              </Typography>
              <Box display="flex" gap={2} className="items-center flex-wrap">
                <Link to="/" component={RouterLink} variant="text" size="sm">
                  Home
                </Link>
                <Icon
                  name="chevron-right"
                  className="size-4 text-muted-foreground"
                />
                <Link
                  to="/products"
                  component={RouterLink}
                  variant="text"
                  size="sm"
                >
                  Products
                </Link>
                <Icon
                  name="chevron-right"
                  className="size-4 text-muted-foreground"
                />
                <Link
                  to="/electronics"
                  component={RouterLink}
                  variant="text"
                  size="sm"
                >
                  Electronics
                </Link>
                <Icon
                  name="chevron-right"
                  className="size-4 text-muted-foreground"
                />
                <Typography variant="body2" className="text-muted-foreground">
                  Smartphones
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>
            Social media and external link patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Social Media Icons */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Social Media Icons
              </Typography>
              <Box display="flex" gap={3} flexWrap="wrap">
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="soft"
                  color="primary"
                >
                  <Icon name="x-logo" className="size-5" />
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="soft"
                  color="primary"
                >
                  <Icon name="facebook-logo" className="size-5" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="soft"
                  color="primary"
                >
                  <Icon name="camera" className="size-5" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="soft"
                  color="primary"
                >
                  <Icon name="linkedin-logo" className="size-5" />
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="soft"
                  color="primary"
                >
                  <Icon name="code" className="size-5" />
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="soft"
                  color="destructive"
                >
                  <Icon name="play" className="size-5" />
                </Link>
              </Box>
            </Box>

            {/* Social Media with Labels */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Social Media with Labels
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                >
                  <Icon name="x-logo" className="mr-2" />
                  Follow us on Twitter
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                >
                  <Icon name="facebook-logo" className="mr-2" />
                  Like us on Facebook
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                >
                  <Icon name="camera" className="mr-2" />
                  Follow us on Instagram
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                >
                  <Icon name="linkedin-logo" className="mr-2" />
                  Connect on LinkedIn
                </Link>
              </Box>
            </Box>

            {/* External Links */}
            <Box>
              <Typography variant="h4" className="mb-4">
                External Links
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Link
                  href="https://docs.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                >
                  Documentation
                  <Icon
                    name="arrow-top-right-on-square"
                    className="ml-1 size-4"
                  />
                </Link>
                <Link
                  href="https://support.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                >
                  Support Center
                  <Icon
                    name="arrow-top-right-on-square"
                    className="ml-1 size-4"
                  />
                </Link>
                <Link
                  href="https://status.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                >
                  System Status
                  <Icon
                    name="arrow-top-right-on-square"
                    className="ml-1 size-4"
                  />
                </Link>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Action Links */}
      <Card>
        <CardHeader>
          <CardTitle>Action Links</CardTitle>
          <CardDescription>
            Interactive action links for common user tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Quick Actions */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Quick Actions
              </Typography>
              <Box display="flex" gap={3} flexWrap="wrap">
                <Link type="button" variant="solid" color="primary">
                  <Icon name="plus" className="mr-2" />
                  Create New
                </Link>
                <Link type="button" variant="outline">
                  <Icon name="arrow-down-tray" className="mr-2" />
                  Download
                </Link>
                <Link type="button" variant="soft" color="success">
                  <Icon name="check" className="mr-2" />
                  Approve
                </Link>
                <Link type="button" variant="soft" color="destructive">
                  <Icon name="trash" className="mr-2" />
                  Delete
                </Link>
                <Link type="button" variant="text">
                  <Icon name="eye-slash" className="mr-2" />
                  View Details
                </Link>
              </Box>
            </Box>

            {/* File Actions */}
            <Box>
              <Typography variant="h4" className="mb-4">
                File Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" className="items-center gap-3">
                  <Icon
                    name="document"
                    className="size-5 text-muted-foreground"
                  />
                  <Typography variant="body2" className="flex-1">
                    document.pdf
                  </Typography>
                  <Box display="flex" gap={2}>
                    <Link type="button" variant="text" size="sm">
                      <Icon name="eye-slash" className="mr-1" />
                      Preview
                    </Link>
                    <Link type="button" variant="text" size="sm">
                      <Icon name="arrow-down-tray" className="mr-1" />
                      Download
                    </Link>
                    <Link
                      type="button"
                      variant="text"
                      size="sm"
                      color="destructive"
                    >
                      <Icon name="trash" className="mr-1" />
                      Delete
                    </Link>
                  </Box>
                </Box>
                <Box display="flex" className="items-center gap-3">
                  <Icon name="photo" className="size-5 text-muted-foreground" />
                  <Typography variant="body2" className="flex-1">
                    image.jpg
                  </Typography>
                  <Box display="flex" gap={2}>
                    <Link type="button" variant="text" size="sm">
                      <Icon name="eye-slash" className="mr-1" />
                      View
                    </Link>
                    <Link type="button" variant="text" size="sm">
                      <Icon name="arrow-down-tray" className="mr-1" />
                      Download
                    </Link>
                    <Link type="button" variant="text" size="sm">
                      <Icon name="share" className="mr-1" />
                      Share
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Status Actions */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Status Actions
              </Typography>
              <Box display="flex" gap={3} flexWrap="wrap">
                <Link type="button" variant="soft" color="success">
                  <Icon name="check-circle" className="mr-2" />
                  Mark Complete
                </Link>
                <Link type="button" variant="soft" color="warning">
                  <Icon name="clock" className="mr-2" />
                  Mark Pending
                </Link>
                <Link type="button" variant="soft" color="destructive">
                  <Icon name="x-circle" className="mr-2" />
                  Mark Failed
                </Link>
                <Link type="button" variant="outline">
                  <Icon name="arrow-path" className="mr-2" />
                  Retry
                </Link>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Footer Links */}
      <Card>
        <CardHeader>
          <CardTitle>Footer Links</CardTitle>
          <CardDescription>
            Common footer link patterns and organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Company Links */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h5" className="mb-2">
                Company
              </Typography>
              <Link to="/about" component={RouterLink} variant="text" size="sm">
                About Us
              </Link>
              <Link
                to="/careers"
                component={RouterLink}
                variant="text"
                size="sm"
              >
                Careers
              </Link>
              <Link to="/press" component={RouterLink} variant="text" size="sm">
                Press
              </Link>
              <Link
                to="/contact"
                component={RouterLink}
                variant="text"
                size="sm"
              >
                Contact
              </Link>
            </Box>

            {/* Product Links */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h5" className="mb-2">
                Product
              </Typography>
              <Link
                to="/features"
                component={RouterLink}
                variant="text"
                size="sm"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                component={RouterLink}
                variant="text"
                size="sm"
              >
                Pricing
              </Link>
              <Link
                to="/integrations"
                component={RouterLink}
                variant="text"
                size="sm"
              >
                Integrations
              </Link>
              <Link
                to="/roadmap"
                component={RouterLink}
                variant="text"
                size="sm"
              >
                Roadmap
              </Link>
            </Box>

            {/* Support Links */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h5" className="mb-2">
                Support
              </Typography>
              <Link to="/help" component={RouterLink} variant="text" size="sm">
                Help Center
              </Link>
              <Link to="/docs" component={RouterLink} variant="text" size="sm">
                Documentation
              </Link>
              <Link
                to="/community"
                component={RouterLink}
                variant="text"
                size="sm"
              >
                Community
              </Link>
              <Link
                to="/status"
                component={RouterLink}
                variant="text"
                size="sm"
              >
                System Status
              </Link>
            </Box>

            {/* Legal Links */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h5" className="mb-2">
                Legal
              </Typography>
              <Link
                to="/privacy"
                component={RouterLink}
                variant="text"
                size="sm"
              >
                Privacy Policy
              </Link>
              <Link to="/terms" component={RouterLink} variant="text" size="sm">
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                component={RouterLink}
                variant="text"
                size="sm"
              >
                Cookie Policy
              </Link>
              <Link
                to="/security"
                component={RouterLink}
                variant="text"
                size="sm"
              >
                Security
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Interactive Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Examples</CardTitle>
          <CardDescription>
            Links with dynamic content and interactive elements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Notification Links */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Notification Links
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box
                  display="flex"
                  className="items-center gap-3 p-3 border rounded-lg"
                >
                  <Badge color="primary">3</Badge>
                  <Typography variant="body2" className="flex-1">
                    You have 3 new messages
                  </Typography>
                  <Link type="button" variant="text" size="sm" color="primary">
                    View All
                  </Link>
                </Box>
                <Box
                  display="flex"
                  className="items-center gap-3 p-3 border rounded-lg"
                >
                  <Badge color="warning">1</Badge>
                  <Typography variant="body2" className="flex-1">
                    Payment failed - action required
                  </Typography>
                  <Link
                    type="button"
                    variant="text"
                    size="sm"
                    color="destructive"
                  >
                    Fix Now
                  </Link>
                </Box>
              </Box>
            </Box>

            {/* Progress Links */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Progress Links
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box display="flex" className="items-center gap-3">
                  <Typography variant="body2" className="flex-1">
                    Profile completion
                  </Typography>
                  <Typography variant="body2" className="text-muted-foreground">
                    75%
                  </Typography>
                  <Link type="button" variant="text" size="sm" color="primary">
                    Complete Profile
                  </Link>
                </Box>
                <Box display="flex" className="items-center gap-3">
                  <Typography variant="body2" className="flex-1">
                    Email verification
                  </Typography>
                  <Typography variant="body2" className="text-muted-foreground">
                    Pending
                  </Typography>
                  <Link type="button" variant="text" size="sm" color="warning">
                    Resend Email
                  </Link>
                </Box>
              </Box>
            </Box>

            {/* Contextual Links */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Contextual Links
              </Typography>
              <Box display="flex" gap={3} flexWrap="wrap">
                <Link type="button" variant="soft" color="info">
                  <Icon name="information-circle" className="mr-2" />
                  Learn More
                </Link>
                <Link type="button" variant="soft" color="success">
                  <Icon name="check" className="mr-2" />
                  Accept
                </Link>
                <Link type="button" variant="soft" color="destructive">
                  <Icon name="x-mark" className="mr-2" />
                  Decline
                </Link>
                <Link type="button" variant="outline">
                  <Icon name="ellipsis-horizontal" className="mr-2" />
                  More Options
                </Link>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
