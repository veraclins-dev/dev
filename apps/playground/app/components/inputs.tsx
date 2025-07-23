import { ClientOnly } from 'remix-utils/client-only';

import { EditorField, EditorReadonly } from '@veraclins-dev/editor';
import {
  Autocomplete,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxField,
  ComposedSelect,
  Icon,
  Input,
  Label,
  PhoneField,
  RadioField,
  RadioGroup,
  RadioGroupItem,
  SelectField,
  Textarea,
  TextareaField,
  TextField,
  Typography,
} from '@veraclins-dev/ui';

import { exampleContent } from './data';
import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Inputs() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Inputs" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Input Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Form input components including text fields, checkboxes, radio buttons,
        and select menus.
      </Typography>

      {/* Basic Input Types */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Input Types</CardTitle>
          <CardDescription>
            Fundamental input components and their variations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Base Inputs */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4">Base Inputs</Typography>

              <Box>
                <Input placeholder="Base Input" className="w-full" />
              </Box>

              <Box>
                <ComposedSelect
                  className="w-full"
                  placeholder="Select an option"
                  options={[
                    { value: 'option-1', label: 'Option 1' },
                    { value: 'option-2', label: 'Option 2' },
                    { value: 'option-3', label: 'Option 3' },
                    { value: 'option-4', label: 'Option 4' },
                    { value: 'option-5', label: 'Option 5' },
                    { value: 'option-6', label: 'Option 6' },
                  ]}
                />
              </Box>

              <RadioGroup>
                <RadioGroupItem value="option-1" label="Option 1" />
                <RadioGroupItem value="option-2" label="Option 2" />
              </RadioGroup>

              <Checkbox />
            </Box>

            {/* Input Fields */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4">Input Fields</Typography>

              <TextField placeholder="Text Field" label="Text Field" />

              <SelectField
                placeholder="Select Field"
                label="Select Field"
                options={[
                  { value: 'important option', label: 'Important Option' },
                  { value: 'interesting', label: 'Interesting' },
                  { value: 'super cool', label: 'Super Cool' },
                  { value: 'delicious', label: 'Delicious' },
                  { value: 'awesome', label: 'Awesome' },
                  { value: 'fantastic', label: 'Fantastic' },
                  { value: 'incredible', label: 'Incredible' },
                  { value: 'amazing', label: 'Amazing' },
                  { value: 'wonderful', label: 'Wonderful' },
                  { value: 'extraordinary', label: 'Extraordinary' },
                ]}
              />

              <PhoneField placeholder="Phone number" label="Phone number" />

              <RadioField
                label="Radio Field"
                options={[
                  { value: 'option-1', label: 'Option 1' },
                  { value: 'option-2', label: 'Option 2' },
                ]}
                inputClass="flex"
              />

              <CheckboxField label="Checkbox Field" />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Autocomplete & Textarea */}
      <Card>
        <CardHeader>
          <CardTitle>Autocomplete & Textarea</CardTitle>
          <CardDescription>
            Advanced input components for search and long-form content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Autocomplete */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4">Autocomplete</Typography>

              <Autocomplete
                placeholder="Single selection"
                options={[
                  'React',
                  'TypeScript',
                  'JavaScript',
                  'Node.js',
                  'Python',
                  'Java',
                  'C++',
                ]}
                value="React"
                label="Single Autocomplete"
              />

              <Autocomplete
                placeholder="Multiple selection"
                options={[
                  'Design',
                  'Development',
                  'Marketing',
                  'Sales',
                  'Support',
                  'Management',
                  'Analytics',
                  'Research',
                  'Operations',
                  'Finance',
                ]}
                value={'Design|Development'}
                multiple
                label="Multiple Autocomplete"
              />

              <Autocomplete
                placeholder="Free text input"
                options={[]}
                multiple
                freeSolo
                label="Free Solo Autocomplete"
              />
            </Box>

            {/* Textarea */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4">Textarea</Typography>

              <Textarea placeholder="Basic textarea" className="w-full" />

              <TextareaField
                placeholder="Textarea with label"
                label="Textarea Field"
                className="w-full"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* User Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle>User Registration Form</CardTitle>
          <CardDescription>
            Complete registration form with various input types and validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4">Personal Information</Typography>

              <TextField
                placeholder="Enter your full name"
                label="Full Name"
                required
              />

              <TextField
                placeholder="Enter your email"
                label="Email Address"
                type="email"
                required
              />

              <PhoneField
                placeholder="Enter your phone number"
                label="Phone Number"
              />

              <SelectField
                placeholder="Select your country"
                label="Country"
                options={[
                  { value: 'us', label: 'United States' },
                  { value: 'ca', label: 'Canada' },
                  { value: 'uk', label: 'United Kingdom' },
                  { value: 'au', label: 'Australia' },
                  { value: 'de', label: 'Germany' },
                  { value: 'fr', label: 'France' },
                  { value: 'jp', label: 'Japan' },
                  { value: 'other', label: 'Other' },
                ]}
                required
              />
            </Box>

            {/* Account Settings */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4">Account Settings</Typography>

              <TextField
                placeholder="Choose a username"
                label="Username"
                required
              />

              <TextField
                placeholder="Create a password"
                label="Password"
                type="password"
                required
              />

              <TextField
                placeholder="Confirm your password"
                label="Confirm Password"
                type="password"
                required
              />

              <RadioField
                label="Account Type"
                options={[
                  { value: 'personal', label: 'Personal Account' },
                  { value: 'business', label: 'Business Account' },
                  { value: 'enterprise', label: 'Enterprise Account' },
                ]}
                required
              />

              <CheckboxField
                label="I agree to the Terms of Service and Privacy Policy"
                required
              />
            </Box>
          </Box>

          <Box display="flex" gap={3} className="mt-6">
            <Button variant="outline">Cancel</Button>
            <Button color="primary">Create Account</Button>
          </Box>
        </CardContent>
      </Card>

      {/* Product Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Product Configuration</CardTitle>
          <CardDescription>
            Complex form for configuring product options and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Details */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4">Product Details</Typography>

              <TextField
                placeholder="Enter product name"
                label="Product Name"
                required
              />

              <TextareaField
                placeholder="Describe your product"
                label="Product Description"
                className="w-full"
                rows={4}
              />

              <TextField
                placeholder="0.00"
                label="Price"
                type="number"
                required
              />

              <SelectField
                placeholder="Select category"
                label="Product Category"
                options={[
                  { value: 'electronics', label: 'Electronics' },
                  { value: 'clothing', label: 'Clothing & Fashion' },
                  { value: 'home', label: 'Home & Garden' },
                  { value: 'sports', label: 'Sports & Outdoors' },
                  { value: 'books', label: 'Books & Media' },
                  { value: 'toys', label: 'Toys & Games' },
                ]}
                required
              />
            </Box>

            {/* Product Options */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4">Product Options</Typography>

              <Autocomplete
                placeholder="Select product tags"
                options={[
                  'New Arrival',
                  'Best Seller',
                  'Limited Edition',
                  'Eco-Friendly',
                  'Premium',
                  'Budget-Friendly',
                  'Trending',
                  'Seasonal',
                ]}
                multiple
                label="Product Tags"
              />

              <RadioField
                label="Inventory Status"
                options={[
                  { value: 'in-stock', label: 'In Stock' },
                  { value: 'low-stock', label: 'Low Stock' },
                  { value: 'out-of-stock', label: 'Out of Stock' },
                  { value: 'pre-order', label: 'Pre-order' },
                ]}
                required
              />

              <Box display="flex" flexDirection="column" gap={2}>
                <Label>Product Features</Label>
                <Box display="flex" flexDirection="column" gap={2}>
                  <CheckboxField label="Free Shipping" />
                  <CheckboxField label="Warranty Included" />
                  <CheckboxField label="Digital Download" />
                  <CheckboxField label="Gift Wrapping Available" />
                  <CheckboxField label="Bulk Discounts" />
                </Box>
              </Box>

              <TextField
                placeholder="Enter SKU"
                label="SKU (Stock Keeping Unit)"
              />
            </Box>
          </Box>

          <Box display="flex" gap={3} className="mt-6">
            <Button variant="outline">Save Draft</Button>
            <Button color="primary">Publish Product</Button>
          </Box>
        </CardContent>
      </Card>

      {/* Search & Filter Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Interface</CardTitle>
          <CardDescription>
            Advanced search interface with filters and autocomplete
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={4}>
            {/* Search Bar */}
            <Box display="flex" gap={3}>
              <Box flex="1">
                <Autocomplete
                  placeholder="Search for products, categories, or brands..."
                  options={[
                    'iPhone 15 Pro',
                    'MacBook Air',
                    'iPad Pro',
                    'Apple Watch',
                    'AirPods Pro',
                    'Samsung Galaxy',
                    'Sony Headphones',
                    'Nike Shoes',
                  ]}
                  freeSolo
                  label="Search"
                />
              </Box>
              <Button color="primary">
                <Icon name="magnifying-glass" className="mr-2" />
                Search
              </Button>
            </Box>

            {/* Filters */}
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectField
                placeholder="All Categories"
                label="Category"
                options={[
                  { value: 'all', label: 'All Categories' },
                  { value: 'electronics', label: 'Electronics' },
                  { value: 'clothing', label: 'Clothing' },
                  { value: 'home', label: 'Home & Garden' },
                  { value: 'sports', label: 'Sports' },
                ]}
              />

              <SelectField
                placeholder="Any Price"
                label="Price Range"
                options={[
                  { value: 'any', label: 'Any Price' },
                  { value: '0-50', label: 'Under $50' },
                  { value: '50-100', label: '$50 - $100' },
                  { value: '100-200', label: '$100 - $200' },
                  { value: '200+', label: 'Over $200' },
                ]}
              />

              <SelectField
                placeholder="Any Rating"
                label="Rating"
                options={[
                  { value: 'any', label: 'Any Rating' },
                  { value: '4+', label: '4+ Stars' },
                  { value: '3+', label: '3+ Stars' },
                  { value: '2+', label: '2+ Stars' },
                ]}
              />
            </Box>

            {/* Active Filters */}
            <Box>
              <Typography
                variant="body2"
                className="text-muted-foreground mb-2"
              >
                Active Filters:
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Badge variant="soft" color="primary">
                  Electronics
                  <Icon name="x-mark" className="ml-1 size-3" />
                </Badge>
                <Badge variant="soft" color="primary">
                  $100 - $200
                  <Icon name="x-mark" className="ml-1 size-3" />
                </Badge>
                <Badge variant="soft" color="primary">
                  4+ Stars
                  <Icon name="x-mark" className="ml-1 size-3" />
                </Badge>
                <Button variant="text" buttonSize="sm">
                  Clear All
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Settings & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Settings & Preferences</CardTitle>
          <CardDescription>
            User settings form with various input types and configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Settings */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4">Account Settings</Typography>

              <TextField
                placeholder="Enter your display name"
                label="Display Name"
              />

              <TextField placeholder="Enter your bio" label="Bio" />

              <SelectField
                placeholder="Select timezone"
                label="Timezone"
                options={[
                  { value: 'utc', label: 'UTC' },
                  { value: 'est', label: 'Eastern Time' },
                  { value: 'cst', label: 'Central Time' },
                  { value: 'mst', label: 'Mountain Time' },
                  { value: 'pst', label: 'Pacific Time' },
                  { value: 'gmt', label: 'Greenwich Mean Time' },
                ]}
              />

              <SelectField
                placeholder="Select language"
                label="Language"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                  { value: 'de', label: 'German' },
                  { value: 'it', label: 'Italian' },
                  { value: 'pt', label: 'Portuguese' },
                ]}
              />
            </Box>

            {/* Notification Preferences */}
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4">Notification Preferences</Typography>

              <RadioField
                label="Email Notifications"
                options={[
                  { value: 'all', label: 'All notifications' },
                  { value: 'important', label: 'Important only' },
                  { value: 'none', label: 'No email notifications' },
                ]}
              />

              <Box display="flex" flexDirection="column" gap={2}>
                <Label>Notification Types</Label>
                <Box display="flex" flexDirection="column" gap={2}>
                  <CheckboxField label="New messages" />
                  <CheckboxField label="Order updates" />
                  <CheckboxField label="Promotional offers" />
                  <CheckboxField label="Security alerts" />
                  <CheckboxField label="Newsletter" />
                </Box>
              </Box>

              <Autocomplete
                placeholder="Select notification channels"
                options={[
                  'Email',
                  'SMS',
                  'Push Notifications',
                  'In-app',
                  'Slack',
                  'Discord',
                ]}
                multiple
                label="Notification Channels"
              />
            </Box>
          </Box>

          <Box display="flex" gap={3} className="mt-6">
            <Button variant="outline">Reset to Defaults</Button>
            <Button color="primary">Save Settings</Button>
          </Box>
        </CardContent>
      </Card>

      {/* Rich Text Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Rich Text Editor</CardTitle>
          <CardDescription>
            Advanced text editor for content creation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientOnly
            fallback={
              <Textarea
                rows={5}
                placeholder="Loading rich text editor..."
                className="w-full"
              />
            }
          >
            {() => <EditorField defaultValue="" name="test-editor" />}
          </ClientOnly>
        </CardContent>
      </Card>

      {/* Rich Text Editor Readonly */}
      <Card>
        <CardHeader>
          <CardTitle>Rich Text Editor Readonly</CardTitle>
          <CardDescription>
            Display formatted content in read-only mode
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditorReadonly content={exampleContent} />
        </CardContent>
      </Card>
    </Box>
  );
}
