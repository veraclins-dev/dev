import {
  Box,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Breadcrumbs() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Breadcrumbs" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Breadcrumb Navigation
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Hierarchical navigation components that help users understand their
        location within a website or application structure.
      </Typography>

      {/* Basic Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Examples</CardTitle>
          <CardDescription>
            Simple breadcrumb navigation patterns for common use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box
            display="grid"
            className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Basic Three-Level */}
            <Box>
              <Typography variant="h4" className="mb-3">
                Basic Three-Level Navigation
              </Typography>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Electronics</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </Box>

            {/* Deep Navigation */}
            <Box>
              <Typography variant="h4" className="mb-3">
                Deep Navigation (5 Levels)
              </Typography>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/users">Users</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/users/123">
                      User Details
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Edit Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </Box>

            {/* Custom Separator */}
            <Box>
              <Typography variant="h4" className="mb-3">
                Custom Separator
              </Typography>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Getting Started</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </Box>

            {/* With Ellipsis */}
            <Box>
              <Typography variant="h4" className="mb-3">
                With Ellipsis for Collapsed Navigation
              </Typography>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink color="primary" href="/">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/products/electronics/phones">
                      Phones
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>iPhone 15 Pro</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Real-Life Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Life Usage Examples</CardTitle>
          <CardDescription>
            Practical breadcrumb implementations for different application types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={8}>
            {/* E-commerce Example */}
            <Box>
              <Typography variant="h4" className="mb-4">
                E-commerce Product Navigation
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box display="flex" flexDirection="column" gap={4}>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/electronics">
                            Electronics
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/electronics/computers">
                            Computers
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/electronics/computers/laptops">
                            Laptops
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>MacBook Pro 16&quot;</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>

                    <Box className="bg-neutral/5 p-4 rounded">
                      <Typography variant="h5" className="mb-2">
                        MacBook Pro 16"
                      </Typography>
                      <Typography className="text-muted-foreground mb-4">
                        Latest generation with M3 Pro chip, 18GB unified memory,
                        and 512GB SSD
                      </Typography>
                      <Box display="flex" gap={2}>
                        <Button>
                          <Icon name="shopping-cart" className="mr-2" />
                          Add to Cart
                        </Button>
                        <Button variant="outline">
                          <Icon name="heart" className="mr-2" />
                          Wishlist
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* File System Example */}
            <Box>
              <Typography variant="h4" className="mb-4">
                File System Navigation
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box display="flex" flexDirection="column" gap={4}>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/files">
                            <Icon name="folder" className="mr-1" />
                            Files
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/files/documents">
                            <Icon name="document" className="mr-1" />
                            Documents
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/files/documents/work">
                            <Icon name="briefcase" className="mr-1" />
                            Work
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/files/documents/work/projects">
                            <Icon name="folder-open" className="mr-1" />
                            Projects
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>
                            <Icon name="document-text" className="mr-1" />
                            Project Report.pdf
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>

                    <Box className="bg-neutral/5 p-4 rounded">
                      <Typography variant="h5" className="mb-2">
                        Project Report.pdf
                      </Typography>
                      <Typography className="text-muted-foreground mb-4">
                        Last modified: 2 hours ago • Size: 2.4 MB
                      </Typography>
                      <Box display="flex" gap={2}>
                        <Button buttonSize="sm">
                          <Icon name="search" className="mr-1" />
                          Preview
                        </Button>
                        <Button buttonSize="sm" variant="outline">
                          <Icon name="download" className="mr-1" />
                          Download
                        </Button>
                        <Button buttonSize="sm" variant="outline">
                          <Icon name="share" className="mr-1" />
                          Share
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Dashboard Example */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Dashboard Analytics Navigation
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box display="flex" flexDirection="column" gap={4}>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/dashboard">
                            <Icon name="home" className="mr-1" />
                            Dashboard
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/dashboard/analytics">
                            <Icon name="chart-bar" className="mr-1" />
                            Analytics
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>
                            <Icon name="users" className="mr-1" />
                            User Engagement
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>

                    <Box className="bg-neutral/5 p-4 rounded">
                      <Typography variant="h5" className="mb-2">
                        User Engagement Metrics
                      </Typography>
                      <Typography className="text-muted-foreground mb-4">
                        Track user behavior, retention rates, and engagement
                        patterns
                      </Typography>
                      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Box className="bg-success/10 p-3 rounded">
                          <Typography variant="h6" className="text-success">
                            89.2%
                          </Typography>
                          <Typography>Retention Rate</Typography>
                        </Box>
                        <Box className="bg-info/10 p-3 rounded">
                          <Typography variant="h6" className="text-info">
                            12.4m
                          </Typography>
                          <Typography>Active Users</Typography>
                        </Box>
                        <Box className="bg-warning/10 p-3 rounded">
                          <Typography variant="h6" className="text-warning">
                            4.2min
                          </Typography>
                          <Typography>Avg. Session</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Responsive Behavior */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Behavior</CardTitle>
          <CardDescription>
            How breadcrumbs adapt to different screen sizes and content lengths
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Long Text Example */}
            <Box>
              <Typography variant="h4" className="mb-3">
                Long Text Handling
              </Typography>
              <Box className="w-full max-w-md">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/very-long-section-name">
                        Very Long Section Name That Might Wrap
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/very-long-section-name/another-long-subsection">
                        Another Long Subsection Name
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Current Page Title</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </Box>
            </Box>

            {/* Mobile Example */}
            <Box>
              <Typography variant="h4" className="mb-3">
                Mobile-First Design
              </Typography>
              <Box className="bg-neutral/10 rounded-lg p-4 max-w-sm">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Current</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Accessibility & Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Best Practices</CardTitle>
          <CardDescription>
            Guidelines for implementing accessible and user-friendly breadcrumb
            navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Box>
                <Typography variant="h5" className="mb-3">
                  Accessibility Features
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" items="center" gap={2}>
                    <Icon name="check-circle" className="text-success" />
                    <Typography>Proper ARIA labels and roles</Typography>
                  </Box>
                  <Box display="flex" items="center" gap={2}>
                    <Icon name="check-circle" className="text-success" />
                    <Typography>Keyboard navigation support</Typography>
                  </Box>
                  <Box display="flex" items="center" gap={2}>
                    <Icon name="check-circle" className="text-success" />
                    <Typography>Screen reader friendly</Typography>
                  </Box>
                  <Box display="flex" items="center" gap={2}>
                    <Icon name="check-circle" className="text-success" />
                    <Typography>Current page indication</Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography variant="h5" className="mb-3">
                  Best Practices
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" items="center" gap={2}>
                    <Icon name="light-bulb" className="text-warning" />
                    <Typography>Keep breadcrumbs concise</Typography>
                  </Box>
                  <Box display="flex" items="center" gap={2}>
                    <Icon name="light-bulb" className="text-warning" />
                    <Typography>Use clear, descriptive labels</Typography>
                  </Box>
                  <Box display="flex" items="center" gap={2}>
                    <Icon name="light-bulb" className="text-warning" />
                    <Typography>Include home link</Typography>
                  </Box>
                  <Box display="flex" items="center" gap={2}>
                    <Icon name="light-bulb" className="text-warning" />
                    <Typography>Handle long text gracefully</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography variant="h5" className="mb-3">
                Usage Guidelines
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box className="bg-info/10 p-4 rounded">
                  <Typography variant="h6" className="text-info mb-2">
                    When to Use
                  </Typography>
                  <Typography>
                    Use breadcrumbs for websites with deep hierarchical
                    structures, e-commerce sites, file managers, and
                    applications with complex navigation paths.
                  </Typography>
                </Box>
                <Box className="bg-warning/10 p-4 rounded">
                  <Typography variant="h6" className="text-warning mb-2">
                    When Not to Use
                  </Typography>
                  <Typography>
                    Avoid breadcrumbs for single-level sites, mobile apps with
                    bottom navigation, or when the navigation structure is flat
                    and simple.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
