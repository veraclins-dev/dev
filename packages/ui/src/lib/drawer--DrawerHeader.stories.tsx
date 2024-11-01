import type { Meta, StoryObj } from '@storybook/react';
import { DrawerHeader } from './drawer';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DrawerHeader> = {
  component: DrawerHeader,
  title: 'DrawerHeader',
};
export default meta;
type Story = StoryObj<typeof DrawerHeader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerHeader!/gi)).toBeTruthy();
  },
};
