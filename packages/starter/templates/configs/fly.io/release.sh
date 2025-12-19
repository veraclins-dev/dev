#!/bin/bash

# Exit on any error
set -e

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Generate Prisma SQL (if needed)
echo "Generating Prisma SQL..."
npm run prisma:gen || true

# Seed the database (optional - remove if not needed)
if [ "$SKIP_SEED" != "true" ]; then
	echo "Seeding the database..."
	npx prisma db seed || true
fi

echo "DB preparation completed successfully!"
