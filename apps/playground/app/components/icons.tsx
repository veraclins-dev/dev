import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
  Input,
  Separator,
  toast,
  Typography,
} from '@veraclins-dev/ui';
import { type IconName, iconNames } from '@veraclins-dev/ui/lib/icons/name';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Icons() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState<
    'xs' | 'sm' | 'md' | 'lg' | 'xl'
  >('md');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter icons based on search term
  const filteredIcons = iconNames.filter((iconName) =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Icon categories for better organization
  const iconCategories = {
    all: 'All Icons',
    arrows_chevrons: 'Arrows & Chevrons',
    navigation: 'Navigation',
    actions: 'Actions',
    objects_data: 'Objects & Data',
    media_devices: 'Media & Devices',
    communication: 'Communication',
    status_feedback: 'Status & Feedback',
    logos_social: 'Logos & Social',
    files_folders: 'Files & Folders',
    layout_editing: 'Layout & Editing',
    misc: 'Misc',
  };

  // Categorize icons
  const categorizedIcons: Record<string, IconName[]> = {
    arrows_chevrons: [
      'arrow-up',
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'arrow-long-up',
      'arrow-long-down',
      'arrow-long-left',
      'arrow-long-right',
      'arrow-small-up',
      'arrow-small-down',
      'arrow-small-left',
      'arrow-small-right',
      'arrow-top-left',
      'arrow-top-right',
      'arrow-bottom-left',
      'arrow-bottom-right',
      'arrow-up-circle',
      'arrow-down-circle',
      'arrow-left-circle',
      'arrow-right-circle',
      'arrow-uturn-up',
      'arrow-uturn-down',
      'arrow-uturn-left',
      'arrow-uturn-right',
      'arrow-trending-up',
      'arrow-trending-down',
      'arrows-up-down',
      'arrows-right-left',
      'arrows-pointing-in',
      'arrows-pointing-out',
      'arrow-turn-up-left',
      'arrow-turn-up-right',
      'arrow-turn-down-left',
      'arrow-turn-down-right',
      'arrow-turn-left-up',
      'arrow-turn-left-down',
      'arrow-turn-right-up',
      'arrow-turn-right-down',
      'arrow-path',
      'arrow-path-rounded-square',
      'thick-arrow-up',
      'thick-arrow-down',
      'thick-arrow-left',
      'thick-arrow-right',
      'double-arrow-up',
      'double-arrow-down',
      'double-arrow-left',
      'double-arrow-right',
      'triangle-up',
      'triangle-down',
      'triangle-left',
      'triangle-right',
      'backspace',
      'forward',
      'backward',
      'chevron-up',
      'chevron-down',
      'chevron-left',
      'chevron-right',
      'chevron-double-up',
      'chevron-double-down',
      'chevron-double-left',
      'chevron-double-right',
    ],
    navigation: [
      'home',
      'home-modern',
      'hamburger-menu',
      'magnifying-glass',
      'search',
      'zoom-in',
      'zoom-out',
      'enter',
      'exit',
      'login',
      'logout',
      'enter-full-screen',
      'exit-full-screen',
      'map',
      'map-pin',
      'globe',
      'globe-americas',
      'globe-asia-australia',
      'globe-europe-africa',
      'question-mark',
      'question-mark-circled',
      'info',
      'info-circled',
      'question-mark-circled',
    ],
    actions: [
      'plus',
      'plus-small',
      'plus-circle',
      'plus-circled',
      'minus',
      'minus-small',
      'minus-circled',
      'check',
      'check-square',
      'check-circle',
      'check-circled',
      'check-badge',
      'x-mark',
      'x-circle',
      'cross-1',
      'cross-2',
      'cross-circled',
      'cancel',
      'pencil',
      'pencil-1',
      'pencil-2',
      'pencil-square',
      'trash',
      'trash-can',
      'delete-column',
      'delete-row',
      'copy',
      'document-duplicate',
      'clipboard-copy',
      'download',
      'upload',
      'cloud-arrow-down',
      'cloud-arrow-up',
      'arrow-up-tray',
      'arrow-down-tray',
      'share',
      'external-link',
      'open-in-new-window',
      'redo',
      'undo',
      'rotate-counter-clockwise',
      'reload',
      'reset',
      'update',
      'pin-top',
      'pin-right',
      'pin-left',
      'pin-bottom',
      'sewing-pin',
      'sewing-pin-solid',
      'sewing-pin-filled',
      'drawing-pin',
      'drawing-pin-solid',
      'drawing-pin-filled',
      'drag-handle-dots-1',
      'drag-handle-dots-2',
      'drag-handle-horizontal',
      'drag-handle-vertical',
      'move',
      'adjustments-horizontal',
      'adjustments-vertical',
      'wrench',
      'wrench-screwdriver',
      'cog',
      'cog-6-tooth',
      'cog-8-tooth',
      'funnel',
      'switch',
    ],
    objects_data: [
      'star',
      'star-filled',
      'heart',
      'heart-filled',
      'tag',
      'bookmark',
      'bookmark-filled',
      'bookmark-slash',
      'bookmark-square',
      'user',
      'user-plus',
      'user-minus',
      'user-circle',
      'user-group',
      'person',
      'users',
      'avatar',
      'id-card',
      'identification',
      'credit-card',
      'wallet',
      'banknotes',
      'currency-dollar',
      'currency-euro',
      'currency-pound',
      'receipt-refund',
      'receipt-percent',
      'ticket',
      'gift',
      'trophy',
      'cake',
      'key',
      'lock-open',
      'lock-open-1',
      'lock-open-2',
      'lock-closed',
      'briefcase',
      'backpack',
      'shopping-bag',
      'shopping-cart',
      'building-storefront',
      'building-office',
      'building-office-2',
      'building-library',
      'bug-ant',
      'beaker',
      'cube',
      'cube-transparent',
      'puzzle-piece',
      'command-line',
      'passkey',
      'qr-code',
    ],
    media_devices: [
      'play',
      'play-circle',
      'pause',
      'pause-circle',
      'stop',
      'stop-circle',
      'track-next',
      'track-previous',
      'speaker-wave',
      'speaker-off',
      'speaker-quiet',
      'speaker-loud',
      'speaker-moderate',
      'speaker-x-mark',
      'microphone',
      'video-camera',
      'video-camera-slash',
      'film',
      'musical-note',
      'disc',
      'image',
      'photo',
      'add-photo',
      'desktop',
      'computer-desktop',
      'laptop',
      'mobile',
      'device-phone-mobile',
      'device-tablet',
      'server',
      'server-stack',
      'cpu-chip',
      'keyboard',
      'printer',
    ],
    communication: [
      'envelope-closed',
      'envelope-open',
      'phone',
      'phone-arrow-up-right',
      'phone-arrow-down-left',
      'phone-x-mark',
      'chat-bubble',
      'chat-bubble-bottom-center',
      'chat-bubble-bottom-center-text',
      'chat-bubble-left',
      'chat-bubble-left-ellipsis',
      'chat-bubble-left-right',
      'chat-bubble-oval-left',
      'chat-bubble-oval-left-ellipsis',
      'conversation',
      'at-symbol',
      'rss',
      'megaphone',
    ],
    status_feedback: [
      'check-circle',
      'check-badge',
      'check-circled',
      'x-circle',
      'exclamation-triangle',
      'exclamation-circle',
      'info-circled',
      'information-circle',
      'bell',
      'bell-slash',
      'bell-alert',
      'bell-snooze',
      'eye-open',
      'eye-closed',
      'eye-slash',
      'eye-none',
      'light-bulb',
      'bolt',
      'bolt-slash',
      'fire',
      'hand-thumb-up',
      'hand-thumb-down',
      'face-smile',
      'face-frown',
      'sparkles',
      'magic-wand',
    ],
    logos_social: [
      'facebook-logo',
      'twitter-logo',
      'instagram-logo',
      'linkedin-logo',
      'github-logo',
      'google-logo',
      'figma-logo',
      'framer-logo',
      'codesandbox-logo',
      'notion-logo',
      'x-logo',
      'discord-logo',
      'vercel-logo',
      'stitches-logo',
      'modulz-logo',
      'sketch-logo',
      'iconjar-logo',
    ],
    files_folders: [
      'file',
      'file-text',
      'file-plus',
      'file-minus',
      'document',
      'document-text',
      'document-plus',
      'document-minus',
      'document-duplicate',
      'document-check',
      'document-arrow-up',
      'document-arrow-down',
      'document-chart-bar',
      'document-magnifying-glass',
      'folder',
      'folder-plus',
      'folder-minus',
      'folder-open',
      'folder-arrow-down',
      'clipboard',
      'clipboard-copy',
      'clipboard-document',
      'clipboard-document-check',
      'clipboard-document-list',
      'archive',
      'archive-box',
      'archive-box-arrow-down',
      'archive-box-x-mark',
      'book-open',
      'newspaper',
      'reader',
    ],
    layout_editing: [
      'grid',
      'view-grid',
      'grid-on',
      'grid-off',
      'list-bullet',
      'ordered-list',
      'numbered-list',
      'layout',
      'layout-column-fill',
      'layout-row-fill',
      'view-columns',
      'view-vertical',
      'view-horizontal',
      'table',
      'align-left',
      'align-center',
      'align-right',
      'align-bottom',
      'align-center-horizontally',
      'align-center-vertically',
      'align-end',
      'align-start',
      'align-stretch',
      'align-top',
      'align-vertical-centers',
      'text-align-left',
      'text-align-center',
      'text-align-right',
      'text-align-justify',
      'text-align-bottom',
      'text-align-middle',
      'text-align-top',
      'indent-increase',
      'indent-decrease',
      'crop',
      'ruler-horizontal',
      'ruler-square',
      'scissors',
      'layers',
      'stack',
      'box-model',
      'border-all',
      'border-top',
      'border-bottom',
      'border-left',
      'border-right',
      'border-width',
      'border-style',
      'border-dotted',
      'border-dashed',
      'border-solid',
      'border-split',
      'border-none',
      'font-size',
      'font-family',
      'font-style',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'text',
      'pilcrow',
      'line-height',
      'letter-spacing',
      'letter-case-capitalize',
      'letter-case-lowercase',
      'letter-case-toggle',
      'letter-case-uppercase',
      'h1',
      'h2',
      'h3',
      'heading',
      'format-color-fill',
      'format-color-text',
      'format-clear',
      'color-wheel',
      'blending-mode',
      'opacity',
      'shadow',
      'shadow-inner',
      'shadow-outer',
      'shadow-none',
      'width',
      'height',
      'dimensions',
      'aspect-ratio',
      'stretch-horizontally',
      'stretch-vertically',
      'size',
      'scale',
      'input',
      'checkbox',
      'radiobutton',
      'switch',
      'slider',
      'button',
    ],
    misc: [
      'academic-cap',
      'angle',
      'all-sides',
      'corners',
      'corner-bottom-left',
      'corner-bottom-right',
      'corner-top-left',
      'corner-top-right',
      'cookie',
      'crumpled-paper',
      'cursor-arrow',
      'cursor-text',
      'cursor-arrow-rays',
      'cursor-arrow-ripple',
      'dash',
      'dot',
      'dot-solid',
      'dots-horizontal',
      'dots-vertical',
      'ellipsis-horizontal',
      'ellipsis-vertical',
      'face',
      'finger-print',
      'flag',
      'hand',
      'hand-raised',
      'hobby-knife',
      'lifebuoy',
      'moon',
      'sun',
      'rocket',
      'rocket-launch',
      'stopwatch',
      'timer',
      'clock',
      'counter-clockwise-clock',
      'countdown-timer',
      'lap-timer',
      'target',
      'wifi',
      'signal',
      'signal-slash',
      'value',
      'value-none',
      'variable',
      'symbol',
      'divide',
      'equals',
      'curly-braces',
      'slash',
    ],
  };

  // Get icons for selected category
  const getIconsForCategory = (category: string) => {
    if (category === 'all') return filteredIcons;
    const categoryIcons =
      categorizedIcons[category as keyof typeof categorizedIcons] || [];
    return filteredIcons.filter((icon) => categoryIcons.includes(icon));
  };

  const currentIcons = getIconsForCategory(selectedCategory);

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Icons" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Icon System
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Explore our comprehensive icon library with {iconNames.length} icons.
        Each icon is optimized for clarity and consistency across different
        sizes and contexts.
      </Typography>

      {/* Icon Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Icon Library (click on an icon to copy)</CardTitle>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={4}>
            {/* Search Input */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="body2" className="font-medium">
                Search Icons
              </Typography>
              <Input
                placeholder="Search by icon name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </Box>

            {/* Category Filter */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="body2" className="font-medium">
                Category
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {Object.entries(iconCategories).map(([key, label]) => (
                  <Button
                    key={key}
                    variant={selectedCategory === key ? 'solid' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(key)}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Size Filter */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="body2" className="font-medium">
                Icon Size
              </Typography>
              <Box display="flex" gap={2}>
                {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'solid' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.toUpperCase()}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Results Count */}
            <Typography variant="body2" className="text-muted-foreground">
              Showing {currentIcons.length} of {iconNames.length} icons
            </Typography>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            // className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-12 gap-2"
          >
            {currentIcons.reverse().map((iconName) => (
              <Button
                key={iconName}
                color="neutral"
                className="flex flex-col items-center p-2 border rounded-lg transition-colors cursor-pointer group break-all"
                tooltip={iconName}
                onClick={() => {
                  const sizeProp =
                    selectedSize !== 'md' ? ` size="${selectedSize}"` : '';
                  const iconCode = `<Icon name="${iconName}"${sizeProp} />`;
                  navigator.clipboard.writeText(iconCode);
                  toast({
                    type: 'success',
                    title: 'Copied to clipboard',
                    description: iconCode,
                  });
                }}
              >
                <Icon name={iconName} size={selectedSize} />
                {/* <Typography
                  variant="caption"
                  className="text-center text-xs break-all w-full"
                >
                  {iconName}
                </Typography> */}
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Separator />

      {/* Size Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Icon Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Typography variant="body1">
              Icons are available in multiple sizes to fit different contexts
              and design needs.
            </Typography>

            <Box display="flex" flexDirection="column" gap={4}>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <Box key={size} display="flex" items="center" gap={4}>
                  <Typography variant="body2" className="w-16 font-medium">
                    {size.toUpperCase()}
                  </Typography>
                  <Box display="flex" gap={4}>
                    <Icon name="home" size={size} />
                    <Icon name="search" size={size} />
                    <Icon name="heart" size={size} />
                    <Icon name="star" size={size} />
                    <Icon name="user" size={size} />
                    <Icon name="cog" size={size} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Color Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Icon Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Typography variant="body1">
              Icons inherit their color from the text color of their parent
              element.
            </Typography>

            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body2" className="font-medium">
                  Default
                </Typography>
                <Box display="flex" gap={2}>
                  <Icon name="heart" size="md" />
                  <Icon name="star" size="md" />
                  <Icon name="check" size="md" />
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography
                  variant="body2"
                  className="font-medium text-primary"
                >
                  Primary
                </Typography>
                <Box display="flex" gap={2} className="text-primary">
                  <Icon name="heart" size="md" />
                  <Icon name="star" size="md" />
                  <Icon name="check" size="md" />
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography
                  variant="body2"
                  className="font-medium text-success"
                >
                  Success
                </Typography>
                <Box display="flex" gap={2} className="text-success">
                  <Icon name="heart" size="md" />
                  <Icon name="star" size="md" />
                  <Icon name="check" size="md" />
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography
                  variant="body2"
                  className="font-medium text-destructive"
                >
                  Destructive
                </Typography>
                <Box display="flex" gap={2} className="text-destructive">
                  <Icon name="heart" size="md" />
                  <Icon name="star" size="md" />
                  <Icon name="check" size="md" />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Real-Life Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Life Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={8}>
            {/* Navigation Example */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Navigation
              </Typography>
              <Box className="bg-muted/20 p-6 rounded-lg">
                <Box
                  display="flex"
                  justify="between"
                  items="center"
                  className="mb-4"
                >
                  <Typography variant="h6">App Navigation</Typography>
                  <Box display="flex" gap={2}>
                    <Button variant="outline" size="sm">
                      <Icon name="search" className="mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="notification" className="mr-2" />
                      Notifications
                    </Button>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Box
                    display="flex"
                    items="center"
                    gap={3}
                    className="p-2 rounded hover:bg-background"
                  >
                    <Icon name="home" size="sm" />
                    <Typography variant="body2">Dashboard</Typography>
                  </Box>
                  <Box
                    display="flex"
                    items="center"
                    gap={3}
                    className="p-2 rounded hover:bg-background"
                  >
                    <Icon name="user" size="sm" />
                    <Typography variant="body2">Profile</Typography>
                  </Box>
                  <Box
                    display="flex"
                    items="center"
                    gap={3}
                    className="p-2 rounded hover:bg-background"
                  >
                    <Icon name="cog" size="sm" />
                    <Typography variant="body2">Settings</Typography>
                  </Box>
                  <Box
                    display="flex"
                    items="center"
                    gap={3}
                    className="p-2 rounded hover:bg-background"
                  >
                    <Icon name="question-mark-circled" size="sm" />
                    <Typography variant="body2">Help</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Action Buttons Example */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Action Buttons
              </Typography>
              <Box className="bg-muted/20 p-6 rounded-lg">
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Button>
                    <Icon name="plus" className="mr-2" />
                    Add Item
                  </Button>
                  <Button variant="outline">
                    <Icon name="pencil" className="mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" color="destructive">
                    <Icon name="trash" className="mr-2" />
                    Delete
                  </Button>
                  <Button variant="outline">
                    <Icon name="download" className="mr-2" />
                    Export
                  </Button>
                  <Button variant="outline">
                    <Icon name="share" className="mr-2" />
                    Share
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Status Indicators Example */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Status Indicators
              </Typography>
              <Box className="bg-muted/20 p-6 rounded-lg">
                <Box display="flex" flexDirection="column" gap={3}>
                  <Box display="flex" items="center" gap={3}>
                    <Icon
                      name="check-circle"
                      size="sm"
                      className="text-success"
                    />
                    <Typography variant="body2">
                      Task completed successfully
                    </Typography>
                  </Box>
                  <Box display="flex" items="center" gap={3}>
                    <Icon
                      name="exclamation-triangle"
                      size="sm"
                      className="text-warning"
                    />
                    <Typography variant="body2">
                      Warning: Please review your settings
                    </Typography>
                  </Box>
                  <Box display="flex" items="center" gap={3}>
                    <Icon
                      name="x-circle"
                      size="sm"
                      className="text-destructive"
                    />
                    <Typography variant="body2">
                      Error: Failed to save changes
                    </Typography>
                  </Box>
                  <Box display="flex" items="center" gap={3}>
                    <Icon name="info-circled" size="sm" className="text-info" />
                    <Typography variant="body2">
                      Info: New features available
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* File Management Example */}
            <Box>
              <Typography variant="h4" className="mb-4">
                File Management
              </Typography>
              <Box className="bg-muted/20 p-6 rounded-lg">
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box
                    display="flex"
                    items="center"
                    justify="between"
                    className="p-2 rounded hover:bg-background"
                  >
                    <Box display="flex" items="center" gap={3}>
                      <Icon name="document" size="sm" />
                      <Typography variant="body2">document.pdf</Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Button variant="plain" size="sm">
                        <Icon name="eye-open" size="sm" />
                      </Button>
                      <Button variant="plain" size="sm">
                        <Icon name="download" size="sm" />
                      </Button>
                      <Button variant="plain" size="sm">
                        <Icon name="trash" size="sm" />
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    items="center"
                    justify="between"
                    className="p-2 rounded hover:bg-background"
                  >
                    <Box display="flex" items="center" gap={3}>
                      <Icon name="image" size="sm" />
                      <Typography variant="body2">photo.jpg</Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Button variant="plain" size="sm">
                        <Icon name="eye-open" size="sm" />
                      </Button>
                      <Button variant="plain" size="sm">
                        <Icon name="download" size="sm" />
                      </Button>
                      <Button variant="plain" size="sm">
                        <Icon name="trash" size="sm" />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            <Box>
              <Typography variant="h4" className="mb-2">
                Basic Usage
              </Typography>
              <Box className="bg-muted p-4 rounded font-mono text-sm">
                {`import { Icon } from '@veraclins-dev/ui';

<Icon name="heart" size="md" />`}
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-2">
                With Colors
              </Typography>
              <Box className="bg-muted p-4 rounded font-mono text-sm">
                {`<Icon name="check" size="md" className="text-success" />
<Icon name="warning" size="md" className="text-warning" />
<Icon name="error" size="md" className="text-destructive" />`}
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-2">
                In Buttons
              </Typography>
              <Box className="bg-muted p-4 rounded font-mono text-sm">
                {`<Button>
  <Icon name="plus" className="mr-2" />
  Add Item
</Button>`}
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-2">
                Available Sizes
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                Icons support the following sizes: <code>xs</code>,{' '}
                <code>sm</code>, <code>md</code>, <code>lg</code>,{' '}
                <code>xl</code>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
