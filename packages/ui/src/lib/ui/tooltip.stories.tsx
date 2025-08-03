import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box } from './box';
import { Button } from './button';
import { Icon } from './icon';
import {
  ComposedTooltip,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from './tooltip';

const meta = {
  title: 'Base/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Tooltip component provides a way to display additional information when hovering over or focusing on an element.

## Features
- Accessible tooltip implementation using Radix UI
- Customizable positioning and delay
- Support for both hover and focus triggers
- Optional arrow indicator
- Composable API for advanced use cases
- Simple ComposedTooltip for common use cases

## Usage
The Tooltip component can be used in two ways:

1. Using the individual components:
\`\`\`tsx
<Tooltip>
  <TooltipTrigger>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    This is a tooltip
    <TooltipArrow />
  </TooltipContent>
</Tooltip>
\`\`\`

2. Using the ComposedTooltip for simpler cases:
\`\`\`tsx
<ComposedTooltip
  Trigger={Button}
  content="This is a tooltip"
  TriggerProps={{ children: 'Hover me' }}
/>
\`\`\`

## Props
- \`Tooltip\`: Accepts all Radix UI Tooltip.Root props
- \`TooltipTrigger\`: Accepts all Radix UI Tooltip.Trigger props
- \`TooltipContent\`: Accepts all Radix UI Tooltip.Content props plus:
  - \`sideOffset\`: Offset from the trigger (default: 2)
- \`TooltipArrow\`: Accepts all Radix UI Tooltip.Arrow props
- \`ComposedTooltip\`:
  - \`Trigger\`: The component to use as the trigger
  - \`content\`: The tooltip content
  - \`arrow\`: Whether to show the arrow (default: true)
  - \`TriggerProps\`: Props to pass to the trigger component
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <Tooltip>
        <TooltipTrigger>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          This is a basic tooltip
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </Box>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <Tooltip>
        <TooltipTrigger>
          <Icon name="info" />
        </TooltipTrigger>
        <TooltipContent>
          This is a tooltip on an icon
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </Box>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <Tooltip>
        <TooltipTrigger>
          <Button>No arrow tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>This tooltip doesn't have an arrow</TooltipContent>
      </Tooltip>
    </Box>
  ),
};

export const ComposedExample: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <ComposedTooltip
        Trigger={Button}
        content="This is a composed tooltip"
        TriggerProps={{ children: 'Hover me' }}
      />
    </Box>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <Box display="flex" gap={4}>
        <Tooltip>
          <TooltipTrigger>
            <Button>First tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            This is the first tooltip
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button>Second tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            This is the second tooltip
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button>Third tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            This is the third tooltip
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </Box>
    </Box>
  ),
};
