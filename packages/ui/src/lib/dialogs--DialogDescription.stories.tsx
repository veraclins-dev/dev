import type { Meta, StoryObj } from '@storybook/react';
import { DialogDescription } from './dialogs';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DialogDescription> = {
  component: DialogDescription,
  title: 'DialogDescription',
};
export default meta;
type Story = StoryObj<typeof DialogDescription>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogDescription!/gi)).toBeTruthy();
  },
};
