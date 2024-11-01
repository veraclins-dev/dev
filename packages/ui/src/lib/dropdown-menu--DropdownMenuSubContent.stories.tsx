import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuSubContent } from './dropdown-menu';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DropdownMenuSubContent> = {
  component: DropdownMenuSubContent,
  title: 'DropdownMenuSubContent',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuSubContent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to DropdownMenuSubContent!/gi)
    ).toBeTruthy();
  },
};
