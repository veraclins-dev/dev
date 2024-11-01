import type { Meta, StoryObj } from '@storybook/react';
import { DialogHeader } from './dialogs';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DialogHeader> = {
  component: DialogHeader,
  title: 'DialogHeader',
};
export default meta;
type Story = StoryObj<typeof DialogHeader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogHeader!/gi)).toBeTruthy();
  },
};
