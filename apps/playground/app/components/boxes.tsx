import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
} from '@veraclins-dev/ui';

export function Boxes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Boxes</CardTitle>
      </CardHeader>
      <CardContent display="flex" gap={4} className="flex-wrap">
        {/* Spacing Props */}
        <Box display="flex" flexDirection="column" gap={4}>
          <Typography variant="h2">Margin & Padding</Typography>
          <Box display="flex" gap={4} className="gap-4 ">
            <Box className="flex flex-col gap-3 bg-card-inner">
              <Typography variant="h3">Margin</Typography>
              <Box m={4} className="bg-accent" p={2}>
                Margin (m-4)
              </Box>
              <Box mx={4} className="bg-accent" p={2}>
                Margin X (mx-4)
              </Box>
              <Box my={4} className="bg-accent" p={2}>
                Margin Y (my-4)
              </Box>
              <Box mt={4} className="bg-accent" p={2}>
                Margin Top (mt-4)
              </Box>
              <Box mr={4} className="bg-accent" p={2}>
                Margin Right (mr-4)
              </Box>
              <Box mb={4} className="bg-accent" p={2}>
                Margin Bottom (mb-4)
              </Box>
              <Box ml={4} className="bg-accent" p={2}>
                Margin Left (ml-4)
              </Box>
            </Box>
            <Box className="flex flex-col gap-3 bg-card-inner">
              <Typography variant="h3">Padding</Typography>
              <Box p={4} className="bg-accent">
                Padding (p-4)
              </Box>
              <Box px={4} className="bg-accent">
                Padding X (px-4)
              </Box>
              <Box py={4} className="bg-accent">
                Padding Y (py-4)
              </Box>
              <Box pt={4} className="bg-accent">
                Padding Top (pt-4)
              </Box>
              <Box pr={4} className="bg-accent">
                Padding Right (pr-4)
              </Box>
              <Box pb={4} className="bg-accent">
                Padding Bottom (pb-4)
              </Box>
              <Box pl={4} className="bg-accent">
                Padding Left (pl-4)
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Gap Props */}
        <Box className="flex flex-col gap-4">
          <Typography variant="h2">Gap Props</Typography>
          <Box className="flex gap-4 flex-wrap">
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              className="bg-accent"
              p={2}
            >
              <Box className="bg-muted text-muted-foreground p-2">Box 1</Box>
              <Box className="bg-muted text-muted-foreground p-2">Box 2</Box>
              Gap (gap-4)
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              className="bg-accent"
              p={2}
            >
              <Box gapX={4} flexDirection="row">
                <Box className="bg-muted w-fit text-muted-foreground p-2">
                  Box 1
                </Box>
                <Box className="bg-muted w-fit text-muted-foreground p-2">
                  Box 2
                </Box>
              </Box>
              Gap X (gap-x-4)
            </Box>
            <Box
              display="flex"
              gapY={4}
              flexDirection="column"
              className="bg-accent"
              p={2}
            >
              <Box className="bg-muted text-muted-foreground p-2">Box 1</Box>
              <Box className="bg-muted text-muted-foreground p-2">Box 2</Box>
              Gap Y (gap-y-4)
            </Box>
          </Box>
        </Box>

        {/* Layout Props */}
        <Box className="flex flex-col gap-4">
          <Typography variant="h2">Layout Props</Typography>
          <Box className="flex gap-4 flex-wrap">
            <Box className="flex flex-col gap-2 bg-card-inner">
              <Typography variant="h3">Flex Direction</Typography>
              Row
              <Box
                display="flex"
                flexDirection="row"
                className="bg-accent"
                p={2}
                gap={2}
              >
                <Box className="bg-muted text-muted-foreground p-2">Box 1</Box>
                <Box className="bg-muted text-muted-foreground p-2">Box 2</Box>
              </Box>
              Column
              <Box
                display="flex"
                flexDirection="column"
                className="bg-accent"
                p={2}
                gap={2}
              >
                <Box className="bg-muted text-muted-foreground p-2">Box 1</Box>
                <Box className="bg-muted text-muted-foreground p-2">Box 2</Box>
              </Box>
              Row-reverse
              <Box
                display="flex"
                flexDirection="row-reverse"
                className="bg-accent"
                p={2}
                gap={2}
              >
                <Box className="bg-muted text-muted-foreground p-2">Box 1</Box>
                <Box className="bg-muted text-muted-foreground p-2">Box 2</Box>
              </Box>
              Column-reverse
              <Box
                display="flex"
                flexDirection="column-reverse"
                className="bg-accent"
                p={2}
                gap={2}
              >
                <Box className="bg-muted text-muted-foreground p-2">Box 1</Box>
                <Box className="bg-muted text-muted-foreground p-2">Box 2</Box>
              </Box>
            </Box>
            <Box className="flex flex-col gap-2 bg-card-inner">
              <Typography variant="h3">Align Items</Typography>
              Flex-start
              <Box
                display="flex"
                items="start"
                className="bg-accent"
                p={2}
                gap={2}
                style={{ height: '100px' }}
              >
                <Box className="bg-muted text-muted-foreground p-2">Box 1</Box>
                <Box className="bg-muted text-muted-foreground p-2">Box 2</Box>
              </Box>
              Flex-end
              <Box
                display="flex"
                items="end"
                className="bg-accent"
                p={2}
                gap={2}
                style={{ height: '100px' }}
              >
                <Box className="bg-muted text-muted-foreground p-2">Box 1</Box>
                <Box className="bg-muted text-muted-foreground p-2">Box 2</Box>
              </Box>
              Center
              <Box
                display="flex"
                items="center"
                className="bg-accent"
                p={2}
                gap={2}
                style={{ height: '100px' }}
              >
                <Box className="bg-muted text-muted-foreground p-2">Box 1</Box>
                <Box className="bg-muted text-muted-foreground p-2">Box 2</Box>
              </Box>
              Baseline
              <Box
                display="flex"
                items="baseline"
                className="bg-accent"
                p={2}
                gap={2}
                style={{ height: '100px' }}
              >
                <Box className="bg-muted text-muted-foreground p-2">Box 1</Box>
                <Box className="bg-muted text-muted-foreground p-2">Box 2</Box>
              </Box>
              Stretch
              <Box
                display="flex"
                items="stretch"
                className="bg-accent"
                p={2}
                gap={2}
                style={{ height: '100px' }}
              >
                <Box className="bg-muted text-muted-foreground p-2">Box 1</Box>
                <Box className="bg-muted text-muted-foreground p-2">Box 2</Box>
              </Box>
            </Box>
            <Box className="flex flex-col gap-2 bg-card-inner">
              <Typography variant="h3">Justify Content</Typography>
              Flex-start
              <Box
                display="flex"
                flexDirection="row"
                justify="start"
                className="bg-accent"
                p={2}
                gap={2}
              >
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 1
                </Box>
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 2
                </Box>
              </Box>
              Flex-end
              <Box
                display="flex"
                flexDirection="row"
                justify="end"
                className="bg-accent"
                p={2}
                gap={2}
              >
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 1
                </Box>
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 2
                </Box>
              </Box>
              Center
              <Box
                display="flex"
                flexDirection="row"
                justify="center"
                className="bg-accent"
                p={2}
                gap={2}
              >
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 1
                </Box>
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 2
                </Box>
              </Box>
              Space-between
              <Box
                display="flex"
                flexDirection="row"
                justify="space-between"
                className="bg-accent"
                p={2}
                gap={2}
              >
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 1
                </Box>
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 2
                </Box>
              </Box>
              Space-around
              <Box
                display="flex"
                flexDirection="row"
                justify="space-around"
                className="bg-accent"
                p={2}
                gap={2}
              >
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 1
                </Box>
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 2
                </Box>
              </Box>
              Space-evenly
              <Box
                display="flex"
                flexDirection="row"
                justify="space-evenly"
                className="bg-accent"
                p={2}
                gap={2}
              >
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 1
                </Box>
                <Box className="w-fit bg-muted text-muted-foreground p-2">
                  Box 2
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
