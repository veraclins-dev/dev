## 🎨 Customization

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

### 5. Landing Page Customization

The landing page is located at `app/routes/_marketing+/index.tsx` and serves as your main marketing page.

**Key Sections:**

1. **Hero Section** - Main banner with headline, description, and CTAs
2. **Core Features Section** - Highlights main features included in the template
3. **Benefits Section** - Explains why users should choose your template
4. **Optional Features Section** - Shows additional features that can be enabled
5. **Tech Stack Section** - Displays the technologies used
6. **CTA Section** - Final call-to-action at the bottom

**Customizing the Hero Section:**

```tsx
// app/routes/_marketing+/index.tsx
<Typography variant="h1" className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
  Build faster with <span className="text-primary">modern tools</span>
</Typography>
<Typography variant="body1" className="max-w-2xl text-lg text-gray-200 md:text-xl">
  Your custom description here. Get started in minutes with a complete, production-ready foundation.
</Typography>
```

**Customizing Features:**

Update the feature arrays to match your application:

```tsx
const coreFeatures = [
  {
    icon: 'lock-closed', // Use valid IconName from @veraclins-dev/ui
    title: 'Your Feature Title',
    description: 'Your feature description here.',
  },
  // Add more features...
] satisfies FeatureCardProps[]
```

**Important:** Only use valid icon names from `@veraclins-dev/ui`. Common icons include:
- `lock-closed`, `document-text`, `chart-bar`, `pencil`, `envelope-closed`, `camera`, `check`, `search`, `clock`, `user-add`, `bookmark`, `flag`

**Customizing Trust Indicators:**

Update the trust indicators in the hero section:

```tsx
<Box display="flex" flexDirection="column" gap={1}>
  <Typography variant="h3" className="font-bold">
    100+
  </Typography>
  <Typography variant="body2" className="text-gray-300">
    Pre-built components
  </Typography>
</Box>
```

**Styling Guidelines:**
- Use `gap` utilities on parent containers instead of margins
- Use theme colors (`primary`, `foreground`, `background`, `muted`) instead of hardcoded colors
- Use responsive prefixes (`sm:`, `md:`, `lg:`) for breakpoints

### 6. Header Customization

The header component is located at `app/components/marketing-header.tsx` and provides navigation and authentication controls.

**Structure:**
- **Logo** - Links to home page
- **Navigation Links** - Features, Documentation, Pricing (hidden on mobile)
- **CTA Buttons** - Sign In / Get Started (or Dashboard for logged-in users)

**Customizing Navigation Links:**

```tsx
// app/components/marketing-header.tsx
<Box display="flex" items="center" gap={8} className="hidden md:flex">
  <Link
    to="#features"
    className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
  >
    Features
  </Link>
  <Link
    to="/docs"
    className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
  >
    Documentation
  </Link>
  <Link
    to="/pricing"
    className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
  >
    Pricing
  </Link>
</Box>
```

**Customizing CTA Buttons:**

The header automatically shows different buttons based on authentication state. You can customize the behavior:

```tsx
{user?.id ? (
  // Logged in: Show Dashboard button
  <LinkButton to="/dashboard" variant="outline">
    Dashboard
  </LinkButton>
) : (
  // Logged out: Show Sign In and Get Started
  <>
    <LinkButton to="/auth/login" variant="outline">
      Sign In
    </LinkButton>
    <LinkButton to={to} variant="solid" color="primary">
      Get Started
    </LinkButton>
  </>
)}
```

**Styling:**
- The header uses sticky positioning: `sticky top-0 z-50`
- Backdrop blur effect: `backdrop-blur supports-[backdrop-filter]:bg-background/60`
- Border: `border-b border-border/40`

### 7. Footer Customization

The footer component is located at `app/components/footer.tsx` and provides site-wide navigation and links.

**Structure:**
- **Logo and Description** - Branding section
- **Four Columns**:
  - Product (Features, Pricing, Documentation)
  - Company (About, Blog, Contact)
  - Resources (Getting Started, API Reference, Support)
  - Legal (Terms, Privacy, Cookie Policy)
- **Copyright and Social Links** - Bottom section

**Customizing Footer Links:**

Update the footer columns to match your application structure:

```tsx
// app/components/footer.tsx
<Box display="flex" flexDirection="column" gap={4}>
  <Typography variant="h4" className="font-semibold">
    Product
  </Typography>
  <Box display="flex" flexDirection="column" gap={2}>
    <Link
      to="#features"
      className="text-foreground/70 hover:text-foreground text-sm transition-colors"
    >
      Features
    </Link>
    {/* Add more links... */}
  </Box>
</Box>
```

**Customizing Social Links:**

Update the social media links at the bottom:

```tsx
<Box display="flex" items="center" gap={4}>
  <Link
    to="https://twitter.com/yourhandle"
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground/60 hover:text-foreground transition-colors"
    aria-label="Twitter"
  >
    <Icon name="x-logo" size="sm" />
  </Link>
  <Link
    to="https://github.com/yourorg"
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground/60 hover:text-foreground transition-colors"
    aria-label="GitHub"
  >
    <Icon name="github-logo" size="sm" />
  </Link>
</Box>
```

**Updating Copyright:**

The copyright notice automatically uses the current year:

```tsx
<Typography variant="body2" className="text-foreground/60">
  © {new Date().getFullYear()} Your Company Name. All rights reserved.
</Typography>
```

### 8. Email Templates

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

### 9. Form Validation Messages

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

### 10. Constants and Configuration

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

### 11. Environment Variables

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

### 12. Route Customization

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

### 13. Component Customization

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
- [ ] Customize landing page content and features (`app/routes/_marketing+/index.tsx`)
- [ ] Update header navigation links (`app/components/marketing-header.tsx`)
- [ ] Customize footer links and social media (`app/components/footer.tsx`)
- [ ] Customize email templates if needed
- [ ] Update validation messages to match your requirements
- [ ] Configure environment variables
- [ ] Customize auth page titles and subtitles
- [ ] Review and adjust styling/colors as needed
