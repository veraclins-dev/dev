import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditorProvider } from './rich-text-editor-provider';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof RichTextEditorProvider> = {
  component: RichTextEditorProvider,
  title: 'RichTextEditorProvider',
};
export default meta;
type Story = StoryObj<typeof RichTextEditorProvider>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to RichTextEditorProvider!/gi),
    ).toBeTruthy();
  },
};
