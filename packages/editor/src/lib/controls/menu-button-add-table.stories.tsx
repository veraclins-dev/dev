import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonAddTable } from './menu-button-add-table';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonAddTable> = {
  component: MenuButtonAddTable,
  title: 'MenuButtonAddTable',
};
export default meta;
type Story = StoryObj<typeof MenuButtonAddTable>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonAddTable!/gi)).toBeTruthy();
  },
};
