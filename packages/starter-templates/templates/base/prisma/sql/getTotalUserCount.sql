-- Returns count of all non-deleted users
-- Simple example query demonstrating Prisma typed SQL

SELECT COUNT(*)::integer AS total_users
FROM users
WHERE deleted_at IS NULL;
