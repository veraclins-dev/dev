import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { ChartStyle } from './chart';

const meta: Meta<typeof ChartStyle> = {
  component: ChartStyle,
  title: 'ChartStyle',
};
export default meta;
type Story = StoryObj<typeof ChartStyle>;

export const Primary = {
  args: {
    id: '',
    config: '',
  },
};

export const Heading: Story = {
  args: {
    id: '',
    config: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ChartStyle!/gi)).toBeTruthy();
  },
};
