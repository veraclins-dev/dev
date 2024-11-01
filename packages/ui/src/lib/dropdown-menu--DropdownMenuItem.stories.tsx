import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuItem } from './dropdown-menu';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DropdownMenuItem> = {
  component: DropdownMenuItem,
  title: 'DropdownMenuItem',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuItem>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuItem!/gi)).toBeTruthy();
  },
};
