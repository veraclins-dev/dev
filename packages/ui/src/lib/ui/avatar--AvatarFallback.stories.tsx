import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { AvatarFallback } from './avatar';

const meta: Meta<typeof AvatarFallback> = {
  component: AvatarFallback,
  title: 'Base/Avatar/Fallback',
};
export default meta;
type Story = StoryObj<typeof AvatarFallback>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AvatarFallback!/gi)).toBeTruthy();
  },
};
