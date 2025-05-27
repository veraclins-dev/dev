import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { SelectValue } from './select';

const meta: Meta<typeof SelectValue> = {
  component: SelectValue,
  title: 'Base/Select/Value',
};
export default meta;
type Story = StoryObj<typeof SelectValue>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectValue!/gi)).toBeTruthy();
  },
};
