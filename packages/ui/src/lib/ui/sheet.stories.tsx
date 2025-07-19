import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Button } from './button';
import { Icon } from './icon';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const meta: Meta<typeof Sheet> = {
  component: Sheet,
  title: 'Base/Sheet',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof Sheet>;

export const RightSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Right Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Right Side Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the right side of the screen.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 py-4">
          <p className="text-sm text-muted-foreground">
            This is the main content area of the sheet. You can put any content
            here.
          </p>
        </div>
        <SheetFooter>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open right sheet/i });

    // Click to open sheet
    await userEvent.click(trigger);

    // Check that sheet content is visible
    expect(canvas.getByText('Right Side Sheet')).toBeInTheDocument();
    expect(
      canvas.getByText(/this sheet slides in from the right/i),
    ).toBeInTheDocument();
    expect(
      canvas.getByRole('button', { name: /save changes/i }),
    ).toBeInTheDocument();

    // Close the sheet
    const closeButton = canvas.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);
  },
};

export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Side Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the left side of the screen.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 py-4">
          <p className="text-sm text-muted-foreground">
            Perfect for navigation menus or settings panels.
          </p>
        </div>
        <SheetFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Apply</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open left sheet/i });

    await userEvent.click(trigger);
    expect(canvas.getByText('Left Side Sheet')).toBeInTheDocument();
  },
};

export const TopSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Top Side Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the top of the screen.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Great for notifications or quick actions.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open top sheet/i });

    await userEvent.click(trigger);
    expect(canvas.getByText('Top Side Sheet')).toBeInTheDocument();
  },
};

export const BottomSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom Side Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the bottom of the screen.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Perfect for mobile interfaces and action sheets.
          </p>
        </div>
        <SheetFooter>
          <Button className="w-full">Primary Action</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open bottom sheet/i });

    await userEvent.click(trigger);
    expect(canvas.getByText('Bottom Side Sheet')).toBeInTheDocument();
  },
};

export const NavigationMenu: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon name="hamburger-menu" className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Main navigation options for the application.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 py-4">
          <nav className="space-y-2">
            <Button variant="text" className="w-full justify-start">
              <Icon name="home" className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="text" className="w-full justify-start">
              <Icon name="user" className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="text" className="w-full justify-start">
              <Icon name="cog" className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="text" className="w-full justify-start">
              <Icon name="question-mark-circled" className="mr-2 h-4 w-4" />
              Help
            </Button>
          </nav>
        </div>
        <SheetFooter>
          <Button variant="outline" className="w-full">
            <Icon name="logout" className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open menu/i });

    await userEvent.click(trigger);
    expect(canvas.getByText('Navigation Menu')).toBeInTheDocument();
    expect(canvas.getByText('Dashboard')).toBeInTheDocument();
    expect(canvas.getByText('Profile')).toBeInTheDocument();
    expect(canvas.getByText('Settings')).toBeInTheDocument();
    expect(canvas.getByText('Help')).toBeInTheDocument();
    expect(canvas.getByText('Sign Out')).toBeInTheDocument();
  },
};

export const SettingsPanel: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Icon name="cog" className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Manage your account settings and preferences.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 py-4 space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Account</h4>
            <div className="space-y-2">
              <Button variant="text" className="w-full justify-start">
                <Icon name="user" className="mr-2 h-4 w-4" />
                Profile Information
              </Button>
              <Button variant="text" className="w-full justify-start">
                <Icon name="lock-closed" className="mr-2 h-4 w-4" />
                Security
              </Button>
              <Button variant="text" className="w-full justify-start">
                <Icon name="credit-card" className="mr-2 h-4 w-4" />
                Billing
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Preferences</h4>
            <div className="space-y-2">
              <Button variant="text" className="w-full justify-start">
                <Icon name="bell" className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="text" className="w-full justify-start">
                <Icon name="moon" className="mr-2 h-4 w-4" />
                Appearance
              </Button>
              <Button variant="text" className="w-full justify-start">
                <Icon name="globe" className="mr-2 h-4 w-4" />
                Language
              </Button>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /settings/i });

    await userEvent.click(trigger);
    expect(canvas.getByText('Settings')).toBeInTheDocument();
    expect(canvas.getByText('Account')).toBeInTheDocument();
    expect(canvas.getByText('Preferences')).toBeInTheDocument();
    expect(canvas.getByText('Profile Information')).toBeInTheDocument();
    expect(canvas.getByText('Security')).toBeInTheDocument();
    expect(canvas.getByText('Billing')).toBeInTheDocument();
  },
};

export const FormSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add New Item</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Add New Item</SheetTitle>
          <SheetDescription>
            Fill out the form below to create a new item.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 py-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter item name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Enter description"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
              </select>
            </div>
          </form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Create Item</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /add new item/i });

    await userEvent.click(trigger);
    expect(canvas.getByText('Add New Item')).toBeInTheDocument();
    expect(canvas.getByLabelText('Name')).toBeInTheDocument();
    expect(canvas.getByLabelText('Description')).toBeInTheDocument();
    expect(canvas.getByLabelText('Category')).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(
      canvas.getByRole('button', { name: /create item/i }),
    ).toBeInTheDocument();
  },
};

export const CustomCloseButton: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Custom Close</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Custom Close Button</SheetTitle>
          <SheetDescription>
            This sheet has a custom close button in the footer.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 py-4">
          <p className="text-sm text-muted-foreground">
            The default close button in the top-right corner is still available,
            but you can also add custom close buttons in the footer.
          </p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close Sheet</Button>
          </SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /custom close/i });

    await userEvent.click(trigger);
    expect(canvas.getByText('Custom Close Button')).toBeInTheDocument();
    expect(
      canvas.getByRole('button', { name: /close sheet/i }),
    ).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /save/i })).toBeInTheDocument();
  },
};
