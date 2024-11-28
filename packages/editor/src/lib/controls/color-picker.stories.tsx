import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './color-picker';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  title: 'ColorPicker',
  argTypes: {
    onChange: { action: 'onChange executed!' },
    colorToHex: { action: 'colorToHex executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Primary = {
  args: {
    value: '',
    swatchColors: '',
    disableAlpha: false,
    labels: '',
  },
};

export const Heading: Story = {
  args: {
    value: '',
    swatchColors: '',
    disableAlpha: false,
    labels: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ColorPicker!/gi)).toBeTruthy();
  },
};
