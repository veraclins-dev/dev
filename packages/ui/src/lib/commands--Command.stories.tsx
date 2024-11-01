import type { Meta, StoryObj } from '@storybook/react';
import { Command } from './commands';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof Command> = {
  component: Command,
  title: 'Command',
};
export default meta;
type Story = StoryObj<typeof Command>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Command!/gi)).toBeTruthy();
  },
};
