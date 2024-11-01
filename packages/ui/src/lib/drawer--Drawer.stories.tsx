import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './drawer';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  title: 'Drawer',
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Drawer!/gi)).toBeTruthy();
  },
};
