import type { Meta, StoryObj } from '@storybook/react';
import { DrawerTitle } from './drawer';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DrawerTitle> = {
  component: DrawerTitle,
  title: 'DrawerTitle',
};
export default meta;
type Story = StoryObj<typeof DrawerTitle>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerTitle!/gi)).toBeTruthy();
  },
};
