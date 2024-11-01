import type { Meta, StoryObj } from '@storybook/react';
import { AccordionItem } from './accordion';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof AccordionItem> = {
  component: AccordionItem,
  title: 'AccordionItem',
};
export default meta;
type Story = StoryObj<typeof AccordionItem>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AccordionItem!/gi)).toBeTruthy();
  },
};
