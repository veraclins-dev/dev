import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from './button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible';
import { Icon } from './icon';

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
  title: 'Base/Collapsible',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Basic: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>Click to expand</span>
          <Icon name="chevron-down" className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm">
          <p>
            This is the collapsible content that appears when you click the
            trigger.
          </p>
          <p className="mt-2">
            You can put any content here, including forms, lists, or other
            components.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /click to expand/i });

    // Initially content should be hidden
    expect(
      canvas.queryByText(/this is the collapsible content/i),
    ).not.toBeInTheDocument();

    // Click to expand
    await userEvent.click(trigger);

    // Content should now be visible
    expect(
      canvas.getByText(/this is the collapsible content/i),
    ).toBeInTheDocument();

    // Click again to collapse
    await userEvent.click(trigger);

    // Content should be hidden again
    expect(
      canvas.queryByText(/this is the collapsible content/i),
    ).not.toBeInTheDocument();
  },
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>Default Open</span>
          <Icon
            name="chevron-down"
            className="h-4 w-4 transition-transform data-[state=open]:rotate-180"
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm">
          <p>This content is visible by default when the component mounts.</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Content should be visible by default
    expect(
      canvas.getByText(/this content is visible by default/i),
    ).toBeInTheDocument();
  },
};

export const WithForm: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>Advanced Settings</span>
          <Icon
            name="chevron-down"
            className="h-4 w-4 transition-transform data-[state=open]:rotate-180"
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4">
        <div className="rounded-md border p-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Email Notifications</label>
            <p className="text-sm text-muted-foreground">
              Receive email notifications for important updates.
            </p>
          </div>
          <div>
            <label className="text-sm font-medium">Push Notifications</label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications on your device.
            </p>
          </div>
          <div>
            <label className="text-sm font-medium">SMS Notifications</label>
            <p className="text-sm text-muted-foreground">
              Receive SMS notifications for critical alerts.
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /advanced settings/i });

    // Click to expand
    await userEvent.click(trigger);

    // Check that form content is visible
    expect(canvas.getByText(/email notifications/i)).toBeInTheDocument();
    expect(canvas.getByText(/push notifications/i)).toBeInTheDocument();
    expect(canvas.getByText(/sms notifications/i)).toBeInTheDocument();
  },
};

export const WithList: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>Project Files</span>
          <Icon
            name="chevron-down"
            className="h-4 w-4 transition-transform data-[state=open]:rotate-180"
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border">
          <ul className="divide-y">
            <li className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-3">
                <Icon name="document" className="h-4 w-4" />
                <span className="text-sm">README.md</span>
              </div>
              <span className="text-xs text-muted-foreground">2.1 KB</span>
            </li>
            <li className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-3">
                <Icon name="document" className="h-4 w-4" />
                <span className="text-sm">package.json</span>
              </div>
              <span className="text-xs text-muted-foreground">1.8 KB</span>
            </li>
            <li className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-3">
                <Icon name="folder" className="h-4 w-4" />
                <span className="text-sm">src/</span>
              </div>
              <span className="text-xs text-muted-foreground">Directory</span>
            </li>
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /project files/i });

    // Click to expand
    await userEvent.click(trigger);

    // Check that list items are visible
    expect(canvas.getByText(/readme\.md/i)).toBeInTheDocument();
    expect(canvas.getByText(/package\.json/i)).toBeInTheDocument();
    expect(canvas.getByText(/src\//i)).toBeInTheDocument();
  },
};

export const Animated: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>Animated Content</span>
          <Icon
            name="chevron-down"
            className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180"
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out">
        <div className="rounded-md border px-4 py-3 text-sm space-y-2">
          <p>
            This content has smooth animations when expanding and collapsing.
          </p>
          <p>
            The transition duration and easing can be customized with CSS
            classes.
          </p>
          <div className="bg-muted p-2 rounded">
            <code className="text-xs">
              transition-all duration-300 ease-in-out
            </code>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /animated content/i });

    // Click to expand
    await userEvent.click(trigger);

    // Check that animated content is visible
    expect(
      canvas.getByText(/this content has smooth animations/i),
    ).toBeInTheDocument();
    expect(
      canvas.getByText(/transition-all duration-300 ease-in-out/i),
    ).toBeInTheDocument();
  },
};

export const MultipleCollapsibles: Story = {
  render: () => (
    <div className="space-y-4">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Section 1</span>
            <Icon
              name="chevron-down"
              className="h-4 w-4 transition-transform data-[state=open]:rotate-180"
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            <p>Content for section 1</p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Section 2</span>
            <Icon
              name="chevron-down"
              className="h-4 w-4 transition-transform data-[state=open]:rotate-180"
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            <p>Content for section 2</p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Section 3</span>
            <Icon
              name="chevron-down"
              className="h-4 w-4 transition-transform data-[state=open]:rotate-180"
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            <p>Content for section 3</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click each section to expand
    await userEvent.click(canvas.getByRole('button', { name: /section 1/i }));
    await userEvent.click(canvas.getByRole('button', { name: /section 2/i }));
    await userEvent.click(canvas.getByRole('button', { name: /section 3/i }));

    // Check that all content is visible
    expect(canvas.getByText(/content for section 1/i)).toBeInTheDocument();
    expect(canvas.getByText(/content for section 2/i)).toBeInTheDocument();
    expect(canvas.getByText(/content for section 3/i)).toBeInTheDocument();
  },
};
