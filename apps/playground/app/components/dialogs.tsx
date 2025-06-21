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
  Chip,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
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

import { NotificationDropdown } from './notifications/notification-dropdown';
import { Notifications } from './notifications/notifications';
import { notifications } from './data';

export const Dialogs = () => {
  const [activeTab, setActiveTab] = useState<
    'dialog' | 'drawer' | 'sheet' | 'tooltip' | 'hovercard' | 'popover'
  >('dialog');

  return (
    <Box className="max-w-6xl mx-auto p-6">
      <Typography variant="h1" className="text-center mb-4">
        Dialog Components Showcase
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Comprehensive collection of overlay components for user interactions,
        notifications, and content presentation.
      </Typography>

      {/* Features Overview */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge color="primary" variant="soft">
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
              <Badge color="success" variant="soft">
                Slide
              </Badge>
              Drawer & Sheet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="body2">
              Slide-out panels and drawers for navigation, settings, and
              secondary content.
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
          variant={activeTab === 'dialog' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('dialog')}
        >
          Dialog
        </Button>
        <Button
          variant={activeTab === 'drawer' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('drawer')}
        >
          Drawer
        </Button>
        <Button
          variant={activeTab === 'sheet' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('sheet')}
        >
          Sheet
        </Button>
        <Button
          variant={activeTab === 'tooltip' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('tooltip')}
        >
          Tooltip
        </Button>
        <Button
          variant={activeTab === 'hovercard' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('hovercard')}
        >
          HoverCard
        </Button>
        <Button
          variant={activeTab === 'popover' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('popover')}
        >
          Popover
        </Button>
      </Box>

      {/* Dialog Tab */}
      {activeTab === 'dialog' && (
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
                          This is a simple dialog with basic content and
                          actions.
                        </DialogDescription>
                      </DialogHeader>
                      <Typography variant="body2" className="py-4">
                        This dialog demonstrates the basic structure with
                        header, content, and footer sections.
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
                      <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <Box display="grid" gap={4} className="py-4">
                        <Box display="grid" gap={2}>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="John Doe" />
                        </Box>
                        <Box display="grid" gap={2}>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue="john@example.com"
                          />
                        </Box>
                        <Box display="grid" gap={2}>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            defaultValue="Software developer and UI enthusiast."
                          />
                        </Box>
                      </Box>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Box>

                {/* Confirmation Dialog */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Confirmation Dialog
                  </Typography>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button color="destructive">Delete Account</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button color="destructive">Delete Account</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Box>

                {/* Alert Dialog */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Alert Dialog
                  </Typography>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Show Alert</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Important Notice</DialogTitle>
                        <DialogDescription>
                          Your session will expire in 5 minutes. Please save
                          your work.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button>Continue Session</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Drawer Tab */}
      {activeTab === 'drawer' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Drawer Examples</CardTitle>
              <CardDescription>
                Slide-out drawers for navigation, settings, and secondary
                content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="body2">
                Drawers are perfect for mobile navigation, settings panels, and
                content that doesn't require full modal attention.
              </Typography>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Side Navigation Drawer */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Side Navigation
                  </Typography>
                  <Drawer direction="left">
                    <DrawerTrigger asChild>
                      <Button variant="outline">Open Navigation</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Navigation Menu</DrawerTitle>
                        <DrawerDescription>
                          Access all your app sections and settings.
                        </DrawerDescription>
                      </DrawerHeader>
                      <Box className="p-4 space-y-2">
                        <Button variant="text" className="w-full justify-start">
                          Dashboard
                        </Button>
                        <Button variant="text" className="w-full justify-start">
                          Projects
                        </Button>
                        <Button variant="text" className="w-full justify-start">
                          Team
                        </Button>
                        <Button variant="text" className="w-full justify-start">
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
                    Settings Panel
                  </Typography>
                  <Drawer direction="right">
                    <DrawerTrigger asChild>
                      <Button variant="outline">Settings</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Settings</DrawerTitle>
                        <DrawerDescription>
                          Configure your application preferences.
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
                        <Button>Save Changes</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </Box>

                {/* Bottom Drawer */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Bottom Drawer
                  </Typography>
                  <Drawer direction="bottom">
                    <DrawerTrigger asChild>
                      <Button variant="outline">Share</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Share Content</DrawerTitle>
                        <DrawerDescription>
                          Choose how you want to share this content.
                        </DrawerDescription>
                      </DrawerHeader>
                      <Box className="p-4 space-y-2">
                        <Button variant="text" className="w-full justify-start">
                          Copy Link
                        </Button>
                        <Button variant="text" className="w-full justify-start">
                          Share on Twitter
                        </Button>
                        <Button variant="text" className="w-full justify-start">
                          Share on Facebook
                        </Button>
                        <Button variant="text" className="w-full justify-start">
                          Email
                        </Button>
                      </Box>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </Box>

                {/* Mobile Menu Drawer */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Mobile Menu
                  </Typography>
                  <Drawer direction="bottom">
                    <DrawerTrigger asChild>
                      <Button variant="outline">Menu</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <Box className="p-4 space-y-4">
                        <Box className="flex items-center justify-between">
                          <Typography variant="h6">Menu</Typography>
                          <DrawerClose asChild>
                            <Button variant="text" size="icon">
                              <Icon name="cross-1" />
                              <span className="sr-only">Close</span>
                            </Button>
                          </DrawerClose>
                        </Box>
                        <Box className="space-y-2">
                          <Button
                            variant="text"
                            className="w-full justify-start"
                          >
                            Home
                          </Button>
                          <Button
                            variant="text"
                            className="w-full justify-start"
                          >
                            Search
                          </Button>
                          <Button
                            variant="text"
                            className="w-full justify-start"
                          >
                            Notifications
                          </Button>
                          <Button
                            variant="text"
                            className="w-full justify-start"
                          >
                            Profile
                          </Button>
                        </Box>
                      </Box>
                    </DrawerContent>
                  </Drawer>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Sheet Tab */}
      {activeTab === 'sheet' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sheet Examples</CardTitle>
              <CardDescription>
                Slide-out sheets for mobile-first interactions and content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="body2">
                Sheets are similar to drawers but optimized for mobile
                interactions and touch gestures.
              </Typography>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mobile Settings Sheet */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Mobile Settings
                  </Typography>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Settings</Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>Settings</SheetTitle>
                        <SheetDescription>
                          Configure your mobile app preferences.
                        </SheetDescription>
                      </SheetHeader>
                      <Box className="space-y-4 mt-4">
                        <Box>
                          <Label>Push Notifications</Label>
                          <Box className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              Enable
                            </Button>
                            <Button variant="outline" size="sm">
                              Disable
                            </Button>
                          </Box>
                        </Box>
                        <Box>
                          <Label>Location Services</Label>
                          <Box className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              Allow
                            </Button>
                            <Button variant="outline" size="sm">
                              Deny
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </SheetClose>
                        <Button>Save</Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </Box>

                {/* Filter Sheet */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Filter Options
                  </Typography>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Filters</Button>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                      <SheetHeader>
                        <SheetTitle>Filter Results</SheetTitle>
                        <SheetDescription>
                          Refine your search results with these filters.
                        </SheetDescription>
                      </SheetHeader>
                      <Box className="space-y-4 mt-4">
                        <Box>
                          <Label>Category</Label>
                          <Box className="flex gap-2 mt-2">
                            <Chip label="All" variant="soft" />
                            <Chip label="Technology" variant="outline" />
                            <Chip label="Design" variant="outline" />
                            <Chip label="Business" variant="outline" />
                          </Box>
                        </Box>
                        <Box>
                          <Label>Price Range</Label>
                          <Box className="flex gap-2 mt-2">
                            <Chip label="Any" variant="soft" />
                            <Chip label="$0-$50" variant="outline" />
                            <Chip label="$50-$100" variant="outline" />
                            <Chip label="$100+" variant="outline" />
                          </Box>
                        </Box>
                      </Box>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button variant="outline">Clear All</Button>
                        </SheetClose>
                        <Button>Apply Filters</Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Tooltip Tab */}
      {activeTab === 'tooltip' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tooltip Examples</CardTitle>
              <CardDescription>
                Hover tooltips for additional information and help text
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="body2">
                Tooltips provide additional context and information on hover.
              </Typography>

              <TooltipProvider>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box>
                    <Typography variant="h6" className="mb-2">
                      Basic Tooltips
                    </Typography>
                    <Box className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Hover me</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This is a basic tooltip</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" disabled>
                            Disabled
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This button is disabled</p>
                        </TooltipContent>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="h6" className="mb-2">
                      Help Tooltips
                    </Typography>
                    <Box className="flex items-center gap-2">
                      <Label>Email Address</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="text" size="icon">
                            <Icon name="question-mark-circled" />
                            <span className="sr-only">Help</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Enter your email address for account verification
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="h6" className="mb-2">
                      Icon Tooltips
                    </Typography>
                    <Box className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="text" size="icon">
                            <Icon name="cog" />
                            <span className="sr-only">Settings</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open settings</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="text" size="icon">
                            <Icon name="trash-can" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete item</p>
                        </TooltipContent>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="h6" className="mb-2">
                      Rich Tooltips
                    </Typography>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Premium Feature</Button>
                      </TooltipTrigger>
                      <TooltipContent className="w-80">
                        <Box className="space-y-2">
                          <Typography variant="subtitle2">
                            Premium Feature
                          </Typography>
                          <Typography variant="body2">
                            This feature is only available to premium
                            subscribers. Upgrade your account to access advanced
                            functionality.
                          </Typography>
                          <Button size="sm" className="w-full">
                            Upgrade Now
                          </Button>
                        </Box>
                      </TooltipContent>
                    </Tooltip>
                  </Box>
                </Box>
              </TooltipProvider>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* HoverCard Tab */}
      {activeTab === 'hovercard' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>HoverCard Examples</CardTitle>
              <CardDescription>
                Rich hover cards for detailed content previews
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="body2">
                HoverCards provide rich content previews and detailed
                information on hover.
              </Typography>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* User Profile HoverCard */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    User Profile
                  </Typography>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="text">@john_doe</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <Box className="flex justify-between space-x-4">
                        <Box>
                          <Typography variant="h6">John Doe</Typography>
                          <Typography
                            variant="body2"
                            className="text-neutral-foreground/70"
                          >
                            Software Developer
                          </Typography>
                          <Typography variant="body2" className="mt-2">
                            Passionate about building great user experiences and
                            clean code.
                          </Typography>
                        </Box>
                      </Box>
                    </HoverCardContent>
                  </HoverCard>
                </Box>

                {/* Product Preview HoverCard */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Product Preview
                  </Typography>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="text">View Product</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <Box className="space-y-2">
                        <Typography variant="h6">Premium Widget</Typography>
                        <Typography
                          variant="body2"
                          className="text-neutral-foreground/70"
                        >
                          High-quality widget for professional use
                        </Typography>
                        <Box className="flex items-center gap-2">
                          <Typography variant="h6" className="text-primary">
                            $99.99
                          </Typography>
                          <Badge color="success" variant="soft">
                            In Stock
                          </Badge>
                        </Box>
                        <Typography variant="body2">
                          Features: Premium materials, lifetime warranty, free
                          shipping
                        </Typography>
                      </Box>
                    </HoverCardContent>
                  </HoverCard>
                </Box>

                {/* File Preview HoverCard */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    File Preview
                  </Typography>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="text">document.pdf</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <Box className="space-y-2">
                        <Typography variant="h6">document.pdf</Typography>
                        <Typography
                          variant="body2"
                          className="text-neutral-foreground/70"
                        >
                          PDF Document • 2.4 MB
                        </Typography>
                        <Typography variant="body2">
                          Last modified: 2 hours ago
                        </Typography>
                        <Box className="flex gap-2">
                          <Button size="sm">Download</Button>
                          <Button size="sm" variant="outline">
                            Preview
                          </Button>
                        </Box>
                      </Box>
                    </HoverCardContent>
                  </HoverCard>
                </Box>

                {/* Notification Preview HoverCard */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Notification Preview
                  </Typography>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="text">3 new messages</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <Box className="space-y-2">
                        <Typography variant="h6">Recent Messages</Typography>
                        <Box className="space-y-1">
                          <Box className="flex justify-between">
                            <Typography variant="body2">
                              Alice Johnson
                            </Typography>
                            <Typography
                              variant="body2"
                              className="text-neutral-foreground/70"
                            >
                              2m ago
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            className="text-neutral-foreground/70"
                          >
                            "Can you review the latest changes?"
                          </Typography>
                        </Box>
                        <Box className="space-y-1">
                          <Box className="flex justify-between">
                            <Typography variant="body2">Bob Smith</Typography>
                            <Typography
                              variant="body2"
                              className="text-neutral-foreground/70"
                            >
                              5m ago
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            className="text-neutral-foreground/70"
                          >
                            "Meeting scheduled for tomorrow"
                          </Typography>
                        </Box>
                      </Box>
                    </HoverCardContent>
                  </HoverCard>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Popover Tab */}
      {activeTab === 'popover' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popover Examples</CardTitle>
              <CardDescription>
                Contextual popovers for actions and content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="body2">
                Popovers provide contextual actions and content that appear on
                click or hover.
              </Typography>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Notifications Popover */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Notifications
                  </Typography>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Notifications</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <Notifications
                        activeTab={'all'}
                        notifications={notifications}
                        onTabChange={() => {
                          console.log('Tab changed');
                        }}
                        onClick={() => {
                          console.log('Notification clicked');
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </Box>

                {/* Actions Popover */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Actions Menu
                  </Typography>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">More Actions</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56">
                      <Box className="space-y-2">
                        <Button variant="text" className="w-full justify-start">
                          Edit
                        </Button>
                        <Button variant="text" className="w-full justify-start">
                          Duplicate
                        </Button>
                        <Button variant="text" className="w-full justify-start">
                          Archive
                        </Button>
                        <Button
                          variant="text"
                          className="w-full justify-start text-destructive"
                        >
                          Delete
                        </Button>
                      </Box>
                    </PopoverContent>
                  </Popover>
                </Box>

                {/* Search Popover */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Search
                  </Typography>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Search</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <Box className="space-y-2">
                        <Input placeholder="Search..." />
                        <Box className="space-y-1">
                          <Typography variant="body2" className="font-medium">
                            Recent Searches
                          </Typography>
                          <Button
                            variant="text"
                            className="w-full justify-start text-sm"
                          >
                            React components
                          </Button>
                          <Button
                            variant="text"
                            className="w-full justify-start text-sm"
                          >
                            UI design
                          </Button>
                          <Button
                            variant="text"
                            className="w-full justify-start text-sm"
                          >
                            TypeScript
                          </Button>
                        </Box>
                      </Box>
                    </PopoverContent>
                  </Popover>
                </Box>

                {/* Settings Popover */}
                <Box>
                  <Typography variant="h6" className="mb-2">
                    Quick Settings
                  </Typography>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Settings</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <Box className="space-y-4">
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
                          <Label>Language</Label>
                          <Box className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              English
                            </Button>
                            <Button variant="outline" size="sm">
                              Spanish
                            </Button>
                            <Button variant="outline" size="sm">
                              French
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </PopoverContent>
                  </Popover>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Integration Examples */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Integration Examples</CardTitle>
          <CardDescription>
            Real-world examples of dialog components in applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Box>
            <Typography variant="h6" className="mb-2">
              E-commerce Product Page
            </Typography>
            <Typography variant="body2" className="mb-2">
              A product page with multiple dialog interactions:
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Quick View</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Product Quick View</DialogTitle>
                  </DialogHeader>
                  <Box className="space-y-4">
                    <Typography variant="body2">
                      Product details and images in a modal dialog for quick
                      viewing.
                    </Typography>
                    <Box className="flex gap-2">
                      <Button>Add to Cart</Button>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </Box>
                  </Box>
                </DialogContent>
              </Dialog>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline">Size Guide</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <Typography variant="h6">Size Guide</Typography>
                  <Typography variant="body2">
                    Hover to see detailed size information and measurements.
                  </Typography>
                </HoverCardContent>
              </HoverCard>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Share</Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <Box className="space-y-2">
                    <Button variant="text" className="w-full justify-start">
                      Share on Facebook
                    </Button>
                    <Button variant="text" className="w-full justify-start">
                      Share on Twitter
                    </Button>
                    <Button variant="text" className="w-full justify-start">
                      Copy Link
                    </Button>
                  </Box>
                </PopoverContent>
              </Popover>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" className="mb-2">
              Dashboard Application
            </Typography>
            <Typography variant="body2" className="mb-2">
              A dashboard with various dialog interactions:
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Drawer direction="left">
                <DrawerTrigger asChild>
                  <Button variant="outline">Navigation</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Navigation Menu</DrawerTitle>
                  </DrawerHeader>
                  <Box className="p-4 space-y-2">
                    <Button variant="text" className="w-full justify-start">
                      Dashboard
                    </Button>
                    <Button variant="text" className="w-full justify-start">
                      Analytics
                    </Button>
                    <Button variant="text" className="w-full justify-start">
                      Settings
                    </Button>
                  </Box>
                </DrawerContent>
              </Drawer>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Help</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click for help and documentation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Filters</Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filter Options</SheetTitle>
                  </SheetHeader>
                  <Box className="space-y-4 mt-4">
                    <Box>
                      <Label>Date Range</Label>
                      <Box className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          Today
                        </Button>
                        <Button variant="outline" size="sm">
                          Week
                        </Button>
                        <Button variant="outline" size="sm">
                          Month
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </SheetContent>
              </Sheet>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Component Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Component Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Box>
              <Typography variant="h6" className="mb-2">
                Usage Guidelines
              </Typography>
              <Box className="space-y-2">
                <Box>
                  <Typography variant="body2" className="font-medium">
                    Dialog
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-neutral-foreground/70"
                  >
                    Use for focused interactions, forms, and important
                    confirmations
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium">
                    Drawer
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-neutral-foreground/70"
                  >
                    Use for navigation, settings, and secondary content
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium">
                    Sheet
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-neutral-foreground/70"
                  >
                    Use for mobile-first interactions and touch gestures
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium">
                    Tooltip
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-neutral-foreground/70"
                  >
                    Use for additional context and help text
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium">
                    HoverCard
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-neutral-foreground/70"
                  >
                    Use for rich content previews and detailed information
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium">
                    Popover
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-neutral-foreground/70"
                  >
                    Use for contextual actions and content
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" className="mb-2">
                Accessibility
              </Typography>
              <Box className="space-y-2">
                <Box>
                  <Typography variant="body2" className="font-medium">
                    Keyboard Navigation
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-neutral-foreground/70"
                  >
                    All components support keyboard navigation and focus
                    management
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium">
                    Screen Readers
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-neutral-foreground/70"
                  >
                    Proper ARIA labels and descriptions for screen reader
                    support
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium">
                    Focus Trapping
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-neutral-foreground/70"
                  >
                    Modal dialogs trap focus within the dialog content
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="font-medium">
                    Escape Key
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-neutral-foreground/70"
                  >
                    All modals can be closed with the Escape key
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
