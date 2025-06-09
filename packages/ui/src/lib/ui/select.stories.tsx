import type { Meta, StoryObj } from '@storybook/react';

import { Box } from './box';
import {
  ComposedSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';

const meta = {
  title: 'Base/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
  The Select component provides a dropdown selection interface with various customization options. It's built on top of Radix UI's Select primitive and includes additional features like grouping, scrolling, and custom styling.

  ## Features
  - Single and grouped options
  - Customizable trigger and content positioning
  - Scroll buttons for long lists
  - Support for labels and separators
  - Composed version for quick implementation

  ## Usage
  The Select component can be used in two ways:
  1. Using individual components for maximum customization
  2. Using the ComposedSelect component for quick implementation with predefined options

  ## Props
  ### ComposedSelect Props
  - \`options\`: Array of options or grouped options
  - \`grouped\`: Boolean to indicate if options are grouped
  - \`placeholder\`: Placeholder text when no value is selected
  - \`showLabel\`: Boolean to show/hide the label
  - \`position\`: Position of the select content ('popper' | 'item-aligned')
  - \`sideOffset\`: Offset from the trigger
  - \`value\`: Currently selected value
  - \`onValueChange\`: Callback when value changes
  - \`className\`: Additional CSS classes

  ### Individual Component Props
  Each component (SelectTrigger, SelectContent, etc.) accepts all props from their respective Radix UI primitives plus additional styling props.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </Box>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="potato">Potato</SelectItem>
            <SelectItem value="tomato">Tomato</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Box>
  ),
};

export const Composed: StoryObj<typeof ComposedSelect> = {
  argTypes: {
    options: {
      control: {
        type: 'select',
      },
    },
    grouped: {
      control: {
        type: 'boolean',
      },
    },
  },
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <ComposedSelect
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
        placeholder="Select an option"
      />
    </Box>
  ),
};

export const ComposedWithGroups: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <ComposedSelect
        grouped
        options={[
          {
            id: 'fruits',
            label: 'Fruits',
            options: [
              { label: 'Apple', value: 'apple' },
              { label: 'Banana', value: 'banana' },
              { label: 'Orange', value: 'orange' },
            ],
          },
          {
            id: 'vegetables',
            label: 'Vegetables',
            options: [
              { label: 'Carrot', value: 'carrot' },
              { label: 'Potato', value: 'potato' },
              { label: 'Tomato', value: 'tomato' },
            ],
          },
        ]}
        placeholder="Select a food item"
      />
    </Box>
  ),
};

export const WithScrollButtons: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a number" />
        </SelectTrigger>
        <SelectContent>
          <SelectScrollUpButton />
          {Array.from({ length: 20 }, (_, i) => (
            <SelectItem key={i} value={String(i + 1)}>
              {i + 1}
            </SelectItem>
          ))}
          <SelectScrollDownButton />
        </SelectContent>
      </Select>
    </Box>
  ),
};
