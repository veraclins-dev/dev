import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Icon,
  type IconName,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@veraclins-dev/ui';

type Team = {
  name: string;
  logo: IconName;
  plan: string;
};

type Project = {
  name: string;
  url: string;
  icon: IconName;
};

type NavItem = {
  title: string;
  url: string;
  icon: IconName;
  isActive?: boolean;
  items?: NavItemSub[];
};

type NavItemSub = {
  title: string;
  url: string;
};

type Data = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  teams: Team[];
  navMain: NavItem[];
  projects: Project[];
};

// Package navigation data
const data: Data = {
  user: {
    name: 'Veraclins Dev',
    email: 'dev@veraclins.dev',
    avatar: 'https://github.com/shadcn.png',
  },
  teams: [
    {
      name: 'Veraclins',
      logo: 'building-office',
      plan: 'Design System',
    },
  ],
  navMain: [
    {
      title: 'UI Components',
      url: '/',
      icon: 'paint-brush',
      isActive: true,
      items: [
        {
          title: 'Boxes',
          url: '/boxes',
        },
        {
          title: 'Typography',
          url: '/typography',
        },
        {
          title: 'Cards',
          url: '/cards',
        },
        {
          title: 'Breadcrumbs',
          url: '/breadcrumbs',
        },
        {
          title: 'Buttons',
          url: '/buttons',
        },
        {
          title: 'Links',
          url: '/links',
        },
        {
          title: 'Inputs',
          url: '/inputs',
        },
        {
          title: 'Autocomplete',
          url: '/autocomplete',
        },
        {
          title: 'Forms',
          url: '/forms',
        },
        {
          title: 'Calendar',
          url: '/calendar',
        },
        {
          title: 'Date Picker',
          url: '/date-picker',
        },
        {
          title: 'Time Picker',
          url: '/time-picker',
        },
        {
          title: 'Feedback',
          url: '/feedback',
        },
        {
          title: 'Badges',
          url: '/badges',
        },
        {
          title: 'Chips',
          url: '/chips',
        },
        {
          title: 'List',
          url: '/list',
        },
        {
          title: 'Separator',
          url: '/separator',
        },
        {
          title: 'Avatar',
          url: '/avatar',
        },
        {
          title: 'Accordion',
          url: '/accordion',
        },
        {
          title: 'Chart',
          url: '/chart',
        },
        {
          title: 'Table',
          url: '/table',
        },
        {
          title: 'Images',
          url: '/images',
        },
        {
          title: 'Overlays',
          url: '/overlays',
        },
        {
          title: 'Colors',
          url: '/colors',
        },
        {
          title: 'Icons',
          url: '/icons',
        },
      ],
    },
    {
      title: 'Packages',
      url: '/',
      icon: 'cube',
      items: [
        {
          title: 'Editor',
          url: '/editor',
        },
        {
          title: 'Docs',
          url: '/docs',
        },
        {
          title: 'Auth',
          url: '/auth',
        },
        {
          title: 'SEO',
          url: '/seo',
        },
        {
          title: 'Utils',
          url: '/utils',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Home',
      url: '/',
      icon: 'home',
    },
  ],
};

export function AppSidebar() {
  const [activeTeam, setActiveTeam] = useState(data.teams[0]);
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  buttonSize="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Icon name={activeTeam.logo} className="size-5" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeTeam.name}
                    </span>
                    <span className="truncate text-xs">{activeTeam.plan}</span>
                  </div>
                  <Icon name="chevron-up-down" className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Teams
                </DropdownMenuLabel>
                {data.teams.map((team, index) => (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => setActiveTeam(team)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <Icon name={team.logo} className="size-4 shrink-0" />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Icon name="plus" className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Add team
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const isActive = item.items?.some(
                (subItem) => subItem.url === location.pathname,
              );
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <Icon name={item.icon} />}
                        <span>{item.title}</span>
                        <Icon
                          name="chevron-right"
                          className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const isSubItemActive =
                            subItem.url === location.pathname;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isSubItemActive}
                              >
                                <RouterLink to={subItem.url} className="w-full">
                                  <span>{subItem.title}</span>
                                </RouterLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
          <SidebarMenu>
            {data.projects.map((item) => {
              const isProjectActive = item.url === location.pathname;
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={isProjectActive}>
                    <RouterLink to={item.url}>
                      <Icon name={item.icon} />
                      <span>{item.name}</span>
                    </RouterLink>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <Icon name="ellipsis-horizontal" />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        <Icon name="folder" className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon
                          name="forward"
                          className="text-muted-foreground"
                        />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Icon name="trash" className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              );
            })}
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <Icon
                  name="ellipsis-horizontal"
                  className="text-sidebar-foreground/70"
                />
                <span>More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  buttonSize="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {data.user.name}
                    </span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                  <Icon name="chevron-up-down" className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Icon name="sparkles" />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Icon name="banknotes" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="credit-card" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="bell" />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name="arrow-right-on-rectangle" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
