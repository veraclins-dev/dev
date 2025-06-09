import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
  Typography,
} from '@veraclins-dev/ui';

export function Buttons() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buttons</CardTitle>
      </CardHeader>
      <CardContent display="flex" flexDirection="column" gap={4}>
        <Box display="flex" flexDirection="column" flexWrap="wrap" gap={4}>
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h2">Solid</Typography>
            <Box display="flex" gap={2}>
              <Button variant="solid" color="primary">
                Primary
              </Button>
              <Button
                tooltip="This is a loading button with a tooltip and is disabled"
                variant="solid"
                color="primary"
                loading
              >
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="solid" color="secondary">
                Secondary
              </Button>
              <Button variant="solid" color="secondary" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="solid" color="destructive">
                Destructive
              </Button>
              <Button variant="solid" color="destructive" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="solid" color="success">
                Success
              </Button>
              <Button variant="solid" color="success" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="solid" color="warning">
                Warning
              </Button>
              <Button variant="solid" color="warning" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="solid" color="info">
                Info
              </Button>
              <Button variant="solid" color="info" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="solid" color="neutral">
                Neutral
              </Button>
              <Button variant="solid" color="neutral" loading>
                Loading
              </Button>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h2">Soft</Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="soft"
                color="primary"
                tooltip="This is a soft button with a tooltip"
              >
                Primary
              </Button>
              <Button variant="soft" color="primary" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="soft" color="secondary">
                Secondary
              </Button>
              <Button variant="soft" color="secondary" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="soft" color="destructive">
                Destructive
              </Button>
              <Button variant="soft" color="destructive" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="soft" color="success">
                Success
              </Button>
              <Button variant="soft" color="success" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="soft" color="warning">
                Warning
              </Button>
              <Button variant="soft" color="warning" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="soft" color="info">
                Info
              </Button>
              <Button variant="soft" color="info" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="soft" color="neutral">
                Neutral
              </Button>
              <Button variant="soft" color="neutral" loading>
                Loading
              </Button>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h2">Outline</Typography>

            <Box display="flex" gap={2}>
              <Button variant="outline" color="primary">
                Primary
              </Button>
              <Button variant="outline" color="primary" loading>
                Loading
              </Button>
            </Box>

            <Box display="flex" gap={2}>
              <Button variant="outline" color="secondary">
                Secondary
              </Button>
              <Button variant="outline" color="secondary" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="outline" color="destructive">
                Destructive
              </Button>
              <Button variant="outline" color="destructive" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="outline" color="success">
                Success
              </Button>
              <Button variant="outline" color="success" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="outline" color="warning">
                Warning
              </Button>
              <Button variant="outline" color="warning" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="outline" color="info">
                Info
              </Button>
              <Button variant="outline" color="info" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="outline" color="neutral">
                Neutral
              </Button>
              <Button variant="outline" color="neutral" loading>
                Loading
              </Button>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h2">Text</Typography>
            <Box display="flex" gap={2}>
              <Button variant="text" color="primary">
                Primary
              </Button>
              <Button variant="text" color="primary" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="text" color="secondary">
                Secondary
              </Button>
              <Button variant="text" color="secondary" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="text" color="destructive">
                Destructive
              </Button>
              <Button variant="text" color="destructive" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="text" color="success">
                Success
              </Button>
              <Button variant="text" color="success" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="text" color="warning">
                Warning
              </Button>
              <Button variant="text" color="warning" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="text" color="info">
                Info
              </Button>
              <Button variant="text" color="info" loading>
                Loading
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button variant="text" color="neutral">
                Neutral
              </Button>
              <Button variant="text" color="neutral" loading>
                Loading
              </Button>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h2">Icon</Typography>
            <Box display="flex" gap={2}>
              <Button size="icon" color="primary" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="primary" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="primary" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="primary" variant="text">
                <Icon name="heart" />
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button size="icon" color="secondary" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="secondary" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="secondary" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="secondary" variant="text">
                <Icon name="heart" />
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button size="icon" color="destructive" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="destructive" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="destructive" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="destructive" variant="text">
                <Icon name="heart" />
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button size="icon" color="success" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="success" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="success" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="success" variant="text">
                <Icon name="heart" />
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button size="icon" color="warning" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="warning" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="warning" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="warning" variant="text">
                <Icon name="heart" />
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button size="icon" color="info" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="info" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="info" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="info" variant="text">
                <Icon name="heart" />
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Button size="icon" color="neutral" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="neutral" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="neutral" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="neutral" variant="text">
                <Icon name="heart" />
              </Button>
            </Box>
          </Box>
        </Box>
        <Typography variant="h2">Combination</Typography>
        <Box display="flex" gap={4}>
          <Box display="flex" gap={4} justify="center" flex={1}>
            <Button variant="solid" color="secondary">
              Clear
            </Button>
            <Button variant="outline" color="secondary">
              Cancel
            </Button>
            <Button color="primary">Submit</Button>
          </Box>
          <Box display="flex" gap={4} justify="center" flex={1}>
            <Button variant="solid" fullWidth color="secondary" size="md">
              Login
            </Button>
            <Button color="primary" fullWidth size="md">
              Get started
            </Button>
          </Box>
          <Box display="flex" gap={4} justify="center" flex={1}>
            <Button variant="outline" fullWidth color="secondary" size="sm">
              Login
            </Button>
            <Button color="primary" fullWidth size="sm">
              Get started
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
