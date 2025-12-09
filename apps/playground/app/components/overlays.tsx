import { useState } from 'react';

import { Image } from '@veraclins-dev/image';
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
  ComposedTooltip,
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

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Overlays() {
  const [activeTab, setActiveTab] = useState<
    | 'command-palette'
    | 'dropdowns'
    | 'dialogs'
    | 'drawers'
    | 'sheets'
    | 'tooltips'
    | 'hovercards'
    | 'popovers'
  >('command-palette');

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Overlays & Modals" className="mb-4" />

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
                Command
              </Badge>
              Command Palette
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography>
              Command palettes for quick navigation and application actions.
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
            <Typography>
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
            <Typography>
              Hover-triggered components for additional information and rich
              content previews.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tab Navigation */}
      <Box className="flex gap-2 py-2 mb-4 overflow-x-auto">
        <Button
          variant={activeTab === 'command-palette' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('command-palette')}
        >
          Command Palette
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

      {/* Command Palette Tab */}
      {activeTab === 'command-palette' && (
        <Box display="flex" flexDirection="column" gap={8}>
          {/* Basic Command Palette */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Command Palette</CardTitle>
              <CardDescription>
                Simple command palette for quick navigation and actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Box display="flex" flexDirection="column" gap={6}>
                <Typography>
                  Command palettes provide quick access to application functions
                  through keyboard shortcuts and search.
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
            </CardContent>
          </Card>

          {/* Real-Life Command Palette Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Real-Life Command Palette Examples</CardTitle>
              <CardDescription>
                Practical command palette examples for different use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Box
                display="grid"
                className="grid-cols-1 md:grid-cols-2"
                gap={6}
              >
                {/* File Management */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      File Management Commands
                    </Typography>
                    <Typography className="mb-4">
                      Command palette for file operations and document
                      management.
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

                {/* Application Commands */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Application Commands
                    </Typography>
                    <Typography className="mb-4">
                      Command palette for application-specific actions and
                      navigation.
                    </Typography>
                    <Command className="max-w-lg">
                      <CommandInput placeholder="Search application commands..." />
                      <CommandList>
                        <CommandItem value="new-project">
                          <Icon name="plus" className="mr-2" />
                          New Project
                        </CommandItem>
                        <CommandItem value="open-recent">
                          <Icon name="clock" className="mr-2" />
                          Open Recent
                        </CommandItem>
                        <CommandItem value="preferences">
                          <Icon name="cog" className="mr-2" />
                          Preferences
                        </CommandItem>
                        <CommandItem value="extensions">
                          <Icon name="puzzle-piece" className="mr-2" />
                          Extensions
                        </CommandItem>
                        <CommandItem value="command-palette">
                          <Icon name="keyboard" className="mr-2" />
                          Command Palette
                        </CommandItem>
                      </CommandList>
                    </Command>
                  </CardContent>
                </Card>

                {/* Search Commands */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Search Commands
                    </Typography>
                    <Typography className="mb-4">
                      Command palette for global search and content discovery.
                    </Typography>
                    <Command className="max-w-lg">
                      <CommandInput placeholder="Search everything..." />
                      <CommandList>
                        <CommandItem value="search-files">
                          <Icon name="document" className="mr-2" />
                          Search Files
                        </CommandItem>
                        <CommandItem value="search-symbols">
                          <Icon name="symbol" className="mr-2" />
                          Search Symbols
                        </CommandItem>
                        <CommandItem value="search-commands">
                          <Icon name="search" className="mr-2" />
                          Search Commands
                        </CommandItem>
                        <CommandItem value="search-settings">
                          <Icon name="cog" className="mr-2" />
                          Search Settings
                        </CommandItem>
                        <CommandItem value="search-extensions">
                          <Icon name="puzzle-piece" className="mr-2" />
                          Search Extensions
                        </CommandItem>
                      </CommandList>
                    </Command>
                  </CardContent>
                </Card>
                {/* Search Commands with Icon */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Search Commands
                    </Typography>
                    <Typography className="mb-4">
                      Command palette for global search and content discovery.
                    </Typography>
                    <Command className="max-w-lg">
                      <CommandInput
                        placeholder="Search everything..."
                        withIcon
                      />
                      <CommandList>
                        <CommandItem value="search-files">
                          <Icon name="document" className="mr-2" />
                          Search Files
                        </CommandItem>
                        <CommandItem value="search-symbols">
                          <Icon name="symbol" className="mr-2" />
                          Search Symbols
                        </CommandItem>
                        <CommandItem value="search-commands">
                          <Icon name="search" className="mr-2" />
                          Search Commands
                        </CommandItem>
                        <CommandItem value="search-settings">
                          <Icon name="cog" className="mr-2" />
                          Search Settings
                        </CommandItem>
                        <CommandItem value="search-extensions">
                          <Icon name="puzzle-piece" className="mr-2" />
                          Search Extensions
                        </CommandItem>
                      </CommandList>
                    </Command>
                  </CardContent>
                </Card>
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
                                  <Typography>John Doe</Typography>
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
                              buttonSize: 'icon',
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
              <Typography>
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
                      <Typography className="py-4">
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

          {/* Real-Life Dialog Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Real-Life Dialog Examples</CardTitle>
              <CardDescription>
                Practical dialog examples for common use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Box display="flex" flexDirection="column" gap={6}>
                {/* Confirmation Dialog */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Confirmation Dialog
                    </Typography>
                    <Typography className="mb-4">
                      Use confirmation dialogs for destructive actions that
                      require user confirmation.
                    </Typography>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="solid" color="destructive">
                          Delete Project
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Project</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete "My Awesome
                            Project"? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <Box className="py-4">
                          <Typography className="text-destructive">
                            This will permanently delete the project and all
                            associated data.
                          </Typography>
                        </Box>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button variant="solid" color="destructive">
                            Delete Project
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                {/* Alert Dialog */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Alert Dialog
                    </Typography>
                    <Typography className="mb-4">
                      Alert dialogs for important notifications and warnings.
                    </Typography>
                    <Box display="flex" gap={2}>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Show Warning</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Icon
                                name="exclamation-triangle"
                                className="text-warning"
                              />
                              Warning
                            </DialogTitle>
                            <DialogDescription>
                              You have unsaved changes that will be lost if you
                              continue.
                            </DialogDescription>
                          </DialogHeader>
                          <Box className="py-4">
                            <Typography>
                              Please save your work before proceeding with this
                              action.
                            </Typography>
                          </Box>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button>Continue Anyway</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Show Error</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Icon
                                name="cross-circled"
                                className="text-destructive"
                              />
                              Error
                            </DialogTitle>
                            <DialogDescription>
                              Something went wrong while processing your
                              request.
                            </DialogDescription>
                          </DialogHeader>
                          <Box className="py-4">
                            <Typography className="text-destructive">
                              Unable to connect to the server. Please check your
                              internet connection and try again.
                            </Typography>
                          </Box>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Close</Button>
                            </DialogClose>
                            <Button>Retry</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </Box>
                  </CardContent>
                </Card>

                {/* Complex Form Dialog */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Complex Form Dialog
                    </Typography>
                    <Typography className="mb-4">
                      Multi-step form dialog with validation and complex
                      interactions.
                    </Typography>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Create User Account</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Create New User Account</DialogTitle>
                          <DialogDescription>
                            Set up a new user account with detailed information
                            and preferences.
                          </DialogDescription>
                        </DialogHeader>
                        <Box className="py-4 space-y-6">
                          {/* Personal Information */}
                          <Box>
                            <Typography variant="h6" className="mb-3">
                              Personal Information
                            </Typography>
                            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Box>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                  id="firstName"
                                  placeholder="Enter first name"
                                />
                              </Box>
                              <Box>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                  id="lastName"
                                  placeholder="Enter last name"
                                />
                              </Box>
                            </Box>
                            <Box className="mt-4">
                              <Label htmlFor="email">Email Address</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="Enter email address"
                              />
                            </Box>
                          </Box>

                          {/* Account Settings */}
                          <Box>
                            <Typography variant="h6" className="mb-3">
                              Account Settings
                            </Typography>
                            <Box className="space-y-4">
                              <Box>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                  id="username"
                                  placeholder="Choose a username"
                                />
                              </Box>
                              <Box>
                                <Label htmlFor="role">Role</Label>
                                <Box className="flex gap-2 mt-2">
                                  <Button variant="outline" buttonSize="sm">
                                    Admin
                                  </Button>
                                  <Button variant="outline" buttonSize="sm">
                                    Editor
                                  </Button>
                                  <Button variant="outline" buttonSize="sm">
                                    Viewer
                                  </Button>
                                </Box>
                              </Box>
                              <Box>
                                <Label htmlFor="department">Department</Label>
                                <Input
                                  id="department"
                                  placeholder="Enter department"
                                />
                              </Box>
                            </Box>
                          </Box>

                          {/* Preferences */}
                          <Box>
                            <Typography variant="h6" className="mb-3">
                              Preferences
                            </Typography>
                            <Box className="space-y-3">
                              <Box className="flex items-center gap-2">
                                <input type="checkbox" id="notifications" />
                                <Label htmlFor="notifications">
                                  Enable email notifications
                                </Label>
                              </Box>
                              <Box className="flex items-center gap-2">
                                <input type="checkbox" id="newsletter" />
                                <Label htmlFor="newsletter">
                                  Subscribe to newsletter
                                </Label>
                              </Box>
                              <Box className="flex items-center gap-2">
                                <input type="checkbox" id="twoFactor" />
                                <Label htmlFor="twoFactor">
                                  Enable two-factor authentication
                                </Label>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button>Create Account</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                {/* Media Dialog */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Media Dialog
                    </Typography>
                    <Typography className="mb-4">
                      Dialog for displaying images, videos, and other media
                      content.
                    </Typography>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View Image</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Product Image</DialogTitle>
                          <DialogDescription>
                            High-resolution product image with zoom
                            capabilities.
                          </DialogDescription>
                        </DialogHeader>
                        <Box className="py-4">
                          <Image
                            src="https://picsum.photos/600/400?random=10"
                            alt="Premium Widget Pro"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover rounded"
                          />
                          <Box className="mt-4 space-y-2">
                            <Typography variant="h6">
                              Premium Widget Pro
                            </Typography>
                            <Typography className="text-foreground/80">
                              High-quality product image with detailed
                              specifications and features.
                            </Typography>
                            <Box className="flex gap-2 mt-3">
                              <Button variant="outline" buttonSize="sm">
                                <Icon name="zoom-in" className="mr-1" />
                                Zoom
                              </Button>
                              <Button variant="outline" buttonSize="sm">
                                <Icon name="download" className="mr-1" />
                                Download
                              </Button>
                              <Button variant="outline" buttonSize="sm">
                                <Icon name="share" className="mr-1" />
                                Share
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                          </DialogClose>
                          <Button>Add to Cart</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                {/* Scrollable Search Dialog */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Scrollable Search Dialog
                    </Typography>
                    <Typography className="mb-4">
                      Dialog with fixed search field and scrollable results
                      below.
                    </Typography>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Search Users</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl h-96 flex flex-col">
                        <DialogHeader className="flex-shrink-0">
                          <DialogTitle>Search Users</DialogTitle>
                          <DialogDescription>
                            Search and select users from the database
                          </DialogDescription>
                        </DialogHeader>

                        {/* Fixed Search Field */}
                        <Command className="px-2">
                          <Box className="flex-shrink-0 py-4 border-b">
                            <CommandInput placeholder="Search users by name, email, or role..." />
                          </Box>

                          {/* Scrollable Results */}
                          <Box className="flex-1 overflow-y-auto py-2">
                            <CommandList>
                              {[
                                {
                                  id: '1',
                                  name: 'John Doe',
                                  email: 'john.doe@example.com',
                                  role: 'Admin',
                                  avatar: 'JD',
                                },
                                {
                                  id: '2',
                                  name: 'Jane Smith',
                                  email: 'jane.smith@example.com',
                                  role: 'Editor',
                                  avatar: 'JS',
                                },
                                {
                                  id: '3',
                                  name: 'Mike Johnson',
                                  email: 'mike.johnson@example.com',
                                  role: 'Viewer',
                                  avatar: 'MJ',
                                },
                                {
                                  id: '4',
                                  name: 'Sarah Wilson',
                                  email: 'sarah.wilson@example.com',
                                  role: 'Editor',
                                  avatar: 'SW',
                                },
                                {
                                  id: '5',
                                  name: 'David Brown',
                                  email: 'david.brown@example.com',
                                  role: 'Admin',
                                  avatar: 'DB',
                                },
                                {
                                  id: '6',
                                  name: 'Emily Davis',
                                  email: 'emily.davis@example.com',
                                  role: 'Viewer',
                                  avatar: 'ED',
                                },
                                {
                                  id: '7',
                                  name: 'Chris Miller',
                                  email: 'chris.miller@example.com',
                                  role: 'Editor',
                                  avatar: 'CM',
                                },
                                {
                                  id: '8',
                                  name: 'Lisa Garcia',
                                  email: 'lisa.garcia@example.com',
                                  role: 'Viewer',
                                  avatar: 'LG',
                                },
                                {
                                  id: '9',
                                  name: 'Tom Anderson',
                                  email: 'tom.anderson@example.com',
                                  role: 'Admin',
                                  avatar: 'TA',
                                },
                                {
                                  id: '10',
                                  name: 'Amy Taylor',
                                  email: 'amy.taylor@example.com',
                                  role: 'Editor',
                                  avatar: 'AT',
                                },
                                {
                                  id: '11',
                                  name: 'Ryan Martinez',
                                  email: 'ryan.martinez@example.com',
                                  role: 'Viewer',
                                  avatar: 'RM',
                                },
                                {
                                  id: '12',
                                  name: 'Jessica Lee',
                                  email: 'jessica.lee@example.com',
                                  role: 'Editor',
                                  avatar: 'JL',
                                },
                                {
                                  id: '13',
                                  name: 'Kevin White',
                                  email: 'kevin.white@example.com',
                                  role: 'Admin',
                                  avatar: 'KW',
                                },
                                {
                                  id: '14',
                                  name: 'Rachel Green',
                                  email: 'rachel.green@example.com',
                                  role: 'Viewer',
                                  avatar: 'RG',
                                },
                                {
                                  id: '15',
                                  name: 'Daniel Clark',
                                  email: 'daniel.clark@example.com',
                                  role: 'Editor',
                                  avatar: 'DC',
                                },
                              ].map((user) => (
                                <CommandItem
                                  key={user.id}
                                  value={`${user.name} ${user.email} ${user.role}`}
                                >
                                  <Box className="flex items-center gap-3 w-full">
                                    <Box className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                                      {user.avatar}
                                    </Box>
                                    <Box className="flex-1 min-w-0">
                                      <Typography className="font-medium truncate">
                                        {user.name}
                                      </Typography>
                                      <Typography className="text-foreground/80 truncate">
                                        {user.email}
                                      </Typography>
                                    </Box>
                                    <Badge variant="soft" badgeSize="sm">
                                      {user.role}
                                    </Badge>
                                  </Box>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </Box>
                        </Command>

                        <DialogFooter className="flex-shrink-0 border-t pt-4">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button>Select User</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
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
              <Typography>
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
                            <Button variant="outline" buttonSize="sm">
                              Light
                            </Button>
                            <Button variant="outline" buttonSize="sm">
                              Dark
                            </Button>
                            <Button variant="outline" buttonSize="sm">
                              Auto
                            </Button>
                          </Box>
                        </Box>
                        <Box>
                          <Label>Notifications</Label>
                          <Box className="flex gap-2 mt-2">
                            <Button variant="outline" buttonSize="sm">
                              On
                            </Button>
                            <Button variant="outline" buttonSize="sm">
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
              <Typography>
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
                        <Typography>
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

                {/* Bottom Sheet */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Bottom Sheet
                  </Typography>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Bottom Sheet</Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-96">
                      <SheetHeader>
                        <SheetTitle>Mobile Actions</SheetTitle>
                        <SheetDescription>
                          Bottom sheet for mobile-first interactions
                        </SheetDescription>
                      </SheetHeader>
                      <Box className="py-4 space-y-4">
                        <Box className="space-y-2">
                          <Button
                            variant="soft"
                            className="w-full justify-start"
                          >
                            <Icon name="camera" className="mr-2" />
                            Take Photo
                          </Button>
                          <Button
                            variant="soft"
                            className="w-full justify-start"
                          >
                            <Icon name="image" className="mr-2" />
                            Choose from Gallery
                          </Button>
                          <Button
                            variant="soft"
                            className="w-full justify-start"
                          >
                            <Icon name="document" className="mr-2" />
                            Upload File
                          </Button>
                        </Box>
                      </Box>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Real-Life Sheet Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Real-Life Sheet Examples</CardTitle>
              <CardDescription>
                Practical sheet examples for common use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Box display="flex" flexDirection="column" gap={6}>
                {/* Top Sheet - Notifications */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Top Sheet - Notifications
                    </Typography>
                    <Typography className="mb-4">
                      Top sheet for displaying notifications and alerts.
                    </Typography>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">Show Notifications</Button>
                      </SheetTrigger>
                      <SheetContent side="top" className="h-80">
                        <SheetHeader>
                          <SheetTitle>Notifications</SheetTitle>
                          <SheetDescription>
                            Recent notifications and updates
                          </SheetDescription>
                        </SheetHeader>
                        <Box className="py-4 space-y-3">
                          <Box className="flex items-start gap-3 p-3 bg-success/10 rounded">
                            <Icon
                              name="check-circle"
                              className="text-success mt-1"
                            />
                            <Box>
                              <Typography className="font-medium">
                                Project Updated
                              </Typography>
                              <Typography className="text-foreground/80">
                                Your project has been successfully updated.
                              </Typography>
                            </Box>
                          </Box>
                          <Box className="flex items-start gap-3 p-3 bg-info/10 rounded">
                            <Icon
                              name="info-circled"
                              className="text-info mt-1"
                            />
                            <Box>
                              <Typography className="font-medium">
                                New Message
                              </Typography>
                              <Typography className="text-foreground/80">
                                You have a new message from John Doe.
                              </Typography>
                            </Box>
                          </Box>
                          <Box className="flex items-start gap-3 p-3 bg-warning/10 rounded">
                            <Icon
                              name="exclamation-triangle"
                              className="text-warning mt-1"
                            />
                            <Box>
                              <Typography className="font-medium">
                                Storage Warning
                              </Typography>
                              <Typography className="text-foreground/80">
                                You're running low on storage space.
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button variant="outline">Close</Button>
                          </SheetClose>
                          <Button>View All</Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </CardContent>
                </Card>

                {/* Side Sheet - Settings */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Side Sheet - Settings Panel
                    </Typography>
                    <Typography className="mb-4">
                      Side sheet for complex settings and configuration panels.
                    </Typography>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">Open Settings</Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-96">
                        <SheetHeader>
                          <SheetTitle>Application Settings</SheetTitle>
                          <SheetDescription>
                            Configure your application preferences
                          </SheetDescription>
                        </SheetHeader>
                        <Box className="py-4 space-y-6">
                          {/* Appearance */}
                          <Box>
                            <Typography variant="h6" className="mb-3">
                              Appearance
                            </Typography>
                            <Box className="space-y-3">
                              <Box>
                                <Label>Theme</Label>
                                <Box className="flex gap-2 mt-2">
                                  <Button variant="outline" buttonSize="sm">
                                    Light
                                  </Button>
                                  <Button variant="outline" buttonSize="sm">
                                    Dark
                                  </Button>
                                  <Button variant="outline" buttonSize="sm">
                                    Auto
                                  </Button>
                                </Box>
                              </Box>
                              <Box>
                                <Label>Font Size</Label>
                                <Box className="flex gap-2 mt-2">
                                  <Button variant="outline" buttonSize="sm">
                                    Small
                                  </Button>
                                  <Button variant="outline" buttonSize="sm">
                                    Medium
                                  </Button>
                                  <Button variant="outline" buttonSize="sm">
                                    Large
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          </Box>

                          {/* Notifications */}
                          <Box>
                            <Typography variant="h6" className="mb-3">
                              Notifications
                            </Typography>
                            <Box className="space-y-3">
                              <Box className="flex items-center justify-between">
                                <Label>Email Notifications</Label>
                                <input type="checkbox" defaultChecked />
                              </Box>
                              <Box className="flex items-center justify-between">
                                <Label>Push Notifications</Label>
                                <input type="checkbox" />
                              </Box>
                              <Box className="flex items-center justify-between">
                                <Label>Sound Alerts</Label>
                                <input type="checkbox" defaultChecked />
                              </Box>
                            </Box>
                          </Box>

                          {/* Privacy */}
                          <Box>
                            <Typography variant="h6" className="mb-3">
                              Privacy
                            </Typography>
                            <Box className="space-y-3">
                              <Box className="flex items-center justify-between">
                                <Label>Analytics</Label>
                                <input type="checkbox" defaultChecked />
                              </Box>
                              <Box className="flex items-center justify-between">
                                <Label>Location Services</Label>
                                <input type="checkbox" />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </SheetClose>
                          <Button>Save Changes</Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </CardContent>
                </Card>

                {/* Form Sheet */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Form Sheet
                    </Typography>
                    <Typography className="mb-4">
                      Sheet for complex form interactions and data entry.
                    </Typography>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">Create Event</Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-96">
                        <SheetHeader>
                          <SheetTitle>Create New Event</SheetTitle>
                          <SheetDescription>
                            Schedule a new event with detailed information
                          </SheetDescription>
                        </SheetHeader>
                        <Box className="py-4 space-y-4">
                          <Box>
                            <Label htmlFor="eventTitle">Event Title</Label>
                            <Input
                              id="eventTitle"
                              placeholder="Enter event title"
                            />
                          </Box>
                          <Box>
                            <Label htmlFor="eventDate">Date</Label>
                            <Input id="eventDate" type="date" />
                          </Box>
                          <Box>
                            <Label htmlFor="eventTime">Time</Label>
                            <Input id="eventTime" type="time" />
                          </Box>
                          <Box>
                            <Label htmlFor="eventLocation">Location</Label>
                            <Input
                              id="eventLocation"
                              placeholder="Enter location"
                            />
                          </Box>
                          <Box>
                            <Label htmlFor="eventDescription">
                              Description
                            </Label>
                            <Textarea
                              id="eventDescription"
                              placeholder="Enter event description"
                              rows={3}
                            />
                          </Box>
                          <Box>
                            <Label>Event Type</Label>
                            <Box className="flex gap-2 mt-2">
                              <Button variant="outline" buttonSize="sm">
                                Meeting
                              </Button>
                              <Button variant="outline" buttonSize="sm">
                                Conference
                              </Button>
                              <Button variant="outline" buttonSize="sm">
                                Workshop
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </SheetClose>
                          <Button>Create Event</Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </CardContent>
                </Card>
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
              <Typography>
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

          {/* Composed Tooltip */}
          <Card>
            <CardHeader>
              <CardTitle>Composed Tooltip</CardTitle>
              <CardDescription>
                Tooltip with custom triggers, rich content, and arrow
                configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Box display="flex" flexDirection="column" gap={6}>
                {/* Basic Examples */}
                <Box>
                  <Typography variant="h6" className="mb-3">
                    Basic Examples
                  </Typography>
                  <Box display="flex" gap={4} flexWrap="wrap">
                    <ComposedTooltip
                      Trigger={Button}
                      content="Simple tooltip without arrow"
                      arrow={false}
                      TriggerProps={{
                        variant: 'outline',
                        buttonSize: 'sm',
                        children: 'No Arrow',
                      }}
                    />
                    <ComposedTooltip
                      Trigger={Button}
                      content="Tooltip with arrow pointing to trigger"
                      arrow={true}
                      TriggerProps={{
                        variant: 'outline',
                        buttonSize: 'sm',
                        children: 'With Arrow',
                      }}
                    />
                    <ComposedTooltip
                      Trigger={Button}
                      content="Custom delay tooltip (500ms)"
                      TriggerProps={{
                        variant: 'outline',
                        buttonSize: 'sm',
                        children: 'Delayed',
                      }}
                    />
                  </Box>
                </Box>

                {/* Rich Content Examples */}
                <Box>
                  <Typography variant="h6" className="mb-3">
                    Rich Content Examples
                  </Typography>
                  <Box display="flex" gap={4} flexWrap="wrap">
                    <ComposedTooltip
                      Trigger={Button}
                      content={
                        <Box className="p-2 text-left">
                          <Typography variant="subtitle1">
                            Rich Content Tooltip
                          </Typography>
                          <Typography className="text-foreground/80">
                            This tooltip contains multiple lines and styled
                            content
                          </Typography>
                        </Box>
                      }
                      TriggerProps={{
                        variant: 'outline',
                        buttonSize: 'sm',
                        children: 'Rich Content',
                      }}
                    />
                    <ComposedTooltip
                      Trigger={Button}
                      content={
                        <Box className="p-2 text-left">
                          <Box className="flex items-center gap-2 mb-2">
                            <Icon name="info" className="text-info" />
                            <Typography className="font-medium">
                              Information Tooltip
                            </Typography>
                          </Box>
                          <Typography className="text-foreground/80">
                            Contains an icon and structured information
                          </Typography>
                        </Box>
                      }
                      TriggerProps={{
                        variant: 'outline',
                        buttonSize: 'sm',
                        children: 'With Icon',
                      }}
                    />
                    <ComposedTooltip
                      Trigger={Button}
                      content={
                        <Box className="p-2 text-left">
                          <Box className="flex items-center gap-2 mb-2">
                            <Icon name="check" className="text-success" />
                            <Typography className="font-medium text-success">
                              Success State
                            </Typography>
                          </Box>
                          <Typography className="text-foreground/80">
                            Operation completed successfully
                          </Typography>
                        </Box>
                      }
                      TriggerProps={{
                        variant: 'outline',
                        buttonSize: 'sm',
                        children: 'Success State',
                      }}
                    />
                  </Box>
                </Box>

                {/* Different Triggers */}
                <Box>
                  <Typography variant="h6" className="mb-3">
                    Different Triggers
                  </Typography>
                  <Box display="flex" gap={4} flexWrap="wrap">
                    <ComposedTooltip
                      Trigger={Button}
                      content="Button trigger with primary styling"
                      TriggerProps={{
                        variant: 'solid',
                        color: 'primary',
                        buttonSize: 'sm',
                        children: 'Primary Button',
                      }}
                    />
                    <ComposedTooltip
                      Trigger={Button}
                      content="Icon button trigger"
                      TriggerProps={{
                        variant: 'text',
                        buttonSize: 'sm',
                        children: <Icon name="question-mark" />,
                      }}
                    />
                    <ComposedTooltip
                      Trigger={Button}
                      content="Destructive action tooltip"
                      TriggerProps={{
                        variant: 'outline',
                        color: 'destructive',
                        buttonSize: 'sm',
                        children: 'Delete',
                      }}
                    />
                    <ComposedTooltip
                      Trigger={Button}
                      content="Disabled state tooltip"
                      TriggerProps={{
                        variant: 'outline',
                        buttonSize: 'sm',
                        disabled: true,
                        children: 'Disabled',
                      }}
                    />
                  </Box>
                </Box>

                {/* Side offsets */}
                <Box>
                  <Typography variant="h6" className="mb-3">
                    Side Offsets
                  </Typography>
                  <Box display="flex" gap={4} flexWrap="wrap">
                    <ComposedTooltip
                      Trigger={Button}
                      content="Tooltip with side offset 5 with arrow"
                      sideOffset={5}
                      TriggerProps={{
                        variant: 'outline',
                        buttonSize: 'sm',
                        children: 'Side Offset',
                      }}
                    />
                    <ComposedTooltip
                      Trigger={Button}
                      content="Tooltip with side offset 10 without arrow"
                      arrow={false}
                      sideOffset={10}
                      TriggerProps={{
                        variant: 'outline',
                        buttonSize: 'sm',
                        children: 'Side Offset',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Real-Life Tooltip Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Real-Life Tooltip Examples</CardTitle>
              <CardDescription>
                Practical tooltip examples for common use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Box display="flex" flexDirection="column" gap={6}>
                {/* Rich Tooltips */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Rich Tooltips
                    </Typography>
                    <Typography className="mb-4">
                      Tooltips with rich content including images and detailed
                      information.
                    </Typography>
                    <Box display="flex" gap={4} flexWrap="wrap">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">
                              <Icon name="user" className="mr-2" />
                              John Doe
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="w-64">
                            <Box className="p-2">
                              <Box className="flex items-center gap-3 mb-2">
                                <Box className="w-10 h-10 bg-primary rounded-full" />
                                <Box>
                                  <Typography className="font-medium">
                                    John Doe
                                  </Typography>
                                  <Typography className="text-foreground/80">
                                    Senior Developer
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography className="mb-2">
                                Works on the frontend team. Specializes in React
                                and TypeScript.
                              </Typography>
                              <Box className="flex gap-1">
                                <Badge variant="soft" badgeSize="sm">
                                  React
                                </Badge>
                                <Badge variant="soft" badgeSize="sm">
                                  TypeScript
                                </Badge>
                                <Badge variant="soft" badgeSize="sm">
                                  UI/UX
                                </Badge>
                              </Box>
                            </Box>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">
                              <Icon name="star" className="mr-2" />
                              Premium Feature
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="w-56">
                            <Box className="p-2">
                              <Box className="flex items-center gap-2 mb-2">
                                <Icon name="star" className="text-warning" />
                                <Typography className="font-medium">
                                  Premium Feature
                                </Typography>
                              </Box>
                              <Typography className="mb-2">
                                This feature is available for premium
                                subscribers only.
                              </Typography>
                              <Button buttonSize="sm" className="w-full">
                                Upgrade Now
                              </Button>
                            </Box>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Box>
                  </CardContent>
                </Card>

                {/* Interactive Tooltips */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Interactive Tooltips
                    </Typography>
                    <Typography className="mb-4">
                      Tooltips with interactive elements and actions.
                    </Typography>
                    <Box display="flex" gap={4} flexWrap="wrap">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">
                              <Icon name="share" className="mr-2" />
                              Share
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="w-48">
                            <Box className="p-2">
                              <Typography className="mb-2">
                                Share this content
                              </Typography>
                              <Box className="flex gap-1">
                                <Button buttonSize="sm" variant="soft">
                                  <Icon name="globe" />
                                </Button>
                                <Button buttonSize="sm" variant="soft">
                                  <Icon name="link" />
                                </Button>
                              </Box>
                            </Box>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">
                              <Icon name="cog" className="mr-2" />
                              Quick Settings
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="w-52">
                            <Box className="p-2">
                              <Typography className="mb-2">
                                Quick settings
                              </Typography>
                              <Box className="space-y-1">
                                <Button
                                  buttonSize="sm"
                                  variant="soft"
                                  className="w-full justify-start"
                                >
                                  <Icon name="moon" className="mr-2" />
                                  Dark Mode
                                </Button>
                                <Button
                                  buttonSize="sm"
                                  variant="soft"
                                  className="w-full justify-start"
                                >
                                  <Icon name="bell" className="mr-2" />
                                  Notifications
                                </Button>
                                <Button
                                  buttonSize="sm"
                                  variant="soft"
                                  className="w-full justify-start"
                                >
                                  <Icon name="cog" className="mr-2" />
                                  Settings
                                </Button>
                              </Box>
                            </Box>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Box>
                  </CardContent>
                </Card>

                {/* Contextual Tooltips */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Contextual Tooltips
                    </Typography>
                    <Typography className="mb-4">
                      Tooltips for different UI elements and contexts.
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={4}>
                      {/* Form Field Tooltips */}
                      <Box>
                        <Typography variant="h6" className="mb-2">
                          Form Field Help
                        </Typography>
                        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Box>
                            <Label
                              htmlFor="password"
                              className="flex items-center gap-2"
                            >
                              Password
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Icon
                                      name="question-mark-circled"
                                      className="text-foreground/80"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Password must be at least 8 characters
                                      with uppercase, lowercase, and numbers
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter password"
                            />
                          </Box>
                          <Box>
                            <Label
                              htmlFor="email"
                              className="flex items-center gap-2"
                            >
                              Email
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Icon
                                      name="question-mark-circled"
                                      className="text-foreground/80"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      We'll use this email for important
                                      communications
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter email"
                            />
                          </Box>
                        </Box>
                      </Box>

                      {/* Status Tooltips */}
                      <Box>
                        <Typography variant="h6" className="mb-2">
                          Status Indicators
                        </Typography>
                        <Box className="flex gap-4">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Box className="flex items-center gap-2">
                                  <Box className="w-3 h-3 bg-success rounded-full" />
                                  <Typography>Online</Typography>
                                </Box>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>User is currently online and active</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Box className="flex items-center gap-2">
                                  <Box className="w-3 h-3 bg-warning rounded-full" />
                                  <Typography>Away</Typography>
                                </Box>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>User is away but may return soon</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Box className="flex items-center gap-2">
                                  <Box className="w-3 h-3 bg-neutral rounded-full" />
                                  <Typography>Offline</Typography>
                                </Box>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>User is currently offline</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Box>
                      </Box>

                      {/* Action Tooltips */}
                      <Box>
                        <Typography variant="h6" className="mb-2">
                          Action Buttons
                        </Typography>
                        <Box className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button buttonSize="icon" variant="outline">
                                  <Icon name="pencil" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit this item</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button buttonSize="icon" variant="outline">
                                  <Icon name="copy" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copy to clipboard</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button buttonSize="icon" variant="outline">
                                  <Icon name="download" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Download file</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  buttonSize="icon"
                                  variant="outline"
                                  disabled
                                >
                                  <Icon name="trash" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Delete (disabled - insufficient permissions)
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
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
              <Typography>
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
                      <Typography className="mb-2">
                        John Doe is a senior developer with 5+ years of
                        experience.
                      </Typography>
                      <Typography className="text-foreground/80">
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
                      <Typography className="mb-2">
                        High-quality widget with advanced features and
                        customization options.
                      </Typography>
                      <Typography className="text-primary font-medium">
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
              <Typography>
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
                        buttonSize="sm"
                        className="justify-start"
                      >
                        <Icon name="moon" className="mr-2" />
                        Dark Mode
                      </Button>
                      <Button
                        variant="soft"
                        buttonSize="sm"
                        className="justify-start"
                      >
                        <Icon name="bell" className="mr-2" />
                        Notifications
                      </Button>
                      <Button
                        variant="soft"
                        buttonSize="sm"
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
