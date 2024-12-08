import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ImageField } from './image-field';

const meta: Meta<typeof ImageField> = {
  component: ImageField,
  title: 'ImageField',
};
export default meta;
type Story = StoryObj<typeof ImageField>;

export const Primary = {
  args: {
    defaultValue: '',
    previewClasses: '',
    loading: false,
    value: '',
  },
};

export const Heading: Story = {
  args: {
    defaultValue: '',
    previewClasses: '',
    loading: false,
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ImageField!/gi)).toBeTruthy();
  },
};
