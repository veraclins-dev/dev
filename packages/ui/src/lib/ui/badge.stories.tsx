import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Base/Badge',
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    children: 'Badge',
  },
};

export const Heading: Story = {
  args: {
    children: 'Welcome to Badge!',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Badge!/gi)).toBeTruthy();
  },
};
