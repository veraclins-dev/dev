import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DialogTitle } from './dialog';

const meta: Meta<typeof DialogTitle> = {
  component: DialogTitle,
  title: 'Base/Dialog/Title',
};
export default meta;
type Story = StoryObj<typeof DialogTitle>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogTitle!/gi)).toBeTruthy();
  },
};
