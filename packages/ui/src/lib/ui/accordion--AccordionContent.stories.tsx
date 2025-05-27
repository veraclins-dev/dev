import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { AccordionContent } from './accordion';

const meta: Meta<typeof AccordionContent> = {
  component: AccordionContent,
  title: 'Base/Accordion/Content',
};
export default meta;
type Story = StoryObj<typeof AccordionContent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AccordionContent!/gi)).toBeTruthy();
  },
};
