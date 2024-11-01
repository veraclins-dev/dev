import type { Meta, StoryObj } from '@storybook/react';
import { DrawerContent } from './drawer';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DrawerContent> = {
  component: DrawerContent,
  title: 'DrawerContent',
};
export default meta;
type Story = StoryObj<typeof DrawerContent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerContent!/gi)).toBeTruthy();
  },
};
