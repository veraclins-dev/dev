import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DrawerTitle } from './drawer';

const meta: Meta<typeof DrawerTitle> = {
  component: DrawerTitle,
  title: 'Base/Drawer/Title',
};
export default meta;
type Story = StoryObj<typeof DrawerTitle>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerTitle!/gi)).toBeTruthy();
  },
};
