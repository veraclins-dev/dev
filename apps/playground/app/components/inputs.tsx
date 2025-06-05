import { ClientOnly } from 'remix-utils/client-only';

import { EditorField, EditorReadonly } from '@veraclins-dev/editor';
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxField,
  ComposedSelect,
  Input,
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

export function Inputs() {
  return (
    <>
      <Box display="flex" flexDirection="row" gap={4}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              className="flex-1"
            >
              <Typography variant="h3">Base Inputs</Typography>
              <Box>
                <Input placeholder="Base Input" className="w-full" />
              </Box>

              <Box>
                <ComposedSelect
                  className="w-full"
                  placeholder="Select"
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
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              className="flex-1"
            >
              <Typography variant="h3">Input Fields</Typography>

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
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Autocomplete & Textarea</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Box
              display="flex"
              flexDirection="column"
              gap={3}
              className="flex-1"
            >
              <Autocomplete
                placeholder="Single"
                options={[
                  'option 1',
                  'option 2',
                  'option 3',
                  'option 4',
                  'option 5',
                  'option 6',
                  'option 7',
                ]}
                value="option 1"
                label="Single Autocomplete"
              />
              <Autocomplete
                placeholder="multiple"
                options={[
                  'option 1',
                  'option 2',
                  'option 3',
                  'option 4',
                  'option 5',
                  'option 6',
                  'option 7',
                  'option 8',
                  'option 9',
                  'option 10',
                ]}
                value={'option 1|option 2'}
                multiple
                label="Multiple Autocomplete"
              />
              <Autocomplete
                placeholder="free solo"
                options={[]}
                multiple
                freeSolo
                label="Free Solo Autocomplete"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap={3}
              className="flex-1"
            >
              <Typography variant="h3">Textarea</Typography>
              <Textarea placeholder="Textarea" className="w-full" />

              <TextareaField
                placeholder="Textarea Field"
                label="Textarea Field"
                className="w-full"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Richtext Editor</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <ClientOnly
            fallback={<textarea rows={5} placeholder="Loading... some stuff" />}
          >
            {() => <EditorField defaultValue="" name="test-editor" />}
          </ClientOnly>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Richtext Editor Readonly</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <EditorReadonly content={exampleContent} />
        </CardContent>
      </Card>
    </>
  );
}
