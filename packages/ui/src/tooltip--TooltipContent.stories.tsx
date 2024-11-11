import type { Meta, StoryObj } from '@storybook/react';
import { TooltipContent } from './tooltip';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof TooltipContent> = {
  component: TooltipContent,
  title: 'TooltipContent',
};
export default meta;
type Story = StoryObj<typeof TooltipContent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TooltipContent!/gi)).toBeTruthy();
  },
};
