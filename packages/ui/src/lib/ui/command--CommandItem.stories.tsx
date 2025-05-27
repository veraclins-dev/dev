import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CommandItem } from './command';

const meta: Meta<typeof CommandItem> = {
  component: CommandItem,
  title: 'Base/Command/Item',
};
export default meta;
type Story = StoryObj<typeof CommandItem>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandItem!/gi)).toBeTruthy();
  },
};
