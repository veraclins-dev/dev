import type { Meta, StoryObj } from '@storybook/react';
import { CommandShortcut } from './commands';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof CommandShortcut> = {
  component: CommandShortcut,
  title: 'CommandShortcut',
};
export default meta;
type Story = StoryObj<typeof CommandShortcut>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandShortcut!/gi)).toBeTruthy();
  },
};
