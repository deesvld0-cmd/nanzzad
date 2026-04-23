import { useEffect, useState } from 'react';
import { Clock, Zap, Flame, ChevronRight, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { WorkoutProgram } from '../types';

const difficultyColor: Record<string, string> = {
  Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const categoryColor: Record<string, string> = {
  Strength: 'text-orange-400',
  Cardio: 'text-red-400',
  'Full Body': 'text-blue-400',
  Flexibility: 'text-green-400',
  Athletic: 'text-amber-400',
};

export default function WorkoutPrograms() {
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string>('All');

  const categories = ['All', 'Strength', 'Cardio', 'Full Body', 'Flexibility', 'Athletic'];

  useEffect(() => {
    async function fetchPrograms() {
      const { data } = await supabase
        .from('workout_programs')
        .select('*')
        .order('created_at', { ascending: true });
      if (data) setPrograms(data);
      setLoading(false);
    }
    fetchPrograms();
  }, []);

  const filtered =
    selected === 'All'
      ? programs
      : programs.filter((p) => p.category === selected);

  return (
    <section id="programs" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">
            Training Plans
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            Find Your <span className="text-orange-500">Program</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Expert-designed programs for every goal and fitness level.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                selected === cat
                  ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((program) => (
              <div
                key={program.id}
                className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={program.image_url}
                    alt={program.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-sm ${
                        difficultyColor[program.difficulty] ||
                        difficultyColor['Beginner']
                      }`}
                    >
                      {program.difficulty}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm ${
                        categoryColor[program.category] || 'text-white'
                      }`}
                    >
                      {program.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-orange-400 transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
                    {program.description}
                  </p>

                  <div className="flex items-center gap-4 mb-5 text-sm text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>{program.duration_weeks} weeks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span>{program.sessions_per_week}x/week</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{program.calories_per_session} kcal</span>
                    </div>
                  </div>

                  <button className="group/btn w-full flex items-center justify-center gap-2 bg-orange-500/10 hover:bg-orange-500 border border-orange-500/30 hover:border-orange-500 text-orange-400 hover:text-white font-semibold py-3 rounded-xl transition-all duration-200">
                    Start Program
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
