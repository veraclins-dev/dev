import { useMemo } from 'react';

import { Form, useConform } from '@veraclins-dev/form';
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
import { z } from '@veraclins-dev/utils';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

const ThemeSchema = z.object({
  accountType: z.enum(['personal', 'business', 'enterprise']),
});

function SelectFieldWithCustomLabels() {
  const categories = useMemo(
    () => [
      {
        value: 'spam',
        label: 'Spam',
        description:
          'This content is repetitive, unwanted, or appears to be automated promotional material that does not provide value to the community.',
      },
      {
        value: 'harassment',
        label: 'Harassment or Bullying',
        description:
          'This content contains personal attacks, threats, intimidation, or any form of targeted harassment directed at individuals or groups.',
      },
      {
        value: 'hate-speech',
        label: 'Hate Speech',
        description:
          'This content promotes violence, discrimination, or hatred against individuals or groups based on race, ethnicity, religion, gender, sexual orientation, or other protected characteristics.',
      },
      {
        value: 'misinformation',
        label: 'Misinformation',
        description:
          'This content contains false or misleading information that could cause harm, spread confusion, or mislead others about important topics such as health, safety, or current events.',
      },
      {
        value: 'inappropriate',
        label: 'Inappropriate Content',
        description:
          'This content contains explicit material, graphic violence, or other content that is not suitable for the platform and violates community guidelines regarding appropriate content standards.',
      },
      {
        value: 'copyright',
        label: 'Copyright Violation',
        description:
          'This content appears to infringe on intellectual property rights, including unauthorized use of copyrighted material, trademarks, or other protected works without proper attribution or permission.',
      },
    ],
    [],
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.value,
        label: (
          <Box>
            <Typography variant="subtitle2">{category.label}</Typography>
            <Typography variant="caption" className="text-foreground/70">
              {category.description}
            </Typography>
          </Box>
        ),
      })),
    [categories],
  );

  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectField
        placeholder="Select a report category"
        label="Report Category"
        options={categoryOptions}
      />
      <SelectField
        placeholder="Select a report category"
        label="Report Category"
        options={categoryOptions}
      />
    </Box>
  );
}

export function Inputs() {
  const { form, fields } = useConform({
    id: 'inputs-form',
    schema: ThemeSchema,
    defaultValue: {
      accountType: 'personal',
    },
  });
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Inputs" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Input Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Form input components including text fields, checkboxes, radio buttons,
        and select menus with comprehensive prop demonstrations.
      </Typography>

      {/* Base Input Component */}
      <Card>
        <CardHeader>
          <CardTitle>Base Input Component</CardTitle>
          <CardDescription>
            The fundamental Input component with all its variations and props
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Input Sizes */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Input Sizes
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Label className="mb-2 block">Small Size</Label>
                  <Input
                    placeholder="Small input"
                    className="w-full"
                    inputSize="sm"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Default Size</Label>
                  <Input placeholder="Default input" className="w-full" />
                </Box>
                <Box>
                  <Label className="mb-2 block">Large Size</Label>
                  <Input
                    placeholder="Large input"
                    className="w-full"
                    inputSize="lg"
                  />
                </Box>
              </Box>
            </Box>

            {/* Input States */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Input States
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Label className="mb-2 block">Default State</Label>
                  <Input placeholder="Default input" className="w-full" />
                </Box>
                <Box>
                  <Label className="mb-2 block">Focused State</Label>
                  <Input
                    placeholder="Focused input"
                    className="w-full"
                    autoFocus
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Disabled State</Label>
                  <Input
                    placeholder="Disabled input"
                    disabled
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Read-only State</Label>
                  <Input
                    value="Read-only content"
                    readOnly
                    className="w-full"
                  />
                </Box>
              </Box>
            </Box>

            {/* Input Types */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Input Types
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Box>
                  <Label className="mb-2 block">Text</Label>
                  <Input
                    type="text"
                    placeholder="Text input"
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Email</Label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Number</Label>
                  <Input
                    type="number"
                    placeholder="Enter number"
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">URL</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Tel</Label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Date</Label>
                  <Input type="date" className="w-full" />
                </Box>
                <Box>
                  <Label className="mb-2 block">Time</Label>
                  <Input type="time" className="w-full" />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Input with Icons */}
      <Card>
        <CardHeader>
          <CardTitle>Input with Icons</CardTitle>
          <CardDescription>
            Input component with left and right icon support for enhanced UX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Icon Positions */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Icon Positions
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Label className="mb-2 block">Left Icon Only</Label>
                  <Input
                    placeholder="Search..."
                    leftIcon={{ name: 'magnifying-glass' }}
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Right Icon Only</Label>
                  <Input
                    placeholder="Enter amount"
                    rightIcon={{ name: 'currency-dollar' }}
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Both Icons</Label>
                  <Input
                    placeholder="Enter email"
                    leftIcon={{ name: 'envelope-closed' }}
                    rightIcon={{ name: 'check' }}
                    className="w-full"
                  />
                </Box>
              </Box>
            </Box>

            {/* Icon with Different Sizes */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Icons with Different Sizes
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Label className="mb-2 block">Small Size with Icon</Label>
                  <Input
                    placeholder="Small input with icon"
                    leftIcon={{ name: 'magnifying-glass' }}
                    inputSize="sm"
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Default Size with Icon</Label>
                  <Input
                    placeholder="Default input with icon"
                    leftIcon={{ name: 'magnifying-glass' }}
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Large Size with Icon</Label>
                  <Input
                    placeholder="Large input with icon"
                    leftIcon={{ name: 'magnifying-glass' }}
                    inputSize="lg"
                    className="w-full"
                  />
                </Box>
              </Box>
            </Box>

            {/* Icon with Different States */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Icons with Different States
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Label className="mb-2 block">Focused with Icon</Label>
                  <Input
                    placeholder="Focused input with icon"
                    leftIcon={{ name: 'magnifying-glass' }}
                    autoFocus
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Disabled with Icon</Label>
                  <Input
                    placeholder="Disabled input with icon"
                    leftIcon={{ name: 'lock-closed' }}
                    disabled
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Read-only with Icon</Label>
                  <Input
                    value="Read-only with icon"
                    leftIcon={{ name: 'check' }}
                    readOnly
                    className="w-full"
                  />
                </Box>
              </Box>
            </Box>

            {/* Common Icon Use Cases */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Common Icon Use Cases
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Box>
                  <Label className="mb-2 block">Search Input</Label>
                  <Input
                    placeholder="Search..."
                    leftIcon={{ name: 'magnifying-glass' }}
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Password Input</Label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    leftIcon={{ name: 'lock-closed' }}
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Email Input</Label>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    leftIcon={{ name: 'envelope-closed' }}
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Phone Input</Label>
                  <Input
                    type="tel"
                    placeholder="Enter phone"
                    leftIcon={{ name: 'phone' }}
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Amount Input</Label>
                  <Input
                    placeholder="0.00"
                    rightIcon={{ name: 'currency-dollar' }}
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">URL Input</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    leftIcon={{ name: 'globe' }}
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Success State</Label>
                  <Input
                    value="Valid input"
                    leftIcon={{ name: 'check-circle' }}
                    rightIcon={{ name: 'check' }}
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Error State</Label>
                  <Input
                    value="Invalid input"
                    leftIcon={{ name: 'exclamation-triangle' }}
                    rightIcon={{ name: 'x-mark' }}
                    className="w-full"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* TextField Component */}
      <Card>
        <CardHeader>
          <CardTitle>TextField Component</CardTitle>
          <CardDescription>
            TextField component with label, validation, helper text, and icon
            support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Basic TextField */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Basic TextField
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField placeholder="Enter your name" label="Full Name" />
                <TextField
                  placeholder="Enter your email"
                  label="Email Address"
                  type="email"
                />
              </Box>
            </Box>

            {/* TextField with Helper Text */}
            <Box>
              <Typography variant="h4" className="mb-4">
                TextField with Helper Text
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  placeholder="Enter username"
                  label="Username"
                  topText="Must be at least 3 characters"
                />
                <TextField
                  placeholder="Enter password"
                  label="Password"
                  type="password"
                  topText="Minimum 8 characters required"
                />
              </Box>
            </Box>

            {/* TextField with Icons */}
            <Box>
              <Typography variant="h4" className="mb-4">
                TextField with Icons
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  placeholder="Search..."
                  label="Search"
                  leftIcon={{ name: 'magnifying-glass' }}
                />
                <TextField
                  placeholder="Enter amount"
                  label="Amount"
                  rightIcon={{ name: 'currency-dollar' }}
                />
                <TextField
                  placeholder="Enter email"
                  label="Email"
                  leftIcon={{ name: 'envelope-closed' }}
                  rightIcon={{ name: 'check' }}
                />
                <TextField
                  placeholder="Enter password"
                  label="Password"
                  type="password"
                  leftIcon={{ name: 'lock-closed' }}
                />
              </Box>
            </Box>

            {/* TextField States */}
            <Box>
              <Typography variant="h4" className="mb-4">
                TextField States
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  placeholder="Required field"
                  label="Required Field"
                  required
                />
                <TextField
                  placeholder="Disabled field"
                  label="Disabled Field"
                  disabled
                />
                <TextField
                  value="Read-only content"
                  label="Read-only Field"
                  readOnly
                />
                <TextField placeholder="Error state" label="Error Field" />
              </Box>
            </Box>

            {/* TextField Sizes */}
            <Box>
              <Typography variant="h4" className="mb-4">
                TextField Sizes
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <TextField
                  placeholder="Small field"
                  label="Small Field"
                  inputSize="sm"
                />
                <TextField placeholder="Default field" label="Default Field" />
                <TextField
                  placeholder="Large field"
                  label="Large Field"
                  inputSize="lg"
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Select Components */}
      <Card>
        <CardHeader>
          <CardTitle>Select Components</CardTitle>
          <CardDescription>
            ComposedSelect and SelectField components with various
            configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* ComposedSelect */}
            <Box>
              <Typography variant="h4" className="mb-4">
                ComposedSelect
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Box>
                  <Label className="mb-2 block">Basic Select</Label>
                  <ComposedSelect
                    className="w-full"
                    placeholder="Select an option"
                    options={[
                      { value: 'option-1', label: 'Option 1' },
                      { value: 'option-2', label: 'Option 2' },
                      { value: 'option-3', label: 'Option 3' },
                      { value: 'option-4', label: 'Option 4' },
                    ]}
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">
                    Select with Default Value
                  </Label>
                  <ComposedSelect
                    className="w-full"
                    placeholder="Select an option"
                    value="option-2"
                    options={[
                      { value: 'option-1', label: 'Option 1' },
                      { value: 'option-2', label: 'Option 2' },
                      { value: 'option-3', label: 'Option 3' },
                      { value: 'option-4', label: 'Option 4' },
                    ]}
                  />
                </Box>
              </Box>
            </Box>

            {/* SelectField */}
            <Box>
              <Typography variant="h4" className="mb-4">
                SelectField
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  placeholder="Select country"
                  label="Country"
                  options={[
                    { value: 'us', label: 'United States' },
                    { value: 'ca', label: 'Canada' },
                    { value: 'uk', label: 'United Kingdom' },
                    { value: 'au', label: 'Australia' },
                    { value: 'de', label: 'Germany' },
                    { value: 'fr', label: 'France' },
                  ]}
                />
                <SelectField
                  placeholder="Select category"
                  label="Product Category"
                  required
                  options={[
                    { value: 'electronics', label: 'Electronics' },
                    { value: 'clothing', label: 'Clothing & Fashion' },
                    { value: 'home', label: 'Home & Garden' },
                    { value: 'sports', label: 'Sports & Outdoors' },
                  ]}
                />
              </Box>
            </Box>

            {/* Select States */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Select States
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  placeholder="Disabled select"
                  label="Disabled Select"
                  disabled
                  options={[
                    { value: 'option-1', label: 'Option 1' },
                    { value: 'option-2', label: 'Option 2' },
                  ]}
                />
                <SelectField
                  placeholder="Error select"
                  label="Error Select"
                  options={[
                    { value: 'option-1', label: 'Option 1' },
                    { value: 'option-2', label: 'Option 2' },
                  ]}
                />
              </Box>
            </Box>

            {/* SelectField with Custom Item Labels */}
            <Box>
              <Typography variant="h4" className="mb-4">
                SelectField with Custom Item Labels
              </Typography>
              <SelectFieldWithCustomLabels />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Checkbox Components */}
      <Card>
        <CardHeader>
          <CardTitle>Checkbox Components</CardTitle>
          <CardDescription>
            Checkbox and CheckboxField components with various states and
            configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Basic Checkbox */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Basic Checkbox
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box className="flex items-center gap-2">
                  <Checkbox id="checkbox-1" />
                  <Label htmlFor="checkbox-1">Unchecked checkbox</Label>
                </Box>
                <Box className="flex items-center gap-2">
                  <Checkbox id="checkbox-2" defaultChecked />
                  <Label htmlFor="checkbox-2">Checked checkbox</Label>
                </Box>
                <Box className="flex items-center gap-2">
                  <Checkbox id="checkbox-3" disabled />
                  <Label htmlFor="checkbox-3">Disabled checkbox</Label>
                </Box>
                <Box className="flex items-center gap-2">
                  <Checkbox id="checkbox-4" disabled defaultChecked />
                  <Label htmlFor="checkbox-4">Disabled checked checkbox</Label>
                </Box>
              </Box>
            </Box>

            {/* CheckboxField */}
            <Box>
              <Typography variant="h4" className="mb-4">
                CheckboxField
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <CheckboxField label="Accept terms and conditions" />
                <CheckboxField label="Subscribe to newsletter" defaultChecked />
                <CheckboxField label="Enable notifications" required />
                <CheckboxField label="Disabled option" disabled />
                <CheckboxField
                  label="Disabled checked option"
                  disabled
                  defaultChecked
                />
              </Box>
            </Box>

            {/* Checkbox Group */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Checkbox Group
              </Typography>
              <Box>
                <Label className="mb-3 block">Select your interests:</Label>
                <Box display="flex" flexDirection="column" gap={2}>
                  <CheckboxField label="Technology" />
                  <CheckboxField label="Sports" />
                  <CheckboxField label="Music" />
                  <CheckboxField label="Travel" />
                  <CheckboxField label="Cooking" />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Radio Components */}
      <Card>
        <CardHeader>
          <CardTitle>Radio Components</CardTitle>
          <CardDescription>
            RadioGroup, RadioGroupItem, and RadioField components with various
            configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Basic RadioGroup */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Basic RadioGroup
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <RadioGroup defaultValue="option-1">
                  <RadioGroupItem
                    value="option-1"
                    label="Option 1"
                    className="flex-row-reverse justify-between"
                  />
                  <RadioGroupItem value="option-2" label="Option 2" />
                  <RadioGroupItem value="option-3" label="Option 3" />
                </RadioGroup>
              </Box>
            </Box>

            {/* RadioField */}
            <Box>
              <Typography variant="h4" className="mb-4">
                RadioField
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RadioField
                  label="Account Type"
                  options={[
                    { value: 'personal', label: 'Personal Account' },
                    { value: 'business', label: 'Business Account' },
                    { value: 'enterprise', label: 'Enterprise Account' },
                  ]}
                  radioSize="xl"
                />
                <RadioField
                  label="Notification Frequency"
                  options={[
                    { value: 'immediate', label: 'Immediate' },
                    { value: 'daily', label: 'Daily Digest' },
                    { value: 'weekly', label: 'Weekly Summary' },
                  ]}
                  required
                />
              </Box>
            </Box>

            {/* Radio States */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Radio States
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RadioField
                  label="Disabled Radio Group"
                  disabled
                  options={[
                    { value: 'option-1', label: 'Option 1' },
                    { value: 'option-2', label: 'Option 2' },
                  ]}
                />
                <RadioField
                  label="Radio with Error"
                  options={[
                    { value: 'option-1', label: 'Option 1' },
                    { value: 'option-2', label: 'Option 2' },
                  ]}
                  itemProps={{
                    type: 'submit',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Textarea Components */}
      <Card>
        <CardHeader>
          <CardTitle>Textarea Components</CardTitle>
          <CardDescription>
            Textarea and TextareaField components with various configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Basic Textarea */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Basic Textarea
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Label className="mb-2 block">Default Textarea</Label>
                  <Textarea
                    placeholder="Enter your message..."
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">
                    Textarea with Default Value
                  </Label>
                  <Textarea
                    defaultValue="This is a textarea with some default content."
                    className="w-full"
                  />
                </Box>
                <Box>
                  <Label className="mb-2 block">Disabled Textarea</Label>
                  <Textarea
                    placeholder="Disabled textarea"
                    disabled
                    className="w-full"
                  />
                </Box>
              </Box>
            </Box>

            {/* TextareaField */}
            <Box>
              <Typography variant="h4" className="mb-4">
                TextareaField
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextareaField
                  placeholder="Enter your bio"
                  label="Bio"
                  rows={3}
                />
                <TextareaField
                  placeholder="Enter description"
                  label="Description"
                  rows={4}
                />
              </Box>
            </Box>

            {/* Textarea States */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Textarea States
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextareaField
                  placeholder="Required field"
                  label="Required Textarea"
                  required
                  rows={3}
                  inputSize="xl"
                />
                <TextareaField
                  placeholder="Error state"
                  label="Error Textarea"
                  rows={3}
                />
                <TextareaField
                  placeholder="Disabled field"
                  label="Disabled Textarea"
                  disabled
                  rows={3}
                />
                <TextareaField
                  value="Read-only content"
                  label="Read-only Textarea"
                  readOnly
                  rows={3}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* PhoneField Component */}
      <Card>
        <CardHeader>
          <CardTitle>PhoneField Component</CardTitle>
          <CardDescription>
            PhoneField component with phone number formatting and validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Basic PhoneField */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Basic PhoneField
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PhoneField
                  placeholder="Enter phone number"
                  label="Phone Number"
                />
                <PhoneField
                  placeholder="Enter mobile number"
                  label="Mobile Number"
                  defaultCountry="US"
                />
              </Box>
            </Box>

            {/* PhoneField States */}
            <Box>
              <Typography variant="h4" className="mb-4">
                PhoneField States
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PhoneField
                  placeholder="Required phone"
                  label="Required Phone"
                  required
                />
                <PhoneField
                  placeholder="Disabled phone"
                  label="Disabled Phone"
                  disabled
                />
                <PhoneField placeholder="Error phone" label="Error Phone" />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* User Registration Form */}
      <Card component={Form} form={form} action="/playground/inputs">
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
                field={fields.accountType}
                itemProps={{
                  className: 'hover:bg-primary/10',
                  type: 'submit',
                }}
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
          <Box className="grid grid-cols-1 md:grid-cols-2" gap={6}>
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
            <Box display="flex" items="end" gap={3} className="flex-wrap">
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
          <Box className="grid grid-cols-1 md:grid-cols-2" gap={6}>
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
    </Box>
  );
}
