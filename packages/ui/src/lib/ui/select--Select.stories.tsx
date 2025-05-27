import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Select } from './select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Base/Select/Root',
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Select!/gi)).toBeTruthy();
  },
};
