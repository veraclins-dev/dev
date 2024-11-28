import type { Meta, StoryObj } from '@storybook/react';
import { RichTextField } from './rich-text-field';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof RichTextField> = {
  component: RichTextField,
  title: 'RichTextField',
};
export default meta;
type Story = StoryObj<typeof RichTextField>;

export const Primary = {
  args: {
    className: '',
    disabled: false,
    MenuBarProps: '',
    RichTextContentProps: '',
    controls: '',
  },
};

export const Heading: Story = {
  args: {
    className: '',
    disabled: false,
    MenuBarProps: '',
    RichTextContentProps: '',
    controls: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to RichTextField!/gi)).toBeTruthy();
  },
};
