-- Returns the total count of non-deleted users

SELECT COUNT(*)::integer AS total_users
FROM users
WHERE deleted_at IS NULL;
