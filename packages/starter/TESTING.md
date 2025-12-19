# Testing the @veraclins-dev/starter Generator

This guide explains how to test the generator in a new workspace.

## Prerequisites

- Node.js 20+ installed
- pnpm installed (or npm/yarn)
- Access to the `@veraclins-dev/starter` package (published or local)

## Step 1: Create a New Nx Workspace

```bash
# Create a new Nx workspace
npx create-nx-workspace@latest test-starter \
  --preset=apps \
  --packageManager=pnpm \
  --nxCloud=skip

cd test-starter
```

## Step 2: Install the Generator Package

### Option A: From Published Package (if published to npm)

```bash
pnpm add -D @veraclins-dev/starter@latest
```

### Option B: From Local Package (for development)

```bash
# Link to local package
pnpm add -D @veraclins-dev/starter@workspace:*

# Or if testing from veraclins-dev workspace:
pnpm link /path/to/veraclins-dev/dist/packages/starter
```

## Step 3: Run the Generator

### Basic Usage (Minimal Config)

```bash
nx g @veraclins-dev/starter:app my-test-app
```

This will:
- Prompt for application name
- Prompt for description
- Use default values for all other options

### With Options

```bash
nx g @veraclins-dev/starter:app my-test-app \
  --description="A test application" \
  --features=notifications,admin \
  --database=postgresql \
  --emailProvider=resend \
  --storageProvider=local \
  --monitoringProvider=sentry \
  --deploymentTarget=fly.io
```

### Interactive Mode

```bash
nx g @veraclins-dev/starter:app my-test-app --interactive
```

## Step 4: Verify Generated Project

After generation, verify the following:

### 1. Project Structure

```bash
# Check that the app directory was created
ls -la apps/my-test-app/

# Verify key directories exist
test -d apps/my-test-app/app && echo "✓ app/ exists"
test -d apps/my-test-app/prisma && echo "✓ prisma/ exists"
test -d apps/my-test-app/server && echo "✓ server/ exists"
```

### 2. Base Template Files

```bash
# Check for base files
test -f apps/my-test-app/package.json && echo "✓ package.json"
test -f apps/my-test-app/prisma/schema.prisma && echo "✓ schema.prisma"
test -f apps/my-test-app/app/root.tsx && echo "✓ root.tsx"
test -f apps/my-test-app/server/index.ts && echo "✓ server/index.ts"
```

### 3. Feature Modules (if selected)

```bash
# If notifications was selected
test -d apps/my-test-app/app/routes/notifications+ && echo "✓ notifications feature"

# If admin was selected
test -d apps/my-test-app/app/routes/admin+ && echo "✓ admin feature"
```

### 4. Service Integrations (if selected)

```bash
# If email provider was selected
test -d apps/my-test-app/app/utils/services/email && echo "✓ email service"

# If storage provider was selected
test -d apps/my-test-app/app/utils/services/storage && echo "✓ storage service"
```

### 5. Deployment Config (if selected)

```bash
# If fly.io was selected
test -f apps/my-test-app/fly.toml && echo "✓ fly.io config"

# If docker was selected
test -f apps/my-test-app/Dockerfile && echo "✓ Dockerfile"
```

### 6. Prisma Schema

```bash
# Check that schema was merged correctly
cat apps/my-test-app/prisma/schema.prisma | grep -q "model User" && echo "✓ Base User model"
cat apps/my-test-app/prisma/schema.prisma | grep -q "model Notification" && echo "✓ Notification model (if feature selected)"
```

### 7. Package.json

```bash
# Check that package.json was updated
cat apps/my-test-app/package.json | grep -q '"name": "my-test-app"' && echo "✓ Name updated"
cat apps/my-test-app/package.json | grep -q '"description":' && echo "✓ Description added"
```

## Step 5: Test Different Configurations

### Test Case 1: Minimal (Base Only)

```bash
nx g @veraclins-dev/starter:app minimal-app \
  --features= \
  --emailProvider=none \
  --storageProvider=none \
  --monitoringProvider=none \
  --deploymentTarget=none
```

**Expected:**
- Only base template files
- No feature modules
- No service integrations
- No deployment configs

### Test Case 2: All Features

```bash
nx g @veraclins-dev/starter:app full-app \
  --features=notifications,admin,search,activity-logging,reporting,moderation,invitations,mfa \
  --emailProvider=resend \
  --storageProvider=firebase \
  --monitoringProvider=sentry \
  --deploymentTarget=fly.io
```

**Expected:**
- All feature modules included
- All service integrations
- Deployment config
- Prisma schema with all feature models

### Test Case 3: Feature Dependencies

```bash
nx g @veraclins-dev/starter:app deps-test \
  --features=notifications
```

**Expected:**
- Notifications feature included
- Activity-logging automatically included (dependency)
- Prisma schema includes both Notification and ActivityLog models

### Test Case 4: Different Database

```bash
nx g @veraclins-dev/starter:app sqlite-app \
  --database=sqlite
```

**Expected:**
- Prisma schema uses `sqlite` provider
- Database URL in env.example points to SQLite

### Test Case 5: Different Providers

```bash
nx g @veraclins-dev/starter:app providers-test \
  --emailProvider=sendgrid \
  --storageProvider=s3 \
  --monitoringProvider=sentry
```

**Expected:**
- SendGrid email service files
- S3 storage service files
- Sentry monitoring service files

## Step 6: Build and Run (Optional)

```bash
# Install dependencies
cd apps/my-test-app
pnpm install

# Generate Prisma client
npx prisma generate

# Try building (if build script exists)
pnpm run build

# Try running dev server (if dev script exists)
pnpm run dev
```

## Common Issues and Troubleshooting

### Issue: Generator not found

**Solution:**
```bash
# Verify package is installed
pnpm list @veraclins-dev/starter

# Check if package is in node_modules
ls node_modules/@veraclins-dev/starter
```

### Issue: Templates not found

**Solution:**
- Verify templates are bundled in the package
- Check `dist/packages/starter/templates/` exists
- Verify `generators.json` has correct factory path

### Issue: Prisma schema merge errors

**Solution:**
- Check that feature schemas are valid Prisma syntax
- Verify schema merging logic handles all cases
- Check for duplicate model/enum names

### Issue: Template variables not replaced

**Solution:**
- Verify `renderTemplate` function is called
- Check that template variables use `{{VARIABLE}}` format
- Ensure all variables are defined in `TemplateConfig`

## Next Steps

After successful testing:

1. **Document any issues** found during testing
2. **Update generator** to fix any bugs
3. **Test edge cases** (empty features, all features, etc.)
4. **Performance testing** (large feature sets, many files)
5. **User acceptance testing** with real-world scenarios

## Test Checklist

- [ ] Generator installs correctly
- [ ] Generator runs without errors
- [ ] Base template files are created
- [ ] Feature modules are included when selected
- [ ] Service integrations are included when selected
- [ ] Deployment configs are included when selected
- [ ] Prisma schema is merged correctly
- [ ] Template variables are replaced
- [ ] Package.json is updated correctly
- [ ] Feature dependencies are handled automatically
- [ ] Generated project can be built
- [ ] Generated project can run (if applicable)
