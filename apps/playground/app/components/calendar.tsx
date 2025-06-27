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
  type DateRange,
  Icon,
  Typography,
} from '@veraclins-dev/ui';
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
                value={date}
                onValueChange={(value) => {
                  if (value instanceof Date) setDate(value);
                }}
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
                value={date}
                onValueChange={(value) => {
                  if (value instanceof Date) setDate(value);
                }}
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
                value={dateRange}
                onValueChange={(value) => {
                  if (value && typeof value === 'object' && 'from' in value) {
                    setDateRange(value as DateRange);
                  }
                }}
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
                value={dateRange}
                onValueChange={(value) => {
                  if (value && typeof value === 'object' && 'from' in value) {
                    setDateRange(value as DateRange);
                  }
                }}
                numberOfMonths={2}
                className="rounded-md border"
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
                value={date}
                onValueChange={(value) => {
                  if (value instanceof Date) setDate(value);
                }}
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
                value={date}
                onValueChange={(value) => {
                  if (value instanceof Date) setDate(value);
                }}
                className="rounded-md border"
              />
              <Typography
                variant="body2"
                className="text-muted-foreground mt-2"
              >
                Custom styling and modifiers coming soon
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
                    value={date}
                    onValueChange={(value) => {
                      if (value instanceof Date) setDate(value);
                    }}
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
                    value={dateRange}
                    onValueChange={(value) => {
                      if (
                        value &&
                        typeof value === 'object' &&
                        'from' in value
                      ) {
                        setDateRange(value as DateRange);
                      }
                    }}
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
          </Box>
        </CardContent>
      </Card>

      {/* Custom Calendar Component */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Calendar Component</CardTitle>
          <CardDescription>
            Our new custom calendar component with improved performance, better
            customization, and no external dependencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-6">
            {/* Single Selection */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Single Date Selection
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Basic single selection
                  </Typography>
                  <Calendar
                    value={date}
                    onValueChange={(value) => {
                      if (value instanceof Date) setDate(value);
                    }}
                    mode="single"
                    className="border rounded-lg"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    With disabled dates (weekends)
                  </Typography>
                  <Calendar
                    value={date}
                    onValueChange={(value) => {
                      if (value instanceof Date) setDate(value);
                    }}
                    mode="single"
                    disabled={(date) => {
                      const day = date.getDay();
                      return day === 0 || day === 6; // Disable weekends
                    }}
                    className="border rounded-lg"
                    numberOfMonths={1}
                  />
                </Box>
              </Box>
            </Box>

            {/* Multiple Selection */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Multiple Date Selection
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Select multiple dates
                  </Typography>
                  <Calendar
                    value={[]}
                    onValueChange={(value) => {
                      if (Array.isArray(value)) {
                        console.log(
                          'Select multiple dates Selected dates:',
                          value,
                        );
                      }
                    }}
                    mode="multiple"
                    className="border rounded-lg"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    With date constraints
                  </Typography>
                  <Calendar
                    value={[]}
                    onValueChange={(value) => {
                      if (Array.isArray(value)) {
                        console.log(
                          'With date constraints Selected dates:',
                          value,
                        );
                      }
                    }}
                    mode="multiple"
                    minDate={startOfToday()}
                    maxDate={addDays(startOfToday(), 30)}
                    className="border rounded-lg"
                  />
                </Box>
              </Box>
            </Box>

            {/* Range Selection */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Date Range Selection
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Date range with hover preview
                  </Typography>
                  <Calendar
                    value={dateRange}
                    onValueChange={(value) => {
                      if (
                        value &&
                        typeof value === 'object' &&
                        'from' in value
                      ) {
                        setDateRange(value as DateRange);
                      }
                    }}
                    mode="range"
                    className="border rounded-lg"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Range with disabled dates
                  </Typography>
                  <Calendar
                    value={dateRange}
                    onValueChange={(value) => {
                      if (
                        value &&
                        typeof value === 'object' &&
                        'from' in value
                      ) {
                        setDateRange(value as DateRange);
                      }
                    }}
                    mode="range"
                    disabled={(date) => {
                      const day = date.getDay();
                      return day === 0 || day === 6; // Disable weekends
                    }}
                    className="border rounded-lg"
                  />
                </Box>
              </Box>
            </Box>

            {/* Features Comparison */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Features Comparison
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-card-inner">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      • No external dependencies
                      <br />
                      • Optimized rendering
                      <br />
                      • Smaller bundle size
                      <br />• Better tree-shaking
                    </Typography>
                  </CardContent>
                </Card>
                <Card className="bg-card-inner">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Customization</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      • Full styling control
                      <br />
                      • Multiple themes
                      <br />
                      • Flexible variants
                      <br />• Design system integration
                    </Typography>
                  </CardContent>
                </Card>
                <Card className="bg-card-inner">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Accessibility</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      • WCAG 2.1 AA compliant
                      <br />
                      • Keyboard navigation
                      <br />
                      • Screen reader support
                      <br />• Focus management
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            {/* Navigation Features */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Navigation Features
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Month/Year Navigation
                  </Typography>
                  <Calendar
                    value={date}
                    onValueChange={(value) => {
                      if (value instanceof Date) setDate(value);
                    }}
                    mode="single"
                    showNavigation={true}
                    className="border rounded-lg"
                  />
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mt-2 text-xs"
                  >
                    • Previous/Next month buttons
                    <br />
                    • Month dropdown selector
                    <br />
                    • Year dropdown selector
                    <br />• Keyboard navigation support
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Keyboard Navigation
                  </Typography>
                  <Calendar
                    value={date}
                    onValueChange={(value) => {
                      if (value instanceof Date) setDate(value);
                    }}
                    mode="single"
                    showNavigation={true}
                    className="border rounded-lg"
                  />
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mt-2 text-xs"
                  >
                    • Arrow keys to navigate days
                    <br />
                    • Home/End for month start/end
                    <br />
                    • Page Up/Down for month changes
                    <br />• Enter/Space to select dates
                  </Typography>
                </Box>
              </Box>
            </Box>
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
