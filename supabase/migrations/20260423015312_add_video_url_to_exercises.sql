/*
  # Add Video URL to Exercises

  ## Changes
  - Add `video_url` column to exercises table
  - Store YouTube embed URLs for exercise demonstrations
  - Column is optional to allow gradual video addition

  ## Notes
  - video_url stores the YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)
  - Enables rich video demonstrations for each exercise
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'exercises' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE exercises ADD COLUMN video_url text DEFAULT '';
  END IF;
END $$;
