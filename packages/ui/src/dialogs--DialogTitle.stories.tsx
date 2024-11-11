import type { Meta, StoryObj } from '@storybook/react';
import { DialogTitle } from './dialogs';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DialogTitle> = {
  component: DialogTitle,
  title: 'DialogTitle',
};
export default meta;
type Story = StoryObj<typeof DialogTitle>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogTitle!/gi)).toBeTruthy();
  },
};
