import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TextareaField } from './textarea';

const meta: Meta<typeof TextareaField> = {
  component: TextareaField,
  title: 'TextareaField',
};
export default meta;
type Story = StoryObj<typeof TextareaField>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TextareaField!/gi)).toBeTruthy();
  },
};
