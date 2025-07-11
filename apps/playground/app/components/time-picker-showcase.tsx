'use client';

import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  TimePicker,
  type TimePickerProps,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function TimePickerShowcase() {
  const [timeValue12, setTimeValue12] = useState<string>('02:00 PM');
  const [timeValue24, setTimeValue24] = useState<string>('14:30');
  const [size, setSize] = useState<TimePickerProps['size']>('md');

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <PlaygroundBreadcrumb currentPage="TimePicker" className="mb-4" />

      <Typography variant="h1" className="text-center">
        TimePicker Component
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        A standalone time selection component with 12-hour and 24-hour format
        support.
      </Typography>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="clock" className="h-6 w-6" />
            Time Picker Instances
          </CardTitle>
          <CardDescription>
            Test the TimePicker component in isolation with different
            configurations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Box>
              <Typography variant="h4" className="mb-4">
                12-Hour Format
              </Typography>
              <TimePicker
                value={timeValue12}
                onChange={setTimeValue12}
                placeholder="Select time"
                size={size}
              />
              <Box className="mt-4">
                <Typography variant="body2" className="text-muted-foreground">
                  Selected: {timeValue12}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                24-Hour Format
              </Typography>
              <TimePicker
                value={timeValue24}
                onChange={setTimeValue24}
                placeholder="Select time"
                use24Hour={true}
                size={size}
              />
              <Box className="mt-4">
                <Typography variant="body2" className="text-muted-foreground">
                  Selected: {timeValue24}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                Size
              </Typography>
              <Box className="flex gap-2">
                <Button
                  variant={size === 'sm' ? 'solid' : 'outline'}
                  onClick={() => setSize('sm')}
                >
                  Small
                </Button>
                <Button
                  variant={size === 'md' ? 'solid' : 'outline'}
                  onClick={() => setSize('md')}
                >
                  Medium
                </Button>
                <Button
                  variant={size === 'lg' ? 'solid' : 'outline'}
                  onClick={() => setSize('lg')}
                >
                  Large
                </Button>
                <Button
                  variant={size === 'xl' ? 'solid' : 'outline'}
                  onClick={() => setSize('xl')}
                >
                  XLarge
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
