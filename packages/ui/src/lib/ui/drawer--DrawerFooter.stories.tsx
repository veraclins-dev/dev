import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DrawerFooter } from './drawer';

const meta: Meta<typeof DrawerFooter> = {
  component: DrawerFooter,
  title: 'Base/Drawer/Footer',
};
export default meta;
type Story = StoryObj<typeof DrawerFooter>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerFooter!/gi)).toBeTruthy();
  },
};
