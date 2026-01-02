# Admin Dashboard Feature Module

**Status:** Extracted
**Feature Flag:** `features.admin`

---

## Overview

The Admin Dashboard module provides a complete admin panel infrastructure with:

- **Admin Layout** - Sidebar navigation, header, and page structure
- **Dashboard Components** - Reusable stat cards, period selector, dashboard layout
- **API Utilities** - Growth calculations, chart data utilities, metrics transformations
- **Basic Routes** - Overview dashboard and operations dashboard

---

## Features

### Core Infrastructure

- **Admin Layout** (`_layout.tsx`) - Main admin panel layout with sidebar
- **Admin Sidebar** - Collapsible sidebar with dashboard, administration, and quick actions sections
- **Error Handling** - 404 handling for admin routes

### Dashboard Components

- **DashboardLayout** - Container component for dashboard pages with stats cards
- **StatsCards** - Reusable stat card component with growth indicators, icons, and alerts
- **PeriodSelect** - Date range selector for filtering dashboard data

### API Utilities

- **Growth Calculations** - Calculate growth percentages and types
- **Chart Utilities** - Generate chart intervals and format data for visualization
- **Metrics Transformations** - Transform raw metrics into structured data

---

## Usage

### Basic Setup

1. **Enable the feature** in your environment:

```typescript
// env.example
FEATURES_ADMIN=true
```

2. **Customize the sidebar** in `components/sidebar.tsx`:

```typescript
// Add your project-specific dashboard items
const dashboardItems: DashboardItem[] = [
	{
		text: 'Overview',
		to: '/admin/dashboard',
		icon: 'chart-bar',
	},
	// Add more dashboard sections
]

// Add your admin management routes
const adminSidebarItems: AdminSidebarItem[] = [
	{
		text: 'User Management',
		to: '/admin/users',
		icon: 'users',
	},
	// Add more admin routes
]
```

3. **Add your analytics** in dashboard routes:

```typescript
// app/routes/admin+/dashboard+/_index.tsx
export async function loader({ request }: Route.LoaderArgs) {
	const period = getPeriod(getQueryParams(request))

	// Add your project-specific analytics
	const userStats = await getUserStats(period)
	const contentStats = await getContentStats(period)

	const stats: StatCard[] = [
		{
			title: 'Total Users',
			value: userStats.total,
			growth: calculateGrowth(userStats.current, userStats.previous),
			period,
			icon: 'users',
			iconColor: 'primary',
			priority: 'high',
		},
		// Add more stats
	]

	return { stats, period }
}
```

### Stat Cards

Use the `StatCard` interface to create dashboard metrics:

```typescript
const stat: StatCard = {
	title: 'Active Users',
	value: 1234,
	growth: 15, // percentage
	period: { from: '2024-01-01', to: '2024-01-31' },
	icon: 'user-check',
	iconColor: 'success',
	priority: 'high', // 'high' | 'medium' | 'low'
	link: '/admin/users', // optional link
	description: 'Users active in the last 30 days',
	extras: [
		{ label: 'New', value: 50, icon: 'user-plus', color: 'success' },
	],
	alert: 'Growth rate is below target', // optional alert
}
```

### MFA Integration

If the MFA module is enabled, you can add MFA enforcement to admin routes:

```typescript
// app/routes/admin+/_layout.tsx
export async function loader({ request, context }: Route.LoaderArgs) {
	const user = await requireAdminUser(request, context)

	// Enforce MFA if MFA module is enabled
	if (ENV.FEATURES?.MFA) {
		await requireMFA(request, context)
	}

	return { user }
}
```

---

## Project-Specific Customization

### Adding Dashboard Routes

Create new dashboard routes in `dashboard+/`:

```typescript
// app/routes/admin+/dashboard+/users.tsx
export async function loader({ request }: Route.LoaderArgs) {
	// Fetch user analytics
	const userStats = await getUserAnalytics()

	return { userStats }
}

export default function UsersDashboard({ loaderData }: Route.ComponentProps) {
	return (
		<DashboardLayout stats={userStats}>
			{/* Your user analytics components */}
		</DashboardLayout>
	)
}
```

### Adding Admin Management Routes

Create admin management routes:

```typescript
// app/routes/admin+/users.tsx
export async function loader({ request, context }: Route.LoaderArgs) {
	const user = await requireAdminUser(request, context)
	const users = await getUsers()

	return { users }
}

export default function UserManagement({ loaderData }: Route.ComponentProps) {
	return (
		<Box>
			{/* User management UI */}
		</Box>
	)
}
```

### Custom Analytics

Add your project-specific analytics functions:

```typescript
// app/routes/admin+/api/users.server.ts
export async function getUserStats(period: DateRangeValue) {
	const { start, end } = getPeriod(period)

	// Your analytics queries
	const current = await db.user.count({
		where: { createdAt: { lte: end } },
	})

	const previous = await db.user.count({
		where: { createdAt: { lte: start } },
	})

	return {
		current,
		previous,
		growth: calculateGrowth(current, previous),
	}
}
```

---

## Dependencies

### Base Template

- `requireAdminUser` from `#app/utils/permissions/permissions.server`
- `PageHeader`, `Navigation` from base components
- `Logo` from base components
- `Card`, `Link` from base components
- `DateDropdown` from base components

### External

- `@veraclins-dev/ui` - UI components
- `@veraclins-dev/utils` - Utility functions

---

## File Structure

```
features/admin/
├── README.md
├── app/
│   └── routes/
│       └── admin+/
│           ├── _layout.tsx          # Main admin layout
│           ├── index.tsx            # Redirects to dashboard
│           ├── $.tsx                # 404 handler
│           ├── components/
│           │   ├── sidebar.tsx      # Admin sidebar
│           │   ├── sidebar-trigger.tsx
│           │   └── dashboard/
│           │       ├── dashboard-layout.tsx
│           │       ├── stats-cards.tsx
│           │       └── period-select.tsx
│           ├── api/
│           │   ├── utils.ts         # Client utilities
│           │   ├── utils.server.ts  # Server utilities
│           │   └── types.ts         # Type definitions
│           └── dashboard+/
│               ├── _layout.tsx
│               └── _index.tsx        # Overview dashboard
```

---

## Notes

- **Project-Specific Content**: The dashboard routes are minimal templates. Add your project-specific analytics, charts, and management interfaces.
- **MFA Integration**: MFA enforcement is optional and handled by the separate MFA module.
- **Sidebar Customization**: Customize the sidebar items based on your project's admin needs.
- **Analytics**: Add your own analytics functions and SQL queries based on your data model.

---

**Last Updated:** 2025-12-18
