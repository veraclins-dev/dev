import type { Meta, StoryObj } from '@storybook/react';
import { DrawerFooter } from './drawer';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DrawerFooter> = {
  component: DrawerFooter,
  title: 'DrawerFooter',
};
export default meta;
type Story = StoryObj<typeof DrawerFooter>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerFooter!/gi)).toBeTruthy();
  },
};
