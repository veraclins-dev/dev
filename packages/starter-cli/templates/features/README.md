# Feature Modules

Optional feature modules that can be enabled via feature flags during project generation.

## Available Modules

- **notifications/** - Activity-based notification system
- **admin/** - Admin dashboard with user management and analytics
- **search/** - Full-text search functionality
- **activity-logging/** - Activity tracking and audit logs
- **multi-tenant/** - Multi-tenant support with tenant isolation
- **invitations/** - User invitation system with referral codes
- **reporting/** - Content reporting and moderation queue
- **moderation/** - Moderation workflow and violation tracking

## Usage

Each module should be self-contained with:
- Routes (if needed)
- Components
- Utilities
- Database schema additions
- Documentation

Modules are included based on feature flags during project generation.

