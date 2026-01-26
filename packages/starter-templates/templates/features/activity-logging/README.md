# Activity Logging Feature Module

Query and retrieval utilities for audit logs. The base template already includes the `AuditLog` model and basic logging functions (`createAuditLog`, `logUserAction`). This module adds query utilities for retrieving and filtering audit logs.

## Features

- **Query Audit Logs**: Retrieve audit logs with flexible filtering
- **Entity Logs**: Get logs for specific entities
- **User Activity**: Get activity logs for specific users
- **Group Activity**: Get activity logs for specific groups
- **Date Filtering**: Filter logs by date range
- **Log Cleanup**: Utility to clean up expired logs

## Dependencies

- Base template (AuditLog model, `createAuditLog`, `logUserAction`)

## Usage

### Get Audit Logs with Options

```typescript
import { getAuditLogsByOptions } from '#app/utils/activity-logging/activity-logging.server';

const { items, hasMore, nextPage, count } = await getAuditLogsByOptions({
  entityType: 'user',
  actorId: 'user-123',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31'),
  skip: 0,
  take: 20,
});
```

### Get Entity Audit Logs

```typescript
import { getEntityAuditLogs } from '#app/utils/activity-logging/activity-logging.server';

const { items } = await getEntityAuditLogs('user', 'user-123', {
  skip: 0,
  take: 50,
});
```

### Get User Activity Logs

```typescript
import { getUserAuditLogs } from '#app/utils/activity-logging/activity-logging.server';

const { items } = await getUserAuditLogs('user-123', {
  skip: 0,
  take: 50,
  orderBy: { createdAt: 'desc' },
});
```

### Get Group Activity Logs

```typescript
import { getGroupAuditLogs } from '#app/utils/activity-logging/activity-logging.server';

const { items } = await getGroupAuditLogs('group-123', {
  skip: 0,
  take: 50,
});
```

### Cleanup Expired Logs

```typescript
import { cleanupExpiredLogs } from '#app/utils/activity-logging/activity-logging.server';

const result = await cleanupExpiredLogs();
console.log(`Deleted ${result.deletedCount} expired logs`);
```

### Advanced Filtering

```typescript
import { getAuditLogsByOptions } from '#app/utils/activity-logging/activity-logging.server';

const { items } = await getAuditLogsByOptions({
  entityType: 'question',
  action: 'create',
  role: 'member',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31'),
  skip: 0,
  take: 100,
  orderBy: { createdAt: 'desc' },
});
```

## Filtering Options

- `entityType`: Filter by entity type (e.g., 'user', 'question', 'group')
- `entityId`: Filter by specific entity ID
- `actorId`: Filter by user who performed the action
- `action`: Filter by specific action type
- `role`: Filter by role of the actor
- `groupId`: Filter by group (for group-specific actions)
- `startDate`: Filter logs created after this date
- `endDate`: Filter logs created before this date
- `skip`: Number of logs to skip (pagination)
- `take`: Number of logs to return (pagination)
- `orderBy`: Ordering for results (default: `{ createdAt: 'desc' }`)

## Log Cleanup

The `cleanupExpiredLogs` function removes audit logs that have passed their `expiresAt` date. This should be run periodically (e.g., via a cron job) to maintain database performance.

## Feature Flag

Enable with: `features.activityLogging = true`

## Notes

- All query functions support pagination via `skip` and `take`
- Results include actor information (id, username, name, profileImage)
- Logs are ordered by creation date (newest first) by default
- Expired logs are automatically excluded from queries based on `expiresAt`
- The base template provides `createAuditLog` and `logUserAction` for creating logs
