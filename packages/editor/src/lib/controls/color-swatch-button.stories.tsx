import type { Meta, StoryObj } from '@storybook/react';
import { ColorSwatchButton } from './color-swatch-button';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ColorSwatchButton> = {
  component: ColorSwatchButton,
  title: 'ColorSwatchButton',
};
export default meta;
type Story = StoryObj<typeof ColorSwatchButton>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ColorSwatchButton!/gi)).toBeTruthy();
  },
};
