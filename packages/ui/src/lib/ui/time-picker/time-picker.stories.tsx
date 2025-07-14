import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TimePicker } from './time-picker';

const meta: Meta<typeof TimePicker> = {
  title: 'Input Fields/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showSeconds: {
      control: { type: 'boolean' },
      description: 'Whether to show seconds selection',
    },
    use24Hour: {
      control: { type: 'boolean' },
      description: 'Whether to use 24-hour format',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the input',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ==================== BASIC STORIES ====================

export const Basic: Story = {
  args: {
    placeholder: 'Choose a time',
  },
};

export const TwentyFourHour: Story = {
  args: {
    placeholder: 'Choose a time',
    use24Hour: true,
  },
};

export const WithSeconds: Story = {
  args: {
    placeholder: 'Choose a time',
    showSeconds: true,
  },
};

export const TwentyFourHourWithSeconds: Story = {
  args: {
    placeholder: 'Choose a time',
    use24Hour: true,
    showSeconds: true,
  },
};

// ==================== INTERACTIVE STORIES ====================

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = useState('2:30 PM');

    return (
      <div className="space-y-4">
        <TimePicker {...args} value={value} onChange={setValue} />
        <div className="text-sm text-muted-foreground">
          <p>Selected time: {value}</p>
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Choose a time',
  },
};

export const Controlled24Hour: Story = {
  render: function Controlled24HourStory(args) {
    const [value, setValue] = useState('14:30');

    return (
      <div className="space-y-4">
        <TimePicker {...args} value={value} onChange={setValue} />
        <div className="text-sm text-muted-foreground">
          <p>Selected time: {value}</p>
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Choose a time',
    use24Hour: true,
  },
};

// ==================== COMPLEX EXAMPLES ====================

export const SchedulingExample: Story = {
  render: function SchedulingStory(args) {
    const [startTime, setStartTime] = useState('9:00 AM');
    const [endTime, setEndTime] = useState('5:00 PM');

    return (
      <div className="space-y-4 w-80">
        <h3 className="text-lg font-semibold">Schedule Meeting</h3>
        <TimePicker
          {...args}
          placeholder="Start Time"
          value={startTime}
          onChange={setStartTime}
        />
        <TimePicker
          {...args}
          placeholder="End Time"
          value={endTime}
          onChange={setEndTime}
        />
        <div className="text-sm text-muted-foreground">
          <p>
            Duration: {endTime && startTime ? 'Calculating...' : 'Select times'}
          </p>
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Choose a time',
  },
};

export const InternationalExample: Story = {
  render: function InternationalStory(args) {
    const [localTime, setLocalTime] = useState('2:30 PM');
    const [utcTime, setUtcTime] = useState('14:30');

    return (
      <div className="space-y-4 w-80">
        <h3 className="text-lg font-semibold">International Meeting</h3>
        <TimePicker
          {...args}
          placeholder="Local Time (12h)"
          value={localTime}
          onChange={setLocalTime}
        />
        <TimePicker
          {...args}
          placeholder="UTC Time (24h)"
          value={utcTime}
          onChange={setUtcTime}
          use24Hour={true}
        />
        <div className="text-sm text-muted-foreground">
          <p>Local time: {localTime}</p>
          <p>UTC time: {utcTime}</p>
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Choose a time',
  },
};

// ==================== ACCESSIBILITY STORIES ====================

export const Accessibility: Story = {
  args: {
    placeholder: 'Accessible Time Picker',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This time picker includes full keyboard navigation, ARIA labels, and screen reader support.',
      },
    },
  },
};

// ==================== MOBILE STORIES ====================

export const MobileOptimized: Story = {
  args: {
    placeholder: 'Mobile Time Picker',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// ==================== CUSTOMIZATION STORIES ====================

export const CustomStyling: Story = {
  args: {
    placeholder: 'Custom Styled Time Picker',
    className: 'w-48',
    inputProps: {
      className: 'bg-blue-50 border-blue-200',
    },
    contentProps: {
      className: 'bg-white shadow-lg border-2 border-blue-200',
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled Time Picker',
    inputProps: {
      disabled: true,
    },
  },
};
