import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Editor } from './editor';

const meta: Meta<typeof Editor> = {
  component: Editor,
  title: 'Editor',
};
export default meta;
type Story = StoryObj<typeof Editor>;

export const Primary = {
  args: {
    labels: '',
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Editor!/gi)).toBeTruthy();
  },
};
