import { useState } from 'react';

import {
  Form,
  FormSubmitButton,
  useConform,
  useCustomFetcher,
} from '@veraclins-dev/form';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DateField,
  HiddenField,
  Icon,
  SelectField,
  TextareaField,
  TextField,
  Typography,
} from '@veraclins-dev/ui';
import { z } from '@veraclins-dev/utils';

import { AddComment } from '../validations/comment';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

// Validation schemas for different form types
const BasicFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const AdvancedFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.email('Please enter a valid email'),
  phone: z.string().optional(),
  role: z.enum(['admin', 'user', 'moderator'], {
    error: () => ({ message: 'Please select a valid role' }),
  }),
  department: z.string().min(1, 'Please select a department'),
  bio: z.string().min(20, 'Bio must be at least 20 characters'),
  tags: z.string().optional(),
});

const SearchFormSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  category: z.enum(['all', 'users', 'posts', 'comments']).optional(),
  sortBy: z.enum(['relevance', 'date', 'name']).optional(),
});

const SettingsFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  language: z.enum(['en', 'es', 'fr']),
  profileVisibility: z.enum(['public', 'private', 'friends']),
});

const GroupFormSchema = z.object({
  name: z.string().min(3, 'Group name must be at least 3 characters'),
  privacy: z.enum(['public', 'private']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

const EventFormSchema = z.object({
  title: z.string().min(3, 'Event title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  eventType: z.enum(['meeting', 'conference', 'workshop', 'other']),
});

const BookingFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z
    .number()
    .min(1, 'At least 1 guest is required')
    .transform((val) => val.toString()),
  specialRequests: z.string().optional(),
});

const MultiDateFormSchema = z.object({
  projectName: z.string().min(3, 'Project name must be at least 3 characters'),
  milestones: z.string().refine((val) => val.split(',').length > 0, {
    message: 'At least one milestone date is required',
  }),
  deadline: z.string().min(1, 'Deadline is required'),
  priority: z.enum(['low', 'medium', 'high']),
});

// Autocomplete Form Schemas
const SingleAutocompleteSchema = z.object({
  technology: z.string().min(1, 'Please select a technology'),
  country: z.string().optional(),
});

const MultipleAutocompleteSchema = z.object({
  skills: z.string().min(1, 'Please select at least one skill'),
  interests: z.string().optional(),
});

const FreeSoloAutocompleteSchema = z.object({
  customTags: z.string().min(1, 'Please add at least one tag'),
  searchQuery: z.string().optional(),
});

const DependentAutocompleteSchema = z.object({
  category: z.string().min(1, 'Please select a category'),
  subcategory: z.string().min(1, 'Please select a subcategory'),
});

const MaxOptionsAutocompleteSchema = z.object({
  selectedSkills: z.string().min(1, 'Please select at least one skill'),
  selectedTechnologies: z.string().optional(),
});

const ComplexAutocompleteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  primaryTechnology: z.string().min(1, 'Please select a primary technology'),
  additionalTechnologies: z.string().optional(),
  skills: z.string().min(1, 'Please select at least one skill'),
  tags: z.string().optional(),
  location: z.string().optional(),
});

// Basic Form Example
const BasicFormExample = () => {
  const { form, fields } = useConform({
    schema: BasicFormSchema,
    id: 'basic-form',
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="document-text" className="h-5 w-5 text-blue-500" />
          <CardTitle>Basic Form</CardTitle>
        </Box>
        <CardDescription>
          Simple form with text fields and textarea. Demonstrates basic
          validation with Zod schemas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Send Message">
          <TextField field={fields.name} placeholder="Your name" label="Name" />
          <TextField
            field={fields.email}
            placeholder="your@email.com"
            label="Email"
            type="email"
          />
          <TextareaField
            field={fields.message}
            placeholder="Your message..."
            label="Message"
            rows={4}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Advanced Form Example
const AdvancedFormExample = () => {
  const { form, fields } = useConform({
    schema: AdvancedFormSchema,
    id: 'advanced-form',
    defaultValue: {
      role: 'user',
      tags: 'Design|Development',
    },
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="user" className="h-5 w-5 text-green-500" />
          <CardTitle>Advanced Form</CardTitle>
        </Box>
        <CardDescription>
          Complex form with multiple field types, grid layout, and select
          dropdowns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Create Account" className="max-w-lg">
          <Box className="grid grid-cols-2 gap-4">
            <TextField
              field={fields.firstName}
              placeholder="John"
              label="First Name"
            />
            <TextField
              field={fields.lastName}
              placeholder="Doe"
              label="Last Name"
            />
          </Box>

          <Box className="grid grid-cols-2 gap-4">
            <TextField
              field={fields.email}
              placeholder="john@example.com"
              label="Email"
              type="email"
            />

            <TextField
              field={fields.phone}
              placeholder="+1 (555) 123-4567"
              label="Phone (Optional)"
              type="tel"
            />
          </Box>

          <Box className="grid grid-cols-2 gap-4">
            <SelectField
              field={fields.role}
              label="Role"
              options={[
                { label: 'User', value: 'user' },
                { label: 'Moderator', value: 'moderator' },
                { label: 'Admin', value: 'admin' },
              ]}
            />

            <TextField
              field={fields.department}
              placeholder="Engineering"
              label="Department"
            />
          </Box>

          <TextareaField
            field={fields.bio}
            placeholder="Tell us about yourself..."
            label="Bio"
            rows={3}
          />
          <Autocomplete
            field={fields.tags}
            placeholder="Select tags"
            label="Tags"
            multiple
            options={[
              'Design',
              'Development',
              'Marketing',
              'Sales',
              'Support',
              'Management',
              'Analytics',
              'Research',
            ]}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Search Form Example
const SearchFormExample = () => {
  const { form, fields } = useConform({
    schema: SearchFormSchema,
    id: 'search-form',
    defaultValue: {
      category: 'all',
      sortBy: 'relevance',
    },
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="magnifying-glass" className="h-5 w-5 text-purple-500" />
          <CardTitle>Search Form</CardTitle>
        </Box>
        <CardDescription>
          Search form with filters and sorting options using select fields.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Search" className="max-w-lg">
          <TextField
            field={fields.query}
            placeholder="Enter search terms..."
            label="Search Query"
          />

          <SelectField
            field={fields.category}
            label="Category"
            options={[
              { label: 'All', value: 'all' },
              { label: 'Users', value: 'users' },
              { label: 'Posts', value: 'posts' },
              { label: 'Comments', value: 'comments' },
            ]}
          />

          <SelectField
            field={fields.sortBy}
            label="Sort By"
            options={[
              { label: 'Relevance', value: 'relevance' },
              { label: 'Date', value: 'date' },
              { label: 'Name', value: 'name' },
            ]}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Settings Form Example
const SettingsFormExample = () => {
  const { form, fields } = useConform({
    schema: SettingsFormSchema,
    id: 'settings-form',
    defaultValue: {
      theme: 'system',
      language: 'en',
      profileVisibility: 'public',
    },
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="cog-6-tooth" className="h-5 w-5 text-orange-500" />
          <CardTitle>Settings Form</CardTitle>
        </Box>
        <CardDescription>
          Form with grouped sections and multiple select fields for
          configuration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Save Settings" className="max-w-lg">
          <Box className="space-y-6">
            <Box display="flex" flexDirection="column" gap={4}>
              <Typography variant="h4" className="font-medium mb-3">
                Appearance
              </Typography>
              <SelectField
                field={fields.theme}
                label="Theme"
                options={[
                  { label: 'Light', value: 'light' },
                  { label: 'Dark', value: 'dark' },
                  { label: 'System', value: 'system' },
                ]}
              />

              <SelectField
                field={fields.language}
                label="Language"
                options={[
                  { label: 'English', value: 'en' },
                  { label: 'Spanish', value: 'es' },
                  { label: 'French', value: 'fr' },
                ]}
              />
            </Box>

            <Box>
              <Typography variant="h4" className="font-medium mb-3">
                Privacy
              </Typography>
              <SelectField
                field={fields.profileVisibility}
                label="Profile Visibility"
                options={[
                  { label: 'Public', value: 'public' },
                  { label: 'Private', value: 'private' },
                  { label: 'Friends Only', value: 'friends' },
                ]}
              />
            </Box>
          </Box>
        </Form>
      </CardContent>
    </Card>
  );
};

// Group Form Example
const GroupFormExample = () => {
  const { form, fields } = useConform({
    schema: GroupFormSchema,
    id: 'group-form',
    defaultValue: {
      name: '',
      privacy: 'public',
      description: '',
    },
  });

  const PrivacyInfo = ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => {
    return (
      <Box display="flex" items="center" justify="between" gapX={3}>
        <Typography className="rounded-full bg-slate-400 p-2">
          {icon}
        </Typography>
        <Box>
          <Typography className="font-semibold">{title}</Typography>
          <Typography className="text-slate-400">{description}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="users" className="h-5 w-5 text-purple-500" />
          <CardTitle>Group Form</CardTitle>
        </Box>
        <CardDescription>
          Form with SelectField using custom option labels with icons and
          descriptions, similar to group creation forms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Create Group" className="max-w-lg">
          <Box display="flex" flexDirection="column" gap={4}>
            <TextField
              field={fields.name}
              label="Group Name"
              placeholder="Enter group name"
            />

            <SelectField
              field={fields.privacy}
              label="Privacy"
              options={[
                {
                  label: (
                    <PrivacyInfo
                      title="Public"
                      description="Anyone can see who's in this group and what they post"
                      icon={<Icon name="lock-open-1" className="h-5 w-5" />}
                    />
                  ),
                  value: 'public',
                },
                {
                  label: (
                    <PrivacyInfo
                      title="Private"
                      description="Only members can see who's in this group and what they post (Default)"
                      icon={<Icon name="lock-closed" className="h-5 w-5" />}
                    />
                  ),
                  value: 'private',
                },
              ]}
              placeholder="Choose privacy setting"
            />

            <TextareaField
              field={fields.description}
              label="Description"
              placeholder="Describe your group..."
              rows={5}
            />
          </Box>
        </Form>
      </CardContent>
    </Card>
  );
};

// Fetcher Form Example
const FetcherFormExample = () => {
  const fetcher = useCustomFetcher();

  const { form, fields } = useConform({
    schema: BasicFormSchema,
    id: 'fetcher-form',
    fetcher,
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="arrow-path" className="h-5 w-5 text-indigo-500" />
          <CardTitle>Fetcher Form</CardTitle>
        </Box>
        <CardDescription>
          Form submission without page reload using useCustomFetcher hook.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} fetcher={fetcher} submitText="Submit via Fetcher">
          <TextField field={fields.name} placeholder="Your name" label="Name" />
          <TextField
            field={fields.email}
            placeholder="your@email.com"
            label="Email"
            type="email"
          />
          <TextareaField
            field={fields.message}
            placeholder="Your message..."
            label="Message"
            rows={3}
          />
        </Form>

        {fetcher.data && (
          <Box className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <Typography className="text-green-800">
              Form submitted successfully! (Fetcher state: {fetcher.state})
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// Form with Custom Buttons Example
const CustomButtonsFormExample = () => {
  const { form, fields } = useConform({
    schema: BasicFormSchema,
    id: 'custom-buttons-form',
  });

  const actionButtons = (
    <Box className="flex gap-2 justify-end w-full">
      <Button
        type="button"
        variant="outline"
        onClick={() => console.log('Reset form')}
      >
        Reset
      </Button>
      <FormSubmitButton>Submit</FormSubmitButton>
    </Box>
  );

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="button" className="h-5 w-5 text-teal-500" />
          <CardTitle>Custom Buttons Form</CardTitle>
        </Box>
        <CardDescription>
          Form with custom action buttons using the actionButtons prop and
          noButtons.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} actionButtons={actionButtons}>
          <TextField field={fields.name} placeholder="Your name" label="Name" />
          <TextField
            field={fields.email}
            placeholder="your@email.com"
            label="Email"
            type="email"
          />
          <TextareaField
            field={fields.message}
            placeholder="Your message..."
            label="Message"
            rows={3}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Form with No Error Display Example
const NoErrorFormExample = () => {
  const { form, fields } = useConform({
    schema: BasicFormSchema,
    id: 'no-error-form',
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="eye-slash" className="h-5 w-5 text-red-500" />
          <CardTitle>No Error Display Form</CardTitle>
        </Box>
        <CardDescription>
          Form with noError prop to hide automatic error display.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Submit" noError>
          <TextField field={fields.name} placeholder="Your name" label="Name" />
          <TextField
            field={fields.email}
            placeholder="your@email.com"
            label="Email"
            type="email"
          />
          <TextareaField
            field={fields.message}
            placeholder="Your message..."
            label="Message"
            rows={3}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Event Form with Date Fields
const EventFormExample = () => {
  const { form, fields } = useConform({
    schema: EventFormSchema,
    id: 'event-form',
    defaultValue: {
      eventType: 'meeting',
    },
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="calendar" className="h-5 w-5 text-blue-500" />
          <CardTitle>Event Form</CardTitle>
        </Box>
        <CardDescription>
          Form with single date selection for event planning.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Create Event" className="max-w-lg">
          <TextField
            field={fields.title}
            placeholder="Team Meeting"
            label="Event Title"
          />

          <TextareaField
            field={fields.description}
            placeholder="Describe the event..."
            label="Description"
            rows={3}
          />

          <Box className="grid grid-cols-2 gap-4">
            <DateField
              field={fields.startDate}
              label="Start Date"
              placeholder="Select start date"
              inputSize="md"
              clearable
              mode="single"
              variant="popover"
            />

            <DateField
              field={fields.endDate}
              label="End Date (Optional)"
              placeholder="Select end date"
              mode="single"
              variant="popover"
            />
          </Box>

          <SelectField
            field={fields.eventType}
            label="Event Type"
            options={[
              { label: 'Meeting', value: 'meeting' },
              { label: 'Conference', value: 'conference' },
              { label: 'Workshop', value: 'workshop' },
              { label: 'Other', value: 'other' },
            ]}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Booking Form with Date Range
const BookingFormExample = () => {
  const { form, fields } = useConform({
    schema: BookingFormSchema,
    id: 'booking-form',
    defaultValue: {
      guests: '1',
    },
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="building-office" className="h-5 w-5 text-green-500" />
          <CardTitle>Hotel Booking Form</CardTitle>
        </Box>
        <CardDescription>
          Form with date range selection for hotel bookings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Book Now" className="max-w-lg">
          <Box className="grid grid-cols-2 gap-4">
            <TextField
              field={fields.name}
              placeholder="John Doe"
              label="Full Name"
            />

            <TextField
              field={fields.email}
              placeholder="john@example.com"
              label="Email"
              type="email"
            />
          </Box>

          <Box className="grid grid-cols-2 gap-4">
            <DateField
              field={fields.checkIn}
              label="Check-in Date"
              placeholder="Select check-in date"
              mode="single"
              variant="popover"
            />

            <DateField
              field={fields.checkOut}
              label="Check-out Date"
              placeholder="Select check-out date"
              mode="single"
              variant="popover"
            />
          </Box>

          <TextField
            field={fields.guests}
            placeholder="1"
            label="Number of Guests"
            type="number"
          />

          <TextareaField
            field={fields.specialRequests}
            placeholder="Any special requests..."
            label="Special Requests"
            rows={2}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Project Form with Multiple Date Selection
const ProjectFormExample = () => {
  const { form, fields } = useConform({
    schema: MultiDateFormSchema,
    id: 'project-form',
    defaultValue: {
      priority: 'medium',
    },
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon
            name="clipboard-document-list"
            className="h-5 w-5 text-purple-500"
          />
          <CardTitle>Project Planning Form</CardTitle>
        </Box>
        <CardDescription>
          Form with multiple date selection for project milestones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Create Project" className="max-w-lg">
          <TextField
            field={fields.projectName}
            placeholder="Website Redesign"
            label="Project Name"
          />

          <DateField
            field={fields.milestones}
            label="Milestone Dates"
            placeholder="Select milestone dates"
            mode="multiple"
            variant="popover"
            topText="Select multiple dates for project milestones"
          />

          <DateField
            field={fields.deadline}
            label="Project Deadline"
            placeholder="Select deadline"
            mode="single"
            variant="popover"
          />

          <SelectField
            field={fields.priority}
            label="Priority Level"
            options={[
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' },
            ]}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Single Selection Autocomplete Form
const SingleAutocompleteFormExample = () => {
  const { form, fields } = useConform({
    schema: SingleAutocompleteSchema,
    id: 'single-autocomplete-form',
    defaultValue: {
      country: 'United States',
    },
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="list-bullet" className="h-5 w-5 text-blue-500" />
          <CardTitle>Single Selection Autocomplete</CardTitle>
        </Box>
        <CardDescription>
          Form with single selection autocomplete fields for technology and
          country.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Submit" className="max-w-lg">
          <Autocomplete
            field={fields.technology}
            placeholder="Select a technology"
            label="Technology"
            options={[
              'React',
              'TypeScript',
              'JavaScript',
              'Node.js',
              'Python',
              'Java',
              'C++',
              'Go',
              'Rust',
            ]}
            required
          />
          <Autocomplete
            field={fields.country}
            placeholder="Select a country"
            label="Country (Optional)"
            options={[
              'United States',
              'Canada',
              'United Kingdom',
              'Australia',
              'Germany',
              'France',
              'Japan',
            ]}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Multiple Selection Autocomplete Form
const MultipleAutocompleteFormExample = () => {
  const { form, fields } = useConform({
    schema: MultipleAutocompleteSchema,
    id: 'multiple-autocomplete-form',
    defaultValue: {
      skills: 'Design|Development',
    },
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="check-badge" className="h-5 w-5 text-green-500" />
          <CardTitle>Multiple Selection Autocomplete</CardTitle>
        </Box>
        <CardDescription>
          Form with multiple selection autocomplete for skills and interests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Submit" className="max-w-lg">
          <Autocomplete
            field={fields.skills}
            placeholder="Select your skills"
            label="Skills"
            options={[
              'Design',
              'Development',
              'Marketing',
              'Sales',
              'Support',
              'Management',
              'Analytics',
              'Research',
              'Writing',
              'Photography',
            ]}
            multiple
            required
          />
          <Autocomplete
            field={fields.interests}
            placeholder="Select your interests"
            label="Interests (Optional)"
            options={[
              'Technology',
              'Sports',
              'Music',
              'Travel',
              'Cooking',
              'Reading',
              'Gaming',
              'Fitness',
            ]}
            multiple
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// FreeSolo Autocomplete Form
const FreeSoloAutocompleteFormExample = () => {
  const { form, fields } = useConform({
    schema: FreeSoloAutocompleteSchema,
    id: 'freesolo-autocomplete-form',
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="pencil" className="h-5 w-5 text-purple-500" />
          <CardTitle>FreeSolo Autocomplete</CardTitle>
        </Box>
        <CardDescription>
          Form with freeSolo autocomplete allowing custom value creation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Submit" className="max-w-lg">
          <Autocomplete
            field={fields.customTags}
            placeholder="Type tags separated by comma (e.g., tag1, tag2)"
            label="Custom Tags"
            options={[
              'New Arrival',
              'Best Seller',
              'Limited Edition',
              'Eco-Friendly',
            ]}
            multiple
            freeSolo
            separator="comma"
            required
          />
          <Autocomplete
            field={fields.searchQuery}
            placeholder="Type or select a search term"
            label="Search Query (Optional)"
            options={['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python']}
            freeSolo
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Dependent Autocomplete Form
const DependentAutocompleteFormExample = () => {
  const { form, fields } = useConform({
    schema: DependentAutocompleteSchema,
    id: 'dependent-autocomplete-form',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const subcategories: Record<string, string[]> = {
    electronics: [
      'Smartphones',
      'Laptops',
      'Tablets',
      'Headphones',
      'Cameras',
      'Smartwatches',
    ],
    clothing: [
      "Men's Clothing",
      "Women's Clothing",
      "Kids' Clothing",
      'Shoes',
      'Accessories',
    ],
    home: ['Furniture', 'Kitchen', 'Bedding', 'Decor', 'Lighting', 'Storage'],
    sports: [
      'Fitness Equipment',
      'Outdoor Gear',
      'Sports Apparel',
      'Team Sports',
      'Water Sports',
    ],
  };

  const categories = Object.keys(subcategories);

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="link" className="h-5 w-5 text-orange-500" />
          <CardTitle>Dependent Autocomplete</CardTitle>
        </Box>
        <CardDescription>
          Form with dependent autocomplete where subcategory depends on category
          selection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Submit" className="max-w-lg">
          <Autocomplete
            field={fields.category}
            placeholder="Select a category"
            label="Category"
            options={categories}
            required
            onChange={(value) => {
              setSelectedCategory(value);
            }}
          />
          <Autocomplete
            field={fields.subcategory}
            placeholder={
              selectedCategory
                ? `Select a ${selectedCategory} subcategory`
                : 'Select a category first'
            }
            label="Subcategory"
            options={
              selectedCategory ? subcategories[selectedCategory] || [] : []
            }
            dependsOn="category"
            required
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Max Options Autocomplete Form
const MaxOptionsAutocompleteFormExample = () => {
  const { form, fields } = useConform({
    schema: MaxOptionsAutocompleteSchema,
    id: 'max-options-autocomplete-form',
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="stop" className="h-5 w-5 text-red-500" />
          <CardTitle>Max Options Autocomplete</CardTitle>
        </Box>
        <CardDescription>
          Form with autocomplete fields that limit the maximum number of
          selections.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Submit" className="max-w-lg">
          <Autocomplete
            field={fields.selectedSkills}
            placeholder="Select up to 3 skills"
            label="Top 3 Skills (max 3)"
            options={[
              'Design',
              'Development',
              'Marketing',
              'Sales',
              'Support',
              'Management',
              'Analytics',
              'Research',
            ]}
            multiple
            maxOptions={3}
            required
          />
          <Autocomplete
            field={fields.selectedTechnologies}
            placeholder="Select up to 5 technologies"
            label="Technologies (max 5, optional)"
            options={[
              'React',
              'TypeScript',
              'JavaScript',
              'Node.js',
              'Python',
              'Java',
              'C++',
              'Go',
              'Rust',
              'Swift',
            ]}
            multiple
            maxOptions={5}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Complex Autocomplete Form
const ComplexAutocompleteFormExample = () => {
  const { form, fields } = useConform({
    schema: ComplexAutocompleteSchema,
    id: 'complex-autocomplete-form',
    defaultValue: {
      additionalTechnologies: 'TypeScript|JavaScript',
    },
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="squares-2x2" className="h-5 w-5 text-indigo-500" />
          <CardTitle>Complex Autocomplete Form</CardTitle>
        </Box>
        <CardDescription>
          Comprehensive form combining multiple autocomplete scenarios with
          different modes and configurations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} submitText="Create Profile" className="max-w-lg">
          <TextField
            field={fields.name}
            placeholder="John Doe"
            label="Full Name"
          />

          <Autocomplete
            field={fields.primaryTechnology}
            placeholder="Select your primary technology"
            label="Primary Technology"
            options={[
              'React',
              'TypeScript',
              'JavaScript',
              'Node.js',
              'Python',
              'Java',
              'C++',
            ]}
            required
          />

          <Autocomplete
            field={fields.additionalTechnologies}
            placeholder="Select additional technologies"
            label="Additional Technologies"
            options={[
              'React',
              'TypeScript',
              'JavaScript',
              'Node.js',
              'Python',
              'Java',
              'C++',
              'Go',
              'Rust',
            ]}
            multiple
          />

          <Autocomplete
            field={fields.skills}
            placeholder="Select your skills"
            label="Skills"
            options={[
              'Design',
              'Development',
              'Marketing',
              'Sales',
              'Support',
              'Management',
              'Analytics',
              'Research',
            ]}
            multiple
            required
          />

          <Autocomplete
            field={fields.tags}
            placeholder="Type custom tags separated by comma"
            label="Custom Tags"
            options={['New', 'Popular', 'Featured']}
            multiple
            freeSolo
            separator="comma"
          />

          <Autocomplete
            field={fields.location}
            placeholder="Select or type your location"
            label="Location (Optional)"
            options={[
              'United States',
              'Canada',
              'United Kingdom',
              'Australia',
              'Germany',
              'France',
              'Japan',
            ]}
            freeSolo
          />
        </Form>
      </CardContent>
    </Card>
  );
};

// Comment Form (Original Example)
const CommentFormExample = () => {
  const fetcher = useCustomFetcher();

  const { form, fields } = useConform({
    schema: AddComment,
    id: 'comment-form',
    defaultValue: {
      body: '',
      postId: 'example-post-123',
      type: 'question',
      action: 'create',
    },
    fetcher,
  });

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center gap-2">
          <Icon name="chat-bubble" className="h-5 w-5 text-pink-500" />
          <CardTitle>Comment Form</CardTitle>
        </Box>
        <CardDescription>
          Original example with hidden fields and custom button layout.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form noButtons form={form} fetcher={fetcher}>
          <TextareaField
            rows={3}
            field={fields.body}
            className="mb-2"
            placeholder="Add a comment..."
            label="Comment"
          />
          <HiddenField field={fields.postId} />
          <HiddenField field={fields.type} />
          <HiddenField field={fields.action} />

          <Box className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => console.log('Cancel comment')}
            >
              Cancel
            </Button>
            <FormSubmitButton loading={fetcher.loading}>
              Post Comment
            </FormSubmitButton>
          </Box>
        </Form>
      </CardContent>
    </Card>
  );
};

// Main Forms Showcase Component
export const FormsShowcase = () => {
  return (
    <Box className="space-y-8 p-6">
      <PlaygroundBreadcrumb currentPage="Forms" className="mb-4" />

      <Box className="text-center">
        <Typography variant="h1" className="text-2xl font-bold mb-2">
          Form Package Showcase
        </Typography>
        <Typography>
          Demonstrating all features of the @veraclins-dev/form package
        </Typography>
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BasicFormExample />
        <AdvancedFormExample />
        <SearchFormExample />
        <SettingsFormExample />
        <GroupFormExample />
        <FetcherFormExample />
        <CustomButtonsFormExample />
        <NoErrorFormExample />
        <EventFormExample />
        <BookingFormExample />
        <ProjectFormExample />
        <CommentFormExample />
        <SingleAutocompleteFormExample />
        <MultipleAutocompleteFormExample />
        <FreeSoloAutocompleteFormExample />
        <DependentAutocompleteFormExample />
        <MaxOptionsAutocompleteFormExample />
        <ComplexAutocompleteFormExample />
      </Box>
    </Box>
  );
};
