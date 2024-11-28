import type { Meta, StoryObj } from '@storybook/react';
import { ResizableImageComponent } from './resizable-image';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ResizableImageComponent> = {
  component: ResizableImageComponent,
  title: 'ResizableImageComponent',
};
export default meta;
type Story = StoryObj<typeof ResizableImageComponent>;

export const Primary = {
  args: {
    node: '',
  },
};

export const Heading: Story = {
  args: {
    node: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to ResizableImageComponent!/gi),
    ).toBeTruthy();
  },
};
