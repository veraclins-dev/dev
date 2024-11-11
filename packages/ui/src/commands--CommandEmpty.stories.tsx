import type { Meta, StoryObj } from '@storybook/react';
import { CommandEmpty } from './commands';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof CommandEmpty> = {
  component: CommandEmpty,
  title: 'CommandEmpty',
};
export default meta;
type Story = StoryObj<typeof CommandEmpty>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandEmpty!/gi)).toBeTruthy();
  },
};
