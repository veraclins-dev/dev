import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TableRow } from './table';

const meta: Meta<typeof TableRow> = {
  component: TableRow,
  title: 'Base/Table/Row',
};
export default meta;
type Story = StoryObj<typeof TableRow>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TableRow!/gi)).toBeTruthy();
  },
};
