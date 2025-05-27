import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { AvatarImage } from './avatar';

const meta: Meta<typeof AvatarImage> = {
  component: AvatarImage,
  title: 'Base/Avatar/Image',
};
export default meta;
type Story = StoryObj<typeof AvatarImage>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AvatarImage!/gi)).toBeTruthy();
  },
};
