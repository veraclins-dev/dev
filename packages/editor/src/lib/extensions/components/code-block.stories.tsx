import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock  } from './code-block';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
  title: 'CodeBlock', 
};
export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Primary = {
  args: {
    {
		attrs: { language: defaultLanguage = &#39;css&#39; },
	}:  '',
    updateAttributes:  '',
    extension:  '',
  },
};

export const Heading: Story = {
  args: {
    {
		attrs: { language: defaultLanguage = &#39;css&#39; },
	}:  '',
    updateAttributes:  '',
    extension:  '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CodeBlock!/gi)).toBeTruthy();
  },
};

