import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonBulletedList } from './menu-button-bulleted-list';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonBulletedList> = {
  component: MenuButtonBulletedList,
  title: 'MenuButtonBulletedList',
};
export default meta;
type Story = StoryObj<typeof MenuButtonBulletedList>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuButtonBulletedList!/gi),
    ).toBeTruthy();
  },
};
