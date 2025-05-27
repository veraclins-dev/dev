import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CommandInput } from './command';

const meta: Meta<typeof CommandInput> = {
  component: CommandInput,
  title: 'Base/Command/Input',
};
export default meta;
type Story = StoryObj<typeof CommandInput>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandInput!/gi)).toBeTruthy();
  },
};
