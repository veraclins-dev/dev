import {
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  Separator,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Separators() {
  return (
    <Box className="max-w-6xl mx-auto space-y-8">
      <PlaygroundBreadcrumb currentPage="Separator" className="mb-4" />

      <Box className="text-center space-y-4">
        <Typography variant="h1">Separator Components</Typography>
        <Typography variant="body1" className="text-neutral-foreground/70">
          Visual divider components for organizing content and creating clear
          sections. Now with variants, sizes, content, and animation!
        </Typography>
      </Box>

      {/* Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
          <CardDescription>
            Different visual styles: solid, dashed, dotted, gradient.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="space-y-4">
            <Typography variant="h4">Solid (default)</Typography>
            <Separator variant="solid" />
            <Typography variant="h4">Dashed</Typography>
            <Separator variant="dashed" />
            <Typography variant="h4">Dotted</Typography>
            <Separator variant="dotted" />
            <Typography variant="h4">Gradient</Typography>
            <Separator variant="gradient" />
          </Box>
        </CardContent>
      </Card>

      {/* With Content (Text & Icon) */}
      <Card>
        <CardHeader>
          <CardTitle>With Content</CardTitle>
          <CardDescription>
            Display text or icons in the center of the separator.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Box className="space-y-4">
            <Typography variant="h4">With Text</Typography>
            <Separator withContent>Section Title</Separator>
            <Separator withContent variant="dashed">
              Dashed Title
            </Separator>
            <Separator withContent variant="gradient">
              Gradient Title
            </Separator>
          </Box>
          <Box className="space-y-4">
            <Typography variant="h4">With Icon</Typography>
            <Separator withContent>
              <Icon name="star" className="text-yellow-500" />
            </Separator>
            <Separator withContent variant="dotted">
              <Icon name="check" className="text-success" />
            </Separator>
          </Box>
        </CardContent>
      </Card>

      {/* Animated Separator */}
      <Card>
        <CardHeader>
          <CardTitle>Animated Separator</CardTitle>
          <CardDescription>
            Add a subtle pulse animation to draw attention.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator animated variant="gradient" />
          <Separator animated variant="dashed" />
          <Separator animated withContent>
            Animated Title
          </Separator>
        </CardContent>
      </Card>

      {/* Vertical Orientation */}
      <Card>
        <CardHeader>
          <CardTitle>Vertical Orientation</CardTitle>
          <CardDescription>All features work vertically too!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Box className="flex gap-8 h-5 items-center">
            <Typography variant="body1">Left</Typography>
            <Separator orientation="vertical" />
            <Typography variant="body1">Center</Typography>
            <Separator orientation="vertical" variant="dashed" />
            <Typography variant="body1">Right</Typography>
            <Separator orientation="vertical" variant="gradient" />
          </Box>
          <Box className="flex gap-8 items-center">
            <Typography variant="body1">A</Typography>
            <Separator orientation="vertical" withContent>
              <Icon name="star" />
            </Separator>
            <Typography variant="body1">B</Typography>
            <Separator orientation="vertical" withContent>
              <span>or</span>
            </Separator>
            <Typography variant="body1">C</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Real-Life Example */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Life Example</CardTitle>
          <CardDescription>Practical use in a form section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="space-y-4">
            <Typography variant="h5">Personal Info</Typography>
            <Box className="h-10 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
          </Box>
          <Separator withContent>Account</Separator>
          <Box className="space-y-4">
            <Typography variant="h5">Account Security</Typography>
            <Box className="h-10 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
          </Box>
          <Separator variant="dotted" withContent>
            <Icon name="clock" />
          </Separator>
          <Box className="space-y-4">
            <Typography variant="h5">Preferences</Typography>
            <Box className="h-10 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
          </Box>
        </CardContent>
      </Card>

      {/* Accessibility & Props Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Props</CardTitle>
          <CardDescription>
            Accessibility and all available props.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Box className="space-y-2">
            <Typography variant="h4">Accessibility</Typography>
            <Box className="space-y-2">
              <Typography variant="body2">
                • Use <code>decorative=&#123;false&#125;</code> and{' '}
                <code>aria-label</code> for semantic separators
              </Typography>
              <Typography variant="body2">
                • Default separators are decorative and hidden from screen
                readers
              </Typography>
              <Typography variant="body2">
                • All features are accessible and keyboard-friendly
              </Typography>
            </Box>
          </Box>
          <Box className="space-y-2">
            <Typography variant="h4">Props Reference</Typography>
            <Box className="space-y-2">
              <Typography variant="body2">
                • <code>variant</code>: "solid" | "dashed" | "dotted" |
                "gradient"
              </Typography>
              <Typography variant="body2">
                • <code>withContent</code>: boolean (center content)
              </Typography>
              <Typography variant="body2">
                • <code>animated</code>: boolean (pulse effect)
              </Typography>
              <Typography variant="body2">
                • <code>orientation</code>: "horizontal" | "vertical"
              </Typography>
              <Typography variant="body2">
                • <code>decorative</code>: boolean (default: true)
              </Typography>
              <Typography variant="body2">
                • <code>className</code>, <code>contentClassName</code>: string
                for custom styling
              </Typography>
              <Typography variant="body2">
                • Supports all standard HTML attributes
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
