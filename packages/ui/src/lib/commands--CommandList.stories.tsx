import type { Meta, StoryObj } from '@storybook/react';
import { CommandList } from './commands';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof CommandList> = {
  component: CommandList,
  title: 'CommandList',
};
export default meta;
type Story = StoryObj<typeof CommandList>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandList!/gi)).toBeTruthy();
  },
};
