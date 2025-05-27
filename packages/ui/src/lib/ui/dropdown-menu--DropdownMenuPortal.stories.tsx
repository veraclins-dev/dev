import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuPortal } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuPortal> = {
  component: DropdownMenuPortal,
  title: 'Base/DropdownMenu/Portal',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuPortal>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuPortal!/gi)).toBeTruthy();
  },
};
