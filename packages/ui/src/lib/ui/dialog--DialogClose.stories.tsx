import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DialogClose } from './dialog';

const meta: Meta<typeof DialogClose> = {
  component: DialogClose,
  title: 'Base/Dialog/Close',
};
export default meta;
type Story = StoryObj<typeof DialogClose>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogClose!/gi)).toBeTruthy();
  },
};
