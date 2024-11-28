import type { Meta, StoryObj } from '@storybook/react';
import { RichTextReadOnly } from './rich-text-read-only';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof RichTextReadOnly> = {
  component: RichTextReadOnly,
  title: 'RichTextReadOnly',
};
export default meta;
type Story = StoryObj<typeof RichTextReadOnly>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to RichTextReadOnly!/gi)).toBeTruthy();
  },
};
