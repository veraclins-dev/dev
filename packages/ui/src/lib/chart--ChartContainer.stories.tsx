import type { Meta, StoryObj } from '@storybook/react';
import { ChartContainer } from './chart';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof ChartContainer> = {
  component: ChartContainer,
  title: 'ChartContainer',
};
export default meta;
type Story = StoryObj<typeof ChartContainer>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ChartContainer!/gi)).toBeTruthy();
  },
};
