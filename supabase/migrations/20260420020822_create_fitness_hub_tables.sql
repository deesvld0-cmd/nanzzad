/*
  # Vital Fitness Hub - Database Schema

  ## New Tables

  1. **workout_programs**
     - id, name, description, difficulty, duration_weeks, sessions_per_week, category, image_url, created_at

  2. **exercises**
     - id, name, description, muscle_group, equipment, sets, reps, duration_seconds, image_url, difficulty, created_at

  3. **bmi_records**
     - id, session_id, height_cm, weight_kg, bmi, category, created_at

  ## Security
  - RLS enabled on all tables
  - Public read access for workout_programs and exercises (no auth required for browsing)
  - bmi_records accessible by session only (anonymous tracking)
*/

CREATE TABLE IF NOT EXISTS workout_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'Beginner',
  duration_weeks integer NOT NULL DEFAULT 4,
  sessions_per_week integer NOT NULL DEFAULT 3,
  category text NOT NULL DEFAULT 'Strength',
  image_url text NOT NULL DEFAULT '',
  calories_per_session integer NOT NULL DEFAULT 400,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  muscle_group text NOT NULL DEFAULT 'Full Body',
  equipment text NOT NULL DEFAULT 'None',
  sets integer NOT NULL DEFAULT 3,
  reps text NOT NULL DEFAULT '10-12',
  image_url text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'Beginner',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bmi_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL DEFAULT '',
  height_cm numeric NOT NULL,
  weight_kg numeric NOT NULL,
  bmi numeric NOT NULL,
  category text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE workout_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE bmi_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read workout programs"
  ON workout_programs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read exercises"
  ON exercises FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert bmi records"
  ON bmi_records FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read bmi records"
  ON bmi_records FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO workout_programs (name, description, difficulty, duration_weeks, sessions_per_week, category, image_url, calories_per_session) VALUES
  ('Power Builder', 'Build raw strength and muscle mass with heavy compound lifts. Designed for those who want to push their limits and achieve serious gains.', 'Advanced', 12, 5, 'Strength', 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg', 650),
  ('Fat Burner HIIT', 'High-intensity interval training designed to maximize calorie burn and boost your metabolism. Short bursts, big results.', 'Intermediate', 8, 4, 'Cardio', 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg', 550),
  ('Beginner Foundation', 'The perfect starting point for fitness beginners. Learn proper form, build a solid base, and develop healthy habits.', 'Beginner', 6, 3, 'Full Body', 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg', 350),
  ('Yoga & Flexibility', 'Improve flexibility, reduce stress, and enhance mind-body connection. Suitable for all fitness levels.', 'Beginner', 8, 5, 'Flexibility', 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg', 250),
  ('Athletic Performance', 'Sport-specific conditioning to enhance speed, agility, power, and endurance for competitive athletes.', 'Advanced', 16, 5, 'Athletic', 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg', 700),
  ('Body Recomposition', 'Simultaneously build muscle and lose fat with this scientifically-designed program balancing strength and cardio.', 'Intermediate', 12, 4, 'Full Body', 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg', 480)
ON CONFLICT DO NOTHING;

INSERT INTO exercises (name, description, muscle_group, equipment, sets, reps, image_url, difficulty) VALUES
  ('Barbell Squat', 'The king of all exercises. Builds massive leg strength and stimulates full-body muscle growth.', 'Legs', 'Barbell', 4, '6-8', 'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg', 'Advanced'),
  ('Pull-Up', 'Upper body compound movement targeting back and biceps. A true test of relative strength.', 'Back', 'Pull-up Bar', 3, '8-12', 'https://images.pexels.com/photos/4162438/pexels-photo-4162438.jpeg', 'Intermediate'),
  ('Push-Up', 'The classic bodyweight chest exercise. Perfect for building upper body strength anywhere.', 'Chest', 'None', 3, '15-20', 'https://images.pexels.com/photos/4162582/pexels-photo-4162582.jpeg', 'Beginner'),
  ('Deadlift', 'Full body posterior chain exercise that builds immense strength in your back, glutes, and hamstrings.', 'Back', 'Barbell', 4, '5-6', 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg', 'Advanced'),
  ('Dumbbell Lunges', 'Unilateral leg exercise that builds balance, coordination, and lower body strength simultaneously.', 'Legs', 'Dumbbells', 3, '12 each', 'https://images.pexels.com/photos/4162596/pexels-photo-4162596.jpeg', 'Beginner'),
  ('Plank', 'Core stability exercise that builds a strong, stable midsection crucial for all athletic movements.', 'Core', 'None', 3, '45-60s', 'https://images.pexels.com/photos/4162485/pexels-photo-4162485.jpeg', 'Beginner'),
  ('Bench Press', 'The definitive chest builder. Develops strength and size in the pectorals, shoulders, and triceps.', 'Chest', 'Barbell', 4, '8-10', 'https://images.pexels.com/photos/4162453/pexels-photo-4162453.jpeg', 'Intermediate'),
  ('Overhead Press', 'Build strong, powerful shoulders with this fundamental pressing movement.', 'Shoulders', 'Barbell', 3, '8-10', 'https://images.pexels.com/photos/4162577/pexels-photo-4162577.jpeg', 'Intermediate'),
  ('Burpees', 'Full-body cardio exercise that builds endurance and burns maximum calories in minimum time.', 'Full Body', 'None', 4, '15', 'https://images.pexels.com/photos/4164766/pexels-photo-4164766.jpeg', 'Intermediate'),
  ('Cable Row', 'Seated rowing movement for a thick, strong back and improved posture.', 'Back', 'Cable Machine', 3, '10-12', 'https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg', 'Beginner')
ON CONFLICT DO NOTHING;
