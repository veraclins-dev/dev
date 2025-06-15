import { Link as RouterLink } from 'react-router';

import {
  Box,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Link,
  Typography,
} from '@veraclins-dev/ui';

export function NxWelcome({ title }: { title: string }) {
  const routes = [
    {
      path: '/dialogs',
      label: 'Dialogs',
      description:
        'Modal dialogs, popovers, and other overlay components for user interactions and notifications.',
    },
    {
      path: '/colors',
      label: 'Colors',
      description:
        'Color palette showcase including primary, secondary, and semantic color variations.',
    },
    {
      path: '/buttons',
      label: 'Buttons',
      description:
        'Interactive button components with various styles, states, and loading indicators.',
    },
    {
      path: '/links',
      label: 'Links',
      description:
        'Text and icon link components with different styles and hover effects.',
    },
    {
      path: '/badges',
      label: 'Badges',
      description:
        'Status indicators, labels, and notification badges for highlighting information.',
    },
    {
      path: '/inputs',
      label: 'Inputs',
      description:
        'Form input components including text fields, checkboxes, radio buttons, and select menus.',
    },
    {
      path: '/boxes',
      label: 'Boxes',
      description:
        'Layout components for creating responsive containers and grid systems.',
    },
    {
      path: '/cards',
      label: 'Cards',
      description:
        'Card components for displaying content in a structured and visually appealing way.',
    },
  ];

  return (
    <Box className="max-w-6xl mx-auto">
      <Typography variant="h1" className="text-center mb-4">
        Welcome to <span className="text-primary">{title}</span>
      </Typography>

      <Typography variant="body1" className="text-center mb-12">
        This playground showcases the available UI components and utilities from
        the @veraclins-dev/ui package. Each section demonstrates different
        components, their variations, and usage examples. Feel free to explore
        and use these components in your projects.
      </Typography>

      <Typography variant="h2" className="text-center mb-6">
        Available Components
      </Typography>

      <Box className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {routes.map((route) => (
          <Card
            key={route.path}
            display="flex"
            flexDirection="column"
            className="h-full"
          >
            <CardHeader>
              <CardTitle>{route.label}</CardTitle>
            </CardHeader>
            <CardContent flex="1">
              <Typography variant="body2">{route.description}</Typography>
            </CardContent>
            <CardFooter>
              <Link to={route.path} component={RouterLink}>
                View Examples →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default NxWelcome;
