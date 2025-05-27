import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuSubContent } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuSubContent> = {
  component: DropdownMenuSubContent,
  title: 'Base/DropdownMenu/SubContent',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuSubContent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to DropdownMenuSubContent!/gi),
    ).toBeTruthy();
  },
};
