import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Accordion } from './accordion';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Base/Accordion/Main',
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Accordion!/gi)).toBeTruthy();
  },
};
