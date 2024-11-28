import type { Meta, StoryObj } from '@storybook/react';
import { EditorMenuControls } from './menu-controls';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof EditorMenuControls> = {
  component: EditorMenuControls,
  title: 'EditorMenuControls',
};
export default meta;
type Story = StoryObj<typeof EditorMenuControls>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to EditorMenuControls!/gi)).toBeTruthy();
  },
};
