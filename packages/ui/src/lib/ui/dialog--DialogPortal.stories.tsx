import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DialogPortal } from './dialog';

const meta: Meta<typeof DialogPortal> = {
  component: DialogPortal,
  title: 'Base/Dialog/Portal',
};
export default meta;
type Story = StoryObj<typeof DialogPortal>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogPortal!/gi)).toBeTruthy();
  },
};
