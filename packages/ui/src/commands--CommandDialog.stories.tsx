import type { Meta, StoryObj } from '@storybook/react';
import { CommandDialog } from './commands';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof CommandDialog> = {
  component: CommandDialog,
  title: 'CommandDialog',
};
export default meta;
type Story = StoryObj<typeof CommandDialog>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandDialog!/gi)).toBeTruthy();
  },
};
