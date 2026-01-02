# Invitations Feature Module

Generic invitation system that allows users to invite others to join entities (groups, teams, organizations, etc.) or request membership.

## Features

- **Generic Entity Support**: Works with any entity type (entityType/entityId pattern)
- **Invitation Types**: Support for member, moderator, admin roles
- **Invitation Status**: Track invited, requested, pending_approval, accepted, rejected, declined
- **Bulk Invitations**: Send multiple invitations at once
- **Request Membership**: Users can request to join entities
- **Approval Workflow**: Approve/reject membership requests

## Schema

This module adds the following to the Prisma schema:

- `Invitation` model - Stores invitations with entity type/ID pattern
- `InvitationStatus` enum - Invitation status values
- `InvitationType` enum - Invitation role types

**Relations added to User model:**
- `invitationsReceived Invitation[] @relation("invitee")`
- `invitationsSent Invitation[] @relation("inviter")`

## Usage

### Create Invitation

```typescript
import { createInvitation } from '#app/utils/invitations/invitations.server';

const invitation = await createInvitation({
  entityType: 'group',
  entityId: 'group-123',
  inviteeId: 'user-456',
  inviterId: 'user-789',
  type: 'member',
});
```

### Create Multiple Invitations

```typescript
import { createInvitations } from '#app/utils/invitations/invitations.server';

await createInvitations([
  {
    entityType: 'group',
    entityId: 'group-123',
    inviteeId: 'user-1',
    inviterId: 'user-789',
  },
  {
    entityType: 'group',
    entityId: 'group-123',
    inviteeId: 'user-2',
    inviterId: 'user-789',
  },
]);
```

### Request Membership

```typescript
import { requestMembership } from '#app/utils/invitations/invitations.server';

await requestMembership({
  entityType: 'group',
  entityId: 'group-123',
  userId: 'user-456',
});
```

### Accept/Decline Invitation

```typescript
import {
  acceptInvitation,
  declineInvitation,
} from '#app/utils/invitations/invitations.server';

// Accept
await acceptInvitation('group', 'group-123', userId);

// Decline
await declineInvitation('group', 'group-123', userId);
```

### Get User Invitations

```typescript
import { getUserInvitations } from '#app/utils/invitations/invitations.server';

const { items, hasMore, nextPage, count } = await getUserInvitations({
  userId: 'user-123',
  status: [InvitationStatus.invited, InvitationStatus.requested],
  skip: 0,
  take: 20,
});
```

### Get Entity Invitations

```typescript
import { getEntityInvitations } from '#app/utils/invitations/invitations.server';

const { items } = await getEntityInvitations({
  entityType: 'group',
  entityId: 'group-123',
  status: InvitationStatus.pending_approval,
});
```

### Approve/Reject Requests

```typescript
import {
  approveRequest,
  rejectRequest,
} from '#app/utils/invitations/invitations.server';

// Approve
await approveRequest(invitationId, approverId);

// Reject
await rejectRequest(invitationId, rejectorId);
```

## Invitation Status Flow

1. **invited** - Invitation sent by admin/moderator
2. **requested** - User requested membership
3. **pending_approval** - Request pending admin approval
4. **accepted** - Invitation/request accepted
5. **rejected** - Request rejected by admin
6. **declined** - Invitation declined by user

## Dependencies

- Base template (User model)
- Activity components (Tabs)
- Empty component
- Card component

## Feature Flag

Enable with: `features.invitations = true`

## Notes

- Unique constraint prevents duplicate invitations per entity/user
- Invitations can be filtered by status
- Supports both invitation and request workflows
- Generic entity type pattern allows use with any resource type
