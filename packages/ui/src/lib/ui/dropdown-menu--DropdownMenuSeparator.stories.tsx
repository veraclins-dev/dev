import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuSeparator } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuSeparator> = {
  component: DropdownMenuSeparator,
  title: 'Base/DropdownMenu/Separator',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuSeparator>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to DropdownMenuSeparator!/gi),
    ).toBeTruthy();
  },
};
