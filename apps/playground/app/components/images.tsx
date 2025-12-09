import { useState } from 'react';

import { Image } from '@veraclins-dev/image';
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Images() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const imageExamples = [
    {
      title: 'Basic Image',
      description: 'Simple image with width and height',
      src: 'https://picsum.photos/400/300',
      width: 400,
      height: 300,
      alt: 'Random landscape image',
    },
    {
      title: 'Responsive Image',
      description: 'Image that adapts to container size',
      src: 'https://picsum.photos/800/600',
      width: 800,
      height: 600,
      alt: 'Responsive landscape image',
      layout: 'responsive' as const,
    },
    {
      title: 'Fixed Size Image',
      description: 'Image with fixed dimensions',
      src: 'https://picsum.photos/300/200',
      width: 300,
      height: 200,
      alt: 'Fixed size image',
      layout: 'fixed' as const,
    },
    {
      title: 'Fill Container Image',
      description: 'Image that fills its container',
      src: 'https://picsum.photos/600/400',
      width: 600,
      height: 400,
      alt: 'Fill container image',
      layout: 'fill' as const,
    },
    {
      title: 'Blur Placeholder',
      description: 'Image with blur placeholder effect',
      src: 'https://picsum.photos/500/350',
      width: 500,
      height: 350,
      alt: 'Image with blur placeholder',
      placeholder: 'blur' as const,
      blurDataURL:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    },
    {
      title: 'Priority Loading',
      description: 'High priority image for above-the-fold content',
      src: 'https://picsum.photos/450/300',
      width: 450,
      height: 300,
      alt: 'Priority loaded image',
      priority: true,
    },
    {
      title: 'Custom Quality',
      description: 'Image with custom quality setting (100%)',
      src: 'https://picsum.photos/400/250',
      width: 400,
      height: 250,
      alt: 'Custom quality image',
      quality: 100,
    },
    {
      title: 'Custom Quality',
      description: 'Image with custom quality setting (75%)',
      src: 'https://picsum.photos/400/250',
      width: 400,
      height: 250,
      alt: 'Custom quality image',
      quality: 75,
    },
    {
      title: 'Object Fit Cover',
      description: 'Image with object-fit: cover styling',
      src: 'https://picsum.photos/350/200',
      width: 350,
      height: 200,
      alt: 'Object fit cover image',
      objectFit: 'cover' as const,
    },
    {
      title: 'Object Fit Contain',
      description: 'Image with object-fit: contain styling',
      src: 'https://picsum.photos/350/200',
      width: 350,
      height: 200,
      alt: 'Object fit contain image',
      objectFit: 'contain' as const,
    },
  ];

  const grayscaleImages = [
    {
      title: 'Grayscale Image',
      description: 'Image with grayscale filter applied',
      src: 'https://picsum.photos/400/300?grayscale',
      width: 400,
      height: 300,
      alt: 'Grayscale image',
    },
    {
      title: 'Blurred Image',
      description: 'Image with blur effect applied',
      src: 'https://picsum.photos/400/300?blur=2',
      width: 400,
      height: 300,
      alt: 'Blurred image',
    },
    {
      title: 'Grayscale + Blur',
      description: 'Combined grayscale and blur effects',
      src: 'https://picsum.photos/400/300?grayscale&blur=3',
      width: 400,
      height: 300,
      alt: 'Grayscale and blurred image',
    },
  ];

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Images" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Image Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Explore the powerful features of the @veraclins-dev/image package using
        images from{' '}
        <a
          href="https://picsum.photos/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Lorem Picsum
        </a>
        . Each example demonstrates different properties and capabilities.
      </Typography>

      {/* Basic Features Section */}
      <Box className="mb-12">
        <Typography variant="h2" className="mb-6">
          Basic Features
        </Typography>
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imageExamples.map((example, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {example.title}
                  {example.priority && (
                    <Badge color="secondary" badgeSize="sm">
                      Priority
                    </Badge>
                  )}
                </CardTitle>
                <Typography className="text-foreground/80">
                  {example.description}
                </Typography>
              </CardHeader>
              <CardContent>
                <Box
                  className={`relative overflow-hidden rounded-md ${
                    example.layout === 'fill' ? 'h-48' : ''
                  }`}
                  onClick={() => setSelectedImage(example.src)}
                >
                  <Image
                    src={example.src}
                    alt={example.alt}
                    width={example.width}
                    height={example.height}
                    layout={example.layout}
                    placeholder={example.placeholder}
                    blurDataURL={example.blurDataURL}
                    priority={example.priority}
                    quality={example.quality}
                    objectFit={example.objectFit}
                    className="cursor-pointer transition-transform hover:scale-105"
                    onLoadingComplete={(img) => {
                      console.log(`Image loaded: ${example.title}`, img);
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Separator className="my-8" />

      {/* Special Effects Section */}
      <Box className="mb-12">
        <Typography variant="h2" className="mb-6">
          Special Effects
        </Typography>
        <Typography variant="body1" className="mb-4 text-foreground/80">
          These images use Lorem Picsum's built-in effects to demonstrate
          different visual styles.
        </Typography>
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {grayscaleImages.map((example, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
                <Typography className="text-foreground/80">
                  {example.description}
                </Typography>
              </CardHeader>
              <CardContent>
                <Box className="relative overflow-hidden rounded-md">
                  <Image
                    src={example.src}
                    alt={example.alt}
                    width={example.width}
                    height={example.height}
                    className="cursor-pointer transition-transform hover:scale-105"
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Interactive Gallery */}
      <Box className="mb-12">
        <Typography variant="h2" className="mb-6">
          Interactive Gallery
        </Typography>
        <Typography variant="body1" className="mb-4 text-foreground/80">
          Click on any image to view it in a larger format. Try different Lorem
          Picsum variations:
        </Typography>
        <Box className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <Box
              key={i}
              className="relative overflow-hidden rounded-md cursor-pointer group"
              onClick={() =>
                setSelectedImage(`https://picsum.photos/400/300?random=${i}`)
              }
            >
              <Image
                src={`https://picsum.photos/200/150?random=${i}`}
                alt={`Gallery image ${i + 1}`}
                width={200}
                height={150}
                className="transition-transform group-hover:scale-110"
              />
              <Box className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Modal for selected image */}
      {selectedImage && (
        <Box
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <Box className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage}
              alt="Selected image"
              width={800}
              height={600}
              className="rounded-lg"
            />
            <Typography className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
              Click to close
            </Typography>
          </Box>
        </Box>
      )}

      {/* Usage Examples */}
      <Box className="mt-12 p-6 bg-muted rounded-lg">
        <Typography variant="h3" className="mb-4">
          Usage Examples
        </Typography>
        <Box className="space-y-4">
          <Box>
            <Typography variant="h4" className="mb-2">
              Basic Usage
            </Typography>
            <Box className="bg-background p-4 rounded border font-mono text-sm">
              {`<Image
  src="https://picsum.photos/400/300"
  alt="Description"
  width={400}
  height={300}
/>`}
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" className="mb-2">
              With Blur Placeholder
            </Typography>
            <Box className="bg-background p-4 rounded border font-mono text-sm">
              {`<Image
  src="https://picsum.photos/400/300"
  alt="Description"
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>`}
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" className="mb-2">
              Responsive Layout
            </Typography>
            <Box className="bg-background p-4 rounded border font-mono text-sm">
              {`<Image
  src="https://picsum.photos/800/600"
  alt="Description"
  width={800}
  height={600}
  layout="responsive"
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
