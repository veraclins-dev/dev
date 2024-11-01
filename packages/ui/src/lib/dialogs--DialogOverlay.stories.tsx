import type { Meta, StoryObj } from '@storybook/react';
import { DialogOverlay } from './dialogs';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DialogOverlay> = {
  component: DialogOverlay,
  title: 'DialogOverlay',
};
export default meta;
type Story = StoryObj<typeof DialogOverlay>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogOverlay!/gi)).toBeTruthy();
  },
};
