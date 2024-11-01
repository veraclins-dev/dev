import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuLabel } from './dropdown-menu';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DropdownMenuLabel> = {
  component: DropdownMenuLabel,
  title: 'DropdownMenuLabel',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuLabel>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuLabel!/gi)).toBeTruthy();
  },
};
