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
  List,
  ListItem,
  TimePicker,
  Typography,
} from '@veraclins-dev/ui';
import {
  addDays,
  formatDate,
  startOfToday,
  subtractDays,
} from '@veraclins-dev/utils';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function CalendarShowcase() {
  // State for different calendar modes
  const [singleDate, setSingleDate] = useState<Date | undefined>(
    subtractDays(startOfToday(), 3),
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subtractDays(startOfToday(), 3),
    to: addDays(startOfToday(), 7),
  });
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);

  // State for time picker
  const [timeValue, setTimeValue] = useState<string>('12:00 PM');

  // State for real-world examples
  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [vacationRange, setVacationRange] = useState<DateRange | undefined>();

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <PlaygroundBreadcrumb currentPage="Calendar" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Calendar Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Comprehensive date and time selection components with advanced features,
        accessibility, and real-world use cases.
      </Typography>

      {/* ==================== BASIC FEATURES ==================== */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="calendar" className="h-6 w-6" />
            Basic Calendar Features
          </CardTitle>
          <CardDescription>
            Core calendar functionality with different selection modes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Single Date Selection */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Single Date Selection
              </Typography>
              <Calendar
                mode="single"
                value={singleDate}
                onValueChange={(value) => {
                  if (value instanceof Date) setSingleDate(value);
                }}
                className="rounded-lg border"
              />
              <Box className="mt-4">
                <Typography variant="body2" className="text-muted-foreground">
                  Selected:{' '}
                  {singleDate
                    ? formatDate(singleDate, 'PPP')
                    : 'No date selected'}
                </Typography>
              </Box>
            </Box>

            {/* Date Range Selection */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Date Range Selection
              </Typography>
              <Calendar
                mode="range"
                value={dateRange}
                onValueChange={(value) => {
                  if (value && typeof value === 'object' && 'from' in value) {
                    setDateRange(value as DateRange);
                  }
                }}
                className="rounded-lg border"
              />
              <Box className="mt-4">
                <Typography variant="body2" className="text-muted-foreground">
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        From: {formatDate(dateRange.from, 'PPP')} - To:{' '}
                        {formatDate(dateRange.to, 'PPP')}
                      </>
                    ) : (
                      <>From: {formatDate(dateRange.from, 'PPP')}</>
                    )
                  ) : (
                    'No date range selected'
                  )}
                </Typography>
              </Box>
            </Box>

            {/* Multiple Date Selection */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Multiple Date Selection
              </Typography>
              <Calendar
                mode="multiple"
                value={multipleDates}
                onValueChange={(value) => {
                  if (Array.isArray(value)) {
                    setMultipleDates(value);
                  }
                }}
                className="rounded-lg border"
              />
              <Box className="mt-4">
                <Typography variant="body2" className="text-muted-foreground">
                  Selected: {multipleDates.length} date
                  {multipleDates.length !== 1 ? 's' : ''}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ==================== ADVANCED FEATURES ==================== */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="cog" className="h-6 w-6" />
            Advanced Calendar Features
          </CardTitle>
          <CardDescription>
            Enhanced functionality with constraints, navigation, and
            customization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-8">
            {/* Multi-Month Display */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Multi-Month Display
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Two Months Side by Side
                  </Typography>
                  <Calendar
                    mode="single"
                    value={singleDate}
                    onValueChange={(value) => {
                      if (value instanceof Date) setSingleDate(value);
                    }}
                    numberOfMonths={2}
                    className="rounded-lg border"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Multi-Month Range Selection
                  </Typography>
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
                    className="rounded-lg border"
                  />
                </Box>
              </Box>
            </Box>

            {/* Date Constraints */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Date Constraints & Validation
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Disabled Weekends & Past Dates
                  </Typography>
                  <Calendar
                    mode="single"
                    value={singleDate}
                    onValueChange={(value) => {
                      if (value instanceof Date) setSingleDate(value);
                    }}
                    disabled={(date) => {
                      const today = startOfToday();
                      const day = date.getDay();
                      return date < today || day === 0 || day === 6;
                    }}
                    className="rounded-lg border"
                  />
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mt-2"
                  >
                    Weekends and past dates are disabled
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Date Range with Min/Max Constraints
                  </Typography>
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
                    minDate={startOfToday()}
                    maxDate={addDays(startOfToday(), 90)}
                    className="rounded-lg border"
                  />
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mt-2"
                  >
                    Only future dates within 90 days
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Navigation Features */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Navigation & Interaction
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Enhanced Navigation Controls
                  </Typography>
                  <Calendar
                    mode="single"
                    value={singleDate}
                    onValueChange={(value) => {
                      if (value instanceof Date) setSingleDate(value);
                    }}
                    showNavigation={true}
                    className="rounded-lg border"
                  />
                  <List
                    className="text-muted-foreground text-sm mt-2"
                    variant="ul"
                  >
                    <ListItem variant="default" size="sm">
                      Month/Year dropdown selectors
                    </ListItem>
                    <ListItem variant="default" size="sm">
                      Previous/Next month buttons
                    </ListItem>
                    <ListItem variant="default" size="sm">
                      Keyboard navigation support
                    </ListItem>
                  </List>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Today Button Integration
                  </Typography>
                  <Calendar
                    mode="single"
                    value={singleDate}
                    onValueChange={(value) => {
                      if (value instanceof Date) setSingleDate(value);
                    }}
                    showTodayButton={true}
                    className="rounded-lg border"
                  />
                  <List
                    className="text-muted-foreground text-sm mt-2"
                    variant="ul"
                  >
                    <ListItem variant="default" size="sm">
                      Quick navigation to today
                    </ListItem>
                    <ListItem variant="default" size="sm">
                      Respects disabled constraints
                    </ListItem>
                    <ListItem variant="default" size="sm">
                      Customizable behavior
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ==================== TIME PICKER INTEGRATION ==================== */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="clock" className="h-6 w-6" />
            Time Picker Integration
          </CardTitle>
          <CardDescription>
            Advanced time selection with calendar integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-8">
            {/* Standalone Time Picker */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Standalone Time Picker
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Basic Time Picker (12h)
                  </Typography>
                  <TimePicker
                    value={timeValue}
                    onChange={setTimeValue}
                    placeholder="Select time"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    24-Hour Format
                  </Typography>
                  <TimePicker
                    value={timeValue}
                    onChange={setTimeValue}
                    placeholder="Select time"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    With Seconds
                  </Typography>
                  <TimePicker
                    value={timeValue}
                    onChange={setTimeValue}
                    placeholder="Select time"
                    showSeconds={true}
                    use24Hour={true}
                  />
                </Box>
              </Box>
            </Box>

            {/* Calendar with Time Picker */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Calendar with Time Picker
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Date + Time Selection
                  </Typography>
                  <Calendar
                    mode="single"
                    value={singleDate}
                    onValueChange={(value) => {
                      if (value instanceof Date) setSingleDate(value);
                    }}
                    showTodayButton={true}
                    showTimePicker={true}
                    timeValue={timeValue}
                    onTimeChange={setTimeValue}
                    className="rounded-lg border"
                  />
                  <Box className="mt-4">
                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      Selected:{' '}
                      {singleDate ? formatDate(singleDate, 'PPP') : 'No date'}{' '}
                      at {timeValue}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Advanced Time Picker Features
                  </Typography>
                  <TimePicker
                    value={timeValue}
                    onChange={setTimeValue}
                    placeholder="Select time"
                    use24Hour={true}
                  />
                  <List
                    className="text-muted-foreground text-sm mt-2"
                    variant="ul"
                  >
                    <ListItem variant="default" size="sm">
                      Business hours only (9 AM - 5 PM)
                    </ListItem>
                    <ListItem variant="default" size="sm">
                      Lunch break disabled (12-1 PM)
                    </ListItem>
                    <ListItem variant="default" size="sm">
                      Format toggle and "Now" button
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ==================== REAL-WORLD EXAMPLES ==================== */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="light-bulb" className="h-6 w-6" />
            Real-World Examples
          </CardTitle>
          <CardDescription>
            Practical implementations for common use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Event Booking System */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="calendar" className="h-5 w-5" />
                  Event Booking System
                </CardTitle>
                <CardDescription>
                  Calendar for booking appointments and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="space-y-4">
                  <Calendar
                    mode="single"
                    value={bookingDate}
                    onValueChange={(value) => {
                      if (value instanceof Date) setBookingDate(value);
                    }}
                    disabled={(date) => {
                      const today = startOfToday();
                      const day = date.getDay();
                      return date < today || day === 0 || day === 6;
                    }}
                    showTodayButton={true}
                    showTimePicker={true}
                    timeValue={timeValue}
                    onTimeChange={setTimeValue}
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
                  <Box className="text-muted-foreground">
                    <Typography variant="body2" className="mb-2">
                      Features:
                    </Typography>
                    <List variant="ul">
                      <ListItem variant="default" size="sm">
                        Business days only (Mon-Fri)
                      </ListItem>
                      <ListItem variant="default" size="sm">
                        Past dates disabled
                      </ListItem>
                      <ListItem variant="default" size="sm">
                        Time selection included
                      </ListItem>
                      <ListItem variant="default" size="sm">
                        Availability checking
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Vacation Planning */}
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
                    value={vacationRange}
                    onValueChange={(value) => {
                      if (
                        value &&
                        typeof value === 'object' &&
                        'from' in value
                      ) {
                        setVacationRange(value as DateRange);
                      }
                    }}
                    numberOfMonths={2}
                    minDate={startOfToday()}
                    maxDate={addDays(startOfToday(), 365)}
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
                  <Box className="text-muted-foreground">
                    <Typography variant="body2" className="mb-2">
                      Features:
                    </Typography>
                    <List variant="ul">
                      <ListItem variant="default" size="sm">
                        Multi-month range selection
                      </ListItem>
                      <ListItem variant="default" size="sm">
                        Future dates only (up to 1 year)
                      </ListItem>
                      <ListItem variant="default" size="sm">
                        Visual range indicators
                      </ListItem>
                      <ListItem variant="default" size="sm">
                        Trip planning integration
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* ==================== ACCESSIBILITY & BEST PRACTICES ==================== */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="accessibility" className="h-6 w-6" />
            Accessibility & Best Practices
          </CardTitle>
          <CardDescription>
            Guidelines for implementing accessible calendar components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Box>
              <Typography variant="h4" className="mb-3">
                Keyboard Navigation
              </Typography>
              <List className="text-muted-foreground" variant="ul">
                <ListItem variant="default" size="sm">
                  Arrow keys to navigate between dates
                </ListItem>
                <ListItem variant="default" size="sm">
                  Enter or Space to select a date
                </ListItem>
                <ListItem variant="default" size="sm">
                  Tab to navigate between elements
                </ListItem>
                <ListItem variant="default" size="sm">
                  Escape key closes popovers
                </ListItem>
                <ListItem variant="default" size="sm">
                  Home/End for month start/end
                </ListItem>
                <ListItem variant="default" size="sm">
                  Page Up/Down for month changes
                </ListItem>
              </List>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-3">
                Screen Reader Support
              </Typography>
              <List className="text-muted-foreground" variant="ul">
                <ListItem variant="default" size="sm">
                  Proper ARIA labels on all elements
                </ListItem>
                <ListItem variant="default" size="sm">
                  Selected dates announced to screen readers
                </ListItem>
                <ListItem variant="default" size="sm">
                  Disabled dates properly marked
                </ListItem>
                <ListItem variant="default" size="sm">
                  Date ranges clearly communicated
                </ListItem>
                <ListItem variant="default" size="sm">
                  Focus management and indicators
                </ListItem>
                <ListItem variant="default" size="sm">
                  WCAG 2.1 AA compliant
                </ListItem>
              </List>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-3">
                Mobile & Responsive
              </Typography>
              <List className="text-muted-foreground" variant="ul">
                <ListItem variant="default" size="sm">
                  Touch-friendly date selection
                </ListItem>
                <ListItem variant="default" size="sm">
                  Responsive design for all screen sizes
                </ListItem>
                <ListItem variant="default" size="sm">
                  Optimized popover positioning
                </ListItem>
                <ListItem variant="default" size="sm">
                  Swipe gestures for navigation
                </ListItem>
                <ListItem variant="default" size="sm">
                  High contrast mode support
                </ListItem>
                <ListItem variant="default" size="sm">
                  Reduced motion preferences
                </ListItem>
              </List>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ==================== FEATURES COMPARISON ==================== */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="chart-bar" className="h-6 w-6" />
            Component Features
          </CardTitle>
          <CardDescription>
            Overview of calendar and time picker capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-card-inner">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Calendar Features</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <List className="text-muted-foreground" variant="ul">
                  <ListItem variant="default" size="sm">
                    Single, range, and multiple selection
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Multi-month display
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Date constraints and validation
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Today button integration
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Keyboard navigation
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Custom styling support
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card className="bg-card-inner">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Time Picker Features</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <List className="text-muted-foreground" variant="ul">
                  <ListItem variant="default" size="sm">
                    12h and 24h format support
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Configurable minute intervals
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Manual input with validation
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Time range restrictions
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    "Now" button and format toggle
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Timezone support
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card className="bg-card-inner">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Performance</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <List className="text-muted-foreground" variant="ul">
                  <ListItem variant="default" size="sm">
                    No external dependencies
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Optimized rendering
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Smaller bundle size
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Better tree-shaking
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Efficient state management
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Minimal re-renders
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card className="bg-card-inner">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Integration</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <List className="text-muted-foreground" variant="ul">
                  <ListItem variant="default" size="sm">
                    Form library integration
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Design system compatible
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    TypeScript support
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Customizable themes
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Event handling
                  </ListItem>
                  <ListItem variant="default" size="sm">
                    Accessibility ready
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
