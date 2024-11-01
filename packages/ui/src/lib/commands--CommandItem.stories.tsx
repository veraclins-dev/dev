import type { Meta, StoryObj } from '@storybook/react';
import { CommandItem } from './commands';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof CommandItem> = {
  component: CommandItem,
  title: 'CommandItem',
};
export default meta;
type Story = StoryObj<typeof CommandItem>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandItem!/gi)).toBeTruthy();
  },
};
