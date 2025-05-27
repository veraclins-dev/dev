import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DialogTrigger } from './dialog';

const meta: Meta<typeof DialogTrigger> = {
  component: DialogTrigger,
  title: 'Base/Dialog/Trigger',
};
export default meta;
type Story = StoryObj<typeof DialogTrigger>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogTrigger!/gi)).toBeTruthy();
  },
};
