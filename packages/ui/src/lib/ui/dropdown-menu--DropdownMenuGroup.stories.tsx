import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuGroup } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuGroup> = {
  component: DropdownMenuGroup,
  title: 'Base/DropdownMenu/Group',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuGroup>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuGroup!/gi)).toBeTruthy();
  },
};
