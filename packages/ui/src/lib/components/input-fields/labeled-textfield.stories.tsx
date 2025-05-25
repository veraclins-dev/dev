import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { LabeledTextField } from './labeled-textfield';

const meta: Meta<typeof LabeledTextField> = {
  component: LabeledTextField,
  title: 'Components/LabeledTextField',
};
export default meta;
type Story = StoryObj<typeof LabeledTextField>;

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
    expect(canvas.getByText(/Welcome to LabeledTextField!/gi)).toBeTruthy();
  },
};
