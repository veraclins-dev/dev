import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CommandDialog } from './command';

const meta: Meta<typeof CommandDialog> = {
  component: CommandDialog,
  title: 'Base/Command/Dialog',
};
export default meta;
type Story = StoryObj<typeof CommandDialog>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandDialog!/gi)).toBeTruthy();
  },
};
