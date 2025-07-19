import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Chip,
  Icon,
  List,
  ListItem,
  Separator,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Lists() {
  return (
    <Box className="w-full max-w-6xl mx-auto space-y-8">
      <PlaygroundBreadcrumb currentPage="List" className="mb-4" />

      <Box className="text-center space-y-4">
        <Typography variant="h1">List Components</Typography>
        <Typography variant="body1" className="text-neutral-foreground/70">
          Ordered and unordered list components for displaying structured
          content with proper semantic markup.
        </Typography>
      </Box>

      {/* Basic Lists */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Lists</CardTitle>
          <CardDescription>
            Simple ordered and unordered lists with proper semantic markup.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unordered List */}
            <Box className="space-y-2">
              <Typography variant="h4">Unordered List</Typography>
              <List>
                <ListItem>First item in the list</ListItem>
                <ListItem>
                  Second item with some longer text to demonstrate wrapping
                </ListItem>
                <ListItem>Third item</ListItem>
                <ListItem>Fourth and final item</ListItem>
              </List>
            </Box>

            {/* Ordered List */}
            <Box className="space-y-2">
              <Typography variant="h4">Ordered List</Typography>
              <List variant="ol">
                <ListItem>Step one: Initialize the project</ListItem>
                <ListItem>Step two: Install dependencies</ListItem>
                <ListItem>Step three: Configure the build system</ListItem>
                <ListItem>Step four: Start development</ListItem>
              </List>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* List Markers */}
      <Card>
        <CardHeader>
          <CardTitle>List Markers</CardTitle>
          <CardDescription>
            Different marker styles for lists using the marker prop.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unordered Markers */}
            <Box className="space-y-4">
              <Typography variant="h4">Unordered Markers</Typography>
              <Box className="space-y-4">
                <Box>
                  <Typography variant="body2" className="font-medium mb-2">
                    Default (disc)
                  </Typography>
                  <List marker="disc">
                    <ListItem>Default bullet point</ListItem>
                    <ListItem>Another item</ListItem>
                    <ListItem>Third item</ListItem>
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium mb-2">
                    Circle
                  </Typography>
                  <List marker="circle">
                    <ListItem>Circle bullet point</ListItem>
                    <ListItem>Another item</ListItem>
                    <ListItem>Third item</ListItem>
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium mb-2">
                    Square
                  </Typography>
                  <List marker="square">
                    <ListItem>Square bullet point</ListItem>
                    <ListItem>Another item</ListItem>
                    <ListItem>Third item</ListItem>
                  </List>
                </Box>
              </Box>
            </Box>

            {/* Ordered Markers */}
            <Box className="space-y-4">
              <Typography variant="h4">Ordered Markers</Typography>
              <Box className="space-y-4">
                <Box>
                  <Typography variant="body2" className="font-medium mb-2">
                    Decimal (1, 2, 3)
                  </Typography>
                  <List variant="ol" marker="decimal">
                    <ListItem>First step</ListItem>
                    <ListItem>Second step</ListItem>
                    <ListItem>Third step</ListItem>
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium mb-2">
                    Lower Alpha (a, b, c)
                  </Typography>
                  <List variant="ol" marker="alpha">
                    <ListItem>Option A</ListItem>
                    <ListItem>Option B</ListItem>
                    <ListItem>Option C</ListItem>
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium mb-2">
                    Lower Roman (i, ii, iii)
                  </Typography>
                  <List variant="ol" marker="roman">
                    <ListItem>Chapter I</ListItem>
                    <ListItem>Chapter II</ListItem>
                    <ListItem>Chapter III</ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Lists with Icons and Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Lists with Icons and Badges</CardTitle>
          <CardDescription>
            Enhanced lists with icons, badges, and visual indicators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* List with Icons */}
            <Box className="space-y-2">
              <Typography variant="h4">List with Icons</Typography>
              <List className="space-y-2">
                <ListItem className="flex items-center gap-3">
                  <Icon name="check-circle" className="text-green-500" />
                  <span>Task completed successfully</span>
                </ListItem>
                <ListItem className="flex items-center gap-3">
                  <Icon name="clock" className="text-yellow-500" />
                  <span>Task in progress</span>
                </ListItem>
                <ListItem className="flex items-center gap-3">
                  <Icon name="exclamation-triangle" className="text-red-500" />
                  <span>Task requires attention</span>
                </ListItem>
                <ListItem className="flex items-center gap-3">
                  <Icon name="information-circle" className="text-blue-500" />
                  <span>Task information available</span>
                </ListItem>
              </List>
            </Box>

            {/* List with Badges */}
            <Box className="space-y-2">
              <Typography variant="h4">List with Badges</Typography>
              <List className="space-y-1">
                <ListItem className="flex items-center justify-between">
                  <span>Feature A</span>
                  <Badge>Active</Badge>
                </ListItem>
                <ListItem className="flex items-center justify-between">
                  <span>Feature B</span>
                  <Badge color="secondary">Beta</Badge>
                </ListItem>
                <ListItem className="flex items-center justify-between">
                  <span>Feature C</span>
                  <Badge color="destructive">Deprecated</Badge>
                </ListItem>
                <ListItem className="flex items-center justify-between">
                  <span>Feature D</span>
                  <Badge variant="outline" color="neutral">
                    Coming Soon
                  </Badge>
                </ListItem>
              </List>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Interactive Lists */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Lists</CardTitle>
          <CardDescription>
            Lists with interactive elements like buttons and clickable items.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clickable List Items */}
            <Box className="space-y-2">
              <Typography variant="h4">Clickable List Items</Typography>
              <List>
                <ListItem className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2 transition-colors">
                  <Box className="flex items-center justify-between w-full">
                    <span>View Profile</span>
                    <Icon name="chevron-right" className="text-neutral-400" />
                  </Box>
                </ListItem>
                <ListItem className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2 transition-colors">
                  <Box className="flex items-center justify-between w-full">
                    <span>Edit Settings</span>
                    <Icon name="chevron-right" className="text-neutral-400" />
                  </Box>
                </ListItem>
                <ListItem className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2 transition-colors">
                  <Box className="flex items-center justify-between w-full">
                    <span>Download Data</span>
                    <Icon name="chevron-right" className="text-neutral-400" />
                  </Box>
                </ListItem>
                <ListItem className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2 transition-colors">
                  <Box className="flex items-center justify-between w-full">
                    <span>Delete Account</span>
                    <Icon name="chevron-right" className="text-neutral-400" />
                  </Box>
                </ListItem>
              </List>
            </Box>

            {/* List with Action Buttons */}
            <Box className="space-y-2">
              <Typography variant="h4">List with Action Buttons</Typography>
              <List className="space-y-1">
                <ListItem className="flex items-center justify-between">
                  <Box className="flex items-center gap-3">
                    <Icon name="user" className="text-neutral-500" />
                    <span>John Doe</span>
                  </Box>
                  <Box className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="soft" color="destructive">
                      Delete
                    </Button>
                  </Box>
                </ListItem>
                <ListItem className="flex items-center justify-between">
                  <Box className="flex items-center gap-3">
                    <Icon name="user" className="text-neutral-500" />
                    <span>Jane Smith</span>
                  </Box>
                  <Box className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="soft" color="destructive">
                      Delete
                    </Button>
                  </Box>
                </ListItem>
                <ListItem className="flex items-center justify-between">
                  <Box className="flex items-center gap-3">
                    <Icon name="user" className="text-neutral-500" />
                    <span>Bob Johnson</span>
                  </Box>
                  <Box className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="soft" color="destructive">
                      Delete
                    </Button>
                  </Box>
                </ListItem>
              </List>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Nested Lists */}
      <Card>
        <CardHeader>
          <CardTitle>Nested Lists</CardTitle>
          <CardDescription>
            Hierarchical lists with nested items and proper indentation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Typography variant="h4">Project Structure</Typography>
            <List>
              <ListItem>
                src/
                <List className="ml-6 mt-2">
                  <ListItem>
                    components/
                    <List className="ml-6 mt-2">
                      <ListItem>Button.tsx</ListItem>
                      <ListItem>Card.tsx</ListItem>
                      <ListItem>Input.tsx</ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    pages/
                    <List className="ml-6 mt-2">
                      <ListItem>Home.tsx</ListItem>
                      <ListItem>About.tsx</ListItem>
                      <ListItem>Contact.tsx</ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    utils/
                    <List className="ml-6 mt-2">
                      <ListItem>helpers.ts</ListItem>
                      <ListItem>constants.ts</ListItem>
                    </List>
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                public/
                <List className="ml-6 mt-2">
                  <ListItem>images/</ListItem>
                  <ListItem>icons/</ListItem>
                </List>
              </ListItem>
              <ListItem>
                docs/
                <List className="ml-6 mt-2">
                  <ListItem>README.md</ListItem>
                  <ListItem>API.md</ListItem>
                </List>
              </ListItem>
            </List>
          </Box>
        </CardContent>
      </Card>

      {/* Real-Life Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Life Examples</CardTitle>
          <CardDescription>
            Practical examples of how lists are used in real applications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Navigation Menu */}
          <Box className="space-y-4">
            <Typography variant="h4">Navigation Menu</Typography>
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle className="text-lg">Main Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <List>
                  <ListItem className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                    <Icon name="home" className="text-neutral-500" />
                    <span>Dashboard</span>
                  </ListItem>
                  <ListItem className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                    <Icon name="users" className="text-neutral-500" />
                    <span>Users</span>
                    <Badge color="secondary" className="ml-auto">
                      12
                    </Badge>
                  </ListItem>
                  <ListItem className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                    <Icon name="chart-bar" className="text-neutral-500" />
                    <span>Analytics</span>
                  </ListItem>
                  <ListItem className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                    <Icon name="cog" className="text-neutral-500" />
                    <span>Settings</span>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>

          <Separator />

          {/* Feature List */}
          <Box className="space-y-4">
            <Typography variant="h4">Feature List</Typography>
            <Card>
              <CardContent className="pt-6">
                <List>
                  <ListItem className="flex items-start gap-3">
                    <Icon name="check-circle" className="text-green-500 mt-1" />
                    <Box>
                      <Typography variant="body1" className="font-medium">
                        Responsive Design
                      </Typography>
                      <Typography variant="body2" className="text-neutral-600">
                        Automatically adapts to different screen sizes and
                        devices.
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem className="flex items-start gap-3">
                    <Icon name="check-circle" className="text-green-500 mt-1" />
                    <Box>
                      <Typography variant="body1" className="font-medium">
                        Accessibility
                      </Typography>
                      <Typography variant="body2" className="text-neutral-600">
                        Built with ARIA attributes and keyboard navigation
                        support.
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem className="flex items-start gap-3">
                    <Icon name="check-circle" className="text-green-500 mt-1" />
                    <Box>
                      <Typography variant="body1" className="font-medium">
                        TypeScript Support
                      </Typography>
                      <Typography variant="body2" className="text-neutral-600">
                        Full TypeScript support with comprehensive type
                        definitions.
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem className="flex items-start gap-3">
                    <Icon name="check-circle" className="text-green-500 mt-1" />
                    <Box>
                      <Typography variant="body1" className="font-medium">
                        Customizable
                      </Typography>
                      <Typography variant="body2" className="text-neutral-600">
                        Easy to customize with CSS variables and theme support.
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>

          <Separator />

          {/* Todo List */}
          <Box className="space-y-4">
            <Typography variant="h4">Todo List</Typography>
            <Card>
              <CardContent className="pt-6">
                <List className="space-y-1">
                  <ListItem className="flex items-center gap-3">
                    <Box className="w-4 h-4 border-2 border-neutral-300 rounded-sm cursor-pointer hover:border-primary"></Box>
                    <span>Review pull requests</span>
                    <Chip variant="outline" className="ml-auto" label="High" />
                  </ListItem>
                  <ListItem className="flex items-center gap-3">
                    <Box className="w-4 h-4 border-2 border-neutral-300 rounded-sm cursor-pointer hover:border-primary"></Box>
                    <span>Update documentation</span>
                    <Chip
                      variant="outline"
                      className="ml-auto"
                      label="Medium "
                    />
                  </ListItem>
                  <ListItem className="flex items-center gap-3">
                    <Box className="w-4 h-4 border-2 border-neutral-300 rounded-sm cursor-pointer hover:border-primary bg-primary"></Box>
                    <span className="line-through text-neutral-500">
                      Deploy to staging
                    </span>
                    <Chip variant="outline" className="ml-auto" label="Done" />
                  </ListItem>
                  <ListItem className="flex items-center gap-3">
                    <Box className="w-4 h-4 border-2 border-neutral-300 rounded-sm cursor-pointer hover:border-primary"></Box>
                    <span>Write unit tests</span>
                    <Chip variant="outline" className="ml-auto" label="Low" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>
            Best practices and accessibility considerations for using list
            components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Box className="space-y-2">
            <Typography variant="h4">Accessibility</Typography>
            <List>
              <ListItem>
                Use semantic HTML elements (ul, ol, li) for proper screen reader
                support
              </ListItem>
              <ListItem>
                Provide descriptive text for interactive list items
              </ListItem>
              <ListItem>
                Ensure proper contrast ratios for text and icons
              </ListItem>
              <ListItem>
                Use ARIA labels when necessary for complex list structures
              </ListItem>
            </List>
          </Box>

          <Box className="space-y-2">
            <Typography variant="h4">Best Practices</Typography>
            <List>
              <ListItem>
                Keep list items concise and focused on a single topic
              </ListItem>
              <ListItem>
                Use consistent spacing and alignment throughout the list
              </ListItem>
              <ListItem>
                Consider using icons or badges to enhance visual hierarchy
              </ListItem>
              <ListItem>
                Limit nested lists to 2-3 levels for better readability
              </ListItem>
            </List>
          </Box>

          <Box className="space-y-2">
            <Typography variant="h4">Performance</Typography>
            <List>
              <ListItem>
                Use virtual scrolling for very long lists (100+ items)
              </ListItem>
              <ListItem>Lazy load list items when appropriate</ListItem>
              <ListItem>Optimize images and icons used in list items</ListItem>
              <ListItem>Consider pagination for large datasets</ListItem>
            </List>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
