import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonUnderline } from './menu-button-underline';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonUnderline> = {
  component: MenuButtonUnderline,
  title: 'MenuButtonUnderline',
};
export default meta;
type Story = StoryObj<typeof MenuButtonUnderline>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonUnderline!/gi)).toBeTruthy();
  },
};
