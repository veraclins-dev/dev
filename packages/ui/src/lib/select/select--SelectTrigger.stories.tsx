import type { Meta, StoryObj } from '@storybook/react';
import { SelectTrigger } from './select';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof SelectTrigger> = {
  component: SelectTrigger,
  title: 'SelectTrigger',
};
export default meta;
type Story = StoryObj<typeof SelectTrigger>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectTrigger!/gi)).toBeTruthy();
  },
};
