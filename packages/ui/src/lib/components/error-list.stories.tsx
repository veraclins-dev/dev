import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ErrorList } from './error-list';

const meta: Meta<typeof ErrorList> = {
  component: ErrorList,
  title: 'Components/ErrorList',
};
export default meta;
type Story = StoryObj<typeof ErrorList>;

export const Primary = {
  args: {
    errors: '',
    id: '',
    className: '',
    errorItemClassName: '',
  },
};

export const Heading: Story = {
  args: {
    errors: ['Error 1', 'Error 2'],
    id: '',
    className: '',
    errorItemClassName: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ErrorList!/gi)).toBeTruthy();
  },
};
