export const exampleContent = `<h1><strong>Node views with React</strong></h1><p>Using Vanilla JavaScript can feel complex if you are used to work in React. Good news: You can use regular React components in your node views, too. There is just a little bit you need to know, but let’s go through this one by one.</p><h2><strong>Render a React component</strong></h2><p>Here is what you need to do to render React components inside your editor:</p><ol><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/docs/editor/extensions/custom-extensions">Create a node extension</a></p></li><li><p>Create a React component</p></li><li><p>Pass that component to the provided <code>ReactNodeViewRenderer</code></p></li><li><p>Register it with <code>addNodeView()</code></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/docs/editor/getting-started/configure">Configure Tiptap to use your new node extension</a></p></li></ol><p>This is how your node extension could look like:</p><pre><code class="language-js">import { Node } from '@tiptap/core'
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
  </code></pre><p>You don’t need to add those <code>className</code> attributes, feel free to remove them or pass other class names. Try it out in the following example:</p><p>And more</p>
  `;
