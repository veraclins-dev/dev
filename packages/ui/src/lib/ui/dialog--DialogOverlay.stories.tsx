import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DialogOverlay } from './dialog';

const meta: Meta<typeof DialogOverlay> = {
  component: DialogOverlay,
  title: 'Base/Dialog/Overlay',
};
export default meta;
type Story = StoryObj<typeof DialogOverlay>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogOverlay!/gi)).toBeTruthy();
  },
};
