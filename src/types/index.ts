export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  duration_weeks: number;
  sessions_per_week: number;
  category: string;
  image_url: string;
  calories_per_session: number;
  created_at: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscle_group: string;
  equipment: string;
  sets: number;
  reps: string;
  image_url: string;
  video_url: string;
  difficulty: string;
  created_at: string;
}

export interface BMIRecord {
  id: string;
  session_id: string;
  height_cm: number;
  weight_kg: number;
  bmi: number;
  category: string;
  created_at: string;
}
