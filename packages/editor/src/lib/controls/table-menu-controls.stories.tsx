import type { Meta, StoryObj } from '@storybook/react';
import { TableMenuControls } from './table-menu-controls';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof TableMenuControls> = {
  component: TableMenuControls,
  title: 'TableMenuControls',
};
export default meta;
type Story = StoryObj<typeof TableMenuControls>;

export const Primary = {
  args: {
    className: '',
  },
};

export const Heading: Story = {
  args: {
    className: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TableMenuControls!/gi)).toBeTruthy();
  },
};
