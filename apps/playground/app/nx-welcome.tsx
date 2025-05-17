import { ClientOnly } from 'remix-utils/client-only';

import { EditorField } from '@veraclins-dev/editor';
import {
  Autocomplete,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Checkbox,
  CheckboxField,
  ComposedSelect,
  Input,
  Label,
  PhoneField,
  RadioField,
  RadioGroup,
  RadioGroupItem,
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
            <PhoneField placeholder="Phone" className="max-w-xs" />
            <SelectField
              placeholder="Select"
              options={[
                { value: 'option-1', label: 'Option 1' },
                { value: 'option-2', label: 'Option 2' },
              ]}
            />
          </div>
          <div className="flex gap-4">
            <Card className="w-full max-w-sm bg-card-inner">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </CardFooter>
            </Card>
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle>Meeting Notes</CardTitle>
                <CardDescription>
                  Transcript from the meeting with the client.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  Client requested dashboard redesign with focus on mobile
                  responsiveness.
                </p>
                <ol className="mt-4 flex list-decimal flex-col gap-2 pl-6">
                  <li>New analytics widgets for daily/weekly metrics</li>
                  <li>Simplified navigation menu</li>
                  <li>Dark mode support</li>
                  <li>Timeline: 6 weeks</li>
                  <li>Follow-up meeting scheduled for next Tuesday</li>
                </ol>
              </CardContent>
              <CardFooter>
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
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
                </div>
              </CardFooter>
            </Card>
          </div>
          <Autocomplete
            placeholder="autocomplete multiple"
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
          />
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
