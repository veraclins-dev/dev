import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Drawer } from './drawer';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  title: 'Base/Drawer/Main',
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Drawer!/gi)).toBeTruthy();
  },
};
