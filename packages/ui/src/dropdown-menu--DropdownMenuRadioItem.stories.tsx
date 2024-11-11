import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuRadioItem } from './dropdown-menu';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DropdownMenuRadioItem> = {
  component: DropdownMenuRadioItem,
  title: 'DropdownMenuRadioItem',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuRadioItem>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to DropdownMenuRadioItem!/gi)
    ).toBeTruthy();
  },
};
