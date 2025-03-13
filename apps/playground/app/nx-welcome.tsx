import { ClientOnly } from 'remix-utils/client-only';

import { EditorField } from '@veraclins-dev/editor';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  SelectField,
} from '@veraclins-dev/ui';
import { humanize } from '@veraclins-dev/utils';

import { SocialLogin } from './social-login';

export function NxWelcome({ title }: { title: string }) {
  return (
    <div className="container flex w-full gap-4 flex-col h-full my-8 overflow-auto rounded-md bg-card p-4">
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
        className="w-[300px] rounded-md bg-mauve6 shadow-[0_2px_10px] shadow-black/5"
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
            Yes. It's unstyled by default, giving you freedom over the look and
            feel.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Can it be animated?</AccordionTrigger>
          <AccordionContent>
            Yes! You can animate the Accordion with CSS or JavaScript.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
