import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DrawerOverlay } from './drawer';

const meta: Meta<typeof DrawerOverlay> = {
  component: DrawerOverlay,
  title: 'Base/Drawer/Overlay',
};
export default meta;
type Story = StoryObj<typeof DrawerOverlay>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerOverlay!/gi)).toBeTruthy();
  },
};
