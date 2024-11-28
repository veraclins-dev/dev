import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuShortcut } from './dropdown-menu';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DropdownMenuShortcut> = {
  component: DropdownMenuShortcut,
  title: 'DropdownMenuShortcut',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuShortcut>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuShortcut!/gi)).toBeTruthy();
  },
};
