import type { Meta, StoryObj } from '@storybook/react';
import { ChartLegendContent } from './chart';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof ChartLegendContent> = {
  component: ChartLegendContent,
  title: 'ChartLegendContent',
};
export default meta;
type Story = StoryObj<typeof ChartLegendContent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ChartLegendContent!/gi)).toBeTruthy();
  },
};
