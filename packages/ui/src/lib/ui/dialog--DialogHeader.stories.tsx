import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DialogHeader } from './dialog';

const meta: Meta<typeof DialogHeader> = {
  component: DialogHeader,
  title: 'Base/Dialog/Header',
};
export default meta;
type Story = StoryObj<typeof DialogHeader>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogHeader!/gi)).toBeTruthy();
  },
};
