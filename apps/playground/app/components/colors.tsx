import { Box, Typography } from '@veraclins-dev/ui';

export function Colors() {
  return (
    <>
      <Typography variant="h2">Colors</Typography>
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
          className="bg-accent text-accent-foreground rounded-md"
        >
          Accent
        </Box>
        <Box
          display="flex"
          p={4}
          className="bg-muted text-muted-foreground rounded-md"
        >
          Muted
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
          className="bg-secondary text-secondary-foreground rounded-md"
        >
          Secondary
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
          className="bg-success text-success-foreground rounded-md"
        >
          Success
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
          className="bg-info text-info-foreground rounded-md"
        >
          Info
        </Box>
      </Box>
    </>
  );
}
