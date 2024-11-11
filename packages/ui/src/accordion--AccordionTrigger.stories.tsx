import type { Meta, StoryObj } from '@storybook/react';
import { AccordionTrigger } from './accordion';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof AccordionTrigger> = {
  component: AccordionTrigger,
  title: 'AccordionTrigger',
};
export default meta;
type Story = StoryObj<typeof AccordionTrigger>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AccordionTrigger!/gi)).toBeTruthy();
  },
};
