import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuSeparator } from './dropdown-menu';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DropdownMenuSeparator> = {
  component: DropdownMenuSeparator,
  title: 'DropdownMenuSeparator',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuSeparator>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to DropdownMenuSeparator!/gi)
    ).toBeTruthy();
  },
};
