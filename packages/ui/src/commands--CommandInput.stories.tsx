import type { Meta, StoryObj } from '@storybook/react';
import { CommandInput } from './commands';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof CommandInput> = {
  component: CommandInput,
  title: 'CommandInput',
};
export default meta;
type Story = StoryObj<typeof CommandInput>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandInput!/gi)).toBeTruthy();
  },
};
