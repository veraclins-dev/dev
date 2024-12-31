import { useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';

import { Editor, EditorField, EditorReadonly } from '@veraclins-dev/editor';
import { LabeledTextarea, LabeledTextField } from '@veraclins-dev/ui';
import { createUniqueSlug } from '@veraclins-dev/utils';

const exampleContent = `<h1><strong>Node views with React</strong></h1><p>Using Vanilla JavaScript can feel complex if you are used to work in React. Good news: You can use regular React components in your node views, too. There is just a little bit you need to know, but let’s go through this one by one.</p><h2><strong>Render a React component</strong></h2><p>Here is what you need to do to render React components inside your editor:</p><ol><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/docs/editor/extensions/custom-extensions">Create a node extension</a></p></li><li><p>Create a React component</p></li><li><p>Pass that component to the provided <code>ReactNodeViewRenderer</code></p></li><li><p>Register it with <code>addNodeView()</code></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/docs/editor/getting-started/configure">Configure Tiptap to use your new node extension</a></p></li></ol><p>This is how your node extension could look like:</p><pre><code class="language-js">import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import Component from './Component.jsx'

export default Node.create({
  // configuration …

  addNodeView() {
    return ReactNodeViewRenderer(Component)
  },
})
</code></pre><p>There is a little bit of magic required to make this work. But don’t worry, we provide a wrapper component you can use to get started easily. Don’t forget to add it to your custom React component, like shown below:</p><pre><code class="language-html">&lt;NodeViewWrapper className="react-component"&gt; React Component &lt;/NodeViewWrapper&gt;
</code></pre><p>Got it? Let’s see it in action. Feel free to copy the below example to get started.</p><p>That component doesn’t interact with the editor, though. Time to wire it up.</p><h2><strong>Access node attributes</strong></h2><p>The <code>ReactNodeViewRenderer</code> which you use in your node extension, passes a few very helpful props to your custom React component. One of them is the <code>node</code> prop. Let’s say you have <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/docs/editor/extensions/custom-extensions/extend-existing#attributes">added an attribute</a> named <code>count</code> to your node extension (like we did in the above example) you could access it like this:</p><pre><code class="language-js">props.node.attrs.count
</code></pre><h2><strong>Update node attributes</strong></h2><p>You can even update node attributes from your node, with the help of the <code>updateAttributes</code> prop passed to your component. Pass an object with updated attributes to the <code>updateAttributes</code> prop:</p><pre><code class="language-js">export default (props) =&gt; {
  const increase = () =&gt; {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    })
  }

  // …
}
</code></pre><p>And yes, all of that is reactive, too. A pretty seamless communication, isn’t it?</p><h2><strong>Adding a content editable</strong></h2><p>There is another component called <code>NodeViewContent</code> which helps you adding editable content to your node view. Here is an example:</p><pre><code class="language-jsx">import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

export default () =&gt; {
  return (
    &lt;NodeViewWrapper className="react-component"&gt;
      &lt;span className="label" contentEditable={false}&gt;
        React Component
      &lt;/span&gt;

      &lt;NodeViewContent className="content" /&gt;
    &lt;/NodeViewWrapper&gt;
  )
}
</code></pre><p>You don’t need to add those <code>className</code> attributes, feel free to remove them or pass other class names. Try it out in the following example:</p><p>And more</p>`;

export function NxWelcome({ title }: { title: string }) {
  const mentionPath = '/mentions';

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    html {
      -webkit-text-size-adjust: 100%;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
      line-height: 1.5;
      tab-size: 4;
      scroll-behavior: smooth;
    }
    body {
      font-family: inherit;
      line-height: inherit;
      margin: 0;
    }
    h1,
    h2,
    p,
    pre {
      margin: 0;
    }
    *,
    ::before,
    ::after {
      box-sizing: border-box;
      border-width: 0;
      border-style: solid;
      border-color: currentColor;
    }
    h1,
    h2 {
      font-size: inherit;
      font-weight: inherit;
    }
    a {
      color: inherit;
      text-decoration: inherit;
    }
    pre {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace;
    }
    svg {
      display: block;
      vertical-align: middle;
      shape-rendering: auto;
      text-rendering: optimizeLegibility;
    }
    pre {
      background-color: rgba(55, 65, 81, 1);
      border-radius: 0.25rem;
      color: rgba(229, 231, 235, 1);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace;
      overflow: auto;
      padding: 0.5rem 0.75rem;
    }

    .shadow {
      box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    .rounded {
      border-radius: 1.5rem;
    }
    .wrapper {
      width: 100%;
    }
    .container {
      margin-left: auto;
      margin-right: auto;
      max-width: 1040px;
      padding-bottom: 3rem;
      padding-left: 1rem;
      padding-right: 1rem;
      color: rgba(55, 65, 81, 1);
      width: 100%;
    }
    #welcome {
      margin-top: 2.5rem;
    }
    #welcome h1 {
      font-size: 3rem;
      font-weight: 500;
      letter-spacing: -0.025em;
      line-height: 1;
    }
    #welcome span {
      display: block;
      font-size: 1.875rem;
      font-weight: 300;
      line-height: 2.25rem;
      margin-bottom: 0.5rem;
    }
    #hero {
      align-items: center;
      background-color: hsla(214, 62%, 21%, 1);
      border: none;
      box-sizing: border-box;
      color: rgba(55, 65, 81, 1);
      display: grid;
      grid-template-columns: 1fr;
      margin-top: 3.5rem;
    }
    #hero .text-container {
      color: rgba(255, 255, 255, 1);
      padding: 3rem 2rem;
    }
    #hero .text-container h2 {
      font-size: 1.5rem;
      line-height: 2rem;
      position: relative;
    }
    #hero .text-container h2 svg {
      color: hsla(162, 47%, 50%, 1);
      height: 2rem;
      left: -0.25rem;
      position: absolute;
      top: 0;
      width: 2rem;
    }
    #hero .text-container h2 span {
      margin-left: 2.5rem;
    }
    #hero .text-container a {
      background-color: rgba(255, 255, 255, 1);
      border-radius: 0.75rem;
      color: rgba(55, 65, 81, 1);
      display: inline-block;
      margin-top: 1.5rem;
      padding: 1rem 2rem;
      text-decoration: inherit;
    }
    #hero .logo-container {
      display: none;
      justify-content: center;
      padding-left: 2rem;
      padding-right: 2rem;
    }
    #hero .logo-container svg {
      color: rgba(255, 255, 255, 1);
      width: 66.666667%;
    }
    #middle-content {
      align-items: flex-start;
      display: grid;
      grid-template-columns: 1fr;
      margin-top: 3.5rem;
    }

    #middle-content #middle-content-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    #learning-materials {
      padding: 2.5rem 2rem;
    }
    #learning-materials h2 {
      font-weight: 500;
      font-size: 1.25rem;
      letter-spacing: -0.025em;
      line-height: 1.75rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .list-item-link {
      align-items: center;
      border-radius: 0.75rem;
      display: flex;
      margin-top: 1rem;
      padding: 1rem;
      transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter,
      -webkit-backdrop-filter;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      width: 100%;
    }
    .list-item-link svg:first-child {
      margin-right: 1rem;
      height: 1.5rem;
      transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter,
      -webkit-backdrop-filter;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      width: 1.5rem;
    }
    .list-item-link > span {
      flex-grow: 1;
      font-weight: 400;
      transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter,
      -webkit-backdrop-filter;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    .list-item-link > span > span {
      color: rgba(107, 114, 128, 1);
      display: block;
      flex-grow: 1;
      font-size: 0.75rem;
      font-weight: 300;
      line-height: 1rem;
      transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter,
      -webkit-backdrop-filter;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    .list-item-link svg:last-child {
      height: 1rem;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      width: 1rem;
    }
    .list-item-link:hover {
      color: rgba(255, 255, 255, 1);
      background-color: hsla(162, 55%, 33%, 1);
    }
    .list-item-link:hover > span {}
    .list-item-link:hover > span > span {
      color: rgba(243, 244, 246, 1);
    }
    .list-item-link:hover svg:last-child {
      transform: translateX(0.25rem);
    }
    #other-links {}
    .button-pill {
      padding: 1.5rem 2rem;
      margin-bottom: 2rem;
      transition-duration: 300ms;
      transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter,
      -webkit-backdrop-filter;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      align-items: center;
      display: flex;
    }
    .button-pill svg {
      transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter,
      -webkit-backdrop-filter;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      flex-shrink: 0;
      width: 3rem;
    }
    .button-pill > span {
      letter-spacing: -0.025em;
      font-weight: 400;
      font-size: 1.125rem;
      line-height: 1.75rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .button-pill span span {
      display: block;
      font-size: 0.875rem;
      font-weight: 300;
      line-height: 1.25rem;
    }
    .button-pill:hover svg,
    .button-pill:hover {
      color: rgba(255, 255, 255, 1) !important;
    }
    #nx-console:hover {
      background-color: rgba(0, 122, 204, 1);
    }
    #nx-console svg {
      color: rgba(0, 122, 204, 1);
    }
    #nx-console-jetbrains {
      margin-top: 2rem;
    }
    #nx-console-jetbrains:hover {
      background-color: rgba(255, 49, 140, 1);
    }
    #nx-console-jetbrains svg {
      color: rgba(255, 49, 140, 1);
    }
    #nx-repo:hover {
      background-color: rgba(24, 23, 23, 1);
    }
    #nx-repo svg {
      color: rgba(24, 23, 23, 1);
    }
    #nx-cloud {
      margin-bottom: 2rem;
      margin-top: 2rem;
      padding: 2.5rem 2rem;
    }
    #nx-cloud > div {
      align-items: center;
      display: flex;
    }
    #nx-cloud > div svg {
      border-radius: 0.375rem;
      flex-shrink: 0;
      width: 3rem;
    }
    #nx-cloud > div h2 {
      font-size: 1.125rem;
      font-weight: 400;
      letter-spacing: -0.025em;
      line-height: 1.75rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    #nx-cloud > div h2 span {
      display: block;
      font-size: 0.875rem;
      font-weight: 300;
      line-height: 1.25rem;
    }
    #nx-cloud p {
      font-size: 1rem;
      line-height: 1.5rem;
      margin-top: 1rem;
    }
    #nx-cloud pre {
      margin-top: 1rem;
    }
    #nx-cloud a {
      color: rgba(107, 114, 128, 1);
      display: block;
      font-size: 0.875rem;
      line-height: 1.25rem;
      margin-top: 1.5rem;
      text-align: right;
    }
    #nx-cloud a:hover {
      text-decoration: underline;
    }
    #commands {
      padding: 2.5rem 2rem;
      margin-top: 3.5rem;
    }
    #commands h2 {
      font-size: 1.25rem;
      font-weight: 400;
      letter-spacing: -0.025em;
      line-height: 1.75rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    #commands p {
      font-size: 1rem;
      font-weight: 300;
      line-height: 1.5rem;
      margin-top: 1rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    details {
      align-items: center;
      display: flex;
      margin-top: 1rem;
      padding-left: 1rem;
      padding-right: 1rem;
      width: 100%;
    }
    details pre > span {
      color: rgba(181, 181, 181, 1);
      display: block;
    }
    summary {
      border-radius: 0.5rem;
      display: flex;
      font-weight: 400;
      padding: 0.5rem;
      cursor: pointer;
      transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter,
      -webkit-backdrop-filter;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }
    summary:hover {
      background-color: rgba(243, 244, 246, 1);
    }
    summary svg {
      height: 1.5rem;
      margin-right: 1rem;
      width: 1.5rem;
    }
    #love {
      color: rgba(107, 114, 128, 1);
      font-size: 0.875rem;
      line-height: 1.25rem;
      margin-top: 3.5rem;
      opacity: 0.6;
      text-align: center;
    }
    #love svg {
      color: rgba(252, 165, 165, 1);
      width: 1.25rem;
      height: 1.25rem;
      display: inline;
      margin-top: -0.25rem;
    }
    @media screen and (min-width: 768px) {
      #hero {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      #hero .logo-container {
        display: flex;
      }
      #middle-content {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 4rem;
      }
    }
          `,
        }}
      />
      <div className="wrapper">
        <div className="container mb-4 flex w-full flex-col rounded-md bg-card p-4">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome {title} 👋
            </h1>
          </div>

          <LabeledTextField label="An input" className="border mb-4" />
          <LabeledTextarea label="A Textarea" className="border mb-4" />

          <ClientOnly fallback={<textarea rows={5} placeholder="Loading..." />}>
            {() => (
              <EditorField
                value={exampleContent}
                editorProps={{
                  mentionPath,
                  suggestionFilter: ({ query }) =>
                    [
                      'John Thompson',
                      'Cyndi Lauper',
                      'Tom Cruise',
                      'Madonna',
                      'Jerry Hall',
                      'Joan Collins',
                      'Winona Ryder',
                      'Christina Applegate',
                      'Alyssa Milano',
                      'Molly Ringwald',
                      'Ally Sheedy',
                      'Debbie Harry',
                      'Olivia Newton-John',
                      'Elton John',
                      'Michael J. Fox',
                      'Axl Rose',
                      'Emilio Estevez',
                      'Ralph Macchio',
                      'Lisa Bonet',
                      'Benicio Monserrate Rafael del Toro Sánchez',
                    ]
                      // Typically we'd be getting this data from an API where we'd have a
                      // definitive "id" to use for each suggestion item, but for the sake of
                      // example, we'll just set the index within this hardcoded list as the
                      // ID of each item.
                      .map((name) => ({
                        mentionLabel: name,
                        id: createUniqueSlug({ string: name }),
                      }))
                      // Find matching entries based on what the user has typed so far (after
                      // the @ symbol)
                      .filter((item) =>
                        item.mentionLabel
                          .toLowerCase()
                          .includes(query.toLowerCase()),
                      ),
                }}
                name="test-editor"
              />
            )}
          </ClientOnly>

          <EditorReadonly content={exampleContent} mentionPath={mentionPath} />
        </div>
      </div>
    </>
  );
}

export default NxWelcome;
