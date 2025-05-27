import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ChartTooltipContent } from './chart';

const meta: Meta<typeof ChartTooltipContent> = {
  component: ChartTooltipContent,
  title: 'Base/Chart/TooltipContent',
};
export default meta;
type Story = StoryObj<typeof ChartTooltipContent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ChartTooltipContent!/gi)).toBeTruthy();
  },
};
