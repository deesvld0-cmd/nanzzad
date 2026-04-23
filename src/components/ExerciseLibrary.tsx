import { useEffect, useState } from 'react';
import { Dumbbell, Search, Loader, Target, BarChart2, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Exercise } from '../types';

const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Core', 'Full Body'];

const difficultyColor: Record<string, string> = {
  Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
  Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function ExerciseLibrary() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [muscle, setMuscle] = useState('All');

  useEffect(() => {
    async function fetchExercises() {
      const { data } = await supabase
        .from('exercises')
        .select('*')
        .order('created_at', { ascending: true });
      if (data) setExercises(data);
      setLoading(false);
    }
    fetchExercises();
  }, []);

  const filtered = exercises.filter((ex) => {
    const matchesMuscle = muscle === 'All' || ex.muscle_group === muscle;
    const matchesSearch =
      search === '' ||
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.muscle_group.toLowerCase().includes(search.toLowerCase());
    return matchesMuscle && matchesSearch;
  });

  return (
    <section id="exercises" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">
            Exercise Library
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            Master Every <span className="text-orange-500">Movement</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Detailed guides for hundreds of exercises with proper form cues and
            programming recommendations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-white/10 text-white placeholder-gray-500 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {muscleGroups.map((mg) => (
              <button
                key={mg}
                onClick={() => setMuscle(mg)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  muscle === mg
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {mg}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Dumbbell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">No exercises found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => navigate(`/exercises/${exercise.id}`)}
                className="group bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 text-left"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={exercise.image_url}
                    alt={exercise.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/10 to-transparent" />

                  {exercise.video_url && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                      <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                        difficultyColor[exercise.difficulty] ||
                        difficultyColor['Beginner']
                      }`}
                    >
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-white font-bold text-base mb-1.5 group-hover:text-orange-400 transition-colors">
                    {exercise.name}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
                    {exercise.description}
                  </p>

                  <div className="space-y-2 text-xs text-gray-400">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-orange-500" />
                        <span>{exercise.muscle_group}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Dumbbell className="w-3.5 h-3.5 text-orange-500" />
                        <span>{exercise.equipment}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart2 className="w-3.5 h-3.5 text-orange-500" />
                      <span>
                        {exercise.sets} sets &times; {exercise.reps}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
