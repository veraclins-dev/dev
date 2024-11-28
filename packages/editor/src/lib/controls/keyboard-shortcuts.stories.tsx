import type { Meta, StoryObj } from '@storybook/react';
import { KeyboardShortcuts } from './keyboard-shortcuts';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof KeyboardShortcuts> = {
  component: KeyboardShortcuts,
  title: 'KeyboardShortcuts',
};
export default meta;
type Story = StoryObj<typeof KeyboardShortcuts>;

export const Primary = {
  args: {
    className: '',
  },
};

export const Heading: Story = {
  args: {
    className: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to KeyboardShortcuts!/gi)).toBeTruthy();
  },
};
