import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Component } from './icon';

const meta: Meta<typeof Component> = {
  component: Component,
  title: 'Component',
};
export default meta;
type Story = StoryObj<typeof Component>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Component!/gi)).toBeTruthy();
  },
};
