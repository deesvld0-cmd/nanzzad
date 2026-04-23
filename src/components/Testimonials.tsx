import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Lost 28 lbs in 4 months',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    content:
      'VitalFitness completely changed my life. The structured programs and constant motivation kept me accountable. I never thought I could feel this confident in my own skin.',
    rating: 5,
    program: 'Fat Burner HIIT',
  },
  {
    name: 'Marcus Johnson',
    role: 'Gained 18 lbs of muscle',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    content:
      "The Power Builder program is no joke. I hit PRs I never thought possible. The exercise library taught me proper form and the programming is elite. Best investment I've made.",
    rating: 5,
    program: 'Power Builder',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Completed first 5K',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    content:
      'As a complete beginner, I was intimidated. The Beginner Foundation program made everything approachable. Within 6 weeks I had a solid routine I actually enjoyed.',
    rating: 5,
    program: 'Beginner Foundation',
  },
  {
    name: 'David Chen',
    role: 'Improved athletic performance',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    content:
      'As a competitive basketball player, I needed sport-specific training. The Athletic Performance program boosted my speed and explosiveness dramatically.',
    rating: 5,
    program: 'Athletic Performance',
  },
  {
    name: 'Amanda Torres',
    role: 'Stress-free and flexible',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
    content:
      'The yoga and flexibility program became my daily ritual. I sleep better, my posture improved, and my chronic back pain is almost completely gone.',
    rating: 5,
    program: 'Yoga & Flexibility',
  },
  {
    name: 'James Walker',
    role: 'Body recomposition success',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    content:
      'Lost 15 lbs of fat while gaining visible muscle. The Body Recomp program is perfectly balanced. The BMI tracker kept me honest throughout the process.',
    rating: 5,
    program: 'Body Recomposition',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">
            Success Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            Real People,{' '}
            <span className="text-orange-500">Real Results</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Join thousands of members who have transformed their bodies and
            lives with VitalFitness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group relative bg-[#111] border border-white/5 rounded-2xl p-7 hover:border-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all" />

              <Quote className="w-8 h-8 text-orange-500/30 mb-4" />

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "{t.content}"
              </p>

              <div className="flex items-center gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-orange-400 fill-orange-400"
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-orange-500/20"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-orange-400 text-xs">{t.role}</div>
                </div>
                <div className="text-xs text-gray-600 text-right shrink-0">
                  {t.program}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
