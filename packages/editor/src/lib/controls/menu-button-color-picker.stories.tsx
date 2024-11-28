import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonColorPicker } from './menu-button-color-picker';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonColorPicker> = {
  component: MenuButtonColorPicker,
  title: 'MenuButtonColorPicker',
  argTypes: {
    onChange: { action: 'onChange executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof MenuButtonColorPicker>;

export const Primary = {
  args: {
    value: '',
    swatchColors: '',
    ColorPickerProps: '',
    popoverId: '',
    labels: '',
  },
};

export const Heading: Story = {
  args: {
    value: '',
    swatchColors: '',
    ColorPickerProps: '',
    popoverId: '',
    labels: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuButtonColorPicker!/gi),
    ).toBeTruthy();
  },
};
