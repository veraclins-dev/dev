import type { Meta, StoryObj } from '@storybook/react';
import { TableBubbleMenu } from './table-bubble-menu';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof TableBubbleMenu> = {
  component: TableBubbleMenu,
  title: 'TableBubbleMenu',
};
export default meta;
type Story = StoryObj<typeof TableBubbleMenu>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TableBubbleMenu!/gi)).toBeTruthy();
  },
};
