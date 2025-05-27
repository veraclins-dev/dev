import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CommandSeparator } from './command';

const meta: Meta<typeof CommandSeparator> = {
  component: CommandSeparator,
  title: 'Base/Command/Separator',
};
export default meta;
type Story = StoryObj<typeof CommandSeparator>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandSeparator!/gi)).toBeTruthy();
  },
};
