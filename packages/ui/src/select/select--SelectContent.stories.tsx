import type { Meta, StoryObj } from '@storybook/react';
import { SelectContent } from './select';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof SelectContent> = {
  component: SelectContent,
  title: 'SelectContent',
};
export default meta;
type Story = StoryObj<typeof SelectContent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectContent!/gi)).toBeTruthy();
  },
};
