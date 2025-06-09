import type { Meta, StoryObj } from '@storybook/react';

import { Box } from './box';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Typography } from './typography';

const meta = {
  title: 'Base/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The RadioGroup component provides a set of radio buttons where only one option can be selected at a time. It's built on top of Radix UI's RadioGroup primitive and includes additional features like labels and custom styling.

## Features
- Single selection from multiple options
- Customizable labels and styling
- Built-in accessibility features
- Support for custom label components

## Usage
The RadioGroup component can be used in two ways:
1. Using the RadioGroup and RadioGroupItem components together
2. Using the RadioGroupItem component with custom label props

## Props
### RadioGroup Props
- \`defaultValue\`: The default selected value
- \`value\`: The currently selected value
- \`onValueChange\`: Callback when value changes
- \`className\`: Additional CSS classes
- \`id\`: Unique identifier for the radio group

### RadioGroupItem Props
- \`value\`: The value of the radio button
- \`label\`: The label text or element
- \`labelProps\`: Props to pass to the Label component
- \`className\`: Additional CSS classes
- \`id\`: Unique identifier for the radio button
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <RadioGroup defaultValue="option1" id="basic-radio-group">
        <RadioGroupItem id="option1" value="option1" label="Option 1" />
        <RadioGroupItem id="option2" value="option2" label="Option 2" />
        <RadioGroupItem id="option3" value="option3" label="Option 3" />
      </RadioGroup>
    </Box>
  ),
};

export const WithCustomLabels: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <RadioGroup defaultValue="option1">
        <RadioGroupItem
          id="custom-option1"
          value="option1"
          label="Option 1"
          labelProps={{ className: 'text-sm font-medium text-blue-600' }}
        />
        <RadioGroupItem
          id="custom-option2"
          value="option2"
          label="Option 2"
          labelProps={{ className: 'text-sm font-medium text-green-600' }}
        />
        <RadioGroupItem
          id="custom-option3"
          value="option3"
          label="Option 3"
          labelProps={{ className: 'text-sm font-medium text-red-600' }}
        />
      </RadioGroup>
    </Box>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <RadioGroup defaultValue="option1" className="flex flex-row gap-6">
        <RadioGroupItem
          id="horizontal-option1"
          value="option1"
          label="Option 1"
        />
        <RadioGroupItem
          id="horizontal-option2"
          value="option2"
          label="Option 2"
        />
        <RadioGroupItem
          id="horizontal-option3"
          value="option3"
          label="Option 3"
        />
      </RadioGroup>
    </Box>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <RadioGroup defaultValue="option1">
        <RadioGroupItem id="enabled-option1" value="option1" label="Option 1" />
        <RadioGroupItem
          id="disabled-option2"
          value="option2"
          label="Option 2"
          disabled
        />
        <RadioGroupItem id="enabled-option3" value="option3" label="Option 3" />
      </RadioGroup>
    </Box>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <RadioGroup defaultValue="option1">
        <RadioGroupItem
          id="custom-content-option1"
          value="option1"
          label={
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" className="font-medium">
                Option 1
              </Typography>
              <Typography variant="body2" className="text-sm text-gray-500">
                Description for option 1
              </Typography>
            </Box>
          }
        />
        <RadioGroupItem
          id="custom-content-option2"
          value="option2"
          label={
            <div className="flex flex-col">
              <span className="font-medium">Option 2</span>
              <span className="text-sm text-gray-500">
                Description for option 2
              </span>
            </div>
          }
        />
        <RadioGroupItem
          id="custom-content-option3"
          value="option3"
          label={
            <div className="flex flex-col">
              <span className="font-medium">Option 3</span>
              <span className="text-sm text-gray-500">
                Description for option 3
              </span>
            </div>
          }
        />
      </RadioGroup>
    </Box>
  ),
};
