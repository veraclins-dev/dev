import type { Meta, StoryObj } from '@storybook/react';
import { DialogContent } from './dialogs';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof DialogContent> = {
  component: DialogContent,
  title: 'DialogContent',
};
export default meta;
type Story = StoryObj<typeof DialogContent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogContent!/gi)).toBeTruthy();
  },
};
