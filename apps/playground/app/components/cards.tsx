import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
  ComposedAvatar,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  Input,
  Label,
  Typography,
} from '@veraclins-dev/ui';

export function Cards() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <Typography variant="h1" className="text-center">
        Card Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Card components for displaying content in a structured and visually
        appealing way.
      </Typography>

      {/* Basic Card Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Card Variants & Structure</CardTitle>
          <CardDescription>
            Basic card structure with header, content, and footer sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Card */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>
                  Simple card with title and description
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Typography variant="body1">
                  This is the main content area of the card. You can put any
                  content here including text, images, forms, or other
                  components.
                </Typography>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Action</Button>
              </CardFooter>
            </Card>

            {/* Card with Subtitle */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle>Card with Subtitle</CardTitle>
                <CardSubtitle>Additional context information</CardSubtitle>
                <CardDescription>
                  Cards can have multiple levels of information hierarchy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Typography variant="body1">
                  The subtitle provides additional context while the description
                  offers more detailed information about the card's purpose.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* User Profile Cards */}
      <Card>
        <CardHeader>
          <CardTitle>User Profile Cards</CardTitle>
          <CardDescription>
            Cards for displaying user information and profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Profile */}
            <Card className="bg-card-inner">
              <CardHeader>
                <Box display="flex" items="center" gap={4}>
                  <Avatar className="size-16">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Box flex="1">
                    <CardTitle>John Doe</CardTitle>
                    <CardSubtitle>Senior Developer</CardSubtitle>
                    <CardDescription>@john_doe</CardDescription>
                  </Box>
                </Box>
              </CardHeader>
              <CardContent>
                <Box display="flex" flexDirection="column" gap={3}>
                  <Typography variant="body1">
                    Full-stack developer with 5+ years of experience in React,
                    Node.js, and TypeScript.
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Badge variant="soft" color="success">
                      <Box className="w-2 h-2 bg-success rounded-full mr-2" />
                      Online
                    </Badge>
                    <Badge variant="soft" color="primary">
                      Admin
                    </Badge>
                    <Badge variant="outline" color="warning">
                      Premium
                    </Badge>
                  </Box>
                </Box>
              </CardContent>
              <CardFooter>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Button variant="outline" size="sm">
                    <Icon name="chat-bubble" className="mr-1" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="user-plus" className="mr-1" />
                    Follow
                  </Button>
                </Box>
              </CardFooter>
            </Card>

            {/* Team Member */}
            <Card className="bg-card-inner">
              <CardHeader>
                <Box display="flex" items="center" gap={4}>
                  <Avatar className="size-16">
                    <AvatarImage src="https://github.com/leerob.png" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <Box flex="1">
                    <CardTitle>Alice Smith</CardTitle>
                    <CardSubtitle>UI/UX Designer</CardSubtitle>
                    <CardDescription>Design Team Lead</CardDescription>
                  </Box>
                </Box>
              </CardHeader>
              <CardContent>
                <Box display="flex" flexDirection="column" gap={3}>
                  <Typography variant="body1">
                    Creative designer focused on user experience and visual
                    design systems.
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Badge variant="soft" color="info">
                      Design
                    </Badge>
                    <Badge variant="soft" color="info">
                      Figma
                    </Badge>
                    <Badge variant="soft" color="info">
                      Prototyping
                    </Badge>
                  </Box>
                </Box>
              </CardContent>
              <CardFooter>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Button variant="outline" size="sm">
                    <Icon name="eye-slash" className="mr-1" />
                    View Portfolio
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="calendar" className="mr-1" />
                    Schedule
                  </Button>
                </Box>
              </CardFooter>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Product Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Product Cards</CardTitle>
          <CardDescription>
            Cards for displaying products and e-commerce items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Card */}
            <Card className="bg-card-inner overflow-hidden">
              <Box className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <Icon name="photo" className="size-16 text-muted-foreground" />
                <Badge
                  variant="solid"
                  color="destructive"
                  className="absolute top-2 right-2"
                >
                  Sale
                </Badge>
              </Box>
              <CardHeader>
                <CardTitle>iPhone 15 Pro</CardTitle>
                <CardDescription>
                  Latest smartphone with advanced features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box display="flex" flexDirection="column" gap={3}>
                  <Box display="flex" justify="between" items="center">
                    <Typography variant="h4">$999</Typography>
                    <Typography
                      variant="body2"
                      className="text-muted-foreground line-through"
                    >
                      $1,199
                    </Typography>
                  </Box>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Badge variant="outline" color="success">
                      In Stock
                    </Badge>
                    <Badge variant="outline" color="info">
                      Free Shipping
                    </Badge>
                  </Box>
                </Box>
              </CardContent>
              <CardFooter>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  className="w-full"
                >
                  <Button color="primary" fullWidth>
                    <Icon name="shopping-cart" className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" fullWidth>
                    <Icon name="heart" className="mr-2" />
                    Add to Wishlist
                  </Button>
                </Box>
              </CardFooter>
            </Card>

            {/* Service Card */}
            <Card className="bg-card-inner">
              <CardHeader>
                <Box display="flex" items="center" gap={3}>
                  <Box className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="cog-6-tooth" className="size-6 text-primary" />
                  </Box>
                  <Box flex="1">
                    <CardTitle>Premium Support</CardTitle>
                    <CardDescription>24/7 technical assistance</CardDescription>
                  </Box>
                </Box>
              </CardHeader>
              <CardContent>
                <Box display="flex" flexDirection="column" gap={3}>
                  <Typography variant="body1">
                    Get priority support with dedicated engineers and guaranteed
                    response times.
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" items="center" gap={2}>
                      <Icon name="check" className="size-4 text-success" />
                      <Typography variant="body2">
                        24/7 phone support
                      </Typography>
                    </Box>
                    <Box display="flex" items="center" gap={2}>
                      <Icon name="check" className="size-4 text-success" />
                      <Typography variant="body2">
                        1-hour response time
                      </Typography>
                    </Box>
                    <Box display="flex" items="center" gap={2}>
                      <Icon name="check" className="size-4 text-success" />
                      <Typography variant="body2">
                        Dedicated account manager
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <CardFooter>
                <Box
                  display="flex"
                  justify="between"
                  items="center"
                  className="w-full"
                >
                  <Typography variant="h5">$99/month</Typography>
                  <Button color="primary">Subscribe</Button>
                </Box>
              </CardFooter>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Dashboard Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Cards</CardTitle>
          <CardDescription>
            Cards for displaying metrics, analytics, and dashboard information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric Card */}
            <Card className="bg-card-inner">
              <CardHeader className="pb-2">
                <Box display="flex" justify="between" items="center">
                  <CardTitle className="text-sm">Total Revenue</CardTitle>
                  <Icon
                    name="arrow-trending-up"
                    className="size-4 text-success"
                  />
                </Box>
              </CardHeader>
              <CardContent>
                <Typography variant="h3" className="mb-1">
                  $45,231
                </Typography>
                <Typography variant="body2" className="text-success">
                  +20.1% from last month
                </Typography>
              </CardContent>
            </Card>

            {/* Metric Card */}
            <Card className="bg-card-inner">
              <CardHeader className="pb-2">
                <Box display="flex" justify="between" items="center">
                  <CardTitle className="text-sm">Active Users</CardTitle>
                  <Icon name="users" className="size-4 text-primary" />
                </Box>
              </CardHeader>
              <CardContent>
                <Typography variant="h3" className="mb-1">
                  2,350
                </Typography>
                <Typography variant="body2" className="text-success">
                  +180.1% from last month
                </Typography>
              </CardContent>
            </Card>

            {/* Metric Card */}
            <Card className="bg-card-inner">
              <CardHeader className="pb-2">
                <Box display="flex" justify="between" items="center">
                  <CardTitle className="text-sm">Sales</CardTitle>
                  <Icon name="credit-card" className="size-4 text-warning" />
                </Box>
              </CardHeader>
              <CardContent>
                <Typography variant="h3" className="mb-1">
                  12,234
                </Typography>
                <Typography variant="body2" className="text-destructive">
                  +19% from last month
                </Typography>
              </CardContent>
            </Card>

            {/* Metric Card */}
            <Card className="bg-card-inner">
              <CardHeader className="pb-2">
                <Box display="flex" justify="between" items="center">
                  <CardTitle className="text-sm">Pending Orders</CardTitle>
                  <Icon name="clock" className="size-4 text-info" />
                </Box>
              </CardHeader>
              <CardContent>
                <Typography variant="h3" className="mb-1">
                  573
                </Typography>
                <Typography variant="body2" className="text-muted-foreground">
                  +201 since last hour
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Content Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Content Cards</CardTitle>
          <CardDescription>
            Cards for displaying articles, posts, and content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Article Card */}
            <Card className="bg-card-inner overflow-hidden">
              <Box className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <Icon
                  name="document-text"
                  className="size-16 text-muted-foreground"
                />
                <Badge
                  variant="solid"
                  color="success"
                  className="absolute top-2 left-2"
                >
                  New
                </Badge>
              </Box>
              <CardHeader>
                <CardTitle>Getting Started with React</CardTitle>
                <CardDescription>
                  Learn the basics of React development and build your first
                  application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Typography variant="body2" className="text-muted-foreground">
                  React is a JavaScript library for building user interfaces. In
                  this comprehensive guide, we'll cover everything you need to
                  know to get started...
                </Typography>
              </CardContent>
              <CardFooter>
                <Box
                  display="flex"
                  justify="between"
                  items="center"
                  className="w-full"
                >
                  <Box display="flex" items="center" gap={2}>
                    <Avatar className="size-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      John Doe
                    </Typography>
                  </Box>
                  <Typography variant="body2" className="text-muted-foreground">
                    5 min read
                  </Typography>
                </Box>
              </CardFooter>
            </Card>

            {/* Event Card */}
            <Card className="bg-card-inner">
              <CardHeader>
                <Box display="flex" items="center" gap={3}>
                  <Box className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="calendar" className="size-6 text-primary" />
                  </Box>
                  <Box flex="1">
                    <CardTitle>Tech Conference 2024</CardTitle>
                    <CardDescription>
                      Annual developer conference
                    </CardDescription>
                  </Box>
                </Box>
              </CardHeader>
              <CardContent>
                <Box display="flex" flexDirection="column" gap={3}>
                  <Typography variant="body1">
                    Join us for the biggest tech conference of the year
                    featuring talks from industry experts, workshops, and
                    networking opportunities.
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" items="center" gap={2}>
                      <Icon
                        name="map-pin"
                        className="size-4 text-muted-foreground"
                      />
                      <Typography variant="body2">San Francisco, CA</Typography>
                    </Box>
                    <Box display="flex" items="center" gap={2}>
                      <Icon
                        name="clock"
                        className="size-4 text-muted-foreground"
                      />
                      <Typography variant="body2">March 15-17, 2024</Typography>
                    </Box>
                    <Box display="flex" items="center" gap={2}>
                      <Icon
                        name="users"
                        className="size-4 text-muted-foreground"
                      />
                      <Typography variant="body2">500+ attendees</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <CardFooter>
                <Box display="flex" gap={2} className="w-full">
                  <Button color="primary" className="flex-1">
                    Register Now
                  </Button>
                  <Button variant="outline">
                    <Icon name="heart" />
                  </Button>
                </Box>
              </CardFooter>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Interactive Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Cards</CardTitle>
          <CardDescription>
            Cards with hover effects, tooltips, and interactive elements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hover Card */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle>Hover Card Example</CardTitle>
                <CardDescription>
                  Hover over the button to see additional information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline">@veraclins-dev</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80" side="right">
                    <Box display="flex" justify="between" gap={4}>
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>VC</AvatarFallback>
                      </Avatar>
                      <Box display="flex" flexDirection="column" gap={1}>
                        <Typography
                          variant="h4"
                          className="text-sm font-semibold"
                        >
                          @veraclins-dev
                        </Typography>
                        <Typography variant="body2">
                          Modern UI component library built with React and
                          TypeScript.
                        </Typography>
                        <Box display="flex" items="center" gap={2} mt={1}>
                          <Icon
                            name="calendar"
                            className="text-muted-foreground size-4"
                          />
                          <Typography
                            variant="body2"
                            className="text-muted-foreground text-xs"
                          >
                            Joined December 2023
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </HoverCardContent>
                </HoverCard>
              </CardContent>
            </Card>

            {/* Form Card */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>
                  Send us a message and we'll get back to you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box display="flex" flexDirection="column" gap={4}>
                  <Box display="grid" gap={2}>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </Box>
                  <Box display="grid" gap={2}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </Box>
                  <Box display="grid" gap={2}>
                    <Label htmlFor="message">Message</Label>
                    <Input id="message" placeholder="Enter your message" />
                  </Box>
                </Box>
              </CardContent>
              <CardFooter>
                <Button color="primary" fullWidth>
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Team Collaboration */}
      <Card>
        <CardHeader>
          <CardTitle>Team Collaboration</CardTitle>
          <CardDescription>
            Cards for team management and collaboration features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Meeting Notes */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle>Meeting Notes</CardTitle>
                <CardDescription>
                  Transcript from the meeting with the client
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <Typography variant="body1" className="mb-4">
                  Client requested dashboard redesign with focus on mobile
                  responsiveness.
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  className="list-decimal pl-6"
                >
                  <Typography variant="body2">
                    New analytics widgets for daily/weekly metrics
                  </Typography>
                  <Typography variant="body2">
                    Simplified navigation menu
                  </Typography>
                  <Typography variant="body2">Dark mode support</Typography>
                  <Typography variant="body2">Timeline: 6 weeks</Typography>
                  <Typography variant="body2">
                    Follow-up meeting scheduled for next Tuesday
                  </Typography>
                </Box>
              </CardContent>
              <CardFooter>
                <Box
                  display="flex"
                  justify="between"
                  items="center"
                  className="w-full"
                >
                  <Box
                    display="flex"
                    className="*:data-[slot=avatar]:ring-background -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
                  >
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <ComposedAvatar
                      src="https://github.com/leerob.png"
                      alt="@leerob"
                    />
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/leerob.png"
                        alt="@leerob"
                      />
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                  </Box>
                  <Typography variant="body2" className="text-muted-foreground">
                    2 hours ago
                  </Typography>
                </Box>
              </CardFooter>
            </Card>

            {/* Project Status */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>
                  Current progress and upcoming milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box display="flex" flexDirection="column" gap={4}>
                  <Box>
                    <Typography
                      variant="body2"
                      className="text-muted-foreground mb-2"
                    >
                      Overall Progress
                    </Typography>
                    <Box className="w-full bg-muted rounded-full h-2">
                      <Box
                        className="bg-primary h-2 rounded-full"
                        style={{ width: '75%' }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      className="text-muted-foreground mt-1"
                    >
                      75% Complete
                    </Typography>
                  </Box>

                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body2">Design Phase</Typography>
                      <Badge variant="soft" color="success">
                        Complete
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body2">Development</Typography>
                      <Badge variant="soft" color="warning">
                        In Progress
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body2">Testing</Typography>
                      <Badge variant="outline" color="secondary">
                        Pending
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body2">Deployment</Typography>
                      <Badge variant="outline" color="secondary">
                        Pending
                      </Badge>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <CardFooter>
                <Box display="flex" gap={2} className="w-full">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button color="primary">Update Status</Button>
                </Box>
              </CardFooter>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
