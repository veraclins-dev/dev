import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: 'Skeleton',
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Skeleton!/gi)).toBeTruthy();
  },
};
