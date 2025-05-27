import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DrawerContent } from './drawer';

const meta: Meta<typeof DrawerContent> = {
  component: DrawerContent,
  title: 'Base/Drawer/Content',
};
export default meta;
type Story = StoryObj<typeof DrawerContent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DrawerContent!/gi)).toBeTruthy();
  },
};
