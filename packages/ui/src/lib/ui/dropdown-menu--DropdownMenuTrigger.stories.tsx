import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuTrigger } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuTrigger> = {
  component: DropdownMenuTrigger,
  title: 'Base/DropdownMenu/Trigger',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuTrigger>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuTrigger!/gi)).toBeTruthy();
  },
};
