import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputFieldWrapper } from './input-field-wrapper';

const meta: Meta<typeof InputFieldWrapper> = {
  component: InputFieldWrapper,
  title: 'Components/InputWrapper',
};
export default meta;
type Story = StoryObj<typeof InputFieldWrapper>;

export const Primary: Story = {
  args: {
    children: '',
  },
};

export const Heading: Story = {
  args: {
    children: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to InputWrapper!/gi)).toBeTruthy();
  },
};
