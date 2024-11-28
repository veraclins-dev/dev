import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor } from './rich-text-editor';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof RichTextEditor> = {
  component: RichTextEditor,
  title: 'RichTextEditor',
};
export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to RichTextEditor!/gi)).toBeTruthy();
  },
};
