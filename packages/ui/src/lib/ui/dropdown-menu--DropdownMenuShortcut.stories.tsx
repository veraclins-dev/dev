import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuShortcut } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuShortcut> = {
  component: DropdownMenuShortcut,
  title: 'Base/DropdownMenu/Shortcut',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuShortcut>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuShortcut!/gi)).toBeTruthy();
  },
};
