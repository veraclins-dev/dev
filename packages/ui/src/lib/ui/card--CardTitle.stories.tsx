import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardTitle } from './card';

const meta: Meta<typeof CardTitle> = {
  component: CardTitle,
  title: 'Base/Card/Title',
};
export default meta;
type Story = StoryObj<typeof CardTitle>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardTitle!/gi)).toBeTruthy();
  },
};
