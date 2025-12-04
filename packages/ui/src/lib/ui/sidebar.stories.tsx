import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import { Icon } from './icon';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from './sidebar';

const meta: Meta<typeof SidebarProvider> = {
  component: SidebarProvider,
  title: 'Base/Sidebar',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof SidebarProvider>;

export const Basic: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <Icon name="home" className="h-6 w-6" />
            <span className="font-semibold">My App</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <Icon name="home" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="user" />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="cog" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to My App</h1>
            <p className="text-muted-foreground">
              This is the main content area.
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('My App')).toBeInTheDocument();
    expect(canvas.getByText('Dashboard')).toBeInTheDocument();
    expect(canvas.getByText('Profile')).toBeInTheDocument();
    expect(canvas.getByText('Settings')).toBeInTheDocument();
    expect(canvas.getByText('John Doe')).toBeInTheDocument();
  },
};

export const WithGroups: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <Icon name="home" className="h-6 w-6" />
            <span className="font-semibold">My App</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Icon name="home" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="user" />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="cog" />
                    <span>General</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="bell" />
                    <span>Notifications</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="lock-closed" />
                    <span>Security</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to My App</h1>
            <p className="text-muted-foreground">
              This is the main content area.
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Main')).toBeInTheDocument();
    expect(canvas.getByText('Settings')).toBeInTheDocument();
    expect(canvas.getByText('Dashboard')).toBeInTheDocument();
    expect(canvas.getByText('Profile')).toBeInTheDocument();
    expect(canvas.getByText('General')).toBeInTheDocument();
    expect(canvas.getByText('Notifications')).toBeInTheDocument();
    expect(canvas.getByText('Security')).toBeInTheDocument();
  },
};

export const WithSubMenu: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <Icon name="home" className="h-6 w-6" />
            <span className="font-semibold">My App</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <Icon name="home" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="user" />
                <span>Users</span>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#all-users">
                      All Users
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#active-users">
                      Active Users
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#inactive-users">
                      Inactive Users
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="cog" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to My App</h1>
            <p className="text-muted-foreground">
              This is the main content area.
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Users')).toBeInTheDocument();
    expect(canvas.getByText('All Users')).toBeInTheDocument();
    expect(canvas.getByText('Active Users')).toBeInTheDocument();
    expect(canvas.getByText('Inactive Users')).toBeInTheDocument();
  },
};

export const WithBadges: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <Icon name="home" className="h-6 w-6" />
            <span className="font-semibold">My App</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <Icon name="home" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="bell" />
                <span>Notifications</span>
                <SidebarMenuBadge>3</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="document" />
                <span>Messages</span>
                <SidebarMenuBadge>12</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="cog" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to My App</h1>
            <p className="text-muted-foreground">
              This is the main content area.
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('3')).toBeInTheDocument();
    expect(canvas.getByText('12')).toBeInTheDocument();
  },
};

export const WithActions: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <Icon name="home" className="h-6 w-6" />
            <span className="font-semibold">My App</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              Projects
              <SidebarGroupAction>
                <Button variant="text" buttonSize="sm">
                  <Icon name="plus" className="h-4 w-4" />
                </Button>
              </SidebarGroupAction>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="folder" />
                    <span>Project Alpha</span>
                    <SidebarMenuAction>
                      <Button variant="text" buttonSize="sm">
                        <Icon name="dots-horizontal" className="h-4 w-4" />
                      </Button>
                    </SidebarMenuAction>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="folder" />
                    <span>Project Beta</span>
                    <SidebarMenuAction>
                      <Button variant="text" buttonSize="sm">
                        <Icon name="dots-horizontal" className="h-4 w-4" />
                      </Button>
                    </SidebarMenuAction>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to My App</h1>
            <p className="text-muted-foreground">
              This is the main content area.
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Projects')).toBeInTheDocument();
    expect(canvas.getByText('Project Alpha')).toBeInTheDocument();
    expect(canvas.getByText('Project Beta')).toBeInTheDocument();
  },
};

export const Collapsible: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <Icon name="home" className="h-6 w-6" />
            <span className="font-semibold">My App</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <Icon name="home" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="user" />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="cog" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to My App</h1>
            <p className="text-muted-foreground">
              This is the main content area.
            </p>
            <SidebarTrigger className="mt-4" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /toggle sidebar/i });

    // Initially sidebar should be collapsed
    expect(canvas.queryByText('Dashboard')).not.toBeInTheDocument();

    // Click to expand
    await userEvent.click(trigger);

    // Sidebar should now be visible
    expect(canvas.getByText('Dashboard')).toBeInTheDocument();
  },
};
