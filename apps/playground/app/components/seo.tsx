import { useState } from 'react';

import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Chip,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function SeoShowcase() {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'metadata'>(
    'sitemap',
  );

  const sitemapExample = `import { generateSitemap } from '@veraclins-dev/remix-seo';

export async function loader({ request }: LoaderFunctionArgs) {
  return generateSitemap(request, routes, {
    siteUrl: 'https://example.com',
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}`;

  const robotsExample = `import { generateRobotsTxt } from '@veraclins-dev/remix-seo';

export async function loader() {
  return generateRobotsTxt([
    { type: 'disallow', value: '/admin' },
    { type: 'disallow', value: '/private' },
    { type: 'sitemap', value: 'https://example.com/sitemap.xml' },
  ], {
    appendOnDefaultPolicies: true,
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}`;

  const metadataExample = `import type { MetaFunction } from '@react-router/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'My Page Title' },
    { name: 'description', content: 'Page description' },
    { property: 'og:title', content: 'My Page Title' },
    { property: 'og:description', content: 'Page description' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://example.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'My Page Title' },
    { name: 'twitter:description', content: 'Page description' },
  ];
};`;

  const structuredDataExample = `const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2024-01-01",
  "dateModified": "2024-01-01",
  "publisher": {
    "@type": "Organization",
    "name": "Site Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  }
};`;

  return (
    <Box className="w-full max-w-6xl mx-auto space-y-8">
      <PlaygroundBreadcrumb currentPage="SEO" className="mb-4" />

      <Box className="text-center space-y-4">
        <Typography variant="h1">SEO Components</Typography>
        <Typography variant="body1" className="text-neutral-foreground/70">
          Comprehensive SEO utilities for Remix applications.
        </Typography>
      </Box>

      {/* Features Overview */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge color="primary" variant="soft">
                Sitemap
              </Badge>
              XML Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography>
              Automatically generate XML sitemaps from your Remix routes with
              customizable priorities and change frequencies.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge color="success" variant="soft">
                Robots.txt
              </Badge>
              Search Engine Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography>
              Generate robots.txt files with custom policies for search engine
              crawling control and sitemap references.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge color="info" variant="soft">
                Metadata
              </Badge>
              SEO Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography>
              Manage meta tags, Open Graph, Twitter Cards, and structured data
              for optimal search engine visibility.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tab Navigation */}
      <Box className="flex gap-2 mb-6">
        <Button
          variant={activeTab === 'sitemap' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('sitemap')}
        >
          Sitemap Generation
        </Button>
        <Button
          variant={activeTab === 'robots' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('robots')}
        >
          Robots.txt
        </Button>
        <Button
          variant={activeTab === 'metadata' ? 'solid' : 'outline'}
          color="primary"
          onClick={() => setActiveTab('metadata')}
        >
          Metadata & SEO
        </Button>
      </Box>

      {/* Sitemap Tab */}
      {activeTab === 'sitemap' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sitemap Generation</CardTitle>
              <CardDescription>
                Automatically generate XML sitemaps from your Remix routes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography>
                The sitemap generator automatically discovers your routes and
                creates a properly formatted XML sitemap for search engines.
              </Typography>

              <Box>
                <Typography variant="h6" className="mb-2">
                  Basic Implementation
                </Typography>
                <Box className="bg-neutral-soft p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    <code>{sitemapExample}</code>
                  </pre>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" className="mb-2">
                  Route Configuration
                </Typography>
                <Typography className="mb-2">
                  Add SEO metadata to your route handles:
                </Typography>
                <Box className="bg-neutral-soft p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`export const handle: SEOHandle = {
  getSitemapEntries: async (request) => [
    {
      route: '/blog',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    },
    {
      route: '/about',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.5,
    },
  ],
};`}</code>
                  </pre>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" className="mb-2">
                  Available Options
                </Typography>
                <Box className="space-y-2">
                  <Box className="flex items-center gap-2">
                    <Typography className="font-medium">siteUrl:</Typography>
                    <Typography>Your website's base URL</Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    <Typography className="font-medium">headers:</Typography>
                    <Typography>Custom response headers</Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    <Typography className="font-medium">changefreq:</Typography>
                    <Typography>
                      always, hourly, daily, weekly, monthly, yearly, never
                    </Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    <Typography className="font-medium">priority:</Typography>
                    <Typography>0.0 to 1.0 (search engine priority)</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Robots.txt Tab */}
      {activeTab === 'robots' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Robots.txt Generation</CardTitle>
              <CardDescription>
                Generate robots.txt files with custom crawling policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography>
                Create robots.txt files to control search engine crawling
                behavior and reference your sitemap location.
              </Typography>

              <Box>
                <Typography variant="h6" className="mb-2">
                  Basic Implementation
                </Typography>
                <Box className="bg-neutral-soft p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    <code>{robotsExample}</code>
                  </pre>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" className="mb-2">
                  Policy Types
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box>
                    <Typography variant="subtitle2" className="mb-2">
                      Crawling Control
                    </Typography>
                    <Box className="space-y-1">
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">allow:</Typography>
                        <Typography>
                          Allow crawling of specific paths
                        </Typography>
                      </Box>
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">
                          disallow:
                        </Typography>
                        <Typography>
                          Prevent crawling of specific paths
                        </Typography>
                      </Box>
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">
                          userAgent:
                        </Typography>
                        <Typography>Target specific crawlers</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" className="mb-2">
                      Configuration
                    </Typography>
                    <Box className="space-y-1">
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">
                          sitemap:
                        </Typography>
                        <Typography>Reference sitemap location</Typography>
                      </Box>
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">
                          crawlDelay:
                        </Typography>
                        <Typography>Set crawling delay</Typography>
                      </Box>
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">
                          appendOnDefaultPolicies:
                        </Typography>
                        <Typography>Include default policies</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" className="mb-2">
                  Example Output
                </Typography>
                <Box className="bg-neutral-soft p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`User-agent: *
Allow: /

Disallow: /admin
Disallow: /private
Sitemap: https://example.com/sitemap.xml`}</code>
                  </pre>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Metadata Tab */}
      {activeTab === 'metadata' && (
        <Box className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metadata & SEO Optimization</CardTitle>
              <CardDescription>
                Manage meta tags, Open Graph, Twitter Cards, and structured data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography>
                Optimize your pages for search engines and social media sharing
                with comprehensive metadata management.
              </Typography>

              <Box>
                <Typography variant="h6" className="mb-2">
                  Meta Function
                </Typography>
                <Box className="bg-neutral-soft p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    <code>{metadataExample}</code>
                  </pre>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" className="mb-2">
                  Structured Data
                </Typography>
                <Typography className="mb-2">
                  Add structured data for rich search results:
                </Typography>
                <Box className="bg-neutral-soft p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    <code>{structuredDataExample}</code>
                  </pre>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" className="mb-2">
                  SEO Best Practices
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Box>
                    <Typography variant="subtitle2" className="mb-2">
                      Meta Tags
                    </Typography>
                    <Box className="space-y-1">
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">title:</Typography>
                        <Typography>Page title (50-60 characters)</Typography>
                      </Box>
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">
                          description:
                        </Typography>
                        <Typography>
                          Page description (150-160 characters)
                        </Typography>
                      </Box>
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">
                          keywords:
                        </Typography>
                        <Typography>
                          Target keywords (less important now)
                        </Typography>
                      </Box>
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">robots:</Typography>
                        <Typography>Crawling instructions</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" className="mb-2">
                      Social Media
                    </Typography>
                    <Box className="space-y-1">
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">
                          og:title:
                        </Typography>
                        <Typography>Open Graph title</Typography>
                      </Box>
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">
                          og:description:
                        </Typography>
                        <Typography>Open Graph description</Typography>
                      </Box>
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">
                          og:image:
                        </Typography>
                        <Typography>Social media image</Typography>
                      </Box>
                      <Box className="flex items-center gap-2">
                        <Typography className="font-medium">
                          twitter:card:
                        </Typography>
                        <Typography>Twitter card type</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Integration Examples */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Integration Examples</CardTitle>
          <CardDescription>
            Real-world examples of SEO implementation in Remix applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Box>
            <Typography variant="h6" className="mb-2">
              Blog Application
            </Typography>
            <Typography className="mb-2">
              A blog with dynamic sitemap generation and article metadata:
            </Typography>
            <Box className="bg-neutral-soft p-4 rounded-md">
              <pre className="text-sm overflow-x-auto">
                <code>{`// routes/blog.$slug.tsx
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [{ title: 'Post Not Found' }];
  }

  return [
    { title: data.post.title },
    { name: 'description', content: data.post.excerpt },
    { property: 'og:title', content: data.post.title },
    { property: 'og:description', content: data.post.excerpt },
    { property: 'og:image', content: data.post.featuredImage },
    { property: 'article:published_time', content: data.post.publishedAt },
    { property: 'article:author', content: data.post.author.name },
  ];
};

export const handle: SEOHandle = {
  getSitemapEntries: async (request) => {
    const posts = await getPosts();
    return posts.map((post) => ({
      route: \`/blog/\${post.slug}\`,
      lastmod: post.updatedAt,
      changefreq: 'weekly',
      priority: 0.7,
    }));
  },
};`}</code>
              </pre>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" className="mb-2">
              E-commerce Product Pages
            </Typography>
            <Typography className="mb-2">
              Product pages with structured data and dynamic metadata:
            </Typography>
            <Box className="bg-neutral-soft p-4 rounded-md">
              <pre className="text-sm overflow-x-auto">
                <code>{`// routes/products.$id.tsx
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { product } = data;

  return [
    { title: \`\${product.name} - \${product.brand}\` },
    { name: 'description', content: product.description },
    { property: 'og:title', content: product.name },
    { property: 'og:description', content: product.description },
    { property: 'og:image', content: product.images[0] },
    { property: 'product:price:amount', content: product.price },
    { property: 'product:price:currency', content: 'USD' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
};

// Add structured data
export const handle = {
  getStructuredData: (data: LoaderData) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.product.name,
    "description": data.product.description,
    "image": data.product.images,
    "offers": {
      "@type": "Offer",
      "price": data.product.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  })
};`}</code>
              </pre>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Package Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Package Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Box>
              <Typography variant="h6" className="mb-2">
                Installation
              </Typography>
              <Box className="bg-neutral-soft p-2 rounded-md">
                <code className="text-sm">
                  pnpm add @veraclins-dev/remix-seo
                </code>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" className="mb-2">
                Import
              </Typography>
              <Box className="bg-neutral-soft p-2 rounded-md">
                <code className="text-sm">
                  import {`{ generateSitemap, generateRobotsTxt }`} from
                  '@veraclins-dev/remix-seo';
                </code>
              </Box>
            </Box>
          </Box>

          <Box className="mt-4">
            <Typography variant="h6" className="mb-2">
              Features
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Box>
                <Chip
                  label="TypeScript Support"
                  color="primary"
                  variant="soft"
                />
              </Box>
              <Box>
                <Chip
                  label="Remix Integration"
                  color="success"
                  variant="soft"
                />
              </Box>
              <Box>
                <Chip label="SEO Best Practices" color="info" variant="soft" />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
