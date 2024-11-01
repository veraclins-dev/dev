import type { Meta, StoryObj } from '@storybook/react';
import { Editor } from './editor';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof Editor> = {
  component: Editor,
  title: 'Editor',
};
export default meta;
type Story = StoryObj<typeof Editor>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Editor!/gi)).toBeTruthy();
  },
};
