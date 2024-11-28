import type { Meta, StoryObj } from '@storybook/react';
import { TiptapEditor } from './index';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof TiptapEditor> = {
  component: TiptapEditor,
  title: 'TiptapEditor',
};
export default meta;
type Story = StoryObj<typeof TiptapEditor>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TiptapEditor!/gi)).toBeTruthy();
  },
};
