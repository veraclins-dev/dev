import type { Meta, StoryObj } from '@storybook/react';
import { ChartTooltipContent } from './chart';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof ChartTooltipContent> = {
  component: ChartTooltipContent,
  title: 'ChartTooltipContent',
};
export default meta;
type Story = StoryObj<typeof ChartTooltipContent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ChartTooltipContent!/gi)).toBeTruthy();
  },
};
