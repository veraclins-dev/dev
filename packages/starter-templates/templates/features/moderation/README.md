# Moderation Feature Module

Content moderation system with violation tracking, moderation queue, and automated threshold management.

## Features

- **User Violation Tracking**: Record and track user violations with severity levels
- **Moderation Queue**: Queue-based workflow for reviewing reported content
- **Violation Scoring**: Automatic point-based violation system with decay
- **Queue Management**: Assign, resolve, and escalate moderation items
- **Threshold Configuration**: Configurable thresholds for auto-hide and queue creation

## Schema

This module adds the following to the Prisma schema:

- `UserViolation` model - Tracks user violations with points and severity
- `ModerationQueue` model - Queue for moderation workflow
- `ViolationType` enum - Types of violations
- `ViolationSeverity` enum - Severity levels (p0-p3)
- `QueuePriority` enum - Queue priority levels (p0-p3)
- `QueueStatus` enum - Queue item status

**Relations added to User model:**
- `violations UserViolation[]`
- `assignedQueueItems ModerationQueue[] @relation("AssignedModerator")`
- `resolvedQueueItems ModerationQueue[] @relation("ResolvedModerator")`

## Usage

### Create Violation

```typescript
import { createViolation } from '#app/utils/moderation/violations.server';

const violation = await createViolation({
  userId: 'user-123',
  violationType: 'spam',
  severity: 'p2_moderate',
  description: 'Repeated spam content',
  entityType: 'post',
  entityId: 'post-456',
});
```

### Get User Violation Score

```typescript
import { getUserViolationScore } from '#app/utils/moderation/violations.server';

const score = await getUserViolationScore('user-123');
// Use score with VIOLATION_THRESHOLDS to determine actions
```

### Queue Management

```typescript
import {
  createQueueItem,
  assignQueueItem,
  resolveQueueItem,
  getQueueItems,
} from '#app/utils/moderation/queue.server';

// Create queue item
const item = await createQueueItem({
  entityType: 'post',
  entityId: 'post-123',
  priority: 'p1_high',
  category: 'spam',
});

// Assign to moderator
await assignQueueItem(item.id, moderatorId);

// Resolve
await resolveQueueItem(item.id, moderatorId, 'Content removed');

// Get pending items
const { data } = await getQueueItems({
  status: 'pending',
  priority: 'p1_high',
});
```

## Configuration

### Violation Points

```typescript
export const VIOLATION_POINTS = {
  p0_critical: 10,
  p1_severe: 5,
  p2_moderate: 3,
  p3_minor: 1,
};
```

### Violation Thresholds

```typescript
export const VIOLATION_THRESHOLDS = {
  warning: 5,
  restriction: 15,
  suspension: 30,
  ban: 50,
};
```

### Report Thresholds

Configure auto-hide and queue thresholds per report category in `constants.ts`.

## Dependencies

- Base template (User model, AuditLog model)
- Reporting feature module (optional, for report-based queue items)
- Logging utilities

## Feature Flag

Enable with: `features.moderation = true`

## Notes

- Violations automatically decay after 90 days
- Queue items can be assigned to moderators
- SLA deadlines can be set for queue items
- Violation scores are calculated from non-decayed violations only
