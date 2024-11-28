import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonUnindent } from './menu-button-unindent';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonUnindent> = {
  component: MenuButtonUnindent,
  title: 'MenuButtonUnindent',
};
export default meta;
type Story = StoryObj<typeof MenuButtonUnindent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonUnindent!/gi)).toBeTruthy();
  },
};
