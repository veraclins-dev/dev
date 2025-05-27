import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DialogDescription } from './dialog';

const meta: Meta<typeof DialogDescription> = {
  component: DialogDescription,
  title: 'Base/Dialog/Description',
};
export default meta;
type Story = StoryObj<typeof DialogDescription>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogDescription!/gi)).toBeTruthy();
  },
};
