import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuContent } from './dropdown-menu';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DropdownMenuContent> = {
  component: DropdownMenuContent,
  title: 'DropdownMenuContent',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuContent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuContent!/gi)).toBeTruthy();
  },
};
