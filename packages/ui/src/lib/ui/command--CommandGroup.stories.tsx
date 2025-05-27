import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CommandGroup } from './command';

const meta: Meta<typeof CommandGroup> = {
  component: CommandGroup,
  title: 'Base/Command/Group',
};
export default meta;
type Story = StoryObj<typeof CommandGroup>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandGroup!/gi)).toBeTruthy();
  },
};
