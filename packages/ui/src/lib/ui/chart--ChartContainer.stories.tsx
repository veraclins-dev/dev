import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ChartContainer } from './chart';

const meta: Meta<typeof ChartContainer> = {
  component: ChartContainer,
  title: 'Base/Chart/Container',
};
export default meta;
type Story = StoryObj<typeof ChartContainer>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ChartContainer!/gi)).toBeTruthy();
  },
};
