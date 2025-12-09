# Style Props Implementation Plan

## Overview

This document outlines the implementation plan for expanding the style props system in `@veraclins-dev/ui` to support additional CSS properties commonly used in Tailwind CSS. The goal is to create a comprehensive, type-safe system for extracting and applying style props across components.

## Current State

### Existing Style Props

The current implementation supports three categories of style props:

1. **Layout Variants** (`layout.ts`)
   - `display`: inline, block, flex, grid, etc.
   - `position`: static, relative, absolute, fixed, sticky
   - `visibility`: visible, hidden, collapse
   - `overflow`, `overflowX`, `overflowY`: auto, hidden, clip, visible
   - `overscroll`, `overscrollX`, `overscrollY`: auto, contain, none

2. **Size Variants** (`size.ts`)
   - `size`, `w/width`, `h/height`
   - `minW/minWidth`, `minH/minHeight`
   - `maxW/maxWidth`, `maxH/maxHeight`
   - Supports extended size scale including full, auto, fit, min, max, dvh, dvw, lvw, lvh, svh, svw, screen

3. **Space Variants** (`spaces.ts`)
   - `m/margin`, `mx/marginX`, `my/marginY`
   - `mt/marginTop`, `mr/marginRight`, `mb/marginBottom`, `ml/marginLeft`
   - `ms/marginStart`, `me/marginEnd`
   - Negative margin variants (`mNeg`, `mxNeg`, etc.)
   - `p/padding`, `px/paddingX`, `py/paddingY`
   - `pt/paddingTop`, `pr/paddingRight`, `pb/paddingBottom`, `pl/paddingLeft`
   - `ps/paddingStart`, `pe/paddingEnd`
   - `gap`, `gapX`, `gapY`

### Current Architecture

```
packages/ui/src/lib/ui/utils/variants/styles/
├── index.ts          # Main export with extractStyleProps function
├── layout.ts         # Layout-related variants
├── size.ts           # Size-related variants
└── spaces.ts         # Spacing-related variants
```

The `extractStyleProps` function in `index.ts`:

- Takes component props as input
- Separates style props from other props
- Returns `{ styleProps, others }` for use in variant functions

### Box Component Implementation

The `Box` component currently has its own flex-related variants that are NOT part of the general style props system:

- `flexDirection`, `flexWrap`, `items`, `justify`, `flex`

These are defined in `boxVariants` but not extractable via `extractStyleProps`.

## Implementation Goals

### Phase 1: High Priority (Essential)

1. **Flexbox/Grid Properties** - Extract from Box and generalize
2. **Border Properties** - Commonly used for styling

### Phase 2: Medium Priority (Very Useful)

3. **Typography Properties** - Essential for text components
4. **Background Properties** - Common styling need
5. **Shadow Properties** - Important for elevation

### Phase 3: Low Priority (Nice to Have)

6. **Opacity, Z-index, Transform, Cursor, Pointer Events, User Select**

## Detailed Implementation Plan

### Phase 1: Flexbox/Grid Properties

#### 1.1 Create `flex.ts` Variant File

**File**: `packages/ui/src/lib/ui/utils/variants/styles/flex.ts`

**Properties to Support**:

```typescript
// Flex Direction
flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';

// Flex Wrap
flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';

// Align Items
items: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
alignItems: 'start' | 'end' | 'center' | 'baseline' | 'stretch'; // Alias

// Justify Content
justify: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
justifyContent: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'; // Alias

// Flex
flex: '1' | 'auto' | 'initial' | 'none';

// Flex Grow
flexGrow: 0 | 1;
grow: 0 | 1; // Alias

// Flex Shrink
flexShrink: 0 | 1;
shrink: 0 | 1; // Alias

// Align Self
alignSelf: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline';
self: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline'; // Alias

// Order
order: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'first' | 'last' | 'none';
```

**Implementation Pattern**:

```typescript
const flexDirectionValues = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
type FlexDirection = (typeof flexDirectionValues)[number];

function generateFlexDirectionVariants() {
  return flexDirectionValues.reduce(
    (acc, value) => {
      acc[value] = `flex-${value === 'row' ? 'row' : value === 'column' ? 'col' : value === 'row-reverse' ? 'row-reverse' : 'col-reverse'}`;
      return acc;
    },
    {} as Record<FlexDirection, string>,
  );
}

const flexVariants = {
  flexDirection: generateFlexDirectionVariants(),
  flexWrap: {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
  },
  items: {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  },
  alignItems: {
    /* same as items */
  },
  justify: {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  },
  justifyContent: {
    /* same as justify */
  },
  flex: {
    '1': 'flex-1',
    auto: 'flex-auto',
    initial: 'flex-initial',
    none: 'flex-none',
  },
  flexGrow: {
    0: 'grow-0',
    1: 'grow',
  },
  grow: {
    /* same as flexGrow */
  },
  flexShrink: {
    0: 'shrink-0',
    1: 'shrink',
  },
  shrink: {
    /* same as flexShrink */
  },
  alignSelf: {
    auto: 'self-auto',
    start: 'self-start',
    end: 'self-end',
    center: 'self-center',
    stretch: 'self-stretch',
    baseline: 'self-baseline',
  },
  self: {
    /* same as alignSelf */
  },
  order: {
    1: 'order-1',
    2: 'order-2',
    // ... up to 12
    first: 'order-first',
    last: 'order-last',
    none: 'order-none',
  },
} as const;

type FlexVariants = typeof flexVariants;
export { type FlexVariants, flexVariants };
```

#### 1.2 Create `grid.ts` Variant File

**File**: `packages/ui/src/lib/ui/utils/variants/styles/grid.ts`

**Properties to Support**:

```typescript
// Grid Template Columns
gridCols: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none' | 'subgrid'
gridTemplateColumns: /* same as gridCols */ // Alias

// Grid Template Rows
gridRows: 1 | 2 | 3 | 4 | 5 | 6 | 'none' | 'subgrid'
gridTemplateRows: /* same as gridRows */ // Alias

// Grid Column Span
colSpan: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full' | 'auto'
gridColumnSpan: /* same as colSpan */ // Alias

// Grid Row Span
rowSpan: 1 | 2 | 3 | 4 | 5 | 6 | 'full' | 'auto'
gridRowSpan: /* same as rowSpan */ // Alias

// Place Items
placeItems: 'start' | 'end' | 'center' | 'stretch' | 'baseline'

// Place Content
placeContent: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around' | 'evenly' | 'baseline'

// Place Self
placeSelf: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline'

// Gap (already in spaces.ts, but grid-specific gap could be added)
gap: /* already exists */
gapX: /* already exists */
gapY: /* already exists */
```

**Implementation Pattern**:

```typescript
const gridColsScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none', 'subgrid'] as const;

function generateGridColsVariants() {
  return gridColsScale.reduce(
    (acc, value) => {
      if (typeof value === 'number') {
        acc[value] = `grid-cols-${value}`;
      } else {
        acc[value] = value === 'none' ? 'grid-cols-none' : 'grid-cols-subgrid';
      }
      return acc;
    },
    {} as Record<(typeof gridColsScale)[number], string>,
  );
}

const gridVariants = {
  gridCols: generateGridColsVariants(),
  gridTemplateColumns: generateGridColsVariants(), // Alias
  // ... similar for other properties
} as const;

type GridVariants = typeof gridVariants;
export { type GridVariants, gridVariants };
```

#### 1.3 Update Box Component

**File**: `packages/ui/src/lib/ui/box.tsx`

**Changes**:

- Remove flex-related props from Box-specific handling
- Let them be extracted via `extractStyleProps`
- Update `boxVariants` to use flex variants from style props

**Before**:

```typescript
function Box({
  flexDirection,
  items,
  justify,
  flexWrap,
  flex,
  ...props
}: BoxProps) {
  const { styleProps, others } = extractStyleProps(props);
  return (
    <Component
      className={cn(
        boxVariants({
          ...styleProps,
          flexDirection, // Handled separately
          flexWrap,
          items,
          justify,
          flex,
        }),
      )}
    />
  );
}
```

**After**:

```typescript
function Box({ ...props }: BoxProps) {
  const { styleProps, others } = extractStyleProps(props);
  return (
    <Component
      className={cn(
        boxVariants(styleProps), // All style props extracted automatically
      )}
      {...others}
    />
  );
}
```

#### 1.4 Update Box Variants

**File**: `packages/ui/src/lib/ui/utils/variants/box.ts`

**Changes**:

- Import flex variants from style props
- Remove duplicate flex variant definitions
- Use style props in responsive configuration

### Phase 2: Border Properties

#### 2.1 Create `border.ts` Variant File

**File**: `packages/ui/src/lib/ui/utils/variants/styles/border.ts`

**Properties to Support**:

```typescript
// Border Width
border: 0 | 2 | 4 | 8
borderWidth: 0 | 2 | 4 | 8 // Alias

// Directional Border Width
borderTop: 0 | 2 | 4 | 8
borderRight: 0 | 2 | 4 | 8
borderBottom: 0 | 2 | 4 | 8
borderLeft: 0 | 2 | 4 | 8
borderX: 0 | 2 | 4 | 8
borderY: 0 | 2 | 4 | 8

// Border Radius
rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
borderRadius: /* same as rounded */ // Alias

// Directional Border Radius
roundedTop: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
roundedRight: /* same */
roundedBottom: /* same */
roundedLeft: /* same */

// Corner Border Radius
roundedTopLeft: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
roundedTopRight: /* same */
roundedBottomRight: /* same */
roundedBottomLeft: /* same */
```

**Implementation Pattern**:

```typescript
const borderWidthScale = [0, 2, 4, 8] as const;
const borderRadiusScale = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const;

function generateBorderWidthVariants() {
  return borderWidthScale.reduce(
    (acc, value) => {
      acc[value] = value === 0 ? 'border-0' : `border-${value}`;
      return acc;
    },
    {} as Record<(typeof borderWidthScale)[number], string>,
  );
}

function generateBorderRadiusVariants() {
  return borderRadiusScale.reduce(
    (acc, value) => {
      acc[value] = value === 'none' ? 'rounded-none' : `rounded-${value}`;
      return acc;
    },
    {} as Record<(typeof borderRadiusScale)[number], string>,
  );
}

const borderVariants = {
  border: generateBorderWidthVariants(),
  borderWidth: generateBorderWidthVariants(), // Alias
  borderTop: generateBorderWidthVariants(),
  borderRight: generateBorderWidthVariants(),
  borderBottom: generateBorderWidthVariants(),
  borderLeft: generateBorderWidthVariants(),
  borderX: generateBorderWidthVariants(),
  borderY: generateBorderWidthVariants(),
  rounded: generateBorderRadiusVariants(),
  borderRadius: generateBorderRadiusVariants(), // Alias
  roundedTop: generateBorderRadiusVariants(),
  roundedRight: generateBorderRadiusVariants(),
  roundedBottom: generateBorderRadiusVariants(),
  roundedLeft: generateBorderRadiusVariants(),
  roundedTopLeft: generateBorderRadiusVariants(),
  roundedTopRight: generateBorderRadiusVariants(),
  roundedBottomRight: generateBorderRadiusVariants(),
  roundedBottomLeft: generateBorderRadiusVariants(),
} as const;

type BorderVariants = typeof borderVariants;
export { type BorderVariants, borderVariants };
```

### Phase 3: Typography Properties

#### 3.1 Create `typography.ts` Variant File

**File**: `packages/ui/src/lib/ui/utils/variants/styles/typography.ts`

**Properties to Support**:

```typescript
// Font Size
fontSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

// Font Weight
fontWeight: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

// Line Height
lineHeight: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';

// Text Align
textAlign: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';

// Text Transform
textTransform: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';

// Letter Spacing
letterSpacing: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

// Text Decoration
textDecoration: 'underline' | 'overline' | 'line-through' | 'no-underline';

// Text Overflow
textOverflow: 'truncate' | 'ellipsis' | 'clip';

// Whitespace
whitespace: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'break-spaces';
```

**Implementation Pattern**:

```typescript
const fontSizeScale = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'] as const;

function generateFontSizeVariants() {
  return fontSizeScale.reduce(
    (acc, value) => {
      acc[value] = `text-${value}`;
      return acc;
    },
    {} as Record<(typeof fontSizeScale)[number], string>,
  );
}

const typographyVariants = {
  fontSize: generateFontSizeVariants(),
  fontWeight: {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  },
  lineHeight: {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  },
  textAlign: {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
    start: 'text-start',
    end: 'text-end',
  },
  // ... similar for other properties
} as const;

type TypographyVariants = typeof typographyVariants;
export { type TypographyVariants, typographyVariants };
```

### Phase 4: Background Properties

#### 4.1 Create `background.ts` Variant File

**File**: `packages/ui/src/lib/ui/utils/variants/styles/background.ts`

**Properties to Support**:

```typescript
// Background Color (theme colors)
bg: 'transparent' | 'primary' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info' | 'neutral' | 'background' | 'foreground'
backgroundColor: /* same as bg */ // Alias

// Background Opacity
bgOpacity: 0 | 5 | 10 | 20 | 25 | 30 | 40 | 50 | 60 | 70 | 75 | 80 | 90 | 95 | 100
backgroundOpacity: /* same as bgOpacity */ // Alias
```

**Note**: Background color should integrate with theme system. Consider if this should be part of style props or remain component-specific.

### Phase 5: Shadow Properties

#### 5.1 Create `shadow.ts` Variant File

**File**: `packages/ui/src/lib/ui/utils/variants/styles/shadow.ts`

**Properties to Support**:

```typescript
shadow: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'
boxShadow: /* same as shadow */ // Alias
```

### Phase 6: Additional Properties (Low Priority)

#### 6.1 Create `effects.ts` Variant File

**File**: `packages/ui/src/lib/ui/utils/variants/styles/effects.ts`

**Properties to Support**:

```typescript
// Opacity
opacity: 0 | 5 | 10 | 20 | 25 | 30 | 40 | 50 | 60 | 70 | 75 | 80 | 90 | 95 | 100;

// Z-index
z: 0 | 10 | 20 | 30 | 40 | 50 | 'auto';
/* same as z */ // Alias

// Transform
zIndex: scale: 0 | 50 | 75 | 90 | 95 | 100 | 105 | 110 | 125 | 150;
rotate: 0 | 1 | 2 | 3 | 6 | 12 | 45 | 90 | 180;
/* use size scale */
translateX: /* use size scale */

// Cursor
translateY: cursor: 'auto' | 'default' | 'pointer' | 'wait' | 'text' | 'move' | 'help' | 'not-allowed';

// Pointer Events
pointerEvents: 'none' | 'auto';

// User Select
userSelect: 'none' | 'text' | 'all' | 'auto';
```

## Implementation Steps

### Step 1: Update Main Index File

**File**: `packages/ui/src/lib/ui/utils/variants/styles/index.ts`

**Changes**:

1. Import all new variant files
2. Update `StyleProps` type to include all new variants
3. Update `styleProps` object to include all new variants
4. Ensure `extractStyleProps` function handles all new props

```typescript
import { type LayoutVariants, layoutVariants } from './layout';
import { type SizeVariants, sizeVariants } from './size';
import { type SpaceVariants, spaceVariants } from './spaces';
import { type FlexVariants, flexVariants } from './flex';
import { type GridVariants, gridVariants } from './grid';
import { type BorderVariants, borderVariants } from './border';
import { type TypographyVariants, typographyVariants } from './typography';
import { type BackgroundVariants, backgroundVariants } from './background';
import { type ShadowVariants, shadowVariants } from './shadow';
import { type EffectsVariants, effectsVariants } from './effects';

type StyleProps = LayoutVariants & SizeVariants & SpaceVariants & FlexVariants & GridVariants & BorderVariants & TypographyVariants & BackgroundVariants & ShadowVariants & EffectsVariants;

const styleProps: StyleProps = {
  ...spaceVariants,
  ...sizeVariants,
  ...layoutVariants,
  ...flexVariants,
  ...gridVariants,
  ...borderVariants,
  ...typographyVariants,
  ...backgroundVariants,
  ...shadowVariants,
  ...effectsVariants,
};

// extractStyleProps function remains the same
```

### Step 2: Update Box Variants

**File**: `packages/ui/src/lib/ui/utils/variants/box.ts`

**Changes**:

1. Remove duplicate flex variant definitions
2. Import flex variants from style props
3. Use style props in responsive configuration

```typescript
import { styleProps } from './styles';

const boxVariants = cva({
  base: BOX_DEFAULT_CLASSES,
  responsive: {
    ...styleProps, // Now includes flex variants
  },
  variants: {
    // Remove flex-related variants - they're now in styleProps
  },
});
```

### Step 3: Update Box Component

**File**: `packages/ui/src/lib/ui/box.tsx`

**Changes**:

1. Remove explicit flex prop destructuring
2. Let `extractStyleProps` handle all style props

### Step 4: Create Variant Files

Create each variant file following the patterns established in existing files:

1. `flex.ts`
2. `grid.ts`
3. `border.ts`
4. `typography.ts`
5. `background.ts`
6. `shadow.ts`
7. `effects.ts`

### Step 5: Update Type Exports

Ensure all new types are exported from the main index file for use in components.

## Testing Strategy

### Unit Tests

Create test files for each new variant module:

- `flex.test.ts`
- `grid.test.ts`
- `border.test.ts`
- `typography.test.ts`
- `background.test.ts`
- `shadow.test.ts`
- `effects.test.ts`

**Test Cases**:

1. Verify all variant values map to correct Tailwind classes
2. Test alias props (e.g., `alignItems` vs `items`)
3. Test `extractStyleProps` correctly identifies new style props
4. Test that non-style props are not extracted

### Integration Tests

1. Test Box component with new flex props extracted automatically
2. Test components using new style props
3. Verify responsive variants work correctly
4. Test type safety with TypeScript

### Example Test

```typescript
import { describe, it, expect } from 'vitest';
import { extractStyleProps } from './index';

describe('extractStyleProps', () => {
  it('extracts flex style props', () => {
    const props = {
      flexDirection: 'column',
      items: 'center',
      justify: 'between',
      onClick: () => {},
    };

    const { styleProps, others } = extractStyleProps(props);

    expect(styleProps).toEqual({
      flexDirection: 'column',
      items: 'center',
      justify: 'between',
    });

    expect(others).toEqual({
      onClick: expect.any(Function),
    });
  });
});
```

## Migration Guide

### For Component Authors

**Before**:

```typescript
<Box
  flexDirection="column"
  items="center"
  justify="between"
  margin={4}
  padding={2}
>
  Content
</Box>
```

**After** (No change needed - works the same):

```typescript
<Box
  flexDirection="column"
  items="center"
  justify="between"
  margin={4}
  padding={2}
>
  Content
</Box>
```

### For New Components

Components can now use `extractStyleProps` to automatically extract all style props:

```typescript
function MyComponent({ className, children, ...props }: MyComponentProps) {
  const { styleProps, others } = extractStyleProps(props);

  return (
    <div
      className={cn(
        myComponentVariants(styleProps),
        className
      )}
      {...others}
    >
      {children}
    </div>
  );
}
```

## File Structure

After implementation:

```
packages/ui/src/lib/ui/utils/variants/styles/
├── index.ts          # Main export with extractStyleProps
├── layout.ts         # Display, position, visibility, overflow
├── size.ts           # Width, height, min/max sizes
├── spaces.ts         # Margin, padding, gap
├── flex.ts           # Flexbox properties (NEW)
├── grid.ts           # Grid properties (NEW)
├── border.ts         # Border width and radius (NEW)
├── typography.ts     # Text styling (NEW)
├── background.ts     # Background color and opacity (NEW)
├── shadow.ts         # Box shadow (NEW)
└── effects.ts        # Opacity, z-index, transform, cursor, etc. (NEW)
```

## Considerations

### 1. Theme Color Integration

Background and border colors should integrate with the theme system. Consider:

- Should `bg` prop accept theme color names?
- Should it be separate from style props?
- How to handle color variants (primary, secondary, etc.)?

### 2. Performance

- Large number of style props could impact `extractStyleProps` performance
- Consider memoization if needed
- Current implementation should be fine for typical use cases

### 3. Type Safety

- Ensure all variant types are properly exported
- Maintain strict TypeScript checking
- Use `as const` for all variant objects

### 4. Responsive Variants

- All new variants should support responsive breakpoints
- Follow existing pattern in `layout.ts`, `size.ts`, `spaces.ts`
- Use CVA's responsive configuration

### 5. Documentation

- Update JSDoc comments for `extractStyleProps`
- Document all new style props
- Create examples for each category

## Timeline Estimate

- **Phase 1 (Flexbox/Grid)**: 2-3 days
- **Phase 2 (Border)**: 1 day
- **Phase 3 (Typography)**: 1-2 days
- **Phase 4 (Background)**: 1 day
- **Phase 5 (Shadow)**: 0.5 days
- **Phase 6 (Effects)**: 1-2 days
- **Testing & Documentation**: 2-3 days

**Total**: ~10-14 days

## Success Criteria

1. ✅ All new style props are extractable via `extractStyleProps`
2. ✅ Box component uses extracted flex props (no duplication)
3. ✅ All variants map to correct Tailwind classes
4. ✅ Type safety maintained throughout
5. ✅ Responsive variants work correctly
6. ✅ Unit tests pass
7. ✅ Integration tests pass
8. ✅ Documentation updated
9. ✅ No breaking changes to existing API

## Next Steps

1. Review and approve this implementation plan
2. Start with Phase 1 (Flexbox/Grid) as proof of concept
3. Iterate based on feedback
4. Continue with remaining phases
5. Comprehensive testing
6. Documentation updates
7. Release
