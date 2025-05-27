import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'Base/Textarea',
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Textarea!/gi)).toBeTruthy();
  },
};
