import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CommandEmpty } from './command';

const meta: Meta<typeof CommandEmpty> = {
  component: CommandEmpty,
  title: 'Base/Command/Empty',
};
export default meta;
type Story = StoryObj<typeof CommandEmpty>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandEmpty!/gi)).toBeTruthy();
  },
};
