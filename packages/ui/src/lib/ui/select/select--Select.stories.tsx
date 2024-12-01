import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { Select } from './select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Select',
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Select!/gi)).toBeTruthy();
  },
};
