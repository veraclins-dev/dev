import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../ui/box';

import { ScrollFade } from './scroll-fade';

const meta = {
  title: 'Components/ScrollFade',
  component: ScrollFade,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollFade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: Array.from({ length: 20 }).map((_, i) => (
      <p key={i} className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    )),
  },
  render: (args) => (
    <Box className="h-80 w-96 border p-4">
      <ScrollFade {...args} className="h-full" />
    </Box>
  ),
};
