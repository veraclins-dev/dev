import type { Meta, StoryObj } from '@storybook/react';
import { RichTextContent } from './rich-text-content';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof RichTextContent> = {
  component: RichTextContent,
  title: 'RichTextContent',
};
export default meta;
type Story = StoryObj<typeof RichTextContent>;

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
    expect(canvas.getByText(/Welcome to RichTextContent!/gi)).toBeTruthy();
  },
};
