import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DialogContent } from './dialog';

const meta: Meta<typeof DialogContent> = {
  component: DialogContent,
  title: 'Base/Dialog/Content',
};
export default meta;
type Story = StoryObj<typeof DialogContent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogContent!/gi)).toBeTruthy();
  },
};
