import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CommandShortcut } from './command';

const meta: Meta<typeof CommandShortcut> = {
  component: CommandShortcut,
  title: 'Base/Command/Shortcut',
};
export default meta;
type Story = StoryObj<typeof CommandShortcut>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandShortcut!/gi)).toBeTruthy();
  },
};
