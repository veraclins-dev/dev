import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuArrow } from './dropdown-menu';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DropdownMenuArrow> = {
  component: DropdownMenuArrow,
  title: 'DropdownMenuArrow',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuArrow>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuArrow!/gi)).toBeTruthy();
  },
};
