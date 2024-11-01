import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuSubTrigger } from './dropdown-menu';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DropdownMenuSubTrigger> = {
  component: DropdownMenuSubTrigger,
  title: 'DropdownMenuSubTrigger',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuSubTrigger>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to DropdownMenuSubTrigger!/gi)
    ).toBeTruthy();
  },
};
