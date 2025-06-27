'use client';

import { useState } from 'react';

import { Calendar } from './calendar';
import type { DateRange } from './calendar-types';

/**
 * Calendar showcase component for testing and demonstration
 */
export function CalendarShowcase() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const handleSingleDateChange = (value: Date | Date[] | DateRange) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const handleMultipleDatesChange = (value: Date | Date[] | DateRange) => {
    if (Array.isArray(value)) {
      setSelectedDates(value);
    }
  };

  const handleRangeChange = (value: Date | Date[] | DateRange) => {
    if (value && typeof value === 'object' && 'from' in value) {
      setSelectedRange(value as DateRange);
    }
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Calendar Component Showcase</h2>
        <p className="text-muted-foreground mb-6">
          This showcases the new custom calendar component with different
          selection modes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Single Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Single Selection</h3>
          <Calendar
            value={selectedDate}
            onValueChange={handleSingleDateChange}
            mode="single"
            className="border rounded-lg"
          />
          <div className="text-sm text-muted-foreground">
            Selected:{' '}
            {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
          </div>
        </div>

        {/* Multiple Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Multiple Selection</h3>
          <Calendar
            value={selectedDates}
            onValueChange={handleMultipleDatesChange}
            mode="multiple"
            className="border rounded-lg"
          />
          <div className="text-sm text-muted-foreground">
            Selected:{' '}
            {selectedDates.length > 0
              ? selectedDates.map((d) => d.toLocaleDateString()).join(', ')
              : 'None'}
          </div>
        </div>

        {/* Range Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Range Selection</h3>
          <Calendar
            value={selectedRange}
            onValueChange={handleRangeChange}
            mode="range"
            className="border rounded-lg"
          />
          <div className="text-sm text-muted-foreground">
            Range:{' '}
            {selectedRange?.from
              ? `${selectedRange.from.toLocaleDateString()}${selectedRange.to ? ` - ${selectedRange.to.toLocaleDateString()}` : ''}`
              : 'None'}
          </div>
        </div>
      </div>

      {/* Today Button Example */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Today Button</h3>
        <Calendar
          value={selectedDate}
          onValueChange={handleSingleDateChange}
          mode="single"
          showTodayButton={true}
          className="border rounded-lg"
        />
      </div>

      {/* Disabled Dates Example */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Disabled Dates</h3>
        <Calendar
          value={selectedDate}
          onValueChange={handleSingleDateChange}
          mode="single"
          disabled={(date) => date.getDay() === 0 || date.getDay() === 6} // Disable weekends
          className="border rounded-lg"
        />
      </div>
    </div>
  );
}
