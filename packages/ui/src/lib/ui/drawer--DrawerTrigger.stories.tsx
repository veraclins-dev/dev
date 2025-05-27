import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DrawerTrigger } from './drawer';

const meta: Meta<typeof DrawerTrigger> = {
  component: DrawerTrigger,
  title: 'Base/Drawer/Trigger',
};
export default meta;
type Story = StoryObj<typeof DrawerTrigger>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerTrigger!/gi)).toBeTruthy();
  },
};
