import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { AccordionItem } from './accordion';

const meta: Meta<typeof AccordionItem> = {
  component: AccordionItem,
  title: 'Base/Accordion/Item',
};
export default meta;
type Story = StoryObj<typeof AccordionItem>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AccordionItem!/gi)).toBeTruthy();
  },
};
