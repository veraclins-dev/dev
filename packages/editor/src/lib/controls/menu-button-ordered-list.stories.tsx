import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonOrderedList } from './menu-button-ordered-list';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonOrderedList> = {
  component: MenuButtonOrderedList,
  title: 'MenuButtonOrderedList',
};
export default meta;
type Story = StoryObj<typeof MenuButtonOrderedList>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuButtonOrderedList!/gi),
    ).toBeTruthy();
  },
};
