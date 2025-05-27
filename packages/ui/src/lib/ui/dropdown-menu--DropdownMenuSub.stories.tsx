import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuSub } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuSub> = {
  component: DropdownMenuSub,
  title: 'Base/DropdownMenu/Sub',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuSub>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuSub!/gi)).toBeTruthy();
  },
};
