import type { Meta, StoryObj } from '@storybook/react';
import { CommandGroup } from './commands';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof CommandGroup> = {
  component: CommandGroup,
  title: 'CommandGroup',
};
export default meta;
type Story = StoryObj<typeof CommandGroup>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandGroup!/gi)).toBeTruthy();
  },
};
