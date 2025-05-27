import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DrawerHeader } from './drawer';

const meta: Meta<typeof DrawerHeader> = {
  component: DrawerHeader,
  title: 'Base/Drawer/Header',
};
export default meta;
type Story = StoryObj<typeof DrawerHeader>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerHeader!/gi)).toBeTruthy();
  },
};
