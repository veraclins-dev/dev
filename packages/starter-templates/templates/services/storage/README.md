# Storage Service Integration

**Provider Options:** `firebase` | `s3` | `local` | `none`
**Feature Flag:** `STORAGE_PROVIDER`

---

## Overview

The storage service provides a unified interface for file uploads across different providers. Currently supports:

- **Firebase Storage** - Google Firebase cloud storage
- **AWS S3** - Amazon S3 object storage
- **Local Storage** - File system storage (for development)
- **None** - Mock mode for development

---

## Usage

### Initialization

Initialize the storage provider in your server setup:

```typescript
// server/index.ts or app/entry.server.tsx
import { initializeStorageProvider } from '#app/services/storage'

const storageProvider = process.env.STORAGE_PROVIDER || 'local'

if (storageProvider === 'firebase') {
	initializeStorageProvider('firebase', {
		apiKey: process.env.FIREBASE_API_KEY!,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
		projectId: process.env.FIREBASE_PROJECT_ID!,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
		appId: process.env.FIREBASE_APP_ID!,
		storageRoot: process.env.FIREBASE_STORAGE_ROOT,
	})
} else if (storageProvider === 's3') {
	initializeStorageProvider('s3', {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
		region: process.env.AWS_REGION!,
		bucket: process.env.AWS_S3_BUCKET!,
		endpoint: process.env.AWS_S3_ENDPOINT,
	})
} else if (storageProvider === 'local') {
	initializeStorageProvider('local', {
		uploadDir: process.env.UPLOAD_DIR || './public/uploads',
		publicUrl: process.env.PUBLIC_URL || 'http://localhost:3000/uploads',
	})
}
```

### Uploading Files

```typescript
import { uploadFile } from '#app/services/storage'

const result = await uploadFile({
	file: fileBlob,
	filename: 'profile.jpg',
	path: 'users/123',
	contentType: 'image/jpeg',
	public: true,
})

console.log(result.url) // Public URL
console.log(result.path) // Storage path
```

### Deleting Files

```typescript
import { deleteFile } from '#app/services/storage'

await deleteFile('users/123/profile.jpg')
```

### Getting Public URLs

```typescript
import { getPublicUrl } from '#app/services/storage'

const url = getPublicUrl('users/123/profile.jpg')
```

---

## Environment Variables

### Firebase

```bash
STORAGE_PROVIDER=firebase
FIREBASE_API_KEY=xxxxx
FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
FIREBASE_PROJECT_ID=xxxxx
FIREBASE_STORAGE_BUCKET=xxxxx.appspot.com
FIREBASE_MESSAGING_SENDER_ID=xxxxx
FIREBASE_APP_ID=xxxxx
FIREBASE_STORAGE_ROOT=https://firebasestorage.googleapis.com/v0/b/
```

### AWS S3

```bash
STORAGE_PROVIDER=s3
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=my-bucket
AWS_S3_ENDPOINT=https://s3.amazonaws.com  # Optional
```

### Local Storage

```bash
STORAGE_PROVIDER=local
UPLOAD_DIR=./public/uploads
PUBLIC_URL=http://localhost:3000/uploads
```

---

## Provider-Specific Notes

### Firebase Storage

- Easy setup with Firebase project
- Good for small to medium projects
- Built-in CDN
- Free tier available

### AWS S3

- Enterprise-grade storage
- Highly scalable
- Pay-per-use pricing
- Requires AWS account

### Local Storage

- Best for development
- Simple file system storage
- Not suitable for production
- Requires public directory setup

---

## Template Variables

When generating from template, replace:

- `{{STORAGE_PROVIDER}}` - Selected provider
- `{{FIREBASE_*}}` - Firebase configuration (if using Firebase)
- `{{AWS_*}}` - AWS configuration (if using S3)
- `{{UPLOAD_DIR}}` - Local upload directory (if using local)
- `{{PUBLIC_URL}}` - Public URL base (if using local)

---

**Last Updated:** 2025-12-18
