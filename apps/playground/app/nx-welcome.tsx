import { ClientOnly } from 'remix-utils/client-only';

import { EditorField } from '@veraclins-dev/editor';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  LabeledTextField,
  SelectField,
  TextField,
  Typography,
} from '@veraclins-dev/ui';
import { cn, humanize } from '@veraclins-dev/utils';

import { ModalDialog } from './components/modal';
import { SocialLogin } from './social-login';

export function NxWelcome({ title }: { title: string }) {
  return (
    <div className="container flex w-full gap-4 flex-col h-full my-8 overflow-auto rounded-md bg-card-inner p-4">
      <div id="welcome">
        <h1>
          <span> Hello there, </span>
          Welcome to {title} 👋
        </h1>

        {humanize(
          'and thisIsAnotherReallyLong sentence isB. a HTML userDefined JSONParse withAUseful and AnotherSweet string for Agada Clinton and some usefulStuff that is really long and has a lot of words',
        )}
      </div>
      This is a playground for testing out new features and components.
      <Card>
        <CardHeader>
          <CardTitle>{title} card</CardTitle>
          <CardSubtitle>
            This is a card component that can be used to display content.
          </CardSubtitle>
        </CardHeader>
        <CardContent>
          <Typography variant="h1">Text Heading 1</Typography>
          <Typography variant="h2">Text Heading 2</Typography>
          <Typography variant="h3">Text Heading 3</Typography>
          <Typography variant="h4">Text Heading 4</Typography>
          <Typography variant="h5">Text Heading 5</Typography>
          <Typography variant="h6">Text Heading 6</Typography>
          <Typography variant="body1">Text Body 1</Typography>
          <Typography variant="body2">Text Body 2</Typography>
          <Typography variant="subtitle1">Text Subtitle 1</Typography>
          <Typography variant="subtitle2">Text Subtitle 2</Typography>
          <div className="flex flex-col">
            Text
            <Typography variant="caption">Text Caption</Typography>
            <Typography variant="overline">Text Overline</Typography>
          </div>
          <Typography variant="inherit">Text Inherit</Typography>
          <SocialLogin />
          <div className="max-w-sm">
            <SelectField
              placeholder="Select something nice and cool"
              options={[
                'hell',
                'there',
                'and sone long stuff',
                {
                  label: (
                    <div className="flex flex-col">
                      <span>hello</span>
                      <span>there</span>
                    </div>
                  ),
                  value: 'hello',
                },
              ]}
              multiple
            />
          </div>
          <Accordion
            className="max-w-sm rounded-md bg-mauve6 shadow-[0_2px_10px] shadow-black/5"
            type="multiple"
            defaultValue={['item-1', 'item-2']}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Is it unstyled?</AccordionTrigger>
              <AccordionContent>
                Yes. It's unstyled by default, giving you freedom over the look
                and feel.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can it be animated?</AccordionTrigger>
              <AccordionContent>
                Yes! You can animate the Accordion with CSS or JavaScript.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <ModalDialog
            open={false}
            onOpenChange={() => console.log('Modal opened')}
            title="Sample Modal"
            confirmButtonProps={{ variant: 'primary', children: 'Confirm' }}
            cancelButtonProps={{ variant: 'secondary', children: 'Cancel' }}
          >
            some content
            {/* Add additional modal content here if needed */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="items-center rounded-md px-3 w-fit"
                >
                  <Icon name="dots-horizontal" size="md" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="md:min-w-[300px]">
                <DropdownMenuItem>
                  <Button className="bg-red-500 hover:bg-red-500 w-full rounded-none sm:px-5 lg:px-8 xl:px-10">
                    Add as admin
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button className="bg-red-500 hover:bg-red-500 w-full rounded-none sm:px-5 lg:px-8 xl:px-10">
                    Remove as admin
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button className="bg-red-500 hover:bg-red-500 w-full rounded-none sm:px-5 lg:px-8 xl:px-10">
                    Suspend as admin
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ModalDialog>
          <div className="flex flex-col gap-1">
            <TextField label="Hello" />
            <TextField placeholder="interesting" />
            <TextField />
            <LabeledTextField
              wrapperProps={{ className: 'flex-row items-center gap-4' }}
              label="Hello"
            />
            <Autocomplete
              options={[
                { label: 'John Thompson', value: 'john-thompson' },
                { label: 'Cyndi Lauper', value: 'cyndi-lauper' },
                { label: 'Tom Cruise', value: 'tom-cruise' },
                { label: 'Madonna', value: 'madonna' },
                { label: 'Jerry Hall', value: 'jerry-hall' },
                { label: 'Joan Collins', value: 'joan-collins' },
                { label: 'Winona Ryder', value: 'winona-ryder' },
                { label: 'Christina Applegate', value: 'christina-applegate' },
                { label: 'Alyssa Milano', value: 'alyssa-milano' },
                { label: 'Molly Ringwald', value: 'molly-ringwald' },
                { label: 'Ally Sheedy', value: 'ally-sheedy' },
                { label: 'Debbie Harry', value: 'debbie-harry' },
                { label: 'Olivia Newton-John', value: 'olivia-newton-john' },
                { label: 'Elton John', value: 'elton-john' },
                { label: 'Michael J. Fox', value: 'michael-j-fox' },
                { label: 'Axl Rose', value: 'axl-rose' },
                { label: 'Emilio Estevez', value: 'emilio-estevez' },
                { label: 'Ralph Macchio', value: 'ralph-macchio' },
                { label: 'Lisa Bonet', value: 'lisa-bonet' },
                {
                  label: 'Benicio Monserrate Rafael',
                  value: 'benicio-monserrate-rafael',
                },
              ]}
            />
            <Autocomplete
              multiple
              options={[
                { label: 'John Thompson', value: 'john-thompson' },
                { label: 'Cyndi Lauper', value: 'cyndi-lauper' },
                { label: 'Tom Cruise', value: 'tom-cruise' },
                { label: 'Madonna', value: 'madonna' },
                { label: 'Jerry Hall', value: 'jerry-hall' },
                { label: 'Joan Collins', value: 'joan-collins' },
                { label: 'Winona Ryder', value: 'winona-ryder' },
                { label: 'Christina Applegate', value: 'christina-applegate' },
                { label: 'Alyssa Milano', value: 'alyssa-milano' },
                { label: 'Molly Ringwald', value: 'molly-ringwald' },
                { label: 'Ally Sheedy', value: 'ally-sheedy' },
                { label: 'Debbie Harry', value: 'debbie-harry' },
                { label: 'Olivia Newton-John', value: 'olivia-newton-john' },
                { label: 'Elton John', value: 'elton-john' },
                { label: 'Michael J. Fox', value: 'michael-j-fox' },
                { label: 'Axl Rose', value: 'axl-rose' },
                { label: 'Emilio Estevez', value: 'emilio-estevez' },
                { label: 'Ralph Macchio', value: 'ralph-macchio' },
                { label: 'Lisa Bonet', value: 'lisa-bonet' },
                {
                  label: 'Benicio Monserrate Rafael',
                  value: 'benicio-monserrate-rafael',
                },
              ]}
            />
          </div>
          <Button
            variant="primary-light"
            size="icon"
            className={cn('hover:bg-white', 'rounded-md hover:bg-destructive')}
          >
            Click me
          </Button>
        </CardContent>
      </Card>
      <ClientOnly
        fallback={<textarea rows={5} placeholder="Loading... some stuff" />}
      >
        {() => (
          <EditorField
            defaultValue=""
            // editorProps={{
            //   mentionPath,
            //   suggestionFilter: ({ query }) =>
            //     [
            //       'John Thompson',
            //       'Cyndi Lauper',
            //       'Tom Cruise',
            //       'Madonna',
            //       'Jerry Hall',
            //       'Joan Collins',
            //       'Winona Ryder',
            //       'Christina Applegate',
            //       'Alyssa Milano',
            //       'Molly Ringwald',
            //       'Ally Sheedy',
            //       'Debbie Harry',
            //       'Olivia Newton-John',
            //       'Elton John',
            //       'Michael J. Fox',
            //       'Axl Rose',
            //       'Emilio Estevez',
            //       'Ralph Macchio',
            //       'Lisa Bonet',
            //       'Benicio Monserrate Rafael del Toro Sánchez',
            //     ]
            //       // Typically we'd be getting this data from an API where we'd have a
            //       // definitive "id" to use for each suggestion item, but for the sake of
            //       // example, we'll just set the index within this hardcoded list as the
            //       // ID of each item.
            //       .map((name) => ({
            //         mentionLabel: name,
            //         id: createUniqueSlug({ string: name }),
            //       }))
            //       // Find matching entries based on what the user has typed so far (after
            //       // the @ symbol)
            //       .filter((item) =>
            //         item.mentionLabel
            //           .toLowerCase()
            //           .includes(query.toLowerCase()),
            //       ),
            // }}
            // shouldReset={shouldReset}
            name="test-editor"
          />
        )}
      </ClientOnly>
    </div>
  );
}

export default NxWelcome;
