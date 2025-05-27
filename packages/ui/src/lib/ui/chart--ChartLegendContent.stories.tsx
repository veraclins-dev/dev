import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ChartLegendContent } from './chart';

const meta: Meta<typeof ChartLegendContent> = {
  component: ChartLegendContent,
  title: 'Base/Chart/LegendContent',
};
export default meta;
type Story = StoryObj<typeof ChartLegendContent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ChartLegendContent!/gi)).toBeTruthy();
  },
};
