import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { ChartLegendContent } from './chart';

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
