import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: 'Base/Separator',
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Separator!/gi)).toBeTruthy();
  },
};
