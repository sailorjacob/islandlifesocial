-- Fix user_id constraint to allow NULL for public posts
-- Run this to fix the 400 error when creating posts

-- Make user_id optional (allow NULL)
ALTER TABLE posts ALTER COLUMN user_id DROP NOT NULL;

-- Update the posts table to have a default user_id for existing records
UPDATE posts SET user_id = '00000000-0000-0000-0000-000000000000' WHERE user_id IS NULL;

-- Alternatively, you can completely remove the user_id requirement:
-- ALTER TABLE posts DROP COLUMN user_id;
-- But keeping it for future use is better
