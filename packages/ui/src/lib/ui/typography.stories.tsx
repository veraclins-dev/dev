import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Typography } from './typography';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Base/Typography',
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'h2',
    className: 'px-4 py-2',
  },
};

export const Heading: Story = {
  args: {
    children: 'Welcome to Typography!',
    variant: 'h1',
    className: 'px-4 py-2',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Typography!/gi)).toBeTruthy();
  },
};
