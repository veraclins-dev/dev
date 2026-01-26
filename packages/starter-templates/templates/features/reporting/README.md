# Reporting Feature Module

Generic content reporting system that allows users to report any entity type (content, users, etc.) with configurable categories.

## Features

- Generic entity reporting (entityType/entityId pattern)
- Configurable report categories
- Rate limiting (10 reports per hour per user)
- Duplicate report prevention
- Suspended user prevention
- Audit logging integration
- Report status tracking

## Schema

This module adds the following to the Prisma schema:

- `Report` model - Stores user reports
- `ReportCategory` enum - Report categories
- `ReportStatus` enum - Report status values

**Relations added to User model:**

- `reportsCreated Report[] @relation("ReportedBy")`
- `reportsResolved Report[] @relation("ResolvedBy")`

## Usage

### Basic Report Component

```tsx
import { Report } from '#app/components/dialogs/report';

function MyComponent() {
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setReportOpen(true)}>Report</Button>
      <Report
        entityType="post"
        entityId={post.id}
        open={reportOpen}
        onClose={() => setReportOpen(false)}
      />
    </>
  );
}
```

### Customizing Categories

Edit `app/utils/reports/category-mapping.ts` to customize categories for your entity types:

```typescript
export const REPORT_CATEGORIES_BY_ENTITY: Record<string, ReportCategory[]> = {
  user: [...SAFETY_CATEGORIES, ...USER_SPECIFIC_CATEGORIES],
  post: [...SAFETY_CATEGORIES, ...CONTENT_QUALITY_CATEGORIES],
  // Add your entity types
};
```

## API

### Report Content

```typescript
import { reportContent } from '#app/utils/reports/report.server';

const report = await reportContent({
  category: 'spam',
  entityType: 'post',
  entityId: 'post-123',
  reporterId: user.id,
  reason: 'This is spam',
});
```

## Configuration

- **Rate Limit:** 10 reports per hour per user (configurable in `validations.server.ts`)
- **Default Status:** `pending`
- **Categories:** Configurable per entity type

## Dependencies

- Base template (User model, AuditLog model)
- Rate limiting utility
- Logging utilities

## Feature Flag

Enable with: `features.reporting = true`
