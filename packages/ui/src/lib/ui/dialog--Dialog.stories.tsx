import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Dialog } from './dialog';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Base/Dialog/Main',
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Dialog!/gi)).toBeTruthy();
  },
};
