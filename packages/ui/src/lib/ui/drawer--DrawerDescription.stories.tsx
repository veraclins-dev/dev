import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DrawerDescription } from './drawer';

const meta: Meta<typeof DrawerDescription> = {
  component: DrawerDescription,
  title: 'Base/Drawer/Description',
};
export default meta;
type Story = StoryObj<typeof DrawerDescription>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerDescription!/gi)).toBeTruthy();
  },
};
