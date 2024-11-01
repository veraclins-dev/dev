import type { Meta, StoryObj } from '@storybook/react';
import { DialogFooter } from './dialogs';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DialogFooter> = {
  component: DialogFooter,
  title: 'DialogFooter',
};
export default meta;
type Story = StoryObj<typeof DialogFooter>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogFooter!/gi)).toBeTruthy();
  },
};
