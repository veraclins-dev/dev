import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ComposedSelect } from './select';

const meta: Meta<typeof ComposedSelect> = {
  component: ComposedSelect,
  title: 'Base/Select/Composed',
};
export default meta;
type Story = StoryObj<typeof ComposedSelect>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ComposedSelect!/gi)).toBeTruthy();
  },
};
