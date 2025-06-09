import { Link as RouterLink } from 'react-router';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Link,
  Typography,
} from '@veraclins-dev/ui';

export function Links() {
  return (
    <Box display="flex" gap={8}>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Links</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h2">Solid</Typography>
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
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h2">Soft</Typography>
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
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h2">Outline</Typography>
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
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h2">Text</Typography>
            <Link type="button" variant="text">
              Default Color
            </Link>
            <Link type="button" variant="text" color="primary">
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
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h2">Normal Links</Typography>
            <Link href="/">Default Color</Link>
            <Link href="/primary" color="primary">
              Primary
            </Link>
            <Link underline="none" color="secondary">
              Secondary
            </Link>
            <Link className="border-b-2" color="destructive">
              Destructive
            </Link>
            <Link color="success">Success</Link>
            <Link underline="always" color="warning">
              Warning
            </Link>
            <Link color="info">Info</Link>
          </Box>
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h2">Router Link</Typography>
            <Link to="/" component={RouterLink}>
              Default Color
            </Link>
            <Link to="/primary" component={RouterLink} color="primary">
              Primary
            </Link>
            <Link to="/secondary" component={RouterLink} color="secondary">
              Secondary
            </Link>
            <Link to="/destructive" component={RouterLink} color="destructive">
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
        </CardContent>
      </Card>
    </Box>
  );
}
