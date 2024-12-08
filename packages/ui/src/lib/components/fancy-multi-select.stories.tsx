import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { FancyMultiSelect } from './fancy-multi-select';

const meta: Meta<typeof FancyMultiSelect> = {
  component: FancyMultiSelect,
  title: 'FancyMultiSelect',
};
export default meta;
type Story = StoryObj<typeof FancyMultiSelect>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to FancyMultiSelect!/gi)).toBeTruthy();
  },
};
