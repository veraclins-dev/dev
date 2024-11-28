import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonTaskList } from './menu-button-task-list';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonTaskList> = {
  component: MenuButtonTaskList,
  title: 'MenuButtonTaskList',
};
export default meta;
type Story = StoryObj<typeof MenuButtonTaskList>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonTaskList!/gi)).toBeTruthy();
  },
};
