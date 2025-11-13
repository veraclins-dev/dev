# Package Duplicates and Misplaced Utilities Analysis

## Executive Summary

This document identifies duplicate utilities and utilities in the wrong package between `@veraclins-dev/utils` and `@veraclins-dev/react-utils`.

**Principle**:

- `@veraclins-dev/utils` should contain **framework-agnostic** or **generic** methods
- `@veraclins-dev/react-utils` should contain **React-specific** methods (hooks, React patterns, React Router utilities)

---

## 🔴 Duplicates Found

### 1. `closestParent`

**Location:**

- ✅ `@veraclins-dev/utils/src/lib/dom.ts` (lines 27-48)
- ❌ `@veraclins-dev/react-utils/src/lib/client/utils/dom.ts` (lines 30-52)

**Analysis:**

- **Framework-agnostic**: Pure DOM manipulation, no React dependencies
- **Implementation**: Identical in both packages
- **Recommendation**: **Keep in `utils`**, remove from `react-utils`

---

### 2. `setReactInputValue`

**Location:**

- ✅ `@veraclins-dev/utils/src/lib/dom.ts` (lines 50-69)
- ❌ `@veraclins-dev/react-utils/src/lib/client/utils/dom.ts` (lines 3-22)

**Analysis:**

- **Name suggests React**: But implementation is pure DOM manipulation
- **Usage**: Typically used with React refs (`RefObject<HTMLInputElement>`)
- **Implementation**: Identical in both packages
- **Recommendation**: **Keep in `react-utils`** (React-specific usage pattern), remove from `utils`

**Note**: Consider renaming to `setInputValue` in `react-utils` to remove "React" from name since it's just DOM.

---

### 3. `createMarkup`

**Location:**

- ❌ `@veraclins-dev/utils/src/lib/dom.ts` (lines 9-13)
- ✅ `@veraclins-dev/react-utils/src/lib/client/utils/format.ts` (lines 33-37)

**Analysis:**

- **React-specific**: Creates `{ __html: ... }` object for `dangerouslySetInnerHTML`
- **Framework-specific**: This pattern is React-specific
- **Implementation**: Identical in both packages
- **Recommendation**: **Keep in `react-utils`**, remove from `utils`

---

### 4. `highlight`

**Location:**

- ✅ `@veraclins-dev/utils/src/lib/dom.ts` (lines 3-7)
- ❌ `@veraclins-dev/react-utils/src/lib/client/utils/format.ts` (lines 28-31)

**Analysis:**

- **Framework-agnostic**: Pure string manipulation, no React dependencies
- **Implementation**: Identical in both packages
- **Recommendation**: **Keep in `utils`**, remove from `react-utils`

---

## ⚠️ Potentially Misplaced Utilities

### `getDateTimeFormat` (in `react-utils`)

**Location:**

- `@veraclins-dev/react-utils/src/lib/client/utils/format.ts` (lines 3-26)

**Analysis:**

- **Takes `Request` object**: Web API, not React-specific
- **Usage**: Typically used in React Router loaders/actions (server-side)
- **Dependencies**: Uses `intl-parse-accept-language` (framework-agnostic)
- **Recommendation**: **Keep in `react-utils`** - While not React-specific, it's commonly used in React Router contexts and the `Request` type is web-standard

**Alternative**: Could move to `utils` if we want to make it more generic, but current location is acceptable.

---

## 📋 Summary Table

| Utility              | Current Location | Correct Location   | Reason                                     |
| -------------------- | ---------------- | ------------------ | ------------------------------------------ |
| `closestParent`      | Both packages    | `utils` only       | Framework-agnostic DOM manipulation        |
| `setReactInputValue` | Both packages    | `react-utils` only | React-specific usage pattern (RefObject)   |
| `createMarkup`       | Both packages    | `react-utils` only | React-specific (`dangerouslySetInnerHTML`) |
| `highlight`          | Both packages    | `utils` only       | Framework-agnostic string manipulation     |
| `getDateTimeFormat`  | `react-utils`    | `react-utils` ✅   | Acceptable (React Router context)          |

---

## 🔧 Migration Plan

### Step 1: Remove Duplicates from Wrong Packages

1. **Remove from `utils/src/lib/dom.ts`:**
   - ❌ Remove `createMarkup` (React-specific)
   - ✅ Keep `closestParent` (framework-agnostic)
   - ✅ Keep `highlight` (framework-agnostic)
   - ❌ Remove `setReactInputValue` (React-specific usage)

2. **Remove from `react-utils/src/lib/client/utils/dom.ts`:**
   - ❌ Remove `closestParent` (duplicate, keep in utils)
   - ✅ Keep `setReactInputValue` (React-specific)
   - ✅ Keep `scrollIntoView` (uses RefObject - React-specific)
   - ✅ Keep `checkOverflow` (uses RefObject - React-specific)

3. **Remove from `react-utils/src/lib/client/utils/format.ts`:**
   - ❌ Remove `highlight` (duplicate, keep in utils)
   - ✅ Keep `createMarkup` (React-specific)
   - ✅ Keep `getDateTimeFormat` (React Router context)

### Step 2: Update Exports

1. **`utils/src/lib/dom.ts`:**
   - Export: `closestParent`, `highlight`, `stripHTMLTags`
   - Remove: `createMarkup`, `setReactInputValue`

2. **`react-utils/src/lib/client/utils/dom.ts`:**
   - Export: `setReactInputValue`, `scrollIntoView`, `checkOverflow`
   - Remove: `closestParent`

3. **`react-utils/src/lib/client/utils/format.ts`:**
   - Export: `getDateTimeFormat`, `createMarkup`
   - Remove: `highlight`

### Step 3: Update All Imports

Search and replace imports across the codebase:

- `@veraclins-dev/utils` → `@veraclins-dev/react-utils` for: `createMarkup`, `setReactInputValue`
- `@veraclins-dev/react-utils` → `@veraclins-dev/utils` for: `closestParent`, `highlight`

**Known files to update:**

- `apps/playground/app/components/notifications/notification.tsx` - Change `createMarkup` import from `@veraclins-dev/utils` to `@veraclins-dev/react-utils`

---

## 📊 Impact Analysis

### Files to Update

**In `utils` package:**

- `packages/utils/src/lib/dom.ts` - Remove 2 functions

**In `react-utils` package:**

- `packages/react-utils/src/lib/client/utils/dom.ts` - Remove 1 function
- `packages/react-utils/src/lib/client/utils/format.ts` - Remove 1 function

**In consuming codebases:**

- `edulinksng` - Already using `createMarkup` from `react-utils` ✅
- `veraclins-dev/apps/playground` - **Found usage**: `notification.tsx` imports `createMarkup` from `@veraclins-dev/utils` - needs update
- Any other consumers - Need to update imports

### Breaking Changes

⚠️ **This will be a breaking change** for any code importing:

- `closestParent` from `@veraclins-dev/react-utils` → Move to `@veraclins-dev/utils`
- `highlight` from `@veraclins-dev/react-utils` → Move to `@veraclins-dev/utils`
- `createMarkup` from `@veraclins-dev/utils` → Move to `@veraclins-dev/react-utils`
- `setReactInputValue` from `@veraclins-dev/utils` → Move to `@veraclins-dev/react-utils`

---

## ✅ Recommendations

1. **Immediate Action**: Remove duplicates to avoid confusion
2. **Version Bump**: This should be a minor version bump (breaking changes)
3. **Migration Guide**: Document the import changes in CHANGELOG
4. **Consider Renaming**: `setReactInputValue` → `setInputValue` (remove "React" from name)

---

## 🔍 Additional Notes

### Why `scrollIntoView` and `checkOverflow` are correctly in `react-utils`:

- Both use `RefObject<T>` which is React-specific
- They're designed for React component patterns
- Framework-agnostic versions would use `HTMLElement | null` instead

### Why `stripHTMLTags` is correctly in `utils`:

- Pure string manipulation
- No React dependencies
- Framework-agnostic

---

## Next Steps

1. Review this analysis
2. Approve the migration plan
3. Execute Step 1 (remove duplicates)
4. Update exports
5. Search and update all imports
6. Run tests
7. Update CHANGELOG
8. Publish new versions
