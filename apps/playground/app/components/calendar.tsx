import { useState } from 'react';

import {
  Box,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DatePickerField,
  DateRangePickerField,
  Icon,
  Typography,
} from '@veraclins-dev/ui';
import { type DateRange } from '@veraclins-dev/ui';
import { addDays, formatAsDate, startOfToday } from '@veraclins-dev/utils';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function CalendarShowcase() {
  const [date, setDate] = useState<Date | undefined>(startOfToday());
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfToday(),
    to: addDays(startOfToday(), 7),
  });

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Calendar" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Calendar Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Date selection components including calendars, date pickers, and range
        selectors for various use cases.
      </Typography>

      {/* Basic Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Calendar</CardTitle>
          <CardDescription>
            Simple calendar component for date display and selection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Single Month Calendar */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Single Month Calendar
              </Typography>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <Box className="mt-4">
                <Typography variant="body2" className="text-muted-foreground">
                  Selected:{' '}
                  {date ? formatAsDate(date, 'PPP') : 'No date selected'}
                </Typography>
              </Box>
            </Box>

            {/* Multiple Months Calendar */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Multiple Months Calendar
              </Typography>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className="rounded-md border"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Date Range Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Date Range Calendar</CardTitle>
          <CardDescription>
            Calendar for selecting date ranges with visual range indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Single Month Range */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Date Range (Single Month)
              </Typography>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-md border"
              />
              <Box className="mt-4">
                <Typography variant="body2" className="text-muted-foreground">
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        From: {formatAsDate(dateRange.from, 'PPP')} - To:{' '}
                        {formatAsDate(dateRange.to, 'PPP')}
                      </>
                    ) : (
                      <>From: {formatAsDate(dateRange.from, 'PPP')}</>
                    )
                  ) : (
                    'No date range selected'
                  )}
                </Typography>
              </Box>
            </Box>

            {/* Multiple Months Range */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Date Range (Multiple Months)
              </Typography>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="rounded-md border"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Date Picker Fields */}
      <Card>
        <CardHeader>
          <CardTitle>Date Picker Fields</CardTitle>
          <CardDescription>
            Form-integrated date picker components with popover calendars
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Single Date Picker */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Single Date Picker
              </Typography>
              <DatePickerField
                label="Select Date"
                selected={date}
                onSelect={setDate}
                mode="single"
              />
            </Box>

            {/* Date Range Picker */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Date Range Picker
              </Typography>
              <DateRangePickerField
                label="Select Date Range"
                selected={dateRange}
                onSelect={setDateRange}
                mode="range"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Calendar with Modifiers */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar with Modifiers</CardTitle>
          <CardDescription>
            Calendar with disabled dates, highlighted dates, and custom styling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Disabled Dates */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Disabled Dates
              </Typography>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => {
                  // Disable weekends and past dates
                  const today = startOfToday();
                  const day = date.getDay();
                  return date < today || day === 0 || day === 6;
                }}
                className="rounded-md border"
              />
              <Typography
                variant="body2"
                className="text-muted-foreground mt-2"
              >
                Weekends and past dates are disabled
              </Typography>
            </Box>

            {/* Highlighted Dates */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Highlighted Dates
              </Typography>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                modifiers={{
                  highlighted: [
                    addDays(startOfToday(), 1),
                    addDays(startOfToday(), 3),
                    addDays(startOfToday(), 5),
                  ],
                }}
                modifiersStyles={{
                  highlighted: {
                    backgroundColor: 'hsl(var(--warning))',
                    color: 'hsl(var(--warning-foreground))',
                  },
                }}
                className="rounded-md border"
              />
              <Typography
                variant="body2"
                className="text-muted-foreground mt-2"
              >
                Highlighted dates are marked in warning color
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Real-Life Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Life Calendar Examples</CardTitle>
          <CardDescription>
            Practical calendar implementations for common use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Event Booking Calendar */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="calendar" className="h-5 w-5" />
                  Event Booking
                </CardTitle>
                <CardDescription>
                  Calendar for booking appointments and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="space-y-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => {
                      // Disable past dates and weekends
                      const today = startOfToday();
                      const day = date.getDay();
                      return date < today || day === 0 || day === 6;
                    }}
                    className="rounded-md border"
                  />
                  <Box className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="clock" className="mr-1" />
                      Check Availability
                    </Button>
                    <Button size="sm">
                      <Icon name="plus" className="mr-1" />
                      Book Appointment
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Vacation Planning Calendar */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="paper-airplane" className="h-5 w-5" />
                  Vacation Planning
                </CardTitle>
                <CardDescription>
                  Date range picker for planning trips and vacations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="space-y-4">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="rounded-md border"
                  />
                  <Box className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="search" className="mr-1" />
                      Search Flights
                    </Button>
                    <Button size="sm">
                      <Icon name="heart" className="mr-1" />
                      Save Trip
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Meeting Scheduler */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="users" className="h-5 w-5" />
                  Meeting Scheduler
                </CardTitle>
                <CardDescription>
                  Calendar for scheduling team meetings and calls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="space-y-4">
                  <DatePickerField
                    label="Meeting Date"
                    selected={date}
                    onSelect={setDate}
                    mode="single"
                  />
                  <Box className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="video" className="mr-1" />
                      Video Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="phone" className="mr-1" />
                      Phone Call
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Project Timeline */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="chart-bar" className="h-5 w-5" />
                  Project Timeline
                </CardTitle>
                <CardDescription>
                  Date range for project planning and milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="space-y-4">
                  <DateRangePickerField
                    label="Project Duration"
                    selected={dateRange}
                    onSelect={setDateRange}
                    mode="range"
                  />
                  <Box className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="flag" className="mr-1" />
                      Add Milestone
                    </Button>
                    <Button size="sm">
                      <Icon name="check" className="mr-1" />
                      Save Timeline
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Accessibility and Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility and Best Practices</CardTitle>
          <CardDescription>
            Guidelines for implementing accessible calendar components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Box>
              <Typography variant="h4" className="mb-2">
                Keyboard Navigation
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                • Use arrow keys to navigate between dates
                <br />
                • Press Enter or Space to select a date
                <br />
                • Use Tab to navigate between calendar elements
                <br />• Escape key closes popover calendars
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-2">
                Screen Reader Support
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                • All calendar elements have proper ARIA labels
                <br />
                • Selected dates are announced to screen readers
                <br />
                • Disabled dates are properly marked
                <br />• Date ranges are clearly communicated
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-2">
                Mobile Considerations
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                • Touch-friendly date selection
                <br />
                • Responsive design for different screen sizes
                <br />
                • Swipe gestures for month navigation
                <br />• Optimized popover positioning
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
