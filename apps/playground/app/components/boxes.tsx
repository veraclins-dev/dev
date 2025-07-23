import { Image } from '@veraclins-dev/image';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  Input,
  Label,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Boxes() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Boxes" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Box Layout Properties
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        A comprehensive showcase of Box component properties and their visual
        effects.
      </Typography>

      {/* Display Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Display Properties</CardTitle>
          <CardDescription>
            Different display values and their effects on layout
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={8}>
            {/* Block vs Flex vs Grid */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4">Display Types</Typography>

              <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Block Display */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">display="block"</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Box display="block" className="border rounded p-4">
                      <Box className="bg-secondary/20 p-2 mb-2">
                        Block Item 1
                      </Box>
                      <Box className="bg-secondary/20 p-2 mb-2">
                        Block Item 2
                      </Box>
                      <Box className="bg-secondary/20 p-2">Block Item 3</Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Flex Display */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">display="flex"</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Box display="flex" gap={2} className="border rounded p-4">
                      <Box className="bg-secondary/20 p-2">Flex 1</Box>
                      <Box className="bg-secondary/20 p-2">Flex 2</Box>
                      <Box className="bg-secondary/20 p-2">Flex 3</Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Grid Display */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">display="grid"</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Box className="grid grid-cols-2 gap-2 border rounded p-4">
                      <Box className="bg-secondary/20 p-2">Grid 1</Box>
                      <Box className="bg-secondary/20 p-2">Grid 2</Box>
                      <Box className="bg-secondary/20 p-2">Grid 3</Box>
                      <Box className="bg-secondary/20 p-2">Grid 4</Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            {/* Flex Properties */}
            <Box display="flex" flexDirection="column" gap={6}>
              <Typography variant="h4">Flex Properties</Typography>

              {/* Flex Direction */}
              <Box>
                <Typography variant="h5" className="mb-4">
                  Flex Direction
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Row */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        flexDirection="row"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        flexDirection="row"
                        gap={2}
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                        <Box className="bg-secondary/20 p-2">3</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Row Reverse */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        flexDirection="row-reverse"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        flexDirection="row-reverse"
                        gap={2}
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                        <Box className="bg-secondary/20 p-2">3</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Column */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        flexDirection="column"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                        <Box className="bg-secondary/20 p-2">3</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Column Reverse */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        flexDirection="column-reverse"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        flexDirection="column-reverse"
                        gap={2}
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                        <Box className="bg-secondary/20 p-2">3</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              {/* Justify Content */}
              <Box>
                <Typography variant="h5" className="mb-4">
                  Justify Content
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Start */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">justify="start"</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        justify="start"
                        gap={2}
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Center */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        justify="center"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        justify="center"
                        gap={2}
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* End */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">justify="end"</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        justify="end"
                        gap={2}
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Between */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        justify="between"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        justify="between"
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Around */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        justify="around"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        justify="around"
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Evenly */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        justify="evenly"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        justify="evenly"
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              {/* Align Items */}
              <Box>
                <Typography variant="h5" className="mb-4">
                  Align Items
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Start */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">items="start"</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        items="start"
                        gap={2}
                        className="border rounded p-4 h-24"
                      >
                        <Box className="bg-secondary/20 p-2">Short</Box>
                        <Box className="bg-secondary/20 p-2 h-16">Tall</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Center */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">items="center"</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        items="center"
                        gap={2}
                        className="border rounded p-4 h-24"
                      >
                        <Box className="bg-secondary/20 p-2">Short</Box>
                        <Box className="bg-secondary/20 p-2 h-16">Tall</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* End */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">items="end"</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        items="end"
                        gap={2}
                        className="border rounded p-4 h-24"
                      >
                        <Box className="bg-secondary/20 p-2">Short</Box>
                        <Box className="bg-secondary/20 p-2 h-16">Tall</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Stretch */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">items="stretch"</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        items="stretch"
                        gap={2}
                        className="border rounded p-4 h-24"
                      >
                        <Box className="bg-secondary/20 p-2">Stretch 1</Box>
                        <Box className="bg-secondary/20 p-2">Stretch 2</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Baseline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        items="baseline"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        items="baseline"
                        gap={2}
                        className="border rounded p-4 h-24"
                      >
                        <Box className="bg-secondary/20 p-2 text-xs">Small</Box>
                        <Box className="bg-secondary/20 p-2 text-xl">Large</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              {/* Flex Wrap */}
              <Box>
                <Typography variant="h5" className="mb-4">
                  Flex Wrap
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* No Wrap */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        flexWrap="nowrap"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        flexWrap="nowrap"
                        gap={2}
                        className="border rounded p-4 overflow-auto"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <Box
                            key={i}
                            className="bg-secondary/20 p-2 w-20 flex-shrink-0"
                          >
                            Item {i}
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Wrap */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">flexWrap="wrap"</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        gap={2}
                        className="border rounded p-4"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <Box key={i} className="bg-secondary/20 p-2 w-20">
                            Item {i}
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>

            {/* Spacing Properties */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Spacing Properties
              </Typography>

              {/* Gap Spacing */}
              <Box className="mb-6">
                <Typography variant="h5" className="mb-4">
                  Gap Spacing
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">gap={2}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        gap={2}
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                        <Box className="bg-secondary/20 p-2">3</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">gap={4}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        gap={4}
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                        <Box className="bg-secondary/20 p-2">3</Box>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">gap={8}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box
                        display="flex"
                        gap={8}
                        className="border rounded p-4"
                      >
                        <Box className="bg-secondary/20 p-2">1</Box>
                        <Box className="bg-secondary/20 p-2">2</Box>
                        <Box className="bg-secondary/20 p-2">3</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              {/* Padding */}
              <Box className="mb-6">
                <Typography variant="h5" className="mb-4">
                  Padding
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">p={2}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box className="border rounded">
                        <Box p={2} className="bg-secondary/20">
                          Small Padding
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">p={4}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box className="border rounded">
                        <Box p={4} className="bg-secondary/20">
                          Medium Padding
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">p={8}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box className="border rounded">
                        <Box p={8} className="bg-secondary/20">
                          Large Padding
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              {/* Margin */}
              <Box className="mb-6">
                <Typography variant="h5" className="mb-4">
                  Margin
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">m={2}</CardTitle>
                    </CardHeader>
                    <CardContent className="border rounded">
                      <Box m={2} className="bg-secondary/20 p-2">
                        Small Margin
                      </Box>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">m={4}</CardTitle>
                    </CardHeader>
                    <CardContent className="border rounded">
                      <Box m={4} className="bg-secondary/20 p-2">
                        Medium Margin
                      </Box>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">m={8}</CardTitle>
                    </CardHeader>
                    <CardContent className="border rounded">
                      <Box m={8} className="bg-secondary/20 p-2">
                        Large Margin
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              {/* Directional Spacing */}
              <Box>
                <Typography variant="h5" className="mb-4">
                  Directional Spacing
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        px={4} py={2}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box className="border rounded">
                        <Box px={4} py={2} className="bg-secondary/20">
                          Horizontal & Vertical
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        pt={4} pb={2}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box className="border rounded">
                        <Box pt={4} pb={2} className="bg-secondary/20">
                          Top & Bottom
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        pl={4} pr={2}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Box className="border rounded">
                        <Box pl={4} pr={2} className="bg-secondary/20">
                          Left & Right
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>

            {/* Grid Properties */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Grid Properties
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Grid */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">
                      Basic Grid (2 Columns)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Box className="grid grid-cols-2 gap-2 border rounded p-4">
                      {[1, 2, 3, 4].map((i) => (
                        <Box key={i} className="bg-secondary/20 p-2">
                          Grid Item {i}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                {/* Responsive Grid */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Responsive Grid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 border rounded p-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Box key={i} className="bg-secondary/20 p-2">
                          Grid Item {i}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Real-Life Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Life Layout Examples</CardTitle>
          <CardDescription>
            Practical examples of Box layouts in real-world applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={8}>
            {/* Dashboard Layout Card */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Dashboard Layout
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    className="h-96"
                  >
                    {/* Header */}
                    <Box
                      display="flex"
                      justify="between"
                      items="center"
                      className="border-b pb-4"
                    >
                      <Typography variant="h5">Analytics Dashboard</Typography>
                      <Box display="flex" gap={2}>
                        <Button variant="outline" buttonSize="sm">
                          <Icon name="calendar" className="mr-1" />
                          Date Range
                        </Button>
                        <Button variant="outline" buttonSize="sm">
                          <Icon name="download" className="mr-1" />
                          Export
                        </Button>
                      </Box>
                    </Box>

                    {/* Main Content */}
                    <Box display="flex" gap={4} flex="1">
                      {/* Sidebar */}
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        className="w-64 border-r pr-4"
                      >
                        <Typography variant="h6" className="mb-2">
                          Navigation
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                          <Box className="bg-primary/10 p-2 rounded cursor-pointer">
                            <Typography variant="body2">Overview</Typography>
                          </Box>
                          <Box className="p-2 rounded cursor-pointer hover:bg-neutral/10">
                            <Typography variant="body2">Analytics</Typography>
                          </Box>
                          <Box className="p-2 rounded cursor-pointer hover:bg-neutral/10">
                            <Typography variant="body2">Reports</Typography>
                          </Box>
                          <Box className="p-2 rounded cursor-pointer hover:bg-neutral/10">
                            <Typography variant="body2">Settings</Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Content Area */}
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={4}
                        flex="1"
                      >
                        {/* Stats Grid */}
                        <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Box className="bg-success/10 p-4 rounded border">
                            <Typography variant="h4" className="text-success">
                              $12,345
                            </Typography>
                            <Typography variant="body2">
                              Total Revenue
                            </Typography>
                          </Box>
                          <Box className="bg-info/10 p-4 rounded border">
                            <Typography variant="h4" className="text-info">
                              1,234
                            </Typography>
                            <Typography variant="body2">
                              Active Users
                            </Typography>
                          </Box>
                          <Box className="bg-warning/10 p-4 rounded border">
                            <Typography variant="h4" className="text-warning">
                              89%
                            </Typography>
                            <Typography variant="body2">
                              Conversion Rate
                            </Typography>
                          </Box>
                        </Box>

                        {/* Chart Area */}
                        <Box className="bg-neutral/5 p-4 rounded border flex-1">
                          <Typography variant="h6" className="mb-2">
                            Revenue Chart
                          </Typography>
                          <Image
                            src="https://picsum.photos/600/200?random=30&blur=1"
                            alt="Revenue Chart"
                            width={600}
                            height={200}
                            className="w-full h-32 object-cover rounded"
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Product Grid Card */}
            <Box>
              <Typography variant="h4" className="mb-4">
                E-commerce Product Grid
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box display="flex" flexDirection="column" gap={4}>
                    {/* Header with Search and Filters */}
                    <Box
                      display="flex"
                      justify="between"
                      items="center"
                      className="border-b pb-4"
                    >
                      <Typography variant="h5">Product Catalog</Typography>
                      <Box display="flex" gap={2}>
                        <Input
                          placeholder="Search products..."
                          className="w-64"
                        />
                        <Button variant="outline" buttonSize="sm">
                          <Icon name="funnel" className="mr-1" />
                          Filter
                        </Button>
                      </Box>
                    </Box>

                    {/* Main Layout */}
                    <Box display="flex" gap={6}>
                      {/* Filter Sidebar */}
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={4}
                        className="w-64"
                      >
                        <Box>
                          <Typography variant="h6" className="mb-2">
                            Categories
                          </Typography>
                          <Box display="flex" flexDirection="column" gap={1}>
                            <Box className="p-2 rounded cursor-pointer hover:bg-neutral/10">
                              <Typography variant="body2">
                                Electronics
                              </Typography>
                            </Box>
                            <Box className="p-2 rounded cursor-pointer hover:bg-neutral/10">
                              <Typography variant="body2">Clothing</Typography>
                            </Box>
                            <Box className="p-2 rounded cursor-pointer hover:bg-neutral/10">
                              <Typography variant="body2">
                                Home & Garden
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Box>
                          <Typography variant="h6" className="mb-2">
                            Price Range
                          </Typography>
                          <Box display="flex" flexDirection="column" gap={1}>
                            <Box className="p-2 rounded cursor-pointer hover:bg-neutral/10">
                              <Typography variant="body2">$0 - $50</Typography>
                            </Box>
                            <Box className="p-2 rounded cursor-pointer hover:bg-neutral/10">
                              <Typography variant="body2">
                                $50 - $100
                              </Typography>
                            </Box>
                            <Box className="p-2 rounded cursor-pointer hover:bg-neutral/10">
                              <Typography variant="body2">$100+</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      {/* Product Grid */}
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={4}
                        flex="1"
                      >
                        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Product Cards */}
                          {[1, 2, 3, 4, 5, 6].map((item) => (
                            <Box
                              key={item}
                              className="border rounded p-4 hover:shadow-md transition-shadow"
                            >
                              <Image
                                src={`https://picsum.photos/300/200?random=${item}`}
                                alt={`Product ${item}`}
                                width={300}
                                height={200}
                                className="w-full h-32 object-cover rounded mb-3"
                              />
                              <Typography variant="h6" className="mb-1">
                                Product {item}
                              </Typography>
                              <Typography
                                variant="body2"
                                className="text-muted-foreground mb-2"
                              >
                                Product description goes here
                              </Typography>
                              <Box
                                display="flex"
                                justify="between"
                                items="center"
                              >
                                <Typography
                                  variant="h6"
                                  className="text-primary"
                                >
                                  $99.99
                                </Typography>
                                <Button buttonSize="sm">Add to Cart</Button>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Form Layout Card */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Multi-Step Form Layout
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box display="flex" flexDirection="column" gap={6}>
                    {/* Progress Steps */}
                    <Box display="flex" justify="center" gap={4}>
                      {['Personal Info', 'Address', 'Payment', 'Review'].map(
                        (step, index) => (
                          <Box key={step} display="flex" items="center" gap={2}>
                            <Box
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                index === 0
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-neutral/20'
                              }`}
                            >
                              {index + 1}
                            </Box>
                            <Typography variant="body2">{step}</Typography>
                          </Box>
                        ),
                      )}
                    </Box>

                    {/* Form Content */}
                    <Box display="flex" gap={6}>
                      {/* Form Fields */}
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={4}
                        flex="1"
                      >
                        <Typography variant="h5">
                          Personal Information
                        </Typography>

                        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Box display="flex" flexDirection="column" gap={2}>
                            <Label>First Name</Label>
                            <Input placeholder="Enter first name" />
                          </Box>
                          <Box display="flex" flexDirection="column" gap={2}>
                            <Label>Last Name</Label>
                            <Input placeholder="Enter last name" />
                          </Box>
                        </Box>

                        <Box display="flex" flexDirection="column" gap={2}>
                          <Label>Email</Label>
                          <Input placeholder="Enter email address" />
                        </Box>

                        <Box display="flex" flexDirection="column" gap={2}>
                          <Label>Phone</Label>
                          <Input placeholder="Enter phone number" />
                        </Box>
                      </Box>

                      {/* Help Section */}
                      <Box className="w-80 bg-neutral/5 p-4 rounded">
                        <Typography variant="h6" className="mb-2">
                          Help & Tips
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2}>
                          <Typography variant="body2">
                            • All fields marked with * are required
                          </Typography>
                          <Typography variant="body2">
                            • Use your legal name as it appears on official
                            documents
                          </Typography>
                          <Typography variant="body2">
                            • We'll use this email for important communications
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Form Actions */}
                    <Box
                      display="flex"
                      justify="between"
                      className="border-t pt-4"
                    >
                      <Button variant="outline">Back</Button>
                      <Box display="flex" gap={2}>
                        <Button variant="outline">Save Draft</Button>
                        <Button>Next Step</Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Mobile App Layout Card */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Mobile App Layout Patterns
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box display="flex" flexDirection="column" gap={6}>
                    {/* Mobile Navigation */}
                    <Box>
                      <Typography variant="h5" className="mb-3">
                        Mobile Navigation
                      </Typography>
                      <Box className="bg-neutral/10 rounded-lg p-4 max-w-sm mx-auto">
                        <Box
                          display="flex"
                          flexDirection="column"
                          gap={4}
                          className="h-96"
                        >
                          {/* Header */}
                          <Box display="flex" justify="between" items="center">
                            <Typography variant="h6">My App</Typography>
                            <Button buttonSize="icon" variant="outline">
                              <Icon name="bell" />
                            </Button>
                          </Box>

                          {/* Content Area */}
                          <Box
                            display="flex"
                            flexDirection="column"
                            gap={3}
                            flex="1"
                          >
                            <Box className="bg-primary/10 p-3 rounded">
                              <Typography variant="body1">
                                Welcome back!
                              </Typography>
                            </Box>
                            <Box className="grid grid-cols-2 gap-3">
                              <Box className="bg-neutral/20 p-3 rounded text-center">
                                <Icon name="home" className="mx-auto mb-1" />
                                <Typography variant="body2">Home</Typography>
                              </Box>
                              <Box className="bg-neutral/20 p-3 rounded text-center">
                                <Icon name="search" className="mx-auto mb-1" />
                                <Typography variant="body2">Search</Typography>
                              </Box>
                              <Box className="bg-neutral/20 p-3 rounded text-center">
                                <Icon name="heart" className="mx-auto mb-1" />
                                <Typography variant="body2">
                                  Favorites
                                </Typography>
                              </Box>
                              <Box className="bg-neutral/20 p-3 rounded text-center">
                                <Icon name="user" className="mx-auto mb-1" />
                                <Typography variant="body2">Profile</Typography>
                              </Box>
                            </Box>
                          </Box>

                          {/* Bottom Navigation */}
                          <Box
                            display="flex"
                            justify="around"
                            className="border-t pt-3"
                          >
                            <Box className="text-center">
                              <Icon name="home" className="mx-auto mb-1" />
                              <Typography variant="caption">Home</Typography>
                            </Box>
                            <Box className="text-center">
                              <Icon name="search" className="mx-auto mb-1" />
                              <Typography variant="caption">Search</Typography>
                            </Box>
                            <Box className="text-center">
                              <Icon name="plus" className="mx-auto mb-1" />
                              <Typography variant="caption">Add</Typography>
                            </Box>
                            <Box className="text-center">
                              <Icon name="heart" className="mx-auto mb-1" />
                              <Typography variant="caption">
                                Favorites
                              </Typography>
                            </Box>
                            <Box className="text-center">
                              <Icon name="user" className="mx-auto mb-1" />
                              <Typography variant="caption">Profile</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    {/* Responsive Breakpoints */}
                    <Box>
                      <Typography variant="h5" className="mb-3">
                        Responsive Breakpoints
                      </Typography>
                      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Box className="border rounded p-4 text-center">
                          <Typography variant="h6" className="mb-2">
                            Mobile
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-muted-foreground"
                          >
                            &lt; 768px
                          </Typography>
                          <Box className="bg-neutral/10 h-20 rounded mt-2 flex items-center justify-center">
                            <Typography variant="caption">
                              Single Column
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="border rounded p-4 text-center">
                          <Typography variant="h6" className="mb-2">
                            Tablet
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-muted-foreground"
                          >
                            768px - 1024px
                          </Typography>
                          <Box className="bg-neutral/10 h-20 rounded mt-2 flex items-center justify-center">
                            <Typography variant="caption">
                              Two Columns
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="border rounded p-4 text-center">
                          <Typography variant="h6" className="mb-2">
                            Desktop
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-muted-foreground"
                          >
                            1024px - 1440px
                          </Typography>
                          <Box className="bg-neutral/10 h-20 rounded mt-2 flex items-center justify-center">
                            <Typography variant="caption">
                              Three Columns
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="border rounded p-4 text-center">
                          <Typography variant="h6" className="mb-2">
                            Large
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-muted-foreground"
                          >
                            &gt; 1440px
                          </Typography>
                          <Box className="bg-neutral/10 h-20 rounded mt-2 flex items-center justify-center">
                            <Typography variant="caption">
                              Four Columns
                            </Typography>
                          </Box>
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
    </Box>
  );
}
