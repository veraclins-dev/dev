import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TextField } from './textfield';

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: 'Components/TextField',
};
export default meta;
type Story = StoryObj<typeof TextField>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TextField!/gi)).toBeTruthy();
  },
};
