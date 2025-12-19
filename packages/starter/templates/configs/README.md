# Deployment Configuration Templates

This directory contains deployment configuration templates for different platforms.

---

## Available Configurations

### Fly.io

**Files:**
- `fly.io/fly.toml` - Fly.io app configuration
- `fly.io/release.sh` - Release command script (runs migrations)

**Template Variables:**
- `{{PROJECT_NAME}}` - Application name
- `{{PRIMARY_REGION}}` - Primary deployment region (e.g., 'ams', 'iad')

**Usage:**
```bash
# Copy configs to project root
cp configs/fly.io/fly.toml .
cp configs/fly.io/release.sh .
chmod +x release.sh

# Deploy
flyctl deploy
```

---

### Vercel

**Files:**
- `vercel/vercel.json` - Vercel configuration

**Template Variables:**
- None (uses standard Vercel detection)

**Usage:**
```bash
# Copy config to project root
cp configs/vercel/vercel.json .

# Deploy
vercel deploy
```

**Note:** Vercel may require additional configuration for React Router. See Vercel documentation for React Router deployment.

---

### Railway

**Files:**
- `railway/railway.json` - Railway configuration

**Template Variables:**
- None (uses Railway auto-detection)

**Usage:**
```bash
# Copy config to project root
cp configs/railway/railway.json .

# Deploy via Railway CLI or connect GitHub repo
railway up
```

---

### Docker

**Files:**
- `docker/Dockerfile` - Multi-stage Docker build
- `docker/.dockerignore` - Docker ignore patterns

**Template Variables:**
- `{{NPM_TOKEN}}` - Optional NPM token for private packages

**Usage:**
```bash
# Copy configs to project root
cp configs/docker/Dockerfile .
cp configs/docker/.dockerignore .

# Build
docker build -t {{PROJECT_NAME}} .

# Run
docker run -p 8080:8080 {{PROJECT_NAME}}
```

---

## Template Variable Replacement

When generating a project, the generator will:

1. Copy the selected deployment config to the project root
2. Replace template variables with actual values
3. Make scripts executable (e.g., `release.sh`)

---

## Platform-Specific Notes

### Fly.io

- Requires Fly.io CLI
- Supports persistent volumes
- Auto-scaling support
- Health checks configured

### Vercel

- Serverless functions
- Edge network
- Automatic HTTPS
- May require adapter configuration for React Router

### Railway

- Simple deployment
- Auto-detects build commands
- Environment variable management
- Database provisioning available

### Docker

- Multi-stage build for optimization
- Supports any container platform
- Can be used with Kubernetes, Docker Compose, etc.

---

**Last Updated:** 2025-12-18
