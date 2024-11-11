import type { Meta, StoryObj } from '@storybook/react';
import { DrawerDescription } from './drawer';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DrawerDescription> = {
  component: DrawerDescription,
  title: 'DrawerDescription',
};
export default meta;
type Story = StoryObj<typeof DrawerDescription>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerDescription!/gi)).toBeTruthy();
  },
};
