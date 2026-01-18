import {
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Typography,
} from '@veraclins-dev/ui';
import { cn, humanize } from '@veraclins-dev/utils';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

type BaseToken = 'background' | 'foreground' | 'border' | 'shadow-col';

type Token =
  | BaseToken
  | 'card'
  | 'card-inner'
  | 'popover'
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info';

type ItemToken =
  | Token
  | `${Token}-hover`
  | `${Token}-soft`
  | `${Token}-soft-hover`;

type Item = {
  description: string;
  token: Token;
};

type ColorGroup = {
  description: string;
  title: string;
  items: Item[];
  noVariants?: boolean;
};

const colorGroups: ColorGroup[] = [
  {
    title: 'Brand and Action Colors',
    description: 'Brand and action color family',
    items: [
      {
        description: 'Brand and action color family',
        token: 'primary',
      },
      {
        token: 'secondary',
        description: 'Supporting action color family',
      },
      {
        token: 'neutral',
        description: 'Neutral UI surfaces and text',
      },
    ],
  },
  {
    title: 'Status Colors',
    description: 'Semantic colors for UI states',
    items: [
      {
        token: 'destructive',
        description: 'Dangerous actions or error states',
      },
      {
        token: 'success',
        description: 'Successful actions or positive states',
      },
      {
        token: 'warning',
        description: 'Warning states or cautionary messages',
      },
      {
        token: 'info',
        description: 'Informative messages or contextual information',
      },
    ],
  },
  {
    title: 'Cards and Modals',
    description: 'Card and inner surfaces with hover/soft variants',
    items: [
      {
        token: 'card',
        description: 'Card and inner surfaces with hover/soft variants',
      },
      {
        description: 'Nested card layers',
        token: 'card-inner',
      },
      {
        token: 'popover',
        description: 'Floating surface tones',
      },
    ],
  },
];

const baseTextMap: Record<BaseToken, 'foreground' | 'background'> = {
  background: 'foreground',
  foreground: 'background',
  border: 'foreground',
  'shadow-col': 'foreground',
};

function ColorToken({ token }: { token: ItemToken }) {
  const isBase = (token: ItemToken): token is BaseToken => {
    return Object.keys(baseTextMap).includes(token);
  };

  const textClasses = isBase(token)
    ? `text-${baseTextMap[token]}`
    : `text-${token}-foreground`;

  const swatchClasses = cn(
    'rounded-lg border p-4 flex flex-col gap-2 min-h-[96px]',
    `bg-${token}`,
    textClasses,
  );

  const badgeClasses = cn(
    'mt-auto text-xs rounded border border-dashed px-2 py-1 w-fit',
    `bg-${token}`,
    textClasses,
    isBase(token)
      ? `border-${baseTextMap[token]}`
      : `border-${token}-foreground`,
  );

  return (
    <Box key={token} className={swatchClasses}>
      <Typography variant="body2">
        {humanize(token.replace(/-/g, ' '))}
      </Typography>
      <Typography variant="caption" className="opacity-70">
        {`--${token}`}
      </Typography>
      <Box className={badgeClasses}>Aa</Box>
    </Box>
  );
}

function ColorItem({
  item,
  noVariants = false,
}: {
  item: Item;
  noVariants?: boolean;
}) {
  const tokens: ItemToken[] = noVariants
    ? [item.token]
    : [
        item.token,
        `${item.token}-hover`,
        `${item.token}-soft`,
        `${item.token}-soft-hover`,
      ];
  return (
    <Card>
      <CardHeader>
        <CardSubtitle>{humanize(item.token)}</CardSubtitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent
        display="grid"
        gap={3}
        className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {tokens.map((token) => (
          <ColorToken key={token} token={token} />
        ))}
      </CardContent>
    </Card>
  );
}

function BaseGroup() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Base Colors and Structural Tokens</CardTitle>
        <CardDescription>
          Background and foreground foundation tokens
        </CardDescription>
      </CardHeader>
      <CardContent
        display="grid"
        gap={3}
        className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <ColorToken token="background" />
        <ColorToken token="foreground" />
        <ColorToken token="border" />
        <ColorToken token="shadow-col" />
      </CardContent>
    </Card>
  );
}

function Group({ group }: { group: ColorGroup }) {
  return (
    <Card key={group.title}>
      <CardHeader>
        <CardTitle>{group.title}</CardTitle>
        <CardDescription>{group.description}</CardDescription>
      </CardHeader>
      <CardContent display="flex" flexDirection="column" gap={4}>
        {group.items.map((item) => (
          <ColorItem
            key={item.token}
            item={item}
            noVariants={group.noVariants}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export function Colors() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Colors" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Color Palette
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Comprehensive color system with semantic meanings, accessibility
        guidelines, and real-world usage examples.
      </Typography>

      <BaseGroup />

      {colorGroups.map((group) => (
        <Group key={group.title} group={group} />
      ))}
    </Box>
  );
}

/** Tailwind CSS color classes
//  --background
bg-background text-background border-background
//  --foreground
bg-foreground text-foreground border-foreground
//  --card
bg-card text-card border-card, border-card-foreground
bg-card-hover text-card-hover border-card-hover, border-card-hover-foreground
bg-card-soft text-card-soft border-card-soft, border-card-soft-foreground
bg-card-soft-hover text-card-soft-hover border-card-soft-hover, border-card-soft-hover-foreground
//  --card-inner
bg-card-inner text-card-inner border-card-inner, border-card-inner-foreground
bg-card-inner-hover text-card-inner-hover border-card-inner-hover, border-card-inner-hover-foreground
bg-card-inner-soft text-card-inner-soft border-card-inner-soft, border-card-inner-soft-foreground
bg-card-inner-soft-hover text-card-inner-soft-hover border-card-inner-soft-hover, border-card-inner-soft-hover-foreground
//  --primary
bg-primary text-primary border-primary, border-primary-foreground
bg-primary-hover text-primary-hover border-primary-hover, border-primary-hover-foreground
bg-primary-soft text-primary-soft border-primary-soft, border-primary-soft-foreground
bg-primary-soft-hover text-primary-soft-hover border-primary-soft-hover, border-primary-soft-hover-foreground
//  --secondary
bg-secondary text-secondary border-secondary, border-secondary-foreground
bg-secondary-hover text-secondary-hover border-secondary-hover, border-secondary-hover-foreground
bg-secondary-soft text-secondary-soft border-secondary-soft, border-secondary-soft-foreground
bg-secondary-soft-hover text-secondary-soft-hover border-secondary-soft-hover, border-secondary-soft-hover-foreground
//  --neutral
bg-neutral text-neutral border-neutral, border-neutral-foreground
bg-neutral-hover text-neutral-hover border-neutral-hover, border-neutral-hover-foreground
bg-neutral-soft text-neutral-soft border-neutral-soft, border-neutral-soft-foreground
bg-neutral-soft-hover text-neutral-soft-hover border-neutral-soft-hover, border-neutral-soft-hover-foreground
//  --destructive
bg-destructive text-destructive border-destructive, border-destructive-foreground
bg-destructive-hover text-destructive-hover border-destructive-hover, border-destructive-hover-foreground
bg-destructive-soft text-destructive-soft border-destructive-soft, border-destructive-soft-foreground
bg-destructive-soft-hover text-destructive-soft-hover border-destructive-soft-hover, border-destructive-soft-hover-foreground
//  --success
bg-success text-success border-success, border-success-foreground
bg-success-hover text-success-hover border-success-hover, border-success-hover-foreground
bg-success-soft text-success-soft border-success-soft, border-success-soft-foreground
bg-success-soft-hover text-success-soft-hover border-success-soft-hover, border-success-soft-hover-foreground
//  --warning
bg-warning text-warning border-warning, border-warning-foreground
bg-warning-hover text-warning-hover border-warning-hover, border-warning-hover-foreground
bg-warning-soft text-warning-soft border-warning-soft, border-warning-soft-foreground
bg-warning-soft-hover text-warning-soft-hover border-warning-soft-hover, border-warning-soft-hover-foreground
//  --info
bg-info text-info border-info, border-info-foreground
bg-info-hover text-info-hover border-info-hover, border-info-hover-foreground
bg-info-soft text-info-soft border-info-soft, border-info-soft-foreground
bg-info-soft-hover text-info-soft-hover border-info-soft-hover, border-info-soft-hover-foreground
*/
