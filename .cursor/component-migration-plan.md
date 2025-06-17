# Component Migration Plan

## Overview

This document outlines the plan for migrating components from the edulinksng application to the shared packages. All React components will be moved to the UI package, while utility functions will be distributed between react-utils (React-specific utilities) and utils (framework-agnostic utilities).

## Package Organization

### UI Package (`@veraclins-dev/ui`)

- All React components
- Component-specific utilities
- Component stories and documentation
- Component tests

### React-Utils Package (`@veraclins-dev/react-utils`)

- React-specific hooks
- React-specific utilities
- React-specific providers
- No components

### Utils Package (`@veraclins-dev/utils`)

- Framework-agnostic utilities
- Type definitions
- Constants
- No React dependencies

## UI Package Components

### 1. Avatar Component Migration ✅

**Current Files:**

- Source: `edulinksng/app/components/avatar.tsx`
- Target: `@veraclins-dev/ui/src/lib/ui/avatar.tsx`

**Dependencies:**

- `@veraclins-dev/ui` Avatar component
- `@veraclins-dev/utils` cn utility
- Size utilities from edulinksng

**Special Considerations:**

- Current implementation has additional features not in UI package:
  - Size customization ✅
  - Square variant ✅
  - Tooltip integration ✅
  - Icon fallback ✅
- Need to maintain backward compatibility ✅
- Need to handle size utilities migration ✅

**Action Steps:**

1. ✅ Analyze and document differences between implementations
2. ✅ Create size utilities in utils package if not exists
3. ✅ Enhance UI package Avatar component:
   - ✅ Add size prop support
   - ✅ Add square variant
   - ✅ Add tooltip integration
   - ✅ Add icon fallback support
4. ✅ Update edulinksng Avatar to use UI package:
   - ✅ Remove duplicate code
   - ✅ Update imports
   - ✅ Maintain existing API
5. ✅ Add Storybook documentation
6. ✅ Update tests

**Migration Strategy:**

1. ✅ First Phase:
   - ✅ Move size utilities to utils package
   - ✅ Enhance UI package Avatar
   - ✅ Add new features to UI package
2. ✅ Second Phase:
   - ✅ Update edulinksng Avatar to use UI package
   - ✅ Remove duplicate code
   - ✅ Update tests
3. ✅ Third Phase:
   - ✅ Add Storybook documentation
   - ✅ Update usage examples
   - ✅ Final testing

**Breaking Changes:**

- None expected, maintaining current API ✅
- Will use composition pattern for new features ✅

### 2. Progress Bar Component ✅

**File:** `progress-bar.tsx`
**Dependencies:**

- CSS animations ✅
- Theme colors ✅

**Special Considerations:**

- Should be a pure presentational component ✅
- Progress logic should be handled by parent component ✅
- Should support different variants (linear, circular) ✅
- Needs accessibility features ✅
- Should be fully controlled via props ✅

**Action Steps:**

1. ✅ Add to UI package's component library
2. ✅ Create variants in variants.ts
3. ✅ Add Storybook stories with different progress scenarios
4. ✅ Add accessibility attributes
5. ✅ Add proper TypeScript types for controlled props
6. ✅ Add documentation for progress calculation examples

### 3. Scroll Fade Component ✅

**File:** `scroll-fade.tsx`
**Dependencies:**

- Scroll position utility (in react-utils)
- Animation utilities

**Special Considerations:**

- Needs to be performant
- Should support different fade effects
- Should handle both vertical and horizontal scrolling

**Action Steps:**

1. ✅ Move to components directory
2. ✅ Add scroll position utility to react-utils
3. ✅ Add vertical and horizontal support
4. ✅ Add Storybook documentation

## Utility Functions

### React-Utils Package (`@veraclins-dev/react-utils`)

1. **React Hooks** (Already in place)
   - Form hooks (use-conform, use-submit-state, use-double-check)
   - UI hooks (use-hover, use-breakpoint, use-media-query)
   - Navigation hooks (use-matches, use-navigate-with-redirect)
   - State management hooks (use-debounce, use-delayed-is-pending)

### Utils Package (`@veraclins-dev/utils`)

1. **Date Utilities** (To be added)

   - `date.ts` - All date-related functions including:
     - Date manipulation
     - Timezone handling
     - Locale support
     - Formatting

2. **Form Utilities** (To be added)

   - `form.ts` - All form-related functions including:
     - Validation
     - Data transformation
     - State management
     - Sanitization

3. **Existing Utilities** (To be enhanced)
   - `dom.ts` - DOM manipulation and events
   - `size.ts` - Size and responsive utilities
   - `misc.ts` - Miscellaneous utilities
   - `slugify.ts` - Slug generation and manipulation
   - `types.ts` - Type definitions
   - `validation.ts` - General validation utilities

## Implementation Phases

### Phase 1: Preparation ✅

- ✅ Create necessary directories in each package
- ✅ Set up testing infrastructure
- ✅ Prepare documentation templates
- ✅ Review and update package dependencies

### Phase 2: Migration (In Progress)

- [ ] Move components to UI package
- [ ] Move utilities to appropriate packages
- [ ] Update dependencies
- [ ] Add tests
- [ ] Create documentation

### Phase 3: Integration

- [ ] Update import paths in main application
- [ ] Test integration
- [ ] Fix any issues
- [ ] Update package versions

### Phase 4: Documentation

- [ ] Create Storybook stories
- [ ] Write usage documentation
- [ ] Add examples
- [ ] Update README files

### Phase 5: Cleanup

- [ ] Remove old components
- [ ] Update package versions
- [ ] Update changelog
- [ ] Final testing

## Notes

- Each component should be moved independently to minimize disruption
- Testing should be done at each step
- Documentation should be updated as components are moved
- Consider creating a migration guide for the main application
- All React components go to UI package
- React-specific utilities go to react-utils package
- Framework-agnostic utilities go to utils package
- Each utility category should be consolidated into a single file
