import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { DropdownMenuCheckboxItem } from './dropdown-menu';

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
