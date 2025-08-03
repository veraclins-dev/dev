import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Calendar } from './calendar';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Base/Calendar',
};
export default meta;
type Story = StoryObj<typeof Calendar>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Calendar!/gi)).toBeTruthy();
  },
};
