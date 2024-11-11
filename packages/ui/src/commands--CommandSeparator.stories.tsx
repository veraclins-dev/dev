import type { Meta, StoryObj } from '@storybook/react';
import { CommandSeparator } from './commands';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof CommandSeparator> = {
  component: CommandSeparator,
  title: 'CommandSeparator',
};
export default meta;
type Story = StoryObj<typeof CommandSeparator>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandSeparator!/gi)).toBeTruthy();
  },
};
