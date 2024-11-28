import type { Meta, StoryObj } from '@storybook/react';
import { ImageResizer } from './image-resize-component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ImageResizer> = {
  component: ImageResizer,
  title: 'ImageResizer',
};
export default meta;
type Story = StoryObj<typeof ImageResizer>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ImageResizer!/gi)).toBeTruthy();
  },
};
