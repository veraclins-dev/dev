import { useState } from 'react';

import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  List,
  ListItem,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

const technologies = [
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
  'Kotlin',
  'Dart',
  'PHP',
  'Ruby',
  'Scala',
];

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'China',
  'India',
  'Brazil',
  'Mexico',
  'Spain',
  'Italy',
  'Netherlands',
  'Sweden',
];

const skills = [
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
  'Video Editing',
  'Data Science',
];

const objectOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Grape', value: 'grape' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Mango', value: 'mango' },
  { label: 'Pineapple', value: 'pineapple' },
];
export function AutocompleteShowcase() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Autocomplete" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Autocomplete Component
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        A flexible autocomplete component that supports single and multiple
        selection, free text input, keyboard navigation, and advanced features
        like dependency handling and custom separators.
      </Typography>

      {/* Basic Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Usage</CardTitle>
          <CardDescription>
            Simple autocomplete with single selection from a list of options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Box>
              <Typography variant="h4" className="mb-4">
                Single Selection
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Select a technology"
                  options={technologies}
                  label="Technology"
                />
                <Autocomplete
                  placeholder="Select a country"
                  options={countries}
                  label="Country"
                />
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                With Default Value
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Select a technology"
                  options={technologies}
                  value="React"
                  label="Technology (with default)"
                />
                <Autocomplete
                  placeholder="Select a country"
                  options={countries}
                  value="United States"
                  label="Country (with default)"
                />
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                Object Options
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Select a fruit"
                  options={objectOptions}
                  label="Fruit (object options)"
                />
                <Autocomplete
                  placeholder="Select a fruit"
                  options={objectOptions}
                  value="apple"
                  label="Fruit (with default value)"
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Multiple Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Multiple Selection</CardTitle>
          <CardDescription>
            Select multiple options that are displayed as removable chips
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Box>
              <Typography variant="h4" className="mb-4">
                Basic Multiple Selection
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Select skills"
                  options={skills}
                  multiple
                  label="Skills"
                />
                <Autocomplete
                  placeholder="Select technologies"
                  options={technologies}
                  multiple
                  label="Technologies"
                />
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                With Default Values
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Select skills"
                  options={skills}
                  value="Design|Development"
                  multiple
                  label="Skills (with defaults)"
                />
                <Autocomplete
                  placeholder="Select technologies"
                  options={technologies}
                  value="React|TypeScript|JavaScript"
                  multiple
                  label="Technologies (with defaults)"
                />
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                With Maximum Options Limit
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Select up to 3 skills"
                  options={skills}
                  multiple
                  maxOptions={3}
                  label="Skills (max 3)"
                />
                <Autocomplete
                  placeholder="Select up to 5 technologies"
                  options={technologies}
                  multiple
                  maxOptions={5}
                  label="Technologies (max 5)"
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* FreeSolo Mode */}
      <Card>
        <CardHeader>
          <CardTitle>FreeSolo Mode</CardTitle>
          <CardDescription>
            Allow users to create custom options by typing and pressing Enter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Box>
              <Typography variant="h4" className="mb-4">
                Single Selection with FreeSolo
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Type or select a technology"
                  options={technologies}
                  freeSolo
                  label="Technology (with suggestions)"
                />
                <Autocomplete
                  placeholder="Enter anything"
                  options={[]}
                  freeSolo
                  label="Custom Value (no suggestions)"
                />
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                Multiple Selection with FreeSolo
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Type tags separated by comma"
                  options={[]}
                  multiple
                  freeSolo
                  separator="comma"
                  label="Custom Tags (comma separator)"
                />
                <Autocomplete
                  placeholder="Type skills separated by comma"
                  options={skills}
                  multiple
                  freeSolo
                  separator="comma"
                  label="Skills (with suggestions + custom)"
                />
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                Different Separators
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Type values separated by semicolon"
                  options={[]}
                  multiple
                  freeSolo
                  separator="semicolon"
                  label="Semicolon Separator"
                />
                <Autocomplete
                  placeholder="Type values separated by pipe"
                  options={[]}
                  multiple
                  freeSolo
                  separator="pipe"
                  label="Pipe Separator"
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* States */}
      <Card>
        <CardHeader>
          <CardTitle>Component States</CardTitle>
          <CardDescription>
            Different states and configurations of the Autocomplete component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Box>
              <Typography variant="h4" className="mb-4">
                Form States
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Required field"
                  options={technologies}
                  label="Required Autocomplete"
                  required
                />
                <Autocomplete
                  placeholder="Disabled field"
                  options={technologies}
                  label="Disabled Autocomplete"
                  disabled
                />
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                Without Label
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Select a technology"
                  options={technologies}
                />
                <Autocomplete
                  placeholder="Select skills"
                  options={skills}
                  multiple
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Features</CardTitle>
          <CardDescription>
            Advanced features like dependency handling, sorting control, and
            keyboard navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Box>
              <Typography variant="h4" className="mb-4">
                Dependency Handling
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Select a country first"
                  options={selectedCountry ? countries : []}
                  dependsOn="country"
                  label="City (depends on country)"
                />
                <Box>
                  <Label className="mb-2 block">Country</Label>
                  <Autocomplete
                    placeholder="Select a country"
                    options={countries}
                    label=""
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                Disable Sorting
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  placeholder="Options sorted by relevance"
                  options={technologies}
                  label="With Sorting (default)"
                />
                <Autocomplete
                  placeholder="Options in original order"
                  options={technologies}
                  disableSorting
                  label="Without Sorting"
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Real-World Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-World Examples</CardTitle>
          <CardDescription>
            Practical examples demonstrating common use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Box>
              <Typography variant="h4" className="mb-4">
                Product Tags
              </Typography>
              <Autocomplete
                placeholder="Add product tags (e.g., 'New Arrival, Best Seller')"
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
                freeSolo
                separator="comma"
                label="Product Tags"
              />
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                Email Recipients
              </Typography>
              <Autocomplete
                placeholder="Type email addresses separated by comma"
                options={[
                  'john@example.com',
                  'jane@example.com',
                  'admin@example.com',
                  'support@example.com',
                ]}
                multiple
                freeSolo
                separator="comma"
                label="Email Recipients"
              />
            </Box>

            <Box>
              <Typography variant="h4" className="mb-4">
                Search with Suggestions
              </Typography>
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
          </Box>
        </CardContent>
      </Card>

      {/* Keyboard Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Keyboard Navigation</CardTitle>
          <CardDescription>
            The Autocomplete component supports comprehensive keyboard
            navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <List className="space-y-2">
            <ListItem>
              <Typography>
                <code>Arrow Down</code> - Navigate to next option
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>Arrow Up</code> - Navigate to previous option
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>Enter</code> - Select focused option or create new option
                in freeSolo mode
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>Tab</code> - Select focused option or accept current value
                in freeSolo mode
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>Home</code> - Jump to first option
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>End</code> - Jump to last option
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>Escape</code> - Close dropdown
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>Delete/Backspace</code> - Remove last selected item in
                multiple mode when input is empty
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>Paste</code> - In freeSolo multiple mode, paste
                comma-separated values to add multiple items at once
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* API Reference */}
      <Card>
        <CardHeader>
          <CardTitle>API Reference</CardTitle>
          <CardDescription>
            Key props and configuration options for the Autocomplete component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <List className="space-y-2">
            <ListItem>
              <Typography>
                <code>options</code> - Array of options (strings or objects with
                label/value)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>multiple</code> - Enable multiple selection mode
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>freeSolo</code> - Allow creating custom options by typing
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>separator</code> - Separator for multiple values in
                freeSolo mode ('comma', 'semicolon', 'pipe', 'space')
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>maxOptions</code> - Maximum number of options in multiple
                mode
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>dependsOn</code> - Name of field this autocomplete depends
                on
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>disableSorting</code> - Disable sorting of filtered
                options
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>value</code> - Controlled value (pipe-separated for
                multiple)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>defaultValue</code> - Default value for uncontrolled usage
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>onChange</code> - Callback when value changes
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>label</code> - Label text for the input field
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>placeholder</code> - Placeholder text
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>required</code> - Mark field as required
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <code>disabled</code> - Disable the input
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
