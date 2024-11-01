import type { Meta, StoryObj } from '@storybook/react';
import { CommandLoading } from './commands';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof CommandLoading> = {
  component: CommandLoading,
  title: 'CommandLoading',
};
export default meta;
type Story = StoryObj<typeof CommandLoading>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandLoading!/gi)).toBeTruthy();
  },
};
