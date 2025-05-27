import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Command } from './command';

const meta: Meta<typeof Command> = {
  component: Command,
  title: 'Base/Command/Main',
};
export default meta;
type Story = StoryObj<typeof Command>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Command!/gi)).toBeTruthy();
  },
};
