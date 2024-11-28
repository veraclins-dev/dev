import type { Meta, StoryObj } from '@storybook/react';
import { ColorPickerPopper } from './color-picker-popper';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ColorPickerPopper> = {
  component: ColorPickerPopper,
  title: 'ColorPickerPopper',
};
export default meta;
type Story = StoryObj<typeof ColorPickerPopper>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ColorPickerPopper!/gi)).toBeTruthy();
  },
};
