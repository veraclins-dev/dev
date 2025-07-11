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
  const routeGroups = [
    {
      title: 'Layout & Structure',
      description: 'Components for page layout and content organization',
      routes: [
        {
          path: '/boxes',
          label: 'Boxes',
          description:
            'Layout components for creating responsive containers and grid systems.',
        },
        {
          path: '/breadcrumbs',
          label: 'Breadcrumbs',
          description:
            'Hierarchical navigation components that help users understand their location within a website or application structure.',
        },
        {
          path: '/cards',
          label: 'Cards',
          description:
            'Card components for displaying content in a structured and visually appealing way.',
        },
        {
          path: '/typography',
          label: 'Typography',
          description:
            'Typography components for managing text styles, headings, and body text.',
        },
      ],
    },
    {
      title: 'Interactive Elements',
      description: 'Components for user interaction and feedback',
      routes: [
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
          path: '/inputs',
          label: 'Inputs',
          description:
            'Form input components including text fields, checkboxes, radio buttons, and select menus.',
        },
        {
          path: '/calendar',
          label: 'Calendar',
          description:
            'Date selection components including calendars, date pickers, and range selectors for various use cases.',
        },
        {
          path: '/time-picker',
          label: 'Time Picker',
          description:
            'Time selection components with both traditional and wheel-based interfaces.',
        },
        {
          path: '/wheel-time-picker',
          label: 'Wheel Time Picker',
          description:
            'iOS-style wheel-based time picker with smooth animations and drag interactions.',
        },
        {
          path: '/forms',
          label: 'Forms',
          description:
            'Form components for managing user input, validation, and submission.',
        },
        {
          path: '/feedback',
          label: 'Feedback',
          description:
            'Progress indicators, loading states, and status buttons for user feedback.',
        },
      ],
    },
    {
      title: 'Data & Content',
      description: 'Components for displaying and managing data',
      routes: [
        {
          path: '/badges',
          label: 'Badges',
          description:
            'Status indicators, labels, and notification badges for highlighting information.',
        },
        {
          path: '/chips',
          label: 'Chips',
          description:
            'Compact elements for representing inputs, attributes, or actions with remove functionality.',
        },
        {
          path: '/list',
          label: 'List',
          description:
            'Ordered and unordered list components for displaying structured content with proper semantic markup.',
        },
        {
          path: '/separator',
          label: 'Separator',
          description:
            'Visual divider components for organizing content and creating clear sections.',
        },
        {
          path: '/avatar',
          label: 'Avatar',
          description:
            'User profile image components with fallback support and various display options.',
        },
        {
          path: '/accordion',
          label: 'Accordion',
          description:
            'Collapsible content sections for organizing information in an expandable format.',
        },
        {
          path: '/chart',
          label: 'Charts',
          description:
            'Data visualization components built on Recharts with theming, tooltips, and responsive design.',
        },
        {
          path: '/table',
          label: 'Table',
          description:
            'Advanced data table components with sorting, filtering, bulk actions, and interactive row operations.',
        },
        {
          path: '/images',
          label: 'Images',
          description:
            'Optimized image components with lazy loading, blur placeholders, and responsive sizing.',
        },
      ],
    },
    {
      title: 'Overlays & Modals',
      description: 'Components for overlays, dialogs, and modal interactions',
      routes: [
        {
          path: '/overlays',
          label: 'Overlays & Modals',
          description:
            'Comprehensive collection of overlay components including command palettes, dropdowns, dialogs, drawers, sheets, tooltips, hover cards, and popovers.',
        },
      ],
    },
    {
      title: 'Design System',
      description: 'Core design tokens and visual elements',
      routes: [
        {
          path: '/colors',
          label: 'Colors',
          description:
            'Color palette showcase including primary, secondary, and semantic color variations.',
        },
        {
          path: '/icons',
          label: 'Icons',
          description:
            'Comprehensive icon library with 661+ icons, searchable interface, and real-life usage examples.',
        },
      ],
    },
    {
      title: 'Packages',
      description: 'Core utility packages and integrations',
      routes: [
        {
          path: '/auth',
          label: 'Auth',
          description:
            'OAuth authentication strategies for popular social platforms including Google, Facebook, GitHub, and Twitter.',
        },
        {
          path: '/seo',
          label: 'SEO',
          description:
            'Comprehensive SEO utilities for Remix applications including sitemap generation, robots.txt management, and metadata handling.',
        },
        {
          path: '/utils',
          label: 'Utils',
          description:
            'Utility functions for common development tasks including date handling, DOM manipulation, validation, and responsive design helpers.',
        },
      ],
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

      <Box className="space-y-12">
        {routeGroups.map((group) => (
          <Box key={group.title}>
            <Box className="mb-6">
              <Typography variant="h3" className="mb-2">
                {group.title}
              </Typography>
              <Typography
                variant="body2"
                className="text-neutral-foreground/70"
              >
                {group.description}
              </Typography>
            </Box>

            <Box className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {group.routes.map((route) => (
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
        ))}
      </Box>
    </Box>
  );
}

export default NxWelcome;
