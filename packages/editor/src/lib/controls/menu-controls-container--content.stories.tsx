import type { Meta, StoryObj } from '@storybook/react';
import { content } from './menu-controls-container';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof content> = {
  component: content,
  title: 'content',
};
export default meta;
type Story = StoryObj<typeof content>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to content!/gi)).toBeTruthy();
  },
};
