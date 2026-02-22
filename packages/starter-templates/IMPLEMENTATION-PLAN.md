# Starter template implementation plan: edulinksng as reference

## Objective

Review every part of the starter template (base + features) and ensure all implementations are **correct adaptations** of the reference implementation in **edulinksng**. No fabricated or assumed implementations. A **newly generated app must typecheck and lint out of the box** after `pnpm install`, `pnpm run prisma:gen` (or equivalent), and `pnpm typecheck` / `pnpm lint`.

---

## Principles

1. **Single source of truth:** edulinksng is the reference. Template code must be derived from it.
2. **Adapt, don’t invent:** When adapting, only change what’s necessary (paths, app-specific types, removal of domain-specific logic). Preserve structure, props, and behavior.
3. **Use workspace packages only:** All date/utils/UI must come from `@veraclins-dev/utils`, `@veraclins-dev/ui`, `@veraclins-dev/react-utils`, `@veraclins-dev/form`, etc. No local `app/utils/date.ts`. Map edulinksng’s `formatAsTime`/`fromNow` to `@veraclins-dev/utils` (e.g. `formatRelativeTime`, `formatDateTime`).
4. **Paths and types:** Replace edulinksng’s `#app/...` with template-appropriate relative paths. Keep the same public APIs (props, exports) where possible.
5. **No native elements where reference uses UI:** Where the reference uses `Link`, `Button`, or other components from `@veraclins-dev/ui` (or app components that wrap them), the template must use the same. Never substitute a native `<button>` or `Box component="button"` for `Link` or `Button` from the reference.

---

## 1. Generated-app guarantees (out of the box)

After generating an app and running `pnpm run prisma:gen` (or `prisma generate --sql`) and `pnpm typecheck`, the following must hold. Use this as the acceptance checklist; every item must be addressed in the template or in the generator.

### 1.1 Module and path resolution

| Issue | Template / generator fix |
|-------|---------------------------|
| `Cannot find module '#generated/prisma/client'` (db.server, db/enums, db/types, extensions, notifications, invitations) | Base `tsconfig.json` must include `"paths": { "#generated/*": ["./generated/*"] }`. Generator must ensure generated app has the same. All db and feature code that need the client must use the `#generated/prisma/client` alias (not relative paths like `../../../generated/prisma/client`) so one config works. |
| `Cannot find module '../../../generated/prisma/client'` (or sql) | Use the `#generated/` path alias in all files (db.server.ts, extensions.ts, etc.) so resolution is consistent. |
| `Cannot find module '../../hooks/use-user'` (e.g. marketing-header) | Base template must include `app/hooks/use-user.ts` and the generator must copy it. Verify hooks directory is not excluded by copy filter. |
| `Cannot find module '../../components/notifications'` (notifications route) | Notifications feature must provide `app/components/notifications/index.ts` (or equivalent) that exports `Notifications` (and `Notification` if consumed from route). Route must import from `../../components/notifications`. |
| `Cannot find module './components/invitations'` (invitations route) | Invitations route must import from `../../components/invitations`, and the feature must provide `app/components/invitations/index.ts` exporting `Invitations` and `Invitation`. |
| `Cannot find module '../../routes/.../invitation'` (invitations.tsx) | Feature components must use relative paths within the feature (e.g. `./invitation` from within `components/invitations/`), not route-based paths. |
| `Cannot find module '../db/db.server'` or `../../constants` (invitations.server) | Feature utils live under `app/utils/<feature>/`. Use `../db/db.server` and `../constants` (i.e. `app/utils/db`, `app/utils/constants`), not `../../db` or `../../constants`. |
| `Cannot find module '../build/server/index.js'` (server/index.ts) | This is a runtime dynamic import; the file exists only after build. Either document that server typecheck is optional / run after build, or provide a small `declare module` or type-only shim so typecheck passes. |

### 1.2 Exports and types

| Issue | Template / generator fix |
|-------|---------------------------|
| `Module '".../db/enums"' has no exported member 'InvitationStatus'` (and InvitationType) | Base schema has no Invitation model; those enums exist only when the invitations feature is merged. Do **not** export them from base `db/enums.ts`. In the invitations feature, import `InvitationStatus` and `InvitationType` from `#generated/prisma/client` in every file that needs them (invitation.tsx, invitations.tsx, route _index, invitations.server.ts, types.ts, validations.ts). |
| `Module '".../email.server"' has no exported member 'sendEmail'` | Base template’s `app/utils/email.server.ts` must export `sendEmail`. Generator must **not** overwrite this file with a provider file that only exports a class. Keep base implementation that exports `sendEmail`. |
| `Property 'url' (or items, updateItems, pageData) does not exist on type ... InfiniteLoader` | Base `app/components/infinite-loader.tsx` must declare and accept the full props type used by notifications and invitations routes: `children`, `url`, `items`, `updateItems`, `pageData`. Implementation can remain a stub that only renders children, but the type must accept all props so route code typechecks. |

### 1.3 Type safety (no implicit any, correct signatures)

| Issue | Template / generator fix |
|-------|---------------------------|
| `Type '"button"' is not assignable to type 'ContainerElement \| CustomComponent'` (Box component="button") | Do not use `Box component="button"`. Use the same component as the reference: **Link** for ActivityLink, **Button** from `@veraclins-dev/ui` for ActionItem (see Principles and activity mapping). |
| `Parameter 'tx' implicitly has an 'any' type` (auth.server, seed, etc.) | Type transaction callbacks: `db.$transaction(async (tx: Prisma.TransactionClient) => { ... })`. Use the same in seed and any other $transaction usage. |
| `Parameter 'e' implicitly has an 'any' type` (db.server $on('query')) | Type the event: `client.$on('query', (e: { duration: number; query: string }) => { ... })`. |
| `Binding element 'model', 'operation', 'args', 'query' implicitly has an 'any' type` (extensions.ts) | Type the `$allOperations` callback parameter object explicitly (model: string, operation: string, args: unknown, query: (args: unknown) => Promise<unknown> or equivalent from Prisma types). |
| `Parameter 'options' implicitly has an 'any' type` (user.server getUser, getUsers, etc.) | Use proper Prisma delegate types, e.g. `Prisma.UserDelegate['findFirst']` for the options parameter. |
| `Parameter 'inv' / 'paginateArgs' implicitly has an 'any' type` (invitations.server) | Add explicit types for callback parameters (e.g. from Prisma or from the paginate helper). |
| `Expected 1 arguments, but got 2` (logUserAction) | Signature of `logUserAction` must accept an optional second argument (e.g. `tx?: Prisma.TransactionClient`) and pass it through to `createAuditLog`. |
| `Type '(tab: NotificationTab) => void' is not assignable to type '(tab: string) => void'` (Tabs) | Make Tabs generic: `Tabs<T extends string = string>` with `activeTab: T` and `onTabChange: (tab: T) => void` so that `NotificationTab` and `InvitationTab` are preserved. |

### 1.4 Schema and feature consistency

| Issue | Template / generator fix |
|-------|---------------------------|
| `Property 'skip' is optional ... but required in type 'GetAuditLogsInput'` (activity-logging getGroupAuditLogs) | When calling `getAuditLogs`, ensure the argument satisfies `GetAuditLogsInput` (e.g. provide default `skip`/`take` if they are required, or make them optional in the type and handle in implementation). |
| `Property 'message' does not exist on type ...` (notification) | If the reference uses `notification.message` for Activity, the template’s Notification type and Prisma schema (or merged feature schema) must include `message` where applicable; otherwise use the field the reference actually uses (e.g. `activity.target`) and document. |

### 1.5 Optional features (no typecheck failure when unused)

| Issue | Template / generator fix |
|-------|---------------------------|
| `Cannot find module 'firebase/app'` (firebase.server.ts) | Firebase is optional. Either: (a) only copy/include `firebase.server.ts` when the user selects Firebase storage and add `firebase` to dependencies in that case, or (b) provide a stub that typechecks without the `firebase` package (e.g. conditional export or type-only shim). Same for `./types` if it’s feature-specific. |
| Sentry callback types (beforeSend, tracesSampler, beforeSendTransaction) | Use Sentry’s own types (do not narrow with custom inline types that conflict with ErrorEvent / TransactionEvent). Omit parameter types and let inference use Sentry’s types, or import the correct types from `@sentry/react-router` / `@sentry/core` if available. |

---

## 2. Component mapping: template ↔ edulinksng

### 2.1 Notifications feature

| Template path | Edulinksng reference | Implementation notes |
|---------------|----------------------|------------------------|
| `features/notifications/app/components/activity/activity.tsx` | `app/components/activity/index.tsx` | **Adapt in full.** Activity: Box, **Avatar** (from `../../avatar`), overlay icon by target (user-circle, group, file-text, info), **createMarkup(message)** from `@veraclins-dev/react-utils`, **formatRelativeTime** from `@veraclins-dev/utils`, Typography, ITEM_CLASSES from `@veraclins-dev/ui`. ActivityLink: **Link** from `../../link` (app component using UI), to=targetLink, onClick, ITEM_CLASSES. ActionItem: **Button** from `@veraclins-dev/ui`, ButtonProps, variant=plain, stopPropagation, ITEM_CLASSES. **Do not use** native `<button>` or `Box component="button"`. |
| `features/notifications/app/components/activity/index.ts` | (re-export) | Re-export Activity, ActivityLink, ActionItem from activity.tsx. |
| `features/notifications/app/components/activity/tabs.tsx` | `app/components/activity/tabs.tsx` | Card, Button, humanize from `@veraclins-dev/utils`. **Generic tabs:** `Tabs<T extends string>` with `activeTab: T`, `onTabChange: (tab: T) => void` so NotificationTab and InvitationTab work. |
| `features/notifications/app/components/more-button.tsx` | `app/components/more-button.tsx` | Button (variant soft), Icon (dots-horizontal) from `@veraclins-dev/ui`. |
| `features/notifications/app/components/empty.tsx` | `app/components/empty.tsx` | Card (minHeight 40, contentProps justify/items), Typography title/message, action slot; Card from `@veraclins-dev/ui` or app card. |
| `features/notifications/app/components/notifications/notification.tsx` | `app/components/notifications/notification.tsx` | ActivityLink, Activity (message from notification per reference), NotificationActionsDropdown (or equivalent), actionPath, onDismiss, onRead. |
| `features/notifications/app/components/notifications/notifications.tsx` | `app/components/notifications/notifications.tsx` | Tabs, Card, Empty, Notification, NotificationList (or ShowNotification), actionPath, onRead. Same prop names as reference. |
| (add if missing) | `app/components/notifications/notification-actions-dropdown.tsx` | NotificationActionsDropdown: DropdownMenu + MoreButton + Dismiss / Mark as read; use `@veraclins-dev/ui` and same API as reference. |
| `features/notifications/app/components/notifications/index.ts` | (barrel) | Export Notification, Notifications, ShowNotification (or equivalent) so route can `import { Notifications } from '../../components/notifications'`. |

### 2.2 Invitations feature

| Template path | Edulinksng reference | Implementation notes |
|---------------|----------------------|------------------------|
| `features/invitations/app/components/invitations/invitation.tsx` | (invitation component if exists) | Import InvitationStatus from `#generated/prisma/client`, not from `../../utils/db/enums`. |
| `features/invitations/app/components/invitations/invitations.tsx` | (invitations list) | Import Invitation from `./invitation`, InvitationStatus from `#generated/prisma/client`. Use Tabs with generic so InvitationTab is preserved. |
| `features/invitations/app/components/invitations/index.ts` | (barrel) | Export Invitation, Invitations so route can `import { Invitations } from '../../components/invitations'`. |
| `features/invitations/app/routes/invitations+/_index.tsx` | Invitations route | Import Invitations from `../../components/invitations`, InvitationStatus from `#generated/prisma/client`. InfiniteLoader must receive url, items, updateItems, pageData. |
| `features/invitations/app/utils/invitations/invitations.server.ts` | Invitations server | PAGE_DATA_DEFAULTS from `../constants`, db from `../db/db.server`, InvitationStatus/InvitationType from `#generated/prisma/client`. Type all callback parameters (e.g. paginateArgs, inv). |
| `features/invitations/app/utils/invitations/types.ts` | Types | Prisma from `../db/db.server`, InvitationStatus/InvitationType from `#generated/prisma/client`. |
| `features/invitations/app/utils/invitations/validations.ts` | Validations | InvitationStatus, InvitationType from `#generated/prisma/client`. |

### 2.3 Base components

| Template path | Edulinksng reference | Implementation notes |
|---------------|----------------------|------------------------|
| `base/app/components/infinite-loader.tsx` | `app/components/infinite-loader.tsx` | **Props type:** Must include `children`, `url`, `items`, `updateItems`, `pageData` so notifications and invitations routes typecheck. Implementation can be a stub that only renders children until a full adaptation is done. |
| `base/app/components/navigation.tsx` | `app/components/navigation.tsx` | Same structure; use only @veraclins-dev/ui and app components (NavLink, Avatar, etc.). |
| `base/app/components/page-header.tsx` | `app/components/page-header.tsx` | Same. |
| `base/app/components/avatar.tsx` | `app/components/avatar.tsx` | Same props (src, alt, size, icon, containerClass, etc.). |
| `base/app/components/link.tsx` | `app/components/link.tsx` | Must be the app Link used by ActivityLink (wraps @veraclins-dev/ui Link + router). |
| `base/app/components/card.tsx` | `app/components/card.tsx` | Same (minHeight, contentProps, headerProps, elevated). |
| `base/app/components/dates/*` | `app/components/dates/*` | Date logic only from @veraclins-dev/utils. |
| `base/app/utils/db/db.server.ts` | — | Use `#generated/prisma/client` and `#generated/prisma/sql` for all generated imports. Type `$on('query')` event. |
| `base/app/utils/db/extensions.ts` | — | Use `#generated/prisma/client`. Type the `$allOperations` callback parameter object. |
| `base/app/utils/db/enums.ts` | — | Export only enums that exist in the **base** schema (e.g. RoleType, ActionSource, AuditLogAction, TriggeredBy). Do not export InvitationStatus, InvitationType, or other feature-only enums; those are imported from `#generated/prisma/client` in feature code. |
| `base/app/utils/auth/auth.server.ts` | — | Type `tx` in `$transaction` as `Prisma.TransactionClient`. Ensure `logUserAction` accepts optional second argument `tx`. |
| `base/app/utils/user/user.server.ts` | — | Type `options` (and any other parameters) with proper Prisma delegate types. |
| `base/prisma/seed.ts` | — | Type `tx` in `$transaction` as `Prisma.TransactionClient`. |

### 2.4 Activity-logging feature

| Template path | Fix |
|---------------|-----|
| `features/activity-logging/.../activity-logging.server.ts` | `getGroupAuditLogs` (or equivalent) must call `getAuditLogs` with an argument that satisfies `GetAuditLogsInput` (include required fields such as `skip`/`take` with defaults if the type requires them). |

---

## 3. Date and markup utilities

- **Edulinksng** uses `#app/utils/date`: `formatAsTime`, `fromNow`.
- **Template** must use only `@veraclins-dev/utils` and `@veraclins-dev/react-utils`.
- **Mapping:** `fromNow(date)` → `formatRelativeTime(date)` from `@veraclins-dev/utils`. `formatAsTime(date)` → `formatDateTime` from `@veraclins-dev/utils` if it fits; otherwise document. **Markup:** `createMarkup` from `@veraclins-dev/react-utils`.

---

## 4. Phase-by-phase implementation order

1. **Phase 1 – Paths and types (typecheck green)**  
   Fix all module resolution and export issues (§1.1, §1.2), type safety issues (§1.3), and schema/consistency issues (§1.4). Add index files for notifications and invitations components. Use `#generated` alias everywhere for Prisma. No new fabricated UI; only fix types and paths.

2. **Phase 2 – Notifications feature (reference alignment)**  
   Adapt activity (Activity, ActivityLink, ActionItem) from edulinksng using Link and Button from UI; then tabs, more-button, empty, notification, notifications, notification-actions-dropdown, and route. Use only @veraclins-dev packages and app Link/Avatar.

3. **Phase 3 – Invitations feature**  
   Same pattern: correct imports (#generated for enums, ../constants, ../db), index for components, InfiniteLoader props, Tabs generic.

4. **Phase 4 – Base components**  
   InfiniteLoader full props type (and implementation if desired), db.server/extensions/auth/user/seed types, then navigation, page-header, avatar, link, card, dates.

5. **Phase 5 – Optional features and cleanup**  
   Firebase/Sentry handling (§1.5), server build path, any remaining lint/typecheck in generated app.

---

## 5. Verification (generated app works out of the box)

Before marking the plan done:

1. Generate a new app with the CLI (include notifications and invitations features).
2. In the generated app: `pnpm install`, `pnpm run prisma:gen` (or equivalent), `pnpm typecheck`, `pnpm lint`.
3. Fix any remaining errors in the **template** (or generator), then re-run from step 1 until both typecheck and lint pass.
4. Optionally run `pnpm run setup` and `pnpm run dev` and smoke-test notifications and invitations routes.

---

## 6. Checklist per file (before closing)

For each template file that has an edulinksng counterpart:

- [ ] Opened reference file in edulinksng.
- [ ] Exports and main props match (or intentional simplification is documented).
- [ ] All `#app/...` and local date utils replaced with template paths and `@veraclins-dev/*`.
- [ ] No native `<button>` or `Box component="button"` where reference uses Link or Button from UI.
- [ ] No invented UI or logic not in the reference (unless documented).

For any file that contributes to a generated app:

- [ ] Paths work when the app is generated (relative to `app/` and feature merge structure).
- [ ] No dependency on base-only enums in feature code (use `#generated/prisma/client` for feature enums).
- [ ] All callbacks and transaction parameters are explicitly typed (no implicit any).

---

## 7. Reference locations

- **Edulinksng:** `edulinksng/app/` (components, utils, hooks, routes).
- **Template base:** `packages/starter-templates/templates/base/app/`.
- **Template features:** `packages/starter-templates/templates/features/<feature>/app/`.
- **Generator:** `packages/starter-cli/src/generator.ts` (copy logic, env, .gitignore, no overwrite of email.server).

Use this plan as the single source of truth for implementation and for verifying that a generated app works out of the box.
