# Base Template

Files in this directory are **always included** in every generated project. These are the core, universal features that every application needs.

## Structure

- **app/** - Application code (routes, components, utilities, hooks)
- **prisma/** - Database schema, migrations, and seed files
- **server/** - Server configuration, middleware, and utilities
- **tests/** - Test utilities, fixtures, and setup files

## What Goes Here

- Authentication & authorization
- Database setup (Prisma + PostgreSQL)
- Server infrastructure
- UI foundation
- Form handling
- Email system
- File upload utilities
- Testing infrastructure

## What Doesn't Go Here

- Project-specific features (Q&A, groups, etc.)
- Optional features (notifications, admin, etc.) - these go in `features/`
- Service-specific code - these go in `services/`

## Customization Guide

After generating your application, you'll want to customize it to match your brand. This guide covers the essential customization steps.

### 1. Logo Customization

The logo component is located at `app/components/logo.tsx` and uses images from `app/assets/images/`.

**To customize your logo:**

1. Replace the logo files in `app/assets/images/`:
   - `logo.svg` - Main logo (full logo with text)
   - `edulinks_logo_icon.svg` - Icon-only version (used when `icon` prop is true)

2. Update the logo component if needed:
   ```tsx
   // app/components/logo.tsx
   import logoIcon from '../assets/images/your-logo-icon.svg'
   import logo from '../assets/images/your-logo.svg'
   ```

3. Adjust the aspect ratio if your logo has different dimensions:
   ```tsx
   // The default ratio is 3.2875 (width = height * 3.2875)
   width={icon ? height : height * YOUR_RATIO}
   ```

**Logo Usage:**
- The logo appears in the auth layout header
- Use the `height` prop to control size (24, 32, 40, 48, 56, or 64)
- Use the `icon` prop to show only the icon version

### 2. Authentication Illustrations

Auth pages use illustrations to create a visually appealing login/signup experience. These are located in `app/assets/images/`.

**Available illustrations:**
- `login-illustration.svg` - Login page
- `get-started-illustration.svg` - Signup page
- `forgot-password-illustration.svg` - Forgot password page
- `new-password-illustration.svg` - Reset password page
- `create-illustration.svg` - Onboarding page
- `verify-illustration.svg` - Email verification page
- `bg-bottom-mask.svg` - Background decorative element
- `top-mask.svg` - Top decorative element

**To customize illustrations:**

1. Replace the SVG files in `app/assets/images/` with your own illustrations
2. Maintain the same file names, or update the imports in the route files:
   ```tsx
   // Example: app/routes/auth+/login.tsx
   import loginIllustration from '../../assets/images/your-login-illustration.svg'
   ```

3. Adjust illustration sizes if needed in `app/routes/auth+/components/layout.tsx`:
   ```tsx
   const illustrationHeight = 500  // Adjust as needed
   const illustrationWidth = 480   // Adjust as needed
   ```

**Illustration Guidelines:**
- Use SVG format for best quality and scalability
- Recommended dimensions: ~480x500px for main illustrations
- Keep file sizes optimized (< 100KB recommended)
- Ensure illustrations work well on both light and dark backgrounds

### 3. App Name and Branding

The app name is used throughout the application in page titles, emails, and metadata.

**To customize the app name:**

1. Set the `APP_NAME` environment variable in your `.env` file:
   ```env
   APP_NAME=Your App Name
   ```

2. The app name is used in:
   - Page titles (`app/utils/misc.ts`)
   - Email templates (`app/components/emails/`)
   - Meta tags (`app/root.tsx`)
   - Error messages and notifications

3. For server-side usage, ensure `APP_NAME` is in your environment:
   ```typescript
   // app/utils/env.server.ts already includes APP_NAME validation
   ```

**Additional Branding:**
- Update favicons in `public/favicons/`
- Update `public/site.webmanifest` with your app details
- Customize email templates in `app/components/emails/`

### 4. Styling and Theming

The template uses Tailwind CSS with a design system from `@veraclins-dev/ui`.

**Theme Colors:**
The template uses semantic color tokens that adapt to light/dark mode:
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `destructive` / `destructive-foreground`
- `neutral` / `neutral-foreground`
- `background`, `foreground`, `card`, `muted`, etc.

**To customize colors:**

1. The color system is configured through the UI library (`@veraclins-dev/ui`)
2. Use theme-aware classes in your components:
   ```tsx
   className="bg-primary text-primary-foreground"
   className="text-foreground"
   className="bg-card"
   ```

3. Avoid hardcoded Tailwind colors (like `bg-blue-500`) - use theme colors instead

**Custom Styles:**
- Global styles: Add to `app/styles/tailwind.css` or create custom CSS files
- Component-specific: Use Tailwind classes with the `cn()` utility for conditional styling
- Responsive design: Use Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)

**Auth Layout Styling:**
The auth layout uses a gradient background class `bg-brand-gradient-hero`. To customize:
- Update the gradient in your Tailwind config or CSS
- Modify the layout component in `app/routes/auth+/components/layout.tsx`

### 5. Email Templates

Email templates are located in `app/components/emails/` and use React Email components.

**To customize email templates:**

1. Update individual email components:
   - `welcome-email.tsx` - Welcome email for new users
   - `forgot-password.tsx` - Password reset email
   - `account-setup-verification.tsx` - Account verification email
   - `password-change-notice.tsx` - Password change notification

2. Customize shared components:
   - `components/layout.tsx` - Main email layout
   - `components/footer.tsx` - Email footer
   - `components/heading.tsx` - Email headings
   - `sections/email-signature.tsx` - Email signature

3. Update branding in email components:
   ```tsx
   const appName = process.env.APP_NAME || 'App'
   // Use appName throughout email templates
   ```

### 6. Form Validation Messages

Validation schemas are in `app/utils/user/validations.ts` and `app/utils/user/validations.server.ts`.

**To customize validation messages:**

1. Update error messages in validation schemas:
   ```typescript
   export const Username = z
     .string({
       error: 'Your custom error message here',
     })
     .min(1, {
       error: 'Username is required',
     })
   ```

2. Customize password requirements:
   ```typescript
   export const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?\d).{6,30}$/
   // Update regex and error messages as needed
   ```

### 7. Constants and Configuration

Application-wide constants are in `app/utils/constants.ts`.

**To add custom constants:**

1. Add to `app/utils/constants.ts`:
   ```typescript
   export const YOUR_CONSTANT = 'value'
   ```

2. Use throughout your application:
   ```typescript
   import { YOUR_CONSTANT } from '#app/utils/constants'
   ```

### 8. Environment Variables

Configure your application through environment variables.

**Key environment variables:**
- `APP_NAME` - Application name
- `SESSION_SECRET` - Session encryption secret (required)
- `DATABASE_URL` - Database connection string
- `HOST` - Application host URL
- Email provider keys (if using email features)
- Storage provider keys (if using storage features)

**To add custom environment variables:**

1. Add validation in `app/utils/env.server.ts`:
   ```typescript
   YOUR_VAR: z.string().optional(),
   ```

2. Access via `getEnv()`:
   ```typescript
   import { getEnv } from '#app/utils/env.server'
   const env = getEnv()
   const yourVar = env.YOUR_VAR
   ```

### 9. Route Customization

Auth routes are in `app/routes/auth+/` and can be customized as needed.

**Common customizations:**
- Update page titles and subtitles in route components
- Modify form fields and validation
- Add custom redirect logic
- Customize error messages

**Example - Customizing login page:**
```tsx
// app/routes/auth+/login.tsx
export default function LoginPage() {
  return (
    <AuthLayout
      illustration={loginIllustration}
      altText="User login"
      title="Welcome Back"  // Customize title
      subtitle="Sign in to your account"  // Customize subtitle
    >
      {/* Your form content */}
    </AuthLayout>
  )
}
```

### 10. Component Customization

Core components can be customized to match your design.

**Key components:**
- `app/components/logo.tsx` - Logo component
- `app/components/link.tsx` - Link components
- `app/routes/auth+/components/layout.tsx` - Auth layout
- `app/components/error-boundary.tsx` - Error handling

**Best Practices:**
- Keep component APIs consistent when customizing
- Use TypeScript types for props
- Follow the existing component patterns
- Test customizations across different screen sizes

---

## Quick Customization Checklist

- [ ] Replace logo files (`logo.svg`, `edulinks_logo_icon.svg`)
- [ ] Replace auth illustrations (7 SVG files in `app/assets/images/`)
- [ ] Set `APP_NAME` environment variable
- [ ] Update favicons in `public/favicons/`
- [ ] Customize email templates if needed
- [ ] Update validation messages to match your requirements
- [ ] Configure environment variables
- [ ] Customize auth page titles and subtitles
- [ ] Review and adjust styling/colors as needed
