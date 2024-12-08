import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Badge',
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Badge!/gi)).toBeTruthy();
  },
};
