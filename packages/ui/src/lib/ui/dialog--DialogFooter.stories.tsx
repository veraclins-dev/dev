import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DialogFooter } from './dialog';

const meta: Meta<typeof DialogFooter> = {
  component: DialogFooter,
  title: 'Base/Dialog/Footer',
};
export default meta;
type Story = StoryObj<typeof DialogFooter>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DialogFooter!/gi)).toBeTruthy();
  },
};
