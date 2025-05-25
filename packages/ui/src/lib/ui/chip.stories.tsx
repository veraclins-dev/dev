import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Chip } from './chip';

const meta: Meta<typeof Chip> = {
  component: Chip,
  title: 'Base/Chip',
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Primary = {
  args: {
    label: 'Hello',
    onRemove: '',
  },
};

export const Heading: Story = {
  args: {
    label: 'Welcome to Chip!',
    onRemove: () => {
      console.log('Chip removed');
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Chip!/gi)).toBeTruthy();
  },
};
