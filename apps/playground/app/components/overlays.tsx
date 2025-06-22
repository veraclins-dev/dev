import { useState } from 'react';

import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  ComposedDropdownMenu,
  ComposedPopover,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography,
} from '@veraclins-dev/ui';

export function Overlays() {
  const [activeTab, setActiveTab] = useState<
    | 'navigation'
    | 'dropdowns'
    | 'dialogs'
    | 'drawers'
    | 'sheets'
    | 'tooltips'
    | 'hovercards'
    | 'popovers'
  >('navigation');

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <Typography variant="h1" className="text-center">
        Overlays & Modals
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Comprehensive collection of overlay components for navigation, user
        interactions, notifications, and content presentation.
      </Typography>

      {/* Features Overview */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge color="primary" variant="soft">
                Navigation
              </Badge>
              Command & Dropdowns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="body2">
              Command palettes, dropdown menus, and navigation components for
              advanced user interactions.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge color="success" variant="soft">
                Modal
              </Badge>
              Dialog & Sheet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="body2">
              Modal dialogs and sheets for focused user interactions, forms, and
              content presentation.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge color="info" variant="soft">
                Hover
              </Badge>
              Tooltip & HoverCard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="body2">
              Hover-triggered components for additional information and rich
              content previews.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tab Navigation */}
      <Box className="flex gap-2 py-2 mb-4 overflow-x-auto">
        <Button
          variant={activeTab === 'navigation' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('navigation')}
        >
          Navigation
        </Button>
        <Button
          variant={activeTab === 'dropdowns' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('dropdowns')}
        >
          Dropdowns
        </Button>
        <Button
          variant={activeTab === 'dialogs' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('dialogs')}
        >
          Dialogs
        </Button>
        <Button
          variant={activeTab === 'drawers' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('drawers')}
        >
          Drawers
        </Button>
        <Button
          variant={activeTab === 'sheets' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('sheets')}
        >
          Sheets
        </Button>
        <Button
          variant={activeTab === 'tooltips' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('tooltips')}
        >
          Tooltips
        </Button>
        <Button
          variant={activeTab === 'hovercards' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('hovercards')}
        >
          HoverCards
        </Button>
        <Button
          variant={activeTab === 'popovers' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('popovers')}
        >
          Popovers
        </Button>
      </Box>

      {/* Navigation Tab */}
      {activeTab === 'navigation' && (
        <Box display="flex" flexDirection="column" gap={8}>
          {/* Command Palette Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Command Palette</CardTitle>
              <CardDescription>
                Command palette for quick navigation and actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Box display="flex" flexDirection="column" gap={8}>
                {/* Basic Command Palette */}
                <Box>
                  <Typography variant="h4" className="mb-4">
                    Basic Command Palette
                  </Typography>
                  <Command className="max-w-md">
                    <CommandInput placeholder="Search commands..." />
                    <CommandList>
                      <CommandItem value="dashboard">
                        <Icon name="home" className="mr-2" />
                        Dashboard
                      </CommandItem>
                      <CommandItem value="settings">
                        <Icon name="cog" className="mr-2" />
                        Settings
                      </CommandItem>
                      <CommandItem value="profile">
                        <Icon name="user" className="mr-2" />
                        Profile
                      </CommandItem>
                      <CommandItem value="help">
                        <Icon name="question-mark-circled" className="mr-2" />
                        Help
                      </CommandItem>
                    </CommandList>
                  </Command>
                </Box>

                {/* Real-Life Command Palette Examples */}
                <Box>
                  <Typography variant="h4" className="mb-4">
                    Real-Life Command Palette Examples
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={6}>
                    {/* File Management */}
                    <Card className="bg-card-inner">
                      <CardContent className="p-4">
                        <Typography variant="h5" className="mb-3">
                          File Management Commands
                        </Typography>
                        <Command className="max-w-lg">
                          <CommandInput placeholder="Search files and actions..." />
                          <CommandList>
                            <CommandItem value="new-file">
                              <Icon name="document-plus" className="mr-2" />
                              New File
                            </CommandItem>
                            <CommandItem value="open-file">
                              <Icon name="folder-open" className="mr-2" />
                              Open File
                            </CommandItem>
                            <CommandItem value="save">
                              <Icon name="check" className="mr-2" />
                              Save
                            </CommandItem>
                            <CommandItem value="export">
                              <Icon name="arrow-down-tray" className="mr-2" />
                              Export
                            </CommandItem>
                            <CommandItem value="print">
                              <Icon name="printer" className="mr-2" />
                              Print
                            </CommandItem>
                          </CommandList>
                        </Command>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Dropdowns Tab */}
      {activeTab === 'dropdowns' && (
        <Box display="flex" flexDirection="column" gap={8}>
          {/* DropdownMenu Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>DropdownMenu Components</CardTitle>
              <CardDescription>
                Context menus and dropdowns for actions and navigation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Box display="flex" flexDirection="column" gap={8}>
                {/* Basic DropdownMenus */}
                <Box>
                  <Typography variant="h4" className="mb-4">
                    Basic DropdownMenus
                  </Typography>
                  <Box display="flex" gap={4} flexWrap="wrap">
                    <ComposedDropdownMenu
                      Trigger={Button}
                      TriggerProps={{
                        variant: 'outline',
                        children: (
                          <>
                            Actions
                            <Icon name="chevron-down" className="ml-2" />
                          </>
                        ),
                      }}
                      items={[
                        {
                          key: 'edit',
                          label: 'Edit',
                          onClick: () => console.log('Edit clicked'),
                        },
                        {
                          key: 'delete',
                          label: 'Delete',
                          onClick: () => console.log('Delete clicked'),
                        },
                        {
                          key: 'duplicate',
                          label: 'Duplicate',
                          onClick: () => console.log('Duplicate clicked'),
                        },
                      ]}
                    />

                    <ComposedDropdownMenu
                      Trigger={Button}
                      TriggerProps={{
                        variant: 'outline',
                        children: (
                          <>
                            More Options
                            <Icon name="ellipsis-horizontal" className="ml-2" />
                          </>
                        ),
                      }}
                      items={[
                        {
                          key: 'view',
                          label: 'View Details',
                          onClick: () => console.log('View details clicked'),
                        },
                        {
                          key: 'share',
                          label: 'Share',
                          onClick: () => console.log('Share clicked'),
                        },
                        {
                          key: 'export',
                          label: 'Export',
                          onClick: () => console.log('Export clicked'),
                        },
                      ]}
                    />
                  </Box>
                </Box>

                {/* Real-Life DropdownMenu Examples */}
                <Box>
                  <Typography variant="h4" className="mb-4">
                    Real-Life DropdownMenu Examples
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={6}>
                    {/* User Profile Menu */}
                    <Card className="bg-card-inner">
                      <CardContent className="p-4">
                        <Typography variant="h5" className="mb-3">
                          User Profile Menu
                        </Typography>
                        <Box display="flex" gap={4}>
                          <ComposedDropdownMenu
                            Trigger={Button}
                            TriggerProps={{
                              variant: 'outline',
                              className: 'flex items-center gap-2',
                              children: (
                                <>
                                  <Box className="w-6 h-6 bg-primary rounded-full" />
                                  <Typography variant="body2">
                                    John Doe
                                  </Typography>
                                  <Icon name="chevron-down" />
                                </>
                              ),
                            }}
                            items={[
                              {
                                key: 'profile',
                                label: 'My Profile',
                                onClick: () => console.log('Profile clicked'),
                              },
                              {
                                key: 'settings',
                                label: 'Settings',
                                onClick: () => console.log('Settings clicked'),
                              },
                              {
                                key: 'billing',
                                label: 'Billing',
                                onClick: () => console.log('Billing clicked'),
                              },
                              {
                                key: 'separator-1',
                                isSeparator: true,
                              },
                              {
                                key: 'help',
                                label: 'Help & Support',
                                onClick: () => console.log('Help clicked'),
                              },
                              {
                                key: 'logout',
                                label: 'Logout',
                                onClick: () => console.log('Logout clicked'),
                              },
                            ]}
                          />
                        </Box>
                      </CardContent>
                    </Card>

                    {/* Table Actions Menu */}
                    <Card className="bg-card-inner">
                      <CardContent className="p-4">
                        <Typography variant="h5" className="mb-3">
                          Table Actions Menu
                        </Typography>
                        <Box
                          display="flex"
                          justify="between"
                          className="bg-card"
                          items="center"
                          p={2}
                          gap={4}
                        >
                          <Typography>Row data</Typography>
                          <ComposedDropdownMenu
                            Trigger={Button}
                            TriggerProps={{
                              size: 'icon',
                              variant: 'soft',
                              color: 'neutral',
                              children: <Icon name="ellipsis-horizontal" />,
                            }}
                            items={[
                              {
                                key: 'view',
                                label: 'View',
                                icon: 'eye-open',
                                onClick: () => console.log('View clicked'),
                              },
                              {
                                key: 'edit',
                                label: 'Edit',
                                icon: 'pencil',
                                onClick: () => console.log('Edit clicked'),
                              },
                              {
                                key: 'duplicate',
                                label: 'Duplicate',
                                icon: 'copy',
                                onClick: () => console.log('Duplicate clicked'),
                              },
                              {
                                key: 'separator-1',
                                isSeparator: true,
                              },
                              {
                                key: 'archive',
                                label: 'Archive',
                                icon: 'archive',
                                onClick: () => console.log('Archive clicked'),
                              },
                              {
                                key: 'delete',
                                label: 'Delete',
                                icon: 'trash',
                                onClick: () => console.log('Delete clicked'),
                              },
                            ]}
                          />
                        </Box>
                      </CardContent>
                    </Card>

                    {/* Filter Dropdown */}
                    <Card className="bg-card-inner">
                      <CardContent className="p-4">
                        <Typography variant="h5" className="mb-3">
                          Filter Dropdown
                        </Typography>
                        <Box display="flex" gap={4}>
                          <ComposedDropdownMenu
                            Trigger={Button}
                            TriggerProps={{
                              variant: 'outline',
                              children: (
                                <>
                                  <Icon name="funnel" className="mr-2" />
                                  Filter by Status
                                  <Icon name="chevron-down" className="ml-2" />
                                </>
                              ),
                            }}
                            items={[
                              {
                                key: 'all',
                                label: 'All Items',
                                onClick: () => console.log('All clicked'),
                              },
                              {
                                key: 'active',
                                label: 'Active',
                                onClick: () => console.log('Active clicked'),
                              },
                              {
                                key: 'pending',
                                label: 'Pending',
                                onClick: () => console.log('Pending clicked'),
                              },
                              {
                                key: 'completed',
                                label: 'Completed',
                                onClick: () => console.log('Completed clicked'),
                              },
                              {
                                key: 'cancelled',
                                label: 'Cancelled',
                                onClick: () => console.log('Cancelled clicked'),
                              },
                            ]}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Dialogs Tab */}
      {activeTab === 'dialogs' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Modal Dialog Examples</CardTitle>
              <CardDescription>
                Modal dialogs for focused user interactions and content
                presentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="body2">
                Modal dialogs are perfect for forms, confirmations, and focused
                content that requires user attention.
              </Typography>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Dialog */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Basic Dialog
                  </Typography>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open Basic Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Basic Dialog</DialogTitle>
                        <DialogDescription>
                          This is a basic modal dialog example.
                        </DialogDescription>
                      </DialogHeader>
                      <Typography variant="body2" className="py-4">
                        This dialog demonstrates the basic structure and styling
                        of modal dialogs.
                      </Typography>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button>Confirm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Box>

                {/* Form Dialog */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Form Dialog
                  </Typography>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open Form Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                        <DialogDescription>
                          Fill in the details to create a new project.
                        </DialogDescription>
                      </DialogHeader>
                      <Box className="space-y-4 py-4">
                        <Box>
                          <Label htmlFor="name">Project Name</Label>
                          <Input id="name" placeholder="Enter project name" />
                        </Box>
                        <Box>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Enter project description"
                          />
                        </Box>
                      </Box>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button>Create Project</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Drawers Tab */}
      {activeTab === 'drawers' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Drawer Examples</CardTitle>
              <CardDescription>
                Slide-out drawers for navigation and secondary content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="body2">
                Drawers are perfect for navigation menus, settings panels, and
                secondary content that doesn't require full modal attention.
              </Typography>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Drawer */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Basic Drawer
                  </Typography>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Open Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Navigation Menu</DrawerTitle>
                        <DrawerDescription>
                          Main navigation options
                        </DrawerDescription>
                      </DrawerHeader>
                      <Box className="p-4 space-y-2">
                        <Button variant="soft" className="w-full justify-start">
                          <Icon name="home" className="mr-2" />
                          Dashboard
                        </Button>
                        <Button variant="soft" className="w-full justify-start">
                          <Icon name="user" className="mr-2" />
                          Profile
                        </Button>
                        <Button variant="soft" className="w-full justify-start">
                          <Icon name="cog" className="mr-2" />
                          Settings
                        </Button>
                      </Box>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </Box>

                {/* Settings Drawer */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Settings Drawer
                  </Typography>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Open Settings</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Settings</DrawerTitle>
                        <DrawerDescription>
                          Configure your application preferences
                        </DrawerDescription>
                      </DrawerHeader>
                      <Box className="p-4 space-y-4">
                        <Box>
                          <Label>Theme</Label>
                          <Box className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              Light
                            </Button>
                            <Button variant="outline" size="sm">
                              Dark
                            </Button>
                            <Button variant="outline" size="sm">
                              Auto
                            </Button>
                          </Box>
                        </Box>
                        <Box>
                          <Label>Notifications</Label>
                          <Box className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              On
                            </Button>
                            <Button variant="outline" size="sm">
                              Off
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                        <Button>Save Changes</Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Sheets Tab */}
      {activeTab === 'sheets' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sheet Examples</CardTitle>
              <CardDescription>
                Slide-out sheets for content presentation and interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="body2">
                Sheets are similar to drawers but typically used for content
                presentation and complex interactions.
              </Typography>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Sheet */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Basic Sheet
                  </Typography>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Content Sheet</SheetTitle>
                        <SheetDescription>
                          This sheet contains additional content and
                          interactions.
                        </SheetDescription>
                      </SheetHeader>
                      <Box className="py-4 space-y-4">
                        <Typography variant="body2">
                          Sheets are great for presenting additional content
                          without taking up the full screen.
                        </Typography>
                        <Box className="space-y-2">
                          <Button variant="outline" className="w-full">
                            Action 1
                          </Button>
                          <Button variant="outline" className="w-full">
                            Action 2
                          </Button>
                        </Box>
                      </Box>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button variant="outline">Close</Button>
                        </SheetClose>
                        <Button>Save</Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Tooltips Tab */}
      {activeTab === 'tooltips' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tooltip Examples</CardTitle>
              <CardDescription>
                Hover-triggered tooltips for additional information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="body2">
                Tooltips provide additional context and information on hover.
              </Typography>

              <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover for tooltip</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a basic tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Icon name="info" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Information tooltip with icon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" disabled>
                        Disabled button
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This button is currently disabled</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* HoverCards Tab */}
      {activeTab === 'hovercards' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>HoverCard Examples</CardTitle>
              <CardDescription>
                Hover-triggered cards for rich content previews
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="body2">
                HoverCards provide rich content previews on hover.
              </Typography>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline">Hover for Details</Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <Box className="p-4 max-w-sm">
                      <Typography variant="h6" className="mb-2">
                        User Information
                      </Typography>
                      <Typography variant="body2" className="mb-2">
                        John Doe is a senior developer with 5+ years of
                        experience.
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-muted-foreground"
                      >
                        Last active: 2 hours ago
                      </Typography>
                    </Box>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline">Product Preview</Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <Box className="p-4 max-w-sm">
                      <Typography variant="h6" className="mb-2">
                        Premium Widget
                      </Typography>
                      <Typography variant="body2" className="mb-2">
                        High-quality widget with advanced features and
                        customization options.
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-primary font-medium"
                      >
                        $29.99
                      </Typography>
                    </Box>
                  </HoverCardContent>
                </HoverCard>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Popovers Tab */}
      {activeTab === 'popovers' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popover Examples</CardTitle>
              <CardDescription>
                Positioned popup content for forms and actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="body2">
                Popovers provide positioned content that appears on click.
              </Typography>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComposedPopover
                  Trigger={Button}
                  TriggerProps={{
                    variant: 'outline',
                    children: 'Quick Settings',
                  }}
                  className="w-64"
                >
                  <Box className="p-4">
                    <Typography variant="h6" className="mb-3">
                      Quick Settings
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                      <Button
                        variant="soft"
                        size="sm"
                        className="justify-start"
                      >
                        <Icon name="moon" className="mr-2" />
                        Dark Mode
                      </Button>
                      <Button
                        variant="soft"
                        size="sm"
                        className="justify-start"
                      >
                        <Icon name="bell" className="mr-2" />
                        Notifications
                      </Button>
                      <Button
                        variant="soft"
                        size="sm"
                        className="justify-start"
                      >
                        <Icon name="cog" className="mr-2" />
                        Settings
                      </Button>
                    </Box>
                  </Box>
                </ComposedPopover>

                <ComposedPopover
                  Trigger={Button}
                  TriggerProps={{
                    variant: 'outline',
                    children: 'Color Picker',
                  }}
                  className="w-48"
                >
                  <Box className="p-4">
                    <Typography variant="h6" className="mb-3">
                      Choose Color
                    </Typography>
                    <Box className="grid grid-cols-4 gap-2">
                      {[
                        '#ef4444',
                        '#f97316',
                        '#eab308',
                        '#22c55e',
                        '#3b82f6',
                        '#8b5cf6',
                        '#ec4899',
                        '#6b7280',
                      ].map((color) => (
                        <Box
                          key={color}
                          className="w-8 h-8 rounded cursor-pointer border-2 border-transparent hover:border-primary"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </Box>
                  </Box>
                </ComposedPopover>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}
