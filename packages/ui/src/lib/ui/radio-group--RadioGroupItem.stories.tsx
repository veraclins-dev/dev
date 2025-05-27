import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { RadioGroupItem } from './radio-group';

const meta: Meta<typeof RadioGroupItem> = {
  component: RadioGroupItem,
  title: 'Base/RadioGroup/Item',
};
export default meta;
type Story = StoryObj<typeof RadioGroupItem>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to RadioGroupItem!/gi)).toBeTruthy();
  },
};
