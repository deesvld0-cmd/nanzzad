import { Dumbbell, Heart, Brain, Flame, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: Dumbbell,
    title: 'Expert Programs',
    description:
      'Professionally designed workout plans built by certified trainers for every fitness level.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Heart,
    title: 'Health Tracking',
    description:
      'Monitor your BMI, calories, and vital metrics to stay on top of your health journey.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Brain,
    title: 'Smart Coaching',
    description:
      'AI-powered recommendations adapt to your progress and keep you challenged.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Flame,
    title: 'HIIT Workouts',
    description:
      'High-intensity interval training sessions designed to maximize fat burn and build endurance.',
    color: 'from-orange-400 to-amber-500',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description:
      'Programs that fit your lifestyle — 20 minutes or 2 hours, we have something for everyone.',
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: Shield,
    title: 'Injury Prevention',
    description:
      'Learn proper form with detailed exercise guides and avoid common training mistakes.',
    color: 'from-purple-500 to-indigo-500',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">
            Why Choose Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            Everything You Need to
            <br />
            <span className="text-orange-500">Succeed</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A complete fitness ecosystem built to help you reach your goals
            faster and smarter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-[#111] border border-white/5 rounded-2xl p-7 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-300" />

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-5`}
                >
                  <div className="w-full h-full bg-[#111] rounded-[10px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-white font-bold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
