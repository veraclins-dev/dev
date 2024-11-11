import type { Meta, StoryObj } from '@storybook/react';
import { DrawerOverlay } from './drawer';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DrawerOverlay> = {
  component: DrawerOverlay,
  title: 'DrawerOverlay',
};
export default meta;
type Story = StoryObj<typeof DrawerOverlay>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerOverlay!/gi)).toBeTruthy();
  },
};
