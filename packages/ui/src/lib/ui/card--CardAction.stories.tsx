import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardAction } from './card';

const meta: Meta<typeof CardAction> = {
  component: CardAction,
  title: 'Base/Card/Action',
};
export default meta;
type Story = StoryObj<typeof CardAction>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardAction!/gi)).toBeTruthy();
  },
};
