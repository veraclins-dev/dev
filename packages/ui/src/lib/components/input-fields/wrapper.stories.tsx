import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputWrapper } from './wrapper';

const meta: Meta<typeof InputWrapper> = {
  component: InputWrapper,
  title: 'Components/InputWrapper',
};
export default meta;
type Story = StoryObj<typeof InputWrapper>;

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
