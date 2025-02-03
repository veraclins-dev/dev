import { ClientOnly } from 'remix-utils/client-only';

import { EditorField } from '@veraclins-dev/editor';
import { Select } from '@veraclins-dev/ui';

import { SocialLogin } from './social-login';

export function NxWelcome({ title }: { title: string }) {
  return (
    <div className="container flex w-full gap-4 flex-col h-full my-8 overflow-auto rounded-md bg-card p-4">
      <div id="welcome">
        <h1>
          <span> Hello there, </span>
          Welcome to {title} 👋
        </h1>
      </div>
      This is a playground for testing out new features and components.
      <SocialLogin />
      <div className="">
        <Select
          placeholder="Select something"
          options={['hell', 'there', 'and sone long stuff']}
        />
      </div>
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
