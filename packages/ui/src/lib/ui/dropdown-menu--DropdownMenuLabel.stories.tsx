import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuLabel } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuLabel> = {
  component: DropdownMenuLabel,
  title: 'Base/DropdownMenu/Label',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuLabel>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuLabel!/gi)).toBeTruthy();
  },
};
