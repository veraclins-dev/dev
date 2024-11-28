import type { Meta, StoryObj } from '@storybook/react';
import { ResizableImageResizer } from './resizable-image-resizer';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ResizableImageResizer> = {
  component: ResizableImageResizer,
  title: 'ResizableImageResizer',
  argTypes: {
    onResize: { action: 'onResize executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof ResizableImageResizer>;

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
    expect(
      canvas.getByText(/Welcome to ResizableImageResizer!/gi),
    ).toBeTruthy();
  },
};
