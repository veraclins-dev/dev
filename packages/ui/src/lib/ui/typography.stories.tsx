import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import Typography from './typography';

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

export const H1: Story = {
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

export const Overline: Story = {
  args: {
    children: 'This is an overline text',
    variant: 'overline',
    className: 'px-4 py-2',
  },
};

export const Body1: Story = {
  args: {
    children: 'This is body text',
    variant: 'body1',
    className: 'px-4 py-2',
  },
};
