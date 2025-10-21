-- Add position field to posts table for drag & drop ordering
ALTER TABLE posts ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0;

-- Create index for better performance when ordering
CREATE INDEX IF NOT EXISTS idx_posts_scheduled_date_position ON posts(scheduled_date, position);
