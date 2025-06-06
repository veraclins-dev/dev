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

        <Box display="flex" p={2} className="bg-card rounded-md">
          <Box
            display="flex"
            p={4}
            py={2}
            className="bg-accent text-accent-foreground rounded-md"
          >
            Accent
          </Box>
        </Box>
        <Box display="flex" p={2} className="bg-card rounded-md">
          <Box
            display="flex"
            p={4}
            py={2}
            className="bg-accent-hover text-accent-foreground-hover rounded-md"
          >
            Accent Hover
          </Box>
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
          className="bg-muted-hover text-muted-foreground-hover rounded-md"
        >
          Muted Hover
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
    </>
  );
}
