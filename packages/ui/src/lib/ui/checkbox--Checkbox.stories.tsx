import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Base/Checkbox',
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary = {
  args: {
    className: 'border border-gray-300 rounded p-2',
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Checkbox!/gi)).toBeTruthy();
  },
};
