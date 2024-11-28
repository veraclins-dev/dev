import type { Meta, StoryObj } from '@storybook/react';
import { controls } from './table-bubble-menu';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof controls> = {
  component: controls,
  title: 'controls',
};
export default meta;
type Story = StoryObj<typeof controls>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to controls!/gi)).toBeTruthy();
  },
};
