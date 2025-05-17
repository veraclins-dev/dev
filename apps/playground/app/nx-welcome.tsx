import { ClientOnly } from 'remix-utils/client-only';

import { EditorField } from '@veraclins-dev/editor';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Checkbox,
  CheckboxField,
  ComposedSelect,
  Input,
  RadioField,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectField,
  TextField,
} from '@veraclins-dev/ui';

export function NxWelcome({ title }: { title: string }) {
  return (
    <div className="container flex w-full gap-4 flex-col h-full my-8 overflow-auto rounded-md py-4">
      <Card>
        <CardHeader>
          <CardTitle>{title} card</CardTitle>
          <CardSubtitle>
            This is a card component that can be used to display content.
          </CardSubtitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Button>Default</Button>
            <Button variant="light">Light</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary-light">Secondary Light</Button>
            <Button variant="link">Link</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <div className="flex gap-4">
            <Input placeholder="Default" className="w-full" />
            <Input placeholder="Light" className="w-full" />
            <Input placeholder="Another" className="w-full" />
            <Input placeholder="And one more" className="w-full" />
            <ComposedSelect
              className="w-full"
              placeholder="Select"
              options={[
                { value: 'option-1', label: 'Option 1' },
                { value: 'option-2', label: 'Option 2' },
              ]}
            />
          </div>
          <div className="flex gap-6">
            <RadioGroup>
              <RadioGroupItem value="option-1" label="Option 1" />
              <RadioGroupItem value="option-2" label="Option 2" />
            </RadioGroup>
            <div className="flex gap-4">
              <Checkbox />
            </div>
          </div>
          <div className="flex gap-4">
            <TextField
              // wrapperClassName="max-w-xs"
              placeholder="Light"
              type="password"
            />
            <Autocomplete
              placeholder="autocomplete"
              options={['option 1', 'option 2']}
              // wrapperClassName="max-w-xs"
            />
            <SelectField
              placeholder="Select"
              options={[
                { value: 'option-1', label: 'Option 1' },
                { value: 'option-2', label: 'Option 2' },
              ]}
            />
          </div>
          <div className="flex gap-6">
            <RadioField
              options={[
                { value: 'option-1', label: 'Option 1' },
                { value: 'option-2', label: 'Option 2' },
              ]}
            />

            <CheckboxField label="Checkbox" />
          </div>
          <div className="flex gap-4">
            <ClientOnly
              fallback={
                <textarea rows={5} placeholder="Loading... some stuff" />
              }
            >
              {() => <EditorField defaultValue="" name="test-editor" />}
            </ClientOnly>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default NxWelcome;
