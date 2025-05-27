import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuContent } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuContent> = {
  component: DropdownMenuContent,
  title: 'Base/DropdownMenu/Content',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuContent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuContent!/gi)).toBeTruthy();
  },
};
