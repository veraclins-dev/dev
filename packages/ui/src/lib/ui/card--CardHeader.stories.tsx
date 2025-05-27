import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardHeader } from './card';

const meta: Meta<typeof CardHeader> = {
  component: CardHeader,
  title: 'Base/Card/Header',
};
export default meta;
type Story = StoryObj<typeof CardHeader>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardHeader!/gi)).toBeTruthy();
  },
};
