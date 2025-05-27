import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TableFooter } from './table';

const meta: Meta<typeof TableFooter> = {
  component: TableFooter,
  title: 'Base/Table/Footer',
};
export default meta;
type Story = StoryObj<typeof TableFooter>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TableFooter!/gi)).toBeTruthy();
  },
};
