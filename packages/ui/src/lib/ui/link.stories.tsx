import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Link } from './link';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Base/Link',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['link', 'button'],
      description: 'Type of link styling',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'destructive',
        'success',
        'warning',
        'info',
        'neutral',
      ],
      description: 'Color variant of the link',
    },
    underline: {
      control: 'select',
      options: ['none', 'hover', 'always'],
      description: 'Underline behavior',
    },
    linkSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the link text',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'text', 'plain'],
      description: 'Visual variant of the link',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Default Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /default link/i });
    expect(link).toHaveAttribute('href', '#');
    expect(link).toHaveClass('text-primary');
  },
};

export const Primary: Story = {
  args: {
    href: '#',
    color: 'primary',
    children: 'Primary Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /primary link/i });
    expect(link).toHaveClass('text-primary');
  },
};

export const Secondary: Story = {
  args: {
    href: '#',
    color: 'secondary',
    children: 'Secondary Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /secondary link/i });
    expect(link).toHaveClass('text-secondary');
  },
};

export const Destructive: Story = {
  args: {
    href: '#',
    color: 'destructive',
    children: 'Destructive Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /destructive link/i });
    expect(link).toHaveClass('text-destructive');
  },
};

export const Success: Story = {
  args: {
    href: '#',
    color: 'success',
    children: 'Success Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /success link/i });
    expect(link).toHaveClass('text-success');
  },
};

export const Warning: Story = {
  args: {
    href: '#',
    color: 'warning',
    children: 'Warning Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /warning link/i });
    expect(link).toHaveClass('text-warning');
  },
};

export const Info: Story = {
  args: {
    href: '#',
    color: 'info',
    children: 'Info Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /info link/i });
    expect(link).toHaveClass('text-info');
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    type: 'link',
    target: '_blank',
    children: 'External Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /external link/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};

export const UnderlineHover: Story = {
  args: {
    href: '#',
    underline: 'hover',
    children: 'Hover Underline Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /hover underline link/i });
    expect(link).toHaveClass('hover:underline');
  },
};

export const UnderlineAlways: Story = {
  args: {
    href: '#',
    underline: 'always',
    children: 'Always Underlined Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /always underlined link/i });
    expect(link).toHaveClass('underline');
  },
};

export const UnderlineNone: Story = {
  args: {
    href: '#',
    underline: 'none',
    children: 'No Underline Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /no underline link/i });
    expect(link).toHaveClass('no-underline');
  },
};

export const Small: Story = {
  args: {
    href: '#',
    linkSize: 'sm',
    children: 'Small Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /small link/i });
    expect(link).toHaveClass('text-sm');
  },
};

export const Large: Story = {
  args: {
    href: '#',
    linkSize: 'lg',
    children: 'Large Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /large link/i });
    expect(link).toHaveClass('text-lg');
  },
};

export const Muted: Story = {
  args: {
    href: '#',
    variant: 'text',
    children: 'Muted Link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /muted link/i });
    expect(link).toHaveClass('text-foreground/80');
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <Link href="#" color="primary">
        <svg
          className="inline-block w-4 h-4 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Download File
      </Link>

      <Link href="#" color="secondary">
        <svg
          className="inline-block w-4 h-4 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        Learn More
      </Link>

      <Link href="#" color="destructive">
        <svg
          className="inline-block w-4 h-4 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 000 2h2a1 1 0 002 0 1 1 0 000-2H9zM4 5a1 1 0 011-1h10a1 1 0 011 1v1H4V5zM4 7v8a2 2 0 002 2h8a2 2 0 002-2V7H4z"
            clipRule="evenodd"
          />
        </svg>
        Delete Item
      </Link>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByRole('link', { name: /download file/i }),
    ).toBeInTheDocument();
    expect(
      canvas.getByRole('link', { name: /learn more/i }),
    ).toBeInTheDocument();
    expect(
      canvas.getByRole('link', { name: /delete item/i }),
    ).toBeInTheDocument();
  },
};

export const NavigationLinks: Story = {
  render: () => (
    <nav className="space-y-2">
      <Link href="/dashboard" color="primary" underline="hover">
        Dashboard
      </Link>
      <Link href="/profile" color="secondary" underline="hover">
        Profile
      </Link>
      <Link href="/settings" color="secondary" underline="hover">
        Settings
      </Link>
      <Link href="/help" color="info" underline="hover">
        Help & Support
      </Link>
      <Link href="/logout" color="destructive" underline="hover">
        Logout
      </Link>
    </nav>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByRole('link', { name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: /settings/i })).toBeInTheDocument();
    expect(
      canvas.getByRole('link', { name: /help & support/i }),
    ).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: /logout/i })).toBeInTheDocument();
  },
};

export const FooterLinks: Story = {
  render: () => (
    <footer className="space-y-4">
      <div className="flex space-x-6">
        <Link href="/privacy" variant="text" linkSize="sm">
          Privacy Policy
        </Link>
        <Link href="/terms" variant="text" linkSize="sm">
          Terms of Service
        </Link>
        <Link href="/cookies" variant="text" linkSize="sm">
          Cookie Policy
        </Link>
      </div>
      <div className="flex space-x-6">
        <Link
          href="https://twitter.com"
          type="link"
          target="_blank"
          variant="text"
          linkSize="sm"
        >
          Twitter
        </Link>
        <Link
          href="https://github.com"
          type="link"
          target="_blank"
          variant="text"
          linkSize="sm"
        >
          GitHub
        </Link>
        <Link
          href="https://linkedin.com"
          type="link"
          target="_blank"
          variant="text"
          linkSize="sm"
        >
          LinkedIn
        </Link>
      </div>
    </footer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByRole('link', { name: /privacy policy/i }),
    ).toBeInTheDocument();
    expect(
      canvas.getByRole('link', { name: /terms of service/i }),
    ).toBeInTheDocument();
    expect(
      canvas.getByRole('link', { name: /cookie policy/i }),
    ).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: /github/i })).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
  },
};
