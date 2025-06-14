# Component Migration Plan

## Overview

This document outlines the plan for migrating components from the edulinksng application to the shared packages (ui, react-utils, and utils). The plan is organized by package and includes dependencies, special considerations, and action steps for each component.

## UI Package Components

### 1. Avatar Component Migration

**Current Files:**

- Source: `edulinksng/app/components/avatar.tsx`
- Target: Using `@veraclins-dev/ui/src/lib/ui/avatar.tsx`

**Dependencies:**

- `@veraclins-dev/ui` Avatar component
- `@veraclins-dev/utils` cn utility
- Size utilities from edulinksng

**Special Considerations:**

- Current implementation has additional features not in UI package:
  - Size customization
  - Square variant
  - Tooltip integration
  - Icon fallback
- Need to maintain backward compatibility
- Need to handle size utilities migration

**Action Steps:**

1. Analyze and document differences between implementations
2. Create size utilities in utils package if not exists
3. Enhance UI package Avatar component:
   - Add size prop support
   - Add square variant
   - Add tooltip integration
   - Add icon fallback support
4. Update edulinksng Avatar to use UI package:
   - Remove duplicate code
   - Update imports
   - Maintain existing API
5. Add Storybook documentation
6. Update tests

**Migration Strategy:**

1. First Phase:
   - Move size utilities to utils package
   - Enhance UI package Avatar
   - Add new features to UI package
2. Second Phase:
   - Update edulinksng Avatar to use UI package
   - Remove duplicate code
   - Update tests
3. Third Phase:
   - Add Storybook documentation
   - Update usage examples
   - Final testing

**Breaking Changes:**

- None expected, maintaining current API
- Will use composition pattern for new features

### 2. Progress Bar Component

**File:** `progress-bar.tsx`
**Dependencies:**

- CSS animations
- Theme colors

**Special Considerations:**

- Should be a pure presentational component
- Progress logic should be handled by parent component
- Should support different variants (linear, circular)
- Needs accessibility features
- Should be fully controlled via props

**Action Steps:**

1. Add to UI package's component library
2. Create variants in variants.ts
3. Add Storybook stories with different progress scenarios
4. Add accessibility attributes
5. Add proper TypeScript types for controlled props
6. Add documentation for progress calculation examples

### 3. Upload Image Field

**File:** `upload-image-field.tsx`
**Dependencies:**

- Image component
- File input handling
- Image preview functionality

**Special Considerations:**

- Needs file type validation
- Should handle upload states
- Needs error handling

**Action Steps:**

1. Move to input-fields directory
2. Add file validation utilities
3. Create upload state management
4. Add Storybook examples

### 4. Navigation Components

**Files:**

- `nav-link.tsx`
- `nav-button.tsx`
- `mobile-nav.tsx`

**Dependencies:**

- Link component
- Button component
- Responsive utilities

**Special Considerations:**

- Need to be framework-agnostic
- Should support different navigation patterns

**Action Steps:**

1. Create navigation directory in UI package
2. Move components with framework abstraction
3. Add responsive utilities
4. Create Storybook documentation

### 5. Theme Switch Component

**File:** `theme-switch.tsx`
**Dependencies:**

- Theme context/provider
- Icon components

**Special Considerations:**

- Needs to be integrated with the UI package's theme system
- Should be configurable for different theme options

**Action Steps:**

1. Create theme context in UI package if not exists
2. Move component with theme integration
3. Add Storybook documentation
4. Update theme types

## React-Utils Package Components

### 1. Error Boundary Component

**File:** `error-boundary.tsx`
**Dependencies:**

- React error boundary
- Error reporting utilities

**Special Considerations:**

- Needs to be configurable for different error types
- Should support custom fallback UI

**Action Steps:**

1. Move to components directory
2. Add error type configurations
3. Create error reporting utilities
4. Add documentation

### 2. Catch Error Component

**File:** `catch-error.tsx`
**Dependencies:**

- Error handling utilities
- UI components for error display

**Special Considerations:**

- Needs to handle different error scenarios
- Should be customizable

**Action Steps:**

1. Move to components directory
2. Add error handling utilities
3. Create error display components
4. Add documentation

### 3. Confetti Component

**File:** `confetti.tsx`
**Dependencies:**

- Canvas API
- Animation utilities

**Special Considerations:**

- Performance optimization needed
- Should be configurable

**Action Steps:**

1. Move to components directory
2. Add performance optimizations
3. Create configuration options
4. Add documentation

### 4. Scroll Fade Component

**File:** `scroll-fade.tsx`
**Dependencies:**

- Intersection Observer
- Animation utilities

**Special Considerations:**

- Needs to be performant
- Should support different fade effects

**Action Steps:**

1. Move to components directory
2. Add animation utilities
3. Create configuration options
4. Add documentation

## Utils Package Components

### 1. Date Utilities

**File:** `date.ts`
**Dependencies:**

- Date manipulation libraries

**Special Considerations:**

- Should be locale-aware
- Needs timezone handling

**Action Steps:**

1. Move to utils package
2. Add locale support
3. Add timezone utilities
4. Add documentation

### 2. Form Utilities

**Directory:** `form/`
**Dependencies:**

- Validation libraries
- Form state management

**Special Considerations:**

- Needs to be framework-agnostic
- Should support different validation strategies

**Action Steps:**

1. Move to utils package
2. Add validation utilities
3. Create form state management
4. Add documentation

### 3. Image Utilities

**Directory:** `image/`
**Dependencies:**

- Image processing libraries
- File handling utilities

**Special Considerations:**

- Needs to handle different image formats
- Should support optimization

**Action Steps:**

1. Move to utils package
2. Add image processing utilities
3. Create optimization functions
4. Add documentation

### 4. Size Utilities

**File:** `size.ts`
**Dependencies:**

- Unit conversion utilities

**Special Considerations:**

- Needs to handle different units
- Should be performant

**Action Steps:**

1. Move to utils package
2. Add unit conversion utilities
3. Create size calculation functions
4. Add documentation

## Implementation Phases

### Phase 1: Preparation

- [ ] Create necessary directories in each package
- [ ] Set up testing infrastructure
- [ ] Prepare documentation templates
- [ ] Review and update package dependencies

### Phase 2: Migration

- [ ] Move components one at a time
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
