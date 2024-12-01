import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { ChartTooltipContent } from './chart';

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
