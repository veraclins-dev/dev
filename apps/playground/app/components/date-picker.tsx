import { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DatePicker,
  type DatePickerValue,
  type DateRange,
  Label,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function DatePickerShowcase() {
  const [singleDate, setSingleDate] = useState<DatePickerValue | undefined>();
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>();
  const [multipleDates, setMultipleDates] = useState<
    DatePickerValue | undefined
  >();
  const [popoverDate, setPopoverDate] = useState<DatePickerValue | undefined>();
  const [dialogDate, setDialogDate] = useState<DatePickerValue | undefined>();
  const [inlineDate, setInlineDate] = useState<DatePickerValue | undefined>();

  return (
    <Box className="space-y-8">
      <PlaygroundBreadcrumb currentPage="DatePicker" />

      <Box>
        <Typography variant="h1" className="mb-2">
          DatePicker
        </Typography>
        <Typography variant="body1" className="text-muted-foreground">
          A flexible date picker component with multiple display variants and
          full calendar integration.
        </Typography>
      </Box>

      {/* Basic Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Usage</CardTitle>
          <CardDescription>
            Simple date picker with different variants and configurations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box>
            <Typography variant="h4" className="mb-4">
              Display Variants
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box>
                <Label className="mb-2 block">Popover Variant (Default)</Label>
                <DatePicker
                  value={popoverDate}
                  onValueChange={setPopoverDate}
                  placeholder="Select date"
                  clearable
                />
              </Box>
              <Box>
                <Label className="mb-2 block">Dialog Variant</Label>
                <DatePicker
                  variant="dialog"
                  value={dialogDate}
                  onValueChange={setDialogDate}
                  placeholder="Select date"
                  clearable
                />
              </Box>
              <Box>
                <Label className="mb-2 block">Inline Variant</Label>
                <DatePicker
                  variant="inline"
                  value={inlineDate}
                  onValueChange={setInlineDate}
                  placeholder="Select date"
                  clearable
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Selection Modes */}
      <Card>
        <CardHeader>
          <CardTitle>Selection Modes</CardTitle>
          <CardDescription>
            Different selection modes supported by the DatePicker
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box>
            <Typography variant="h4" className="mb-4">
              Single Date Selection
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box>
                <Label className="mb-2 block">Basic Single Selection</Label>
                <DatePicker
                  value={singleDate}
                  onValueChange={setSingleDate}
                  placeholder="Select a date"
                  clearable
                />
              </Box>
              <Box>
                <Label className="mb-2 block">With Time Picker</Label>
                <DatePicker
                  value={singleDate}
                  onValueChange={setSingleDate}
                  placeholder="Select date and time"
                  showTimePicker
                  clearable
                />
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h4" className="mb-4">
              Range Selection
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box>
                <Label className="mb-2 block">Date Range</Label>
                <DatePicker
                  mode="range"
                  value={rangeDate}
                  onValueChange={setRangeDate}
                  placeholder="Select date range"
                  clearable
                />
              </Box>
              <Box>
                <Label className="mb-2 block">Range with Multiple Months</Label>
                <DatePicker
                  mode="range"
                  value={rangeDate}
                  onValueChange={setRangeDate}
                  placeholder="Select date range"
                  numberOfMonths={2}
                  clearable
                />
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h4" className="mb-4">
              Multiple Date Selection
            </Typography>
            <Box>
              <Label className="mb-2 block">Multiple Dates</Label>
              <DatePicker
                mode="multiple"
                value={multipleDates}
                onValueChange={setMultipleDates}
                placeholder="Select multiple dates"
                clearable
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Features</CardTitle>
          <CardDescription>
            Advanced features and configurations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box>
            <Typography variant="h4" className="mb-4">
              Calendar Features
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box>
                <Label className="mb-2 block">With Today Button</Label>
                <DatePicker
                  value={singleDate}
                  onValueChange={setSingleDate}
                  placeholder="Select date"
                  showTodayButton
                  clearable
                />
              </Box>
              <Box>
                <Label className="mb-2 block">
                  With Time Picker & Today Button
                </Label>
                <DatePicker
                  value={singleDate}
                  onValueChange={setSingleDate}
                  placeholder="Select date and time"
                  showTimePicker
                  showTodayButton
                  clearable
                />
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h4" className="mb-4">
              States and Validation
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box>
                <Label className="mb-2 block">Disabled State</Label>
                <DatePicker
                  value={singleDate}
                  onValueChange={setSingleDate}
                  placeholder="Disabled date picker"
                  disabled
                />
              </Box>
              <Box>
                <Label className="mb-2 block">Read-only State</Label>
                <DatePicker
                  value={new Date()}
                  onValueChange={setSingleDate}
                  placeholder="Read-only date picker"
                  disabled
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* API Reference */}
      <Card>
        <CardHeader>
          <CardTitle>API Reference</CardTitle>
          <CardDescription>Key props and configuration options</CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Box>
              <Typography variant="h4" className="mb-2">
                Props
              </Typography>
              <Box className="space-y-2">
                <Typography variant="body2">
                  <code>variant</code> - Display variant: 'popover' | 'dialog' |
                  'inline'
                </Typography>
                <Typography variant="body2">
                  <code>value</code> - Selected date value
                </Typography>
                <Typography variant="body2">
                  <code>onValueChange</code> - Callback when value changes
                </Typography>
                <Typography variant="body2">
                  <code>mode</code> - Selection mode: 'single' | 'range' |
                  'multiple'
                </Typography>
                <Typography variant="body2">
                  <code>placeholder</code> - Input placeholder text
                </Typography>
                <Typography variant="body2">
                  <code>clearable</code> - Show clear button
                </Typography>
                <Typography variant="body2">
                  <code>showTimePicker</code> - Show time picker
                </Typography>
                <Typography variant="body2">
                  <code>showTodayButton</code> - Show today button
                </Typography>
                <Typography variant="body2">
                  <code>numberOfMonths</code> - Number of months to display
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
