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
  type Time,
  TimePicker,
  TimePickerField,
  type TimePickerProps,
  Typography,
} from '@veraclins-dev/ui';
import { getCurrentTime } from '@veraclins-dev/utils';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function TimePickerShowcase() {
  const [timeValue12, setTimeValue12] = useState<Time>(() =>
    getCurrentTime({ use24Hour: false }),
  );

  const [timeValue24, setTimeValue24] = useState<Time>({
    hr: '14',
    min: '30',
    period: 'PM',
    string: '14:30',
  });
  const [size, setSize] = useState<TimePickerProps['size']>('md');

  // Form field states
  const [formData, setFormData] = useState({
    startTime: {
      hr: '09',
      min: '00',
      period: 'AM',
      string: '09:00 AM',
    },
    endTime: {
      hr: '05',
      min: '30',
      period: 'PM',
      string: '05:30 PM',
    },
    breakTime: {
      hr: '12',
      min: '00',
      period: 'PM',
      string: '12:00 PM',
    },
    workTime: {
      hr: '08',
      min: '30',
      period: 'PM',
      string: '08:30 PM',
    },
  });

  const handleFormChange = (field: string, value: Time) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
                <Typography className="text-foreground/80">
                  Selected: {timeValue12.string}
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
                <Typography className="text-foreground/80">
                  Selected: {timeValue24.string}
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="input" className="h-6 w-6" />
            TimePickerField Form Integration
          </CardTitle>
          <CardDescription>
            TimePickerField with form integration, labels, and validation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Box>
              <Typography variant="h4" className="mb-4">
                Work Schedule
              </Typography>
              <Box className="space-y-4">
                <TimePickerField
                  name="startTime"
                  label="Start Time"
                  value={formData.startTime.string}
                  onChange={(value) => handleFormChange('startTime', value)}
                  placeholder="Select start time"
                  size={size}
                />

                <TimePickerField
                  name="endTime"
                  label="End Time"
                  value={formData.endTime as Time}
                  onChange={(value) => handleFormChange('endTime', value)}
                  placeholder="Select end time"
                  size={size}
                />
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                24-Hour Format
              </Typography>
              <Box className="space-y-4">
                <TimePickerField
                  name="workTime"
                  label="Work Time"
                  value={formData.workTime as Time}
                  onChange={(value) => handleFormChange('workTime', value)}
                  placeholder="Select work time"
                  use24Hour={true}
                  size={size}
                />

                <TimePickerField
                  name="breakTime"
                  label="Break Time"
                  value={formData.breakTime as Time}
                  onChange={(value) => handleFormChange('breakTime', value)}
                  placeholder="Select break time"
                  size={size}
                />
              </Box>
            </Box>
          </Box>

          <Box className="mt-6 p-4 bg-muted rounded-lg">
            <Typography variant="h5" className="mb-2">
              Form Data
            </Typography>
            <Box className="space-y-1 text-sm">
              <Typography>Start Time: {formData.startTime.string}</Typography>
              <Typography>End Time: {formData.endTime.string}</Typography>
              <Typography>Work Time: {formData.workTime.string}</Typography>
              <Typography>Break Time: {formData.breakTime.string}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
