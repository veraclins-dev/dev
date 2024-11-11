import type { Meta, StoryObj } from '@storybook/react';
import { SelectLabel } from './select';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof SelectLabel> = {
  component: SelectLabel,
  title: 'SelectLabel',
};
export default meta;
type Story = StoryObj<typeof SelectLabel>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectLabel!/gi)).toBeTruthy();
  },
};
