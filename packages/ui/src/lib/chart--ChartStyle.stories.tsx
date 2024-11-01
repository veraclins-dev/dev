import type { Meta, StoryObj } from '@storybook/react';
import { ChartStyle } from './chart';

import { within, expect } from '@storybook/test';

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
