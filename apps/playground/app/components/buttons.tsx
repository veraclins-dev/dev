import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  Input,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Buttons() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Buttons" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Button Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Interactive button components with various styles, states, and loading
        indicators.
      </Typography>

      {/* Basic Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants & States</CardTitle>
          <CardDescription>
            Basic button variants, colors, and interactive states
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" gap={4} flexWrap="wrap">
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Solid</Typography>
              <Box display="flex" gap={2}>
                <Button variant="solid" color="primary">
                  Primary
                </Button>
                <Button variant="solid" color="primary" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="solid" color="secondary">
                  Secondary
                </Button>
                <Button variant="solid" color="secondary" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="solid" color="destructive">
                  Destructive
                </Button>
                <Button variant="solid" color="destructive" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="solid" color="success">
                  Success
                </Button>
                <Button variant="solid" color="success" loading>
                  Loading
                </Button>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Soft</Typography>
              <Box display="flex" gap={2}>
                <Button variant="soft" color="primary">
                  Primary
                </Button>
                <Button variant="soft" color="primary" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="soft" color="secondary">
                  Secondary
                </Button>
                <Button variant="soft" color="secondary" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="soft" color="destructive">
                  Destructive
                </Button>
                <Button variant="soft" color="destructive" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="soft" color="success">
                  Success
                </Button>
                <Button variant="soft" color="success" loading>
                  Loading
                </Button>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Outline</Typography>
              <Box display="flex" gap={2}>
                <Button variant="outline" color="primary">
                  Primary
                </Button>
                <Button variant="outline" color="primary" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="outline" color="secondary">
                  Secondary
                </Button>
                <Button variant="outline" color="secondary" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="outline" color="destructive">
                  Destructive
                </Button>
                <Button variant="outline" color="destructive" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="outline" color="success">
                  Success
                </Button>
                <Button variant="outline" color="success" loading>
                  Loading
                </Button>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Text</Typography>
              <Box display="flex" gap={2}>
                <Button variant="text" color="primary">
                  Primary
                </Button>
                <Button variant="text" color="primary" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="text" color="secondary">
                  Secondary
                </Button>
                <Button variant="text" color="secondary" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="text" color="destructive">
                  Destructive
                </Button>
                <Button variant="text" color="destructive" loading>
                  Loading
                </Button>
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="text" color="success">
                  Success
                </Button>
                <Button variant="text" color="success" loading>
                  Loading
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Icon Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Icon Buttons</CardTitle>
          <CardDescription>
            Icon-only buttons for compact actions and toolbars
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={4}>
            <Box>
              <Typography variant="h4" className="mb-3">
                Action Icons
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button size="icon" color="primary" variant="solid">
                  <Icon name="plus" />
                </Button>
                <Button size="icon" color="primary" variant="soft">
                  <Icon name="pencil-square" />
                </Button>
                <Button size="icon" color="primary" variant="outline">
                  <Icon name="trash" />
                </Button>
                <Button size="icon" color="primary" variant="text">
                  <Icon name="heart" />
                </Button>
                <Button size="icon" color="secondary" variant="solid">
                  <Icon name="download" />
                </Button>
                <Button size="icon" color="success" variant="solid">
                  <Icon name="check" />
                </Button>
                <Button size="icon" color="warning" variant="solid">
                  <Icon name="exclamation-triangle" />
                </Button>
                <Button size="icon" color="destructive" variant="solid">
                  <Icon name="x-mark" />
                </Button>
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-3">
                Navigation Icons
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button size="icon" color="primary" variant="outline">
                  <Icon name="home" />
                </Button>
                <Button size="icon" color="primary" variant="outline">
                  <Icon name="search" />
                </Button>
                <Button size="icon" color="primary" variant="outline">
                  <Icon name="bell" />
                </Button>
                <Button size="icon" color="primary" variant="outline">
                  <Icon name="user" />
                </Button>
                <Button size="icon" color="primary" variant="outline">
                  <Icon name="cog-6-tooth" />
                </Button>
                <Button size="icon" color="primary" variant="outline">
                  <Icon name="question-mark-circled" />
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Form Actions</CardTitle>
          <CardDescription>
            Button patterns for form submissions and user interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Login Form */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Login Form
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box display="grid" gap={2}>
                  <Typography variant="body2" className="text-muted-foreground">
                    Email
                  </Typography>
                  <Input placeholder="Enter your email" />
                </Box>
                <Box display="grid" gap={2}>
                  <Typography variant="body2" className="text-muted-foreground">
                    Password
                  </Typography>
                  <Input type="password" placeholder="Enter your password" />
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button color="primary" fullWidth>
                    Sign In
                  </Button>
                  <Button variant="outline" fullWidth>
                    <Icon name="globe-alt" className="mr-2" />
                    Continue with Google
                  </Button>
                  <Button variant="text" size="sm">
                    Forgot password?
                  </Button>
                </Box>
              </Box>
            </Card>

            {/* Settings Form */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Settings Form
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box display="grid" gap={2}>
                  <Typography variant="body2" className="text-muted-foreground">
                    Display Name
                  </Typography>
                  <Input placeholder="Enter display name" />
                </Box>
                <Box display="grid" gap={2}>
                  <Typography variant="body2" className="text-muted-foreground">
                    Bio
                  </Typography>
                  <Input placeholder="Tell us about yourself" />
                </Box>
                <Box display="flex" gap={2}>
                  <Button variant="outline">Cancel</Button>
                  <Button color="primary">Save Changes</Button>
                </Box>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Dashboard Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Actions</CardTitle>
          <CardDescription>
            Button patterns for dashboard interfaces and data management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Data Table Actions */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Data Table Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Bulk Actions
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Button variant="soft" color="success" size="sm">
                      <Icon name="check" className="mr-1" />
                      Approve Selected
                    </Button>
                    <Button variant="soft" color="destructive" size="sm">
                      <Icon name="trash" className="mr-1" />
                      Delete Selected
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="download" className="mr-1" />
                      Export
                    </Button>
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Row Actions
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Button size="icon" variant="outline" color="primary">
                      <Icon name="pencil-square" />
                    </Button>
                    <Button size="icon" variant="outline" color="info">
                      <Icon name="eye-slash" />
                    </Button>
                    <Button size="icon" variant="outline" color="success">
                      <Icon name="check" />
                    </Button>
                    <Button size="icon" variant="outline" color="destructive">
                      <Icon name="trash" />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* Analytics Dashboard */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Analytics Dashboard
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Time Range
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Button variant="outline" size="sm">
                      Today
                    </Button>
                    <Button variant="solid" color="primary" size="sm">
                      This Week
                    </Button>
                    <Button variant="outline" size="sm">
                      This Month
                    </Button>
                    <Button variant="outline" size="sm">
                      This Year
                    </Button>
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Quick Actions
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Button variant="soft" color="primary">
                      <Icon name="arrow-path" className="mr-1" />
                      Refresh Data
                    </Button>
                    <Button variant="soft" color="success">
                      <Icon name="download" className="mr-1" />
                      Download Report
                    </Button>
                    <Button variant="soft" color="info">
                      <Icon name="share" className="mr-1" />
                      Share Dashboard
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* E-commerce Actions */}
      <Card>
        <CardHeader>
          <CardTitle>E-commerce Actions</CardTitle>
          <CardDescription>
            Button patterns for online shopping and product interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Card */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Product Card
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography variant="h5">iPhone 15 Pro</Typography>
                  <Typography variant="body2" className="text-muted-foreground">
                    Latest smartphone with advanced features
                  </Typography>
                  <Typography variant="h4" className="mt-2">
                    $999
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Button color="primary" fullWidth>
                    <Icon name="shopping-cart" className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" fullWidth>
                    <Icon name="heart" className="mr-2" />
                    Add to Wishlist
                  </Button>
                  <Button variant="text" size="sm">
                    <Icon name="eye-slash" className="mr-1" />
                    Quick View
                  </Button>
                </Box>
              </Box>
            </Card>

            {/* Shopping Cart */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Shopping Cart
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Cart Summary
                  </Typography>
                  <Box display="flex" justify="between" items="center">
                    <Typography variant="body1">Subtotal</Typography>
                    <Typography variant="body1">$1,299</Typography>
                  </Box>
                  <Box display="flex" justify="between" items="center">
                    <Typography variant="body1">Shipping</Typography>
                    <Typography variant="body1">$15</Typography>
                  </Box>
                  <Box
                    display="flex"
                    justify="between"
                    items="center"
                    className="border-t pt-2"
                  >
                    <Typography variant="h5">Total</Typography>
                    <Typography variant="h5">$1,314</Typography>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Button color="primary" fullWidth>
                    <Icon name="credit-card" className="mr-2" />
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" fullWidth>
                    Continue Shopping
                  </Button>
                  <Button variant="text" size="sm">
                    <Icon name="trash" className="mr-1" />
                    Clear Cart
                  </Button>
                </Box>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Social Media Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Actions</CardTitle>
          <CardDescription>
            Button patterns for social media interactions and content sharing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Post Actions */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Post Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography variant="body1" className="mb-3">
                    Just launched our new product! 🚀 Check it out and let us
                    know what you think.
                  </Typography>
                </Box>

                <Box display="flex" gap={2} flexWrap="wrap">
                  <Button variant="soft" color="primary">
                    <Icon name="heart" className="mr-1" />
                    Like (42)
                  </Button>
                  <Button variant="soft" color="secondary">
                    <Icon name="chat-bubble" className="mr-1" />
                    Comment (8)
                  </Button>
                  <Button variant="soft" color="success">
                    <Icon name="share" className="mr-1" />
                    Share
                  </Button>
                  <Button variant="soft" color="info">
                    <Icon name="bookmark" className="mr-1" />
                    Save
                  </Button>
                </Box>
              </Box>
            </Card>

            {/* Profile Actions */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Profile Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box display="flex" items="center" gap={3}>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Box flex="1">
                    <Typography variant="h5">John Doe</Typography>
                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      @john_doe
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" gap={2} flexWrap="wrap">
                  <Button color="primary">
                    <Icon name="user-plus" className="mr-1" />
                    Follow
                  </Button>
                  <Button variant="outline">
                    <Icon name="chat-bubble" className="mr-1" />
                    Message
                  </Button>
                  <Button variant="outline">
                    <Icon name="dots-horizontal" />
                  </Button>
                </Box>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Mobile App Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile App Actions</CardTitle>
          <CardDescription>
            Button patterns optimized for mobile interfaces and touch
            interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bottom Navigation */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Bottom Navigation
              </Typography>
              <Box display="flex" justify="center" gap={4}>
                <Button variant="text" size="sm">
                  <Icon name="home" className="mb-1" />
                  <Typography variant="caption">Home</Typography>
                </Button>
                <Button variant="text" size="sm">
                  <Icon name="search" className="mb-1" />
                  <Typography variant="caption">Search</Typography>
                </Button>
                <Button variant="text" size="sm">
                  <Icon name="plus" className="mb-1" />
                  <Typography variant="caption">Add</Typography>
                </Button>
                <Button variant="text" size="sm">
                  <Icon name="bell" className="mb-1" />
                  <Typography variant="caption">Notifications</Typography>
                </Button>
                <Button variant="text" size="sm">
                  <Icon name="user" className="mb-1" />
                  <Typography variant="caption">Profile</Typography>
                </Button>
              </Box>
            </Card>

            {/* Floating Action Button */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Floating Action Button
              </Typography>
              <Box
                display="flex"
                justify="center"
                items="center"
                className="h-32"
              >
                <Button
                  size="icon"
                  color="primary"
                  className="rounded-full shadow-lg"
                >
                  <Icon name="plus" />
                </Button>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
