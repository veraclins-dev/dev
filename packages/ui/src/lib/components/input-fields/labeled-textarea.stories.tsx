import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { LabeledTextarea } from './labeled-textarea';

const meta: Meta<typeof LabeledTextarea> = {
  component: LabeledTextarea,
  title: 'LabeledTextarea',
};
export default meta;
type Story = StoryObj<typeof LabeledTextarea>;

export const Primary = {
  args: {
    label: '',
  },
};

export const Heading: Story = {
  args: {
    label: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to LabeledTextarea!/gi)).toBeTruthy();
  },
};
