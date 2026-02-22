# Starter template implementation plan: edulinksng as reference

## Objective

Review every part of the starter template (base + features) and ensure all implementations are **correct adaptations** of the reference implementation in **edulinksng**. No fabricated or assumed implementations. A **newly generated app must typecheck and lint out of the box** after `pnpm install`, `pnpm run prisma:gen` (or equivalent), and `pnpm typecheck` / `pnpm lint`.

---

## Principles

1. **Single source of truth:** edulinksng is the reference. Template code must be derived from it.
2. **Adapt, don’t invent:** When adapting, only change what’s necessary (paths, app-specific types, removal of domain-specific logic). Preserve structure, props, and behavior.
3. **Use workspace packages only:** All date/utils/UI must come from `@veraclins-dev/utils`, `@veraclins-dev/ui`, `@veraclins-dev/react-utils`, `@veraclins-dev/form`, etc. No local `app/utils/date.ts`. Map edulinksng’s `formatAsTime`/`fromNow` to `@veraclins-dev/utils` (e.g. `formatRelativeTime`, `formatDateTime`).
4. **Paths and types:** Templates use `#app/...` as the canonical import style (matching edulinksng). **CLI-generated apps** keep `#app` and must have it configured in the generated app. **Nx-generated apps** use relative imports only: the Nx generator rewrites `#app` to relative paths at generation time. Keep the same public APIs (props, exports) where possible.
5. **No native elements where reference uses UI:** Where the reference uses `Link`, `Button`, or other components from `@veraclins-dev/ui` (or app components that wrap them), the template must use the same. Never substitute a native `<button>` or `Box component="button"` for `Link` or `Button` from the reference.
6. **Copy app wrappers from the reference:** App-level wrapper components (e.g. `Card`, `Link`, `Avatar`) that the reference uses must be copied into the template and used in the same way. For example, the wrapper Card component in edulinksng should be part of the template and used accordingly—do not replace it with a raw `@veraclins-dev/ui` primitive or a different structure. Where the reference uses an app component, the template provides and uses that same wrapper.
7. **No barreling:** Do not use barrel files (e.g. `index.ts` that only re-export). Import directly from the defining module (e.g. `#app/components/activity/activity`, `#app/components/notifications/notification` and `#app/components/notifications/notifications`), not from a folder path that resolves via a barrel.

---

## 1. Generated-app guarantees (out of the box)

After generating an app and running `pnpm run prisma:gen` (or `prisma generate --sql`) and `pnpm typecheck`, the following must hold. Use this as the acceptance checklist; every item must be addressed in the template or in the generator.

### 1.0 Import style: `#app` (CLI) vs relative (Nx)

**Goal:** One set of templates authored with `#app/...`; CLI output keeps `#app`; Nx output uses relative imports only.

#### Template authoring (single source of truth)

- All template source files in `packages/starter-templates/templates/` (base, features, services, configs) use **`#app/...`** for app-internal imports (e.g. `#app/utils/db/db.server`, `#app/components/link`, `#app/utils/constants`). This matches edulinksng and keeps one canonical style.
- Do **not** author templates with relative paths for app-internal imports; use `#app` so both CLI and Nx can apply their respective resolution strategy.

#### CLI-generated app (keep `#app`)

- **Generator behaviour:** Copy templates as-is. No import rewriting. All `#app` imports remain in the generated files. The CLI must **not** strip or alter `compilerOptions.paths` in the copied `tsconfig.json`; the generated app’s tsconfig must be the same as the base template’s (aside from any template-variable substitution already in scope).
- **Generated app tsconfig path config (required):** The generated app’s `tsconfig.json` must contain the proper path configuration so that both `#app` and `#generated` resolve. This is achieved by ensuring the **base template’s** `tsconfig.json` includes the following in `compilerOptions.paths`, and that the CLI copies it without removing paths:
  - `"#app/*": ["./app/*"]` — so `#app/utils/db/db.server`, `#app/components/link`, etc. resolve to `./app/...`.
  - `"#generated/*": ["./generated/*"]` — so `#generated/prisma/client`, `#generated/prisma/sql`, etc. resolve to `./generated/...`.
  The base template is the single source for this; the CLI does not inject or merge paths—it just copies the base template, so the template’s tsconfig must be complete and correct.
- **Bundler (Vite):** The generated app uses `vite-tsconfig-paths` (or equivalent); as long as tsconfig has the above paths, the bundler will resolve them. If the stack does not read tsconfig paths, the generator or template must ensure the Vite config (or other bundler config) defines the same aliases.
- **Verification:** After generating with the CLI, both `#app` and `#generated` imports must resolve and the app must typecheck and build without changing imports.

#### Nx-generated app (relative imports only)

- **Generator behaviour:** When writing files into the Nx project, the Nx generator must **rewrite** every `#app/...` import to the correct **relative path** from the file being written to the app root. The Nx app’s tsconfig must **not** rely on a `#app` path alias (Nx uses root-level aliases and project layout; relative imports keep the generated app self-contained and consistent with Nx conventions).
- **Where to rewrite:** Every file that can contain `#app` imports must be transformed before writing to the tree. That includes:
  - Base template copy (all files under the base template, except those excluded by existing filters).
  - Feature template copy (all files under each feature’s `app/` tree).
  - Service integration copy (files under `app/utils/services/<serviceType>/`); for these, the “file path relative to project root” is `app/utils/services/<serviceType>/<relativePath>` so that relative imports are computed correctly.
  - Deployment config copy only if those config files ever import from `#app` (otherwise optional).
- **How to compute relative path:** For a file at path `P` relative to project root (e.g. `app/routes/foo.tsx` or `app/utils/services/email/resend.ts`), an import `#app/utils/db/db.server` must become the relative path from the **directory of P** to `app/utils/db/db.server`. Examples:
  - File `app/routes/foo.tsx` → `#app/utils/db/db.server` becomes `../utils/db/db.server`.
  - File `app/utils/bar.ts` → `#app/utils/db/db.server` becomes `./db/db.server`.
  - File `app/utils/services/email/resend.ts` → `#app/utils/email.server` becomes `../../email.server`.
- **Regex / replacement rule:** Replace all occurrences of `#app/([^'"]+)` in the file content with the computed relative path. Use the same replacement in both single- and double-quoted import strings. Ensure the path uses forward slashes in the output (import paths are module specifiers).
- **Which files to transform:** Apply the replacement to every text file that may contain `#app` (e.g. `.ts`, `.tsx`, `.js`, `.jsx`, `.mts`, `.cts`, and optionally `.md` for READMEs that show example imports). No need to transform JSON or other non-import files unless they contain literal `#app` strings that must be rewritten.
- **Nx tsconfig:** The Nx generator already strips or overrides `compilerOptions.paths` from the template tsconfig when writing the app’s tsconfig. Ensure the written tsconfig does **not** define `#app` so that the app truly uses only relative (and any Nx-defined) aliases.
- **Verification:** After generating with the Nx generator, there must be no `#app` imports in the generated app; all app-internal imports must be relative; the app must typecheck and build.

#### Summary table

| Consumer        | Template content | After generation        | Config in generated app |
|----------------|------------------|-------------------------|---------------------------|
| CLI            | `#app/...`       | `#app/...` (unchanged)  | tsconfig (+ bundler) must have `#app/*` → `./app/*` and `#generated/*` → `./generated/*`; base template tsconfig is copied as-is (no path stripping). |
| Nx             | `#app/...`       | Relative (e.g. `../utils/db`) | No `#app` path; relative only. |

#### Implementation notes (for when implementing)

- **CLI / base template tsconfig:** Ensure `packages/starter-templates/templates/base/tsconfig.json` has the full path config required for a CLI-generated app: `"#app/*": ["./app/*"]` and `"#generated/*": ["./generated/*"]`. The CLI copies the base template as-is and must not strip or modify `compilerOptions.paths` when writing the generated app’s tsconfig, so the generated app’s tsconfig will have the proper path config by virtue of the base template.
- **Nx:** In `packages/starter-nx`, introduce a small helper that, given file path relative to project root and file content, returns content with `#app/<path>` replaced by the correct relative path. Pass this helper as the `transformContent` (or equivalent) in every `copyDirectoryToTree` call that copies template files that may contain `#app` (base, features, services). For service copy, the “path relative to project root” is `app/utils/services/<serviceType>/` + the file’s relative path within the service folder. Run the replacement after any other template variable substitution (e.g. after `renderTemplate`) so that the final written file has relative imports.

---

### 1.1 Module and path resolution

| Issue | Template / generator fix |
|-------|---------------------------|
| `Cannot find module '#app/...'` (CLI-generated app) | Base template `tsconfig.json` must include `"#app/*": ["./app/*"]` in `compilerOptions.paths`. CLI must copy tsconfig without stripping paths so the generated app has the same. See §1.0. |
| `Cannot find module '#generated/prisma/client'` (db.server, db/enums, db/types, extensions, notifications, invitations) | Base template `tsconfig.json` must include `"#generated/*": ["./generated/*"]` in `compilerOptions.paths`. CLI must copy tsconfig without stripping paths so the generated app has both `#app/*` and `#generated/*`. All db and feature code use the `#generated/prisma/client` alias (not relative paths) so one config works. |
| `Cannot find module '../../../generated/prisma/client'` (or sql) | Use the `#generated/` path alias in all files (db.server.ts, extensions.ts, etc.) so resolution is consistent. |
| `Cannot find module '../../hooks/use-user'` (e.g. marketing-header) | Base template must include `app/hooks/use-user.ts` and the generator must copy it. Verify hooks directory is not excluded by copy filter. |
| `Cannot find module '../../components/notifications'` (notifications route) | No barreling: route must import directly from the defining modules, e.g. `#app/components/notifications/notifications` and `#app/components/notifications/notification` (or relative equivalent after Nx rewrite). Do not use `index.ts` barrels. |
| `Cannot find module './components/invitations'` (invitations route) | No barreling: route must import directly from the defining modules, e.g. `#app/components/invitations/invitations` and `#app/components/invitations/invitation` (or relative equivalent). Do not use `index.ts` barrels. |
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
| `features/notifications/app/components/activity/activity.tsx` | `app/components/activity/index.tsx` | **Adapt in full.** No barreling: export Activity, ActivityLink, ActionItem from this file; callers import from `#app/components/activity/activity`. Activity: Box, **Avatar**, **icon** prop (IconName), **createMarkup(message)** from `@veraclins-dev/react-utils`, **formatRelativeTime** from `@veraclins-dev/utils`, Typography, ITEM_CLASSES from `@veraclins-dev/ui`. ActivityLink: **Link** from app, to=targetLink, onClick, ITEM_CLASSES. ActionItem: **Button** from `@veraclins-dev/ui`, ButtonProps, variant=plain, stopPropagation, ITEM_CLASSES. **Do not use** native `<button>` or `Box component="button"`. |
| `features/notifications/app/components/activity/tabs.tsx` | `app/components/activity/tabs.tsx` | Card, Button, humanize from `@veraclins-dev/utils`. **Generic tabs:** `Tabs<T extends string>` with `activeTab: T`, `onTabChange: (tab: T) => void` so NotificationTab and InvitationTab work. |
| `features/notifications/app/components/more-button.tsx` | `app/components/more-button.tsx` | Button (variant soft), Icon (dots-horizontal) from `@veraclins-dev/ui`. |
| `features/notifications/app/components/empty.tsx` | `app/components/empty.tsx` | Card (minHeight 40, contentProps justify/items), Typography title/message, action slot; Card from `@veraclins-dev/ui` or app card. |
| `features/notifications/app/components/notifications/notification.tsx` | `app/components/notifications/notification.tsx` | ActivityLink, Activity (message from notification per reference), NotificationActionsDropdown (or equivalent), actionPath, onDismiss, onRead. |
| `features/notifications/app/components/notifications/notifications.tsx` | `app/components/notifications/notifications.tsx` | Tabs, Card, Empty, Notification, NotificationList (or ShowNotification), actionPath, onRead. Same prop names as reference. |
| (add if missing) | `app/components/notifications/notification-actions-dropdown.tsx` | NotificationActionsDropdown: DropdownMenu + MoreButton + Dismiss / Mark as read; use `@veraclins-dev/ui` and same API as reference. |
| `features/notifications/app/components/notifications/*.tsx` | (no barrel) | No barreling: route imports directly from `#app/components/notifications/notifications` and `#app/components/notifications/notification`. |

### 2.2 Invitations feature

| Template path | Edulinksng reference | Implementation notes |
|---------------|----------------------|------------------------|
| `features/invitations/app/components/invitations/invitation.tsx` | (invitation component if exists) | Import InvitationStatus from `#generated/prisma/client`, not from `../../utils/db/enums`. |
| `features/invitations/app/components/invitations/invitations.tsx` | (invitations list) | Import Invitation from `./invitation`, InvitationStatus from `#generated/prisma/client`. Use Tabs with generic so InvitationTab is preserved. |
| `features/invitations/app/components/invitations/*.tsx` | (no barrel) | No barreling: route imports directly from `#app/components/invitations/invitations` and `#app/components/invitations/invitation`. |
| `features/invitations/app/routes/invitations+/_index.tsx` | Invitations route | No barreling: import Invitations from `#app/components/invitations/invitations` (or relative equivalent). InvitationStatus from `#generated/prisma/client`. InfiniteLoader must receive url, items, updateItems, pageData. |
| `features/invitations/app/utils/invitations/invitations.server.ts` | Invitations server | PAGE_DATA_DEFAULTS from `../constants`, db from `../db/db.server`, InvitationStatus/InvitationType from `#generated/prisma/client`. Type all callback parameters (e.g. paginateArgs, inv). |
| `features/invitations/app/utils/invitations/types.ts` | Types | Prisma from `../db/db.server`, InvitationStatus/InvitationType from `#generated/prisma/client`. |
| `features/invitations/app/utils/invitations/validations.ts` | Validations | InvitationStatus, InvitationType from `#generated/prisma/client`. |

### 2.3 Base components (including app wrappers)

**App wrappers:** Copy from edulinksng and use in the template wherever the reference uses them. Do not replace with raw UI primitives. Examples: Card (used by Empty, Tabs, notifications, etc.), Link (used by ActivityLink, nav), Avatar. Each wrapper stays in the template and is used the same way as in the reference.

| Template path | Edulinksng reference | Implementation notes |
|---------------|----------------------|------------------------|
| `base/app/components/infinite-loader.tsx` | `app/components/infinite-loader.tsx` | **Props type:** Must include `children`, `url`, `items`, `updateItems`, `pageData` so notifications and invitations routes typecheck. Implementation can be a stub that only renders children until a full adaptation is done. |
| `base/app/components/navigation.tsx` | `app/components/navigation.tsx` | Same structure; use only @veraclins-dev/ui and app components (NavLink, Avatar, etc.). |
| `base/app/components/page-header.tsx` | `app/components/page-header.tsx` | Same. |
| `base/app/components/avatar.tsx` | `app/components/avatar.tsx` | **Copy wrapper.** Same props (src, alt, size, icon, containerClass, etc.). |
| `base/app/components/link.tsx` | `app/components/link.tsx` | **Copy wrapper.** Must be the app Link used by ActivityLink (wraps @veraclins-dev/ui Link + router). |
| `base/app/components/card.tsx` | `app/components/card.tsx` | **Copy wrapper.** Same API (minHeight, contentProps, headerProps, elevated). Use this Card in Empty, Tabs, notifications, invitations, etc., as in the reference. |
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
   Fix all module resolution and export issues (§1.1, §1.2), type safety issues (§1.3), and schema/consistency issues (§1.4). No barreling: routes and callers import directly from defining modules (e.g. `#app/components/notifications/notifications`), not from barrel files. Use `#generated` alias everywhere for Prisma. No new fabricated UI; only fix types and paths.

2. **Phase 2 – Notifications feature (reference alignment)**  
   Adapt activity (Activity, ActivityLink, ActionItem) from edulinksng using Link and Button from UI; then tabs, more-button, empty, notification, notifications, notification-actions-dropdown, and route. Use only @veraclins-dev packages and app Link/Avatar.

3. **Phase 3 – Invitations feature**  
   Same pattern: correct imports (#generated for enums, ../constants, ../db). No barreling: import directly from defining modules (e.g. `#app/components/invitations/invitations`). InfiniteLoader props, Tabs generic.

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
- [ ] App-internal imports use `#app/...` in the template (no relative paths for app modules); date/utils come from `@veraclins-dev/*` only. (Nx generator will rewrite `#app` to relative when generating an Nx app.)
- [ ] No barreling: no `index.ts` that only re-exports; callers import from the defining file (e.g. `#app/components/activity/activity`).
- [ ] No native `<button>` or `Box component="button"` where reference uses Link or Button from UI.
- [ ] App wrappers (e.g. Card, Link, Avatar) used by the reference are copied into the template and used the same way—not replaced with raw UI or a different structure.
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
- **CLI generator:** `packages/starter-cli/src/generator.ts` (copy as-is, env, .gitignore, no overwrite of email.server; no import rewriting).
- **Nx generator:** `packages/starter-nx/src/` (copy with `#app` → relative transform in `copyDirectoryToTree` for base, features, services).

Use this plan as the single source of truth for implementation and for verifying that a generated app works out of the box.
