import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Chip,
  Input,
  Typography,
} from '@veraclins-dev/ui';

export function Chips() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <Typography variant="h1" className="text-center">
        Chip Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Chips are compact elements that represent an input, attribute, or
        action.
      </Typography>

      {/* Basic Chip Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Chip Variants & Sizes</CardTitle>
          <CardDescription>
            Basic chip variants and size options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" gap={4} flexWrap="wrap">
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Solid</Typography>
              <Chip variant="solid" color="primary" label="Primary" />
              <Chip variant="solid" color="secondary" label="Secondary" />
              <Chip variant="solid" color="destructive" label="Destructive" />
              <Chip variant="solid" color="success" label="Success" />
              <Chip variant="solid" color="warning" label="Warning" />
              <Chip variant="solid" color="info" label="Info" />
            </Box>
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Soft</Typography>
              <Chip variant="soft" color="primary" label="Primary" />
              <Chip variant="soft" color="secondary" label="Secondary" />
              <Chip variant="soft" color="destructive" label="Destructive" />
              <Chip variant="soft" color="success" label="Success" />
              <Chip variant="soft" color="warning" label="Warning" />
              <Chip variant="soft" color="info" label="Info" />
            </Box>
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Outline</Typography>
              <Chip variant="outline" color="primary" label="Primary" />
              <Chip variant="outline" color="secondary" label="Secondary" />
              <Chip variant="outline" color="destructive" label="Destructive" />
              <Chip variant="outline" color="success" label="Success" />
              <Chip variant="outline" color="warning" label="Warning" />
              <Chip variant="outline" color="info" label="Info" />
            </Box>
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Sizes</Typography>
              <Chip variant="outline" color="primary" label="Small" size="sm" />
              <Chip
                variant="outline"
                color="secondary"
                label="Medium"
                size="md"
              />
              <Chip
                variant="outline"
                color="destructive"
                label="Large"
                size="lg"
              />
              <Chip
                variant="outline"
                color="success"
                label="Extra Large"
                size="xl"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Email Composition */}
      <Card>
        <CardHeader>
          <CardTitle>Email Composition</CardTitle>
          <CardDescription>
            Chip components for email recipients with remove functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recipients */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Recipients
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    To:
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip
                      variant="soft"
                      color="primary"
                      label="john.doe@example.com"
                      onRemove={() => console.log('Removed john.doe')}
                    />
                    <Chip
                      variant="soft"
                      color="primary"
                      label="jane.smith@example.com"
                      onRemove={() => console.log('Removed jane.smith')}
                    />
                    <Chip
                      variant="soft"
                      color="warning"
                      label="invalid-email"
                      onRemove={() => console.log('Removed invalid email')}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    CC:
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip
                      variant="outline"
                      color="secondary"
                      label="manager@example.com"
                      onRemove={() => console.log('Removed manager')}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    BCC:
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip
                      variant="outline"
                      color="info"
                      label="hr@example.com"
                      onRemove={() => console.log('Removed hr')}
                    />
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* Email Draft */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Email Draft
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Subject:
                  </Typography>
                  <Input placeholder="Enter subject..." />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Attachments:
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip
                      variant="soft"
                      color="success"
                      label="document.pdf"
                      onRemove={() => console.log('Removed document.pdf')}
                    />
                    <Chip
                      variant="soft"
                      color="success"
                      label="image.jpg"
                      onRemove={() => console.log('Removed image.jpg')}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Labels:
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="outline" color="warning" label="Important" />
                    <Chip variant="outline" color="info" label="Follow-up" />
                    <Chip variant="outline" color="success" label="Approved" />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* File Management */}
      <Card>
        <CardHeader>
          <CardTitle>File Management</CardTitle>
          <CardDescription>
            File type chips and status indicators in a file browser context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* File Types */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                File Types
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Documents
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="soft" color="primary" label="PDF" />
                    <Chip variant="soft" color="primary" label="DOCX" />
                    <Chip variant="soft" color="primary" label="TXT" />
                    <Chip variant="soft" color="primary" label="RTF" />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Images
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="soft" color="success" label="JPG" />
                    <Chip variant="soft" color="success" label="PNG" />
                    <Chip variant="soft" color="success" label="GIF" />
                    <Chip variant="soft" color="success" label="SVG" />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Code
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="soft" color="warning" label="JS" />
                    <Chip variant="soft" color="warning" label="TS" />
                    <Chip variant="soft" color="warning" label="PY" />
                    <Chip variant="soft" color="warning" label="JSON" />
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* File Status */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                File Status
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Upload Status
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">document.pdf</Typography>
                      <Chip variant="soft" color="success" label="Uploaded" />
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">image.jpg</Typography>
                      <Chip
                        variant="soft"
                        color="warning"
                        label="Uploading..."
                      />
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">video.mp4</Typography>
                      <Chip variant="soft" color="destructive" label="Failed" />
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    File Permissions
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="outline" color="success" label="Read" />
                    <Chip variant="outline" color="warning" label="Write" />
                    <Chip variant="outline" color="info" label="Execute" />
                    <Chip variant="outline" color="destructive" label="Admin" />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* User Interface */}
      <Card>
        <CardHeader>
          <CardTitle>User Interface</CardTitle>
          <CardDescription>
            Chip components in various UI contexts like filters, tags, and
            actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search Filters */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Search Filters
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Active Filters
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip
                      variant="soft"
                      color="primary"
                      label="Category: Electronics"
                      onRemove={() => console.log('Removed category filter')}
                    />
                    <Chip
                      variant="soft"
                      color="primary"
                      label="Price: $100-$500"
                      onRemove={() => console.log('Removed price filter')}
                    />
                    <Chip
                      variant="soft"
                      color="primary"
                      label="Brand: Apple"
                      onRemove={() => console.log('Removed brand filter')}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Sort Options
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="outline" color="info" label="Newest First" />
                    <Chip
                      variant="outline"
                      color="secondary"
                      label="Price: Low to High"
                    />
                    <Chip
                      variant="outline"
                      color="secondary"
                      label="Rating: High to Low"
                    />
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* User Tags */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                User Tags
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    User Interests
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="soft" color="success" label="Technology" />
                    <Chip variant="soft" color="success" label="Design" />
                    <Chip variant="soft" color="success" label="Music" />
                    <Chip variant="soft" color="success" label="Travel" />
                    <Chip variant="soft" color="success" label="Cooking" />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Skills
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip
                      variant="outline"
                      color="warning"
                      label="JavaScript"
                    />
                    <Chip variant="outline" color="warning" label="React" />
                    <Chip
                      variant="outline"
                      color="warning"
                      label="TypeScript"
                    />
                    <Chip variant="outline" color="warning" label="Node.js" />
                    <Chip variant="outline" color="warning" label="Python" />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Languages
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="outline" color="info" label="English" />
                    <Chip variant="outline" color="info" label="Spanish" />
                    <Chip variant="outline" color="info" label="French" />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>
            Hashtags, mentions, and trending topics in social media context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Post Content */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Post Content
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Hashtags
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="soft" color="primary" label="#technology" />
                    <Chip variant="soft" color="primary" label="#innovation" />
                    <Chip variant="soft" color="primary" label="#startup" />
                    <Chip variant="soft" color="primary" label="#coding" />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Mentions
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="outline" color="info" label="@john_doe" />
                    <Chip
                      variant="outline"
                      color="info"
                      label="@tech_company"
                    />
                    <Chip variant="outline" color="info" label="@design_team" />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Trending Topics
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="soft" color="warning" label="🔥 Trending" />
                    <Chip variant="soft" color="success" label="📈 Popular" />
                    <Chip variant="soft" color="info" label="🆕 New" />
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* User Profile */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                User Profile
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

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Bio Tags
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="soft" color="success" label="Developer" />
                    <Chip variant="soft" color="success" label="Designer" />
                    <Chip variant="soft" color="success" label="Creator" />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Location & Status
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip
                      variant="outline"
                      color="info"
                      label="📍 San Francisco"
                    />
                    <Chip variant="outline" color="success" label="🟢 Online" />
                    <Chip
                      variant="outline"
                      color="warning"
                      label="💼 Available for hire"
                    />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* E-commerce */}
      <Card>
        <CardHeader>
          <CardTitle>E-commerce</CardTitle>
          <CardDescription>
            Product categories, attributes, and shopping cart chips
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Categories */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Product Categories
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Main Categories
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="soft" color="primary" label="Electronics" />
                    <Chip variant="soft" color="primary" label="Clothing" />
                    <Chip
                      variant="soft"
                      color="primary"
                      label="Home & Garden"
                    />
                    <Chip variant="soft" color="primary" label="Sports" />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Subcategories
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip
                      variant="outline"
                      color="secondary"
                      label="Smartphones"
                    />
                    <Chip variant="outline" color="secondary" label="Laptops" />
                    <Chip
                      variant="outline"
                      color="secondary"
                      label="Accessories"
                    />
                    <Chip variant="outline" color="secondary" label="Gaming" />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Brands
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip variant="outline" color="info" label="Apple" />
                    <Chip variant="outline" color="info" label="Samsung" />
                    <Chip variant="outline" color="info" label="Sony" />
                    <Chip variant="outline" color="info" label="LG" />
                  </Box>
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
                    Cart Items
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">iPhone 15 Pro</Typography>
                      <Chip
                        variant="soft"
                        color="destructive"
                        label="Remove"
                        onRemove={() => console.log('Removed iPhone')}
                      />
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">AirPods Pro</Typography>
                      <Chip
                        variant="soft"
                        color="destructive"
                        label="Remove"
                        onRemove={() => console.log('Removed AirPods')}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Applied Discounts
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip
                      variant="soft"
                      color="success"
                      label="SAVE20 (-$200)"
                      onRemove={() => console.log('Removed discount')}
                    />
                    <Chip
                      variant="soft"
                      color="warning"
                      label="Free Shipping"
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Payment Methods
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip
                      variant="outline"
                      color="info"
                      label="💳 Credit Card"
                    />
                    <Chip
                      variant="outline"
                      color="info"
                      label="🏦 Bank Transfer"
                    />
                    <Chip variant="outline" color="info" label="📱 Apple Pay" />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
