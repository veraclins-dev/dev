import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DrawerPortal } from './drawer';

const meta: Meta<typeof DrawerPortal> = {
  component: DrawerPortal,
  title: 'Base/Drawer/Portal',
};
export default meta;
type Story = StoryObj<typeof DrawerPortal>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerPortal!/gi)).toBeTruthy();
  },
};
