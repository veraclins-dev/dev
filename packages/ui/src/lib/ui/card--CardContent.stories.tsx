import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardContent } from './card';

const meta: Meta<typeof CardContent> = {
  component: CardContent,
  title: 'Base/Card/Content',
};
export default meta;
type Story = StoryObj<typeof CardContent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardContent!/gi)).toBeTruthy();
  },
};
