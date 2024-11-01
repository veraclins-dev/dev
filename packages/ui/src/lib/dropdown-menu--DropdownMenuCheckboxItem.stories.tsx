import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuCheckboxItem } from './dropdown-menu';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DropdownMenuCheckboxItem> = {
  component: DropdownMenuCheckboxItem,
  title: 'DropdownMenuCheckboxItem',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuCheckboxItem>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to DropdownMenuCheckboxItem!/gi)
    ).toBeTruthy();
  },
};
