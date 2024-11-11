import type { Meta, StoryObj } from '@storybook/react';
import { SelectSeparator } from './select';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof SelectSeparator> = {
  component: SelectSeparator,
  title: 'SelectSeparator',
};
export default meta;
type Story = StoryObj<typeof SelectSeparator>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectSeparator!/gi)).toBeTruthy();
  },
};
