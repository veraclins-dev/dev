import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { DropdownMenuLabel } from './dropdown-menu';

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
