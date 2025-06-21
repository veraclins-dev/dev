import {
  Badge,
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
} from '@veraclins-dev/ui';

export function Boxes() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
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
    </Box>
  );
}
