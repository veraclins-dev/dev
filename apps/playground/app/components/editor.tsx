import { useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';

import { EditorField, EditorReadonly } from '@veraclins-dev/editor';
import { Form, useConform } from '@veraclins-dev/form';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  TextareaField,
  TextField,
  Typography,
} from '@veraclins-dev/ui';
import { z } from '@veraclins-dev/utils';

import { exampleContent } from './data';
import { PlaygroundBreadcrumb } from './playground-breadcrumb';

const ArticleFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  excerpt: z.string().optional(),
});

const defaultContent =
  '<h2>Welcome to the Rich Text Editor!</h2><p>This is a <strong>powerful</strong> editor that supports:</p><ul><li><strong>Bold</strong> and <em>italic</em> text</li><li>Bullet points and numbered lists</li><li>Headings and subheadings</li><li>Links and images</li><li>And much more!</li></ul><p>Try editing this content to see the editor in action.</p>';

function ArticleFormExample() {
  const [submitted, setSubmitted] = useState(false);
  const { form, fields } = useConform({
    schema: ArticleFormSchema,
    id: 'article-form',
    defaultValue: {
      title: '',
      content: '',
      excerpt: '',
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Article Form with Rich Text Editor</CardTitle>
        <CardDescription>
          Complete form example using EditorField for content creation with
          validation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ClientOnly
          fallback={
            <Box className="w-full h-64 border rounded-md p-4 bg-muted/20 flex items-center justify-center">
              <Typography variant="body2" className="text-muted-foreground">
                Loading form...
              </Typography>
            </Box>
          }
        >
          {() => (
            <Box className="space-y-4">
              <Typography variant="body2" className="text-muted-foreground">
                This form demonstrates how to use EditorField within a form
                context. The editor content is validated and submitted along
                with other form fields.
              </Typography>
              <Form
                noButtons
                form={form}
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data = Object.fromEntries(formData);
                  console.log('Form submitted:', data);
                  setSubmitted(true);
                  setTimeout(() => setSubmitted(false), 3000);
                }}
                className="space-y-4"
              >
                <TextField
                  field={fields.title}
                  placeholder="Enter article title"
                  label="Title"
                />

                <EditorField
                  field={fields.content}
                  placeholder="Start writing your article content..."
                  label="Content"
                  className="min-h-[300px]"
                  defaultValue={defaultContent}
                />

                <TextareaField
                  field={fields.excerpt}
                  placeholder="Brief summary (optional)"
                  label="Excerpt"
                  rows={2}
                />

                <Box className="flex items-center gap-4">
                  <Button type="submit" variant="solid" color="primary">
                    Submit Article
                  </Button>
                  {submitted && (
                    <Typography variant="body2" className="text-success">
                      Form submitted successfully! (Check console for data)
                    </Typography>
                  )}
                </Box>
              </Form>
            </Box>
          )}
        </ClientOnly>
      </CardContent>
    </Card>
  );
}

export function Editor() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Editor" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Rich Text Editor Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Advanced text editor components for content creation and display with
        comprehensive formatting capabilities.
      </Typography>

      {/* Rich Text Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Rich Text Editor</CardTitle>
          <CardDescription>
            Advanced text editor for content creation with full formatting
            capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientOnly
            fallback={
              <Box className="w-full h-64 border rounded-md p-4 bg-muted/20 flex items-center justify-center">
                <Typography variant="body2" className="text-muted-foreground">
                  Loading rich text editor...
                </Typography>
              </Box>
            }
          >
            {() => (
              <Box className="space-y-4">
                <Typography variant="body2" className="text-muted-foreground">
                  Try typing in the editor below. You can use the toolbar to
                  format your text, add links, lists, and more.
                </Typography>
                <EditorField defaultValue="" name="demo-editor" />
              </Box>
            )}
          </ClientOnly>
        </CardContent>
      </Card>

      {/* Rich Text Editor with Default Content */}
      <Card>
        <CardHeader>
          <CardTitle>Rich Text Editor with Default Content</CardTitle>
          <CardDescription>
            Editor pre-populated with sample content for demonstration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientOnly
            fallback={
              <Box className="w-full h-64 border rounded-md p-4 bg-muted/20 flex items-center justify-center">
                <Typography variant="body2" className="text-muted-foreground">
                  Loading rich text editor...
                </Typography>
              </Box>
            }
          >
            {() => (
              <Box className="space-y-4">
                <Typography variant="body2" className="text-muted-foreground">
                  This editor starts with some pre-filled content that you can
                  edit or replace.
                </Typography>
                <EditorField
                  defaultValue={defaultContent}
                  name="demo-editor-with-content"
                />
              </Box>
            )}
          </ClientOnly>
        </CardContent>
      </Card>

      {/* Article Form with Editor */}
      <ArticleFormExample />

      {/* Rich Text Editor Readonly */}
      <Card>
        <CardHeader>
          <CardTitle>Rich Text Editor Readonly</CardTitle>
          <CardDescription>
            Display formatted content in read-only mode for content viewing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Typography variant="body2" className="text-muted-foreground">
              This component displays rich content in a read-only format,
              perfect for showing formatted content without editing
              capabilities.
            </Typography>
            <EditorReadonly content={exampleContent} />
          </Box>
        </CardContent>
      </Card>

      {/* Rich Text Editor Readonly with Custom Content */}
      <Card>
        <CardHeader>
          <CardTitle>Rich Text Editor Readonly - Custom Content</CardTitle>
          <CardDescription>
            Another example of read-only content with different formatting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Typography variant="body2" className="text-muted-foreground">
              This example shows how the readonly component handles different
              types of content formatting.
            </Typography>
            <EditorReadonly
              content={`<h1>Sample Article</h1>
<p>This is a <strong>sample article</strong> that demonstrates various formatting options available in the rich text editor.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Bold text</strong> for emphasis</li>
  <li><em>Italic text</em> for subtle emphasis</li>
  <li><a href="https://example.com">Links</a> to external resources</li>
  <li>Bullet points for lists</li>
</ul>

<h2>Code Examples</h2>
<p>You can also include <code>inline code</code> and code blocks:</p>
<pre><code>function greet(name) {
  return \`Hello, \${name}!\`;
}</code></pre>

<h2>Conclusion</h2>
<p>The rich text editor provides a comprehensive set of tools for creating well-formatted content that can be displayed consistently across different platforms.</p>`}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>
            Code examples showing how to implement the editor components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-6">
            {/* EditorField Example */}
            <Box>
              <Typography variant="h4" className="mb-3">
                EditorField Component
              </Typography>
              <Box className="bg-muted p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { EditorField } from '@veraclins-dev/editor';

// Basic usage
<EditorField name="content" />

// With default value
<EditorField
  name="content"
  defaultValue="<p>Initial content</p>"
/>

// With custom configuration
<EditorField
  name="content"
  placeholder="Start typing your content..."
  className="min-h-[200px]"
/>`}</code>
                </pre>
              </Box>
            </Box>

            {/* EditorReadonly Example */}
            <Box>
              <Typography variant="h4" className="mb-3">
                EditorReadonly Component
              </Typography>
              <Box className="bg-muted p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { EditorReadonly } from '@veraclins-dev/editor';

// Basic usage
<EditorReadonly content={htmlContent} />

// With custom styling
<EditorReadonly
  content={htmlContent}
  className="prose prose-sm max-w-none"
/>

// Content from API or database
<EditorReadonly content={article.content} />`}</code>
                </pre>
              </Box>
            </Box>

            {/* ClientOnly Wrapper */}
            <Box>
              <Typography variant="h4" className="mb-3">
                ClientOnly Wrapper
              </Typography>
              <Typography variant="body2" className="mb-2">
                Since the editor components are client-side only, wrap them in a
                ClientOnly component to prevent hydration issues:
              </Typography>
              <Box className="bg-muted p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { ClientOnly } from 'remix-utils/client-only';
import { EditorField } from '@veraclins-dev/editor';

<ClientOnly
  fallback={<div>Loading editor...</div>}
>
  {() => <EditorField name="content" />}
</ClientOnly>`}</code>
                </pre>
              </Box>
            </Box>

            {/* Form Integration Example */}
            <Box>
              <Typography variant="h4" className="mb-3">
                Form Integration
              </Typography>
              <Typography variant="body2" className="mb-2">
                Use EditorField within a form with validation using Conform:
              </Typography>
              <Box className="bg-muted p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { EditorField } from '@veraclins-dev/editor';
import { Form, useConform } from '@veraclins-dev/form';
import { TextField } from '@veraclins-dev/ui';
import { z } from '@veraclins-dev/utils';

const ArticleSchema = z.object({
  title: z.string().min(3, 'Title required'),
  content: z.string().min(10, 'Content required'),
});

function ArticleForm() {
  const { form, fields } = useConform({
    schema: ArticleSchema,
    id: 'article-form',
  });

  return (
    <Form form={form}>
      <TextField field={fields.title} label="Title" />
      <EditorField
        field={fields.content}
        label="Content"
        placeholder="Start writing..."
      />
      <button type="submit">Submit</button>
    </Form>
  );
}`}</code>
                </pre>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Editor Features</CardTitle>
          <CardDescription>
            Overview of the rich text editor capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Box>
              <Typography variant="h4" className="mb-3">
                Text Formatting
              </Typography>
              <Box className="space-y-2">
                <Typography variant="body2">
                  • Bold, italic, and underline
                </Typography>
                <Typography variant="body2">
                  • Strikethrough and code formatting
                </Typography>
                <Typography variant="body2">
                  • Text alignment (left, center, right, justify)
                </Typography>
                <Typography variant="body2">
                  • Text color and background color
                </Typography>
                <Typography variant="body2">
                  • Font size and family selection
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-3">
                Content Structure
              </Typography>
              <Box className="space-y-2">
                <Typography variant="body2">
                  • Headings (H1, H2, H3, H4, H5, H6)
                </Typography>
                <Typography variant="body2">
                  • Bullet points and numbered lists
                </Typography>
                <Typography variant="body2">
                  • Blockquotes and code blocks
                </Typography>
                <Typography variant="body2">
                  • Horizontal rules and dividers
                </Typography>
                <Typography variant="body2">
                  • Paragraph and line breaks
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-3">
                Media & Links
              </Typography>
              <Box className="space-y-2">
                <Typography variant="body2">• Insert and edit links</Typography>
                <Typography variant="body2">
                  • Image upload and embedding
                </Typography>
                <Typography variant="body2">• Video embedding</Typography>
                <Typography variant="body2">• File attachments</Typography>
                <Typography variant="body2">
                  • Media alignment and sizing
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-3">
                Advanced Features
              </Typography>
              <Box className="space-y-2">
                <Typography variant="body2">
                  • Undo and redo functionality
                </Typography>
                <Typography variant="body2">• Find and replace text</Typography>
                <Typography variant="body2">
                  • Table creation and editing
                </Typography>
                <Typography variant="body2">
                  • Custom keyboard shortcuts
                </Typography>
                <Typography variant="body2">
                  • Accessibility features
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
