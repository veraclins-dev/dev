import type { Meta, StoryObj } from '@storybook/react';
import { ColorPickerPopperBody } from './color-picker-popper';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ColorPickerPopperBody> = {
  component: ColorPickerPopperBody,
  title: 'ColorPickerPopperBody',
  argTypes: {
    onSave: { action: 'onSave executed!' },
    onCancel: { action: 'onCancel executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof ColorPickerPopperBody>;

export const Primary = {
  args: {
    value: '',
  },
};

export const Heading: Story = {
  args: {
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to ColorPickerPopperBody!/gi),
    ).toBeTruthy();
  },
};
