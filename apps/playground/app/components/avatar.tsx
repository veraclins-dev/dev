import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  Separator,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Avatars() {
  return (
    <Box className="w-full max-w-6xl mx-auto space-y-8">
      <PlaygroundBreadcrumb currentPage="Avatar" className="mb-4" />

      <Box className="text-center space-y-4">
        <Typography variant="h1">Avatar Components</Typography>
        <Typography variant="body1" className="text-neutral-foreground/70">
          User profile image components with fallback support and various
          display options.
        </Typography>
      </Box>

      {/* Basic Avatars */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Avatars</CardTitle>
          <CardDescription>
            Simple avatars with images and fallback content when images fail to
            load.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Avatar with Image */}
            <Box className="space-y-4">
              <Typography variant="h4">Avatar with Image</Typography>
              <Box className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Box>
                  <Typography variant="body1" className="font-medium">
                    John Doe
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600">
                    john@example.com
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Avatar with Fallback */}
            <Box className="space-y-4">
              <Typography variant="h4">Avatar with Fallback</Typography>
              <Box className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/broken-image.jpg" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Box>
                  <Typography variant="body1" className="font-medium">
                    John Doe
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600">
                    john@example.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Avatar Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar Sizes</CardTitle>
          <CardDescription>
            Different avatar sizes for various use cases and contexts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="space-y-4">
            <Typography variant="h4">Size Variations</Typography>
            <Box className="flex items-center gap-4">
              <Box className="text-center">
                <Avatar className="size-6 mb-2">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Typography variant="body2" className="text-xs">
                  xs (24px)
                </Typography>
              </Box>
              <Box className="text-center">
                <Avatar className="size-8 mb-2">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Typography variant="body2" className="text-xs">
                  sm (32px)
                </Typography>
              </Box>
              <Box className="text-center">
                <Avatar className="size-10 mb-2">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Typography variant="body2" className="text-xs">
                  md (40px)
                </Typography>
              </Box>
              <Box className="text-center">
                <Avatar className="size-12 mb-2">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Typography variant="body2" className="text-xs">
                  lg (48px)
                </Typography>
              </Box>
              <Box className="text-center">
                <Avatar className="size-16 mb-2">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Typography variant="body2" className="text-xs">
                  xl (64px)
                </Typography>
              </Box>
              <Box className="text-center">
                <Avatar className="size-20 mb-2">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Typography variant="body2" className="text-xs">
                  2xl (80px)
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Avatar with Status */}
      <Card>
        <CardHeader>
          <CardTitle>Avatars with Status</CardTitle>
          <CardDescription>
            Avatars with status indicators showing online, offline, or busy
            states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Online Status */}
            <Box className="space-y-4">
              <Typography variant="h4">Online</Typography>
              <Box className="flex items-center gap-4">
                <Box className="relative">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Box className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                </Box>
                <Box>
                  <Typography variant="body1" className="font-medium">
                    John Doe
                  </Typography>
                  <Typography variant="body2" className="text-green-600">
                    Online
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Offline Status */}
            <Box className="space-y-4">
              <Typography variant="h4">Offline</Typography>
              <Box className="flex items-center gap-4">
                <Box className="relative">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/leerob.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <Box className="absolute -bottom-1 -right-1 w-4 h-4 bg-neutral-400 border-2 border-white rounded-full" />
                </Box>
                <Box>
                  <Typography variant="body1" className="font-medium">
                    Lee Robinson
                  </Typography>
                  <Typography variant="body2" className="text-neutral-500">
                    Offline
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Busy Status */}
            <Box className="space-y-4">
              <Typography variant="h4">Busy</Typography>
              <Box className="flex items-center gap-4">
                <Box className="relative">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/vercel.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <Box className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 border-2 border-white rounded-full" />
                </Box>
                <Box>
                  <Typography variant="body1" className="font-medium">
                    Vercel Team
                  </Typography>
                  <Typography variant="body2" className="text-yellow-600">
                    Busy
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Avatar Groups */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar Groups</CardTitle>
          <CardDescription>
            Multiple avatars displayed together with overlapping or stacked
            layouts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overlapping Avatars */}
            <Box className="space-y-4">
              <Typography variant="h4">Overlapping Avatars</Typography>
              <Box className="flex -space-x-2">
                <Avatar className="ring-2 ring-white">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="ring-2 ring-white">
                  <AvatarImage
                    src="https://github.com/leerob.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar className="ring-2 ring-white">
                  <AvatarImage
                    src="https://github.com/vercel.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <Avatar className="ring-2 ring-white">
                  <AvatarImage
                    src="https://github.com/nextjs.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>NJ</AvatarFallback>
                </Avatar>
                <Avatar className="ring-2 ring-white">
                  <AvatarFallback>+2</AvatarFallback>
                </Avatar>
              </Box>
            </Box>

            {/* Stacked Avatars */}
            <Box className="space-y-4">
              <Typography variant="h4">Stacked Avatars</Typography>
              <Box className="space-y-2">
                <Box className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Box>
                    <Typography variant="body2" className="font-medium">
                      John Doe
                    </Typography>
                    <Typography variant="body2" className="text-neutral-600">
                      Frontend Developer
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage
                      src="https://github.com/leerob.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <Box>
                    <Typography variant="body2" className="font-medium">
                      Lee Robinson
                    </Typography>
                    <Typography variant="body2" className="text-neutral-600">
                      Backend Developer
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage
                      src="https://github.com/vercel.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <Box>
                    <Typography variant="body2" className="font-medium">
                      Vercel Team
                    </Typography>
                    <Typography variant="body2" className="text-neutral-600">
                      DevOps Engineer
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Interactive Avatars */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Avatars</CardTitle>
          <CardDescription>
            Avatars with hover effects, click interactions, and dropdown menus.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clickable Avatar */}
            <Box className="space-y-4">
              <Typography variant="h4">Clickable Avatar</Typography>
              <Box className="flex items-center gap-4">
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Box>
                  <Typography variant="body1" className="font-medium">
                    John Doe
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600">
                    Click to view profile
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Avatar with Badge */}
            <Box className="space-y-4">
              <Typography variant="h4">Avatar with Badge</Typography>
              <Box className="flex items-center gap-4">
                <Box className="relative">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/leerob.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <Badge className="absolute -top-2 -right-2 size-5 max-w-5 p-0 text-xs">
                    3
                  </Badge>
                </Box>
                <Box>
                  <Typography variant="body1" className="font-medium">
                    Lee Robinson
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600">
                    3 new messages
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Real-Life Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Life Examples</CardTitle>
          <CardDescription>
            Practical examples of how avatars are used in real applications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* User Profile */}
          <Box className="space-y-4">
            <Typography variant="h4">User Profile</Typography>
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Box className="flex items-start gap-6">
                  <Avatar className="size-20">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Box className="flex-1 space-y-2">
                    <Typography variant="h5">John Doe</Typography>
                    <Typography variant="body2" className="text-neutral-600">
                      Frontend Developer at TechCorp
                    </Typography>
                    <Box className="flex items-center gap-2">
                      <Icon name="map-pin" className="text-neutral-500" />
                      <Typography variant="body2" className="text-neutral-600">
                        San Francisco, CA
                      </Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Icon name="calendar" className="text-neutral-500" />
                      <Typography variant="body2" className="text-neutral-600">
                        Joined January 2023
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Separator />

          {/* Team Members */}
          <Box className="space-y-4">
            <Typography variant="h4">Team Members</Typography>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Development Team</CardTitle>
                <CardDescription>
                  Meet our core development team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="space-y-4">
                  <Box className="flex items-center justify-between">
                    <Box className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="User avatar"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Box>
                        <Typography variant="body1" className="font-medium">
                          John Doe
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-neutral-600"
                        >
                          Frontend Developer
                        </Typography>
                      </Box>
                    </Box>
                    <Badge variant="outline">Active</Badge>
                  </Box>

                  <Box className="flex items-center justify-between">
                    <Box className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/leerob.png"
                          alt="User avatar"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                      <Box>
                        <Typography variant="body1" className="font-medium">
                          Lee Robinson
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-neutral-600"
                        >
                          Backend Developer
                        </Typography>
                      </Box>
                    </Box>
                    <Badge variant="outline">Active</Badge>
                  </Box>

                  <Box className="flex items-center justify-between">
                    <Box className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/vercel.png"
                          alt="User avatar"
                        />
                        <AvatarFallback>VC</AvatarFallback>
                      </Avatar>
                      <Box>
                        <Typography variant="body1" className="font-medium">
                          Vercel Team
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-neutral-600"
                        >
                          DevOps Engineer
                        </Typography>
                      </Box>
                    </Box>
                    <Badge color="secondary">Away</Badge>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Separator />

          {/* Contact List */}
          <Box className="space-y-4">
            <Typography variant="h4">Contact List</Typography>
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle className="text-lg">Recent Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <Box className="space-y-3">
                  <Box className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                    <Avatar className="size-10">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="User avatar"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Box className="flex-1">
                      <Typography variant="body1" className="font-medium">
                        John Doe
                      </Typography>
                      <Typography variant="body2" className="text-neutral-600">
                        Last seen 2 hours ago
                      </Typography>
                    </Box>
                    <Box className="w-3 h-3 bg-green-500 rounded-full" />
                  </Box>

                  <Box className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                    <Avatar className="size-10">
                      <AvatarImage
                        src="https://github.com/leerob.png"
                        alt="User avatar"
                      />
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Box className="flex-1">
                      <Typography variant="body1" className="font-medium">
                        Lee Robinson
                      </Typography>
                      <Typography variant="body2" className="text-neutral-600">
                        Last seen yesterday
                      </Typography>
                    </Box>
                    <Box className="w-3 h-3 bg-neutral-400 rounded-full" />
                  </Box>

                  <Box className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                    <Avatar className="size-10">
                      <AvatarImage
                        src="https://github.com/vercel.png"
                        alt="User avatar"
                      />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <Box className="flex-1">
                      <Typography variant="body1" className="font-medium">
                        Vercel Team
                      </Typography>
                      <Typography variant="body2" className="text-neutral-600">
                        Last seen 1 week ago
                      </Typography>
                    </Box>
                    <Box className="w-3 h-3 bg-neutral-400 rounded-full" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>
            Best practices and accessibility considerations for using avatar
            components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Box className="space-y-2">
            <Typography variant="h4">Accessibility</Typography>
            <Box className="space-y-2">
              <Typography variant="body2">
                • Always provide alt text for avatar images
              </Typography>
              <Typography variant="body2">
                • Use descriptive fallback text (initials or name)
              </Typography>
              <Typography variant="body2">
                • Ensure proper contrast ratios for fallback backgrounds
              </Typography>
              <Typography variant="body2">
                • Use ARIA labels for interactive avatars
              </Typography>
            </Box>
          </Box>

          <Box className="space-y-2">
            <Typography variant="h4">Best Practices</Typography>
            <Box className="space-y-2">
              <Typography variant="body2">
                • Use consistent avatar sizes within the same context
              </Typography>
              <Typography variant="body2">
                • Provide meaningful fallback content when images fail
              </Typography>
              <Typography variant="body2">
                • Consider using status indicators for real-time applications
              </Typography>
              <Typography variant="body2">
                • Optimize avatar images for web use
              </Typography>
            </Box>
          </Box>

          <Box className="space-y-2">
            <Typography variant="h4">Design Considerations</Typography>
            <Box className="space-y-2">
              <Typography variant="body2">
                • Choose appropriate avatar sizes for the context
              </Typography>
              <Typography variant="body2">
                • Use consistent styling across all avatars
              </Typography>
              <Typography variant="body2">
                • Consider the visual hierarchy when grouping avatars
              </Typography>
              <Typography variant="body2">
                • Ensure avatars work well in both light and dark themes
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
