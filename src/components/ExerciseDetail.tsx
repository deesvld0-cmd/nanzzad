import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Loader, Target, Dumbbell, BarChart2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Exercise } from '../types';

const difficultyColor: Record<string, string> = {
  Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
  Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExercise() {
      if (!id) return;
      const { data } = await supabase
        .from('exercises')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (data) setExercise(data);
      setLoading(false);
    }
    fetchExercise();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <Loader className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go back
          </button>
          <div className="text-center py-20">
            <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Exercise not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to exercises
        </button>

        <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
          {exercise.video_url ? (
            <div className="relative w-full bg-black aspect-video rounded-2xl overflow-hidden mb-8">
              <iframe
                src={exercise.video_url}
                title={`${exercise.name} Demo`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                <Play className="w-4 h-4 fill-white" />
                Demo Video
              </div>
            </div>
          ) : (
            <div className="w-full bg-gradient-to-br from-[#1a1a1a] to-black aspect-video rounded-2xl flex items-center justify-center mb-8 border border-white/5">
              <div className="text-center">
                <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">No video available</p>
              </div>
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                    {exercise.name}
                  </h1>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                    {exercise.description}
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold px-4 py-2 rounded-lg border whitespace-nowrap ${
                    difficultyColor[exercise.difficulty] ||
                    difficultyColor['Beginner']
                  }`}
                >
                  {exercise.difficulty}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 pb-10 border-b border-white/10">
              <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-500 text-sm font-medium">
                    Muscle Group
                  </span>
                </div>
                <p className="text-white font-bold text-lg">
                  {exercise.muscle_group}
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <Dumbbell className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-500 text-sm font-medium">
                    Equipment
                  </span>
                </div>
                <p className="text-white font-bold text-lg">
                  {exercise.equipment}
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart2 className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-500 text-sm font-medium">Sets</span>
                </div>
                <p className="text-white font-bold text-lg">{exercise.sets}</p>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart2 className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-500 text-sm font-medium">Reps</span>
                </div>
                <p className="text-white font-bold text-lg">{exercise.reps}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Form & Technique
                </h2>
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5 space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    {exercise.description}
                  </p>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold mb-1">Pro Tip</p>
                      <p className="text-gray-300 text-sm">
                        Watch the video demonstration above to perfect your form.
                        Proper technique is crucial for safety and effectiveness.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Programming Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5">
                    <p className="text-gray-500 text-sm font-medium mb-2">
                      Standard Programming
                    </p>
                    <p className="text-white font-bold text-xl">
                      {exercise.sets} sets × {exercise.reps} reps
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5">
                    <p className="text-gray-500 text-sm font-medium mb-2">
                      Difficulty Level
                    </p>
                    <p className="text-white font-bold text-xl">
                      {exercise.difficulty}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
