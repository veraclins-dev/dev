import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Base/Avatar/Main',
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Avatar!/gi)).toBeTruthy();
  },
};
