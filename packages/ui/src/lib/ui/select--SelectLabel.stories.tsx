import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { SelectLabel } from './select';

const meta: Meta<typeof SelectLabel> = {
  component: SelectLabel,
  title: 'Base/Select/Label',
};
export default meta;
type Story = StoryObj<typeof SelectLabel>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectLabel!/gi)).toBeTruthy();
  },
};
