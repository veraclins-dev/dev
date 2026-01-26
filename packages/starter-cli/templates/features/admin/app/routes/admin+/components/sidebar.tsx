import {
  Box,
  Icon,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  Typography,
  Link,
  SidebarRail,
  type IconName,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@veraclins-dev/ui';
import { Link as RouterLink, useLocation } from 'react-router';
import { Logo } from '../../../components/logo';
import { APP_NAME } from '../../../utils/constants';

interface AdminSidebarItem {
  text: string;
  to: string;
  icon: IconName;
  items?: AdminSidebarItem[];
}

interface DashboardItem {
  text: string;
  to: string;
  icon: IconName;
}

// Dashboard items - customize based on your project needs
const dashboardItems: DashboardItem[] = [
  {
    text: 'Overview',
    to: '/admin/dashboard',
    icon: 'chart-bar',
  },
  {
    text: 'Operations',
    to: '/admin/dashboard/operations',
    icon: 'cog',
  },
];

// Admin management items - customize based on your project needs
const adminSidebarItems: AdminSidebarItem[] = [
  {
    text: 'User Management',
    to: '/admin/users',
    icon: 'users',
  },
  {
    text: 'Platform Configuration',
    to: '/admin/settings',
    icon: 'cog-6-tooth',
  },
  {
    text: 'Security and Access Control',
    to: '/admin/security',
    icon: 'lock-closed',
  },
];

// Quick action items - customize based on your project needs
const quickActionItems: AdminSidebarItem[] = [
  {
    text: 'Audit Logs',
    to: '/admin/audit',
    icon: 'document-text',
  },
];

function DashboardMenuItem({ item }: { item: DashboardItem }) {
  const location = useLocation();
  const isActive = location.pathname === item.to;

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild isActive={isActive} className="w-full">
        <Link component={RouterLink} to={item.to} underline="none">
          <Icon name={item.icon} />
          <span>{item.text}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

function DashboardCollapsibleContent() {
  return (
    <CollapsibleContent>
      <SidebarMenuSub>
        {dashboardItems.map((item) => (
          <DashboardMenuItem key={item.text} item={item} />
        ))}
      </SidebarMenuSub>
    </CollapsibleContent>
  );
}

function DashboardMenuButton() {
  return (
    <SidebarMenuButton tooltip="Dashboard">
      <Icon name="chart-bar" />
      <span>Dashboard</span>
      <Icon
        name="chevron-right"
        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
      />
    </SidebarMenuButton>
  );
}

function DashboardCollapsibleMenuItem() {
  const location = useLocation();

  return (
    <Collapsible
      asChild
      defaultOpen={location.pathname.startsWith('/admin/dashboard')}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <DashboardMenuButton />
        </CollapsibleTrigger>
        <DashboardCollapsibleContent />
      </SidebarMenuItem>
    </Collapsible>
  );
}

function DashboardSection() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        <DashboardCollapsibleMenuItem />
      </SidebarMenu>
    </SidebarGroup>
  );
}

function AdminMenuItem({ item }: { item: AdminSidebarItem }) {
  const location = useLocation();
  const isActive = location.pathname === item.to;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.text}
        className="data-[state=open]:bg-neutral data-[state=open]:text-sidebar-accent-foreground"
      >
        <Link component={RouterLink} to={item.to} underline="none">
          <Icon name={item.icon} />
          <span>{item.text}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function AdministrationSection() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarMenu>
        {adminSidebarItems.map((item) => (
          <AdminMenuItem key={item.text} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function QuickActionMenuItem({ item }: { item: AdminSidebarItem }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.text}>
        <Link component={RouterLink} to={item.to} underline="none">
          <Icon name={item.icon} />
          <span>{item.text}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function QuickActionsSection() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
      <SidebarMenu>
        {quickActionItems.map((item) => (
          <QuickActionMenuItem key={item.text} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarLogo() {
  return (
    <Box display="grid" flex="1" className="text-left leading-tight">
      <Typography variant="h5" className="truncate">
        {APP_NAME}
      </Typography>
      <Typography className="truncate text-xs">Admin Panel</Typography>
    </Box>
  );
}

function SidebarHeaderContent() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          buttonSize="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Logo icon className="aspect-square size-8" />
          <SidebarLogo />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>

      <SidebarContent>
        <DashboardSection />
        <AdministrationSection />
        <QuickActionsSection />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
