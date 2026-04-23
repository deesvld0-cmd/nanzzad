import { ArrowRight, Play, Users, Trophy, Star } from 'lucide-react';

const stats = [
  { icon: Users, value: '50K+', label: 'Active Members' },
  { icon: Trophy, value: '200+', label: 'Programs' },
  { icon: Star, value: '4.9', label: 'Rating' },
];

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-400 text-sm font-medium tracking-wide">
              #1 Fitness Platform
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Transform Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Body & Mind
            </span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            Join thousands of members achieving their fitness goals with
            expert-designed workout programs, nutrition guidance, and a
            supportive community.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <button
              onClick={() => handleScroll('#programs')}
              className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:shadow-2xl hover:shadow-orange-500/40 active:scale-95"
            >
              Start Training
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScroll('#exercises')}
              className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl text-base border border-white/20 transition-all duration-200 active:scale-95"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
              </div>
              View Exercises
            </button>
          </div>

          <div className="flex flex-wrap gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl leading-none">
                    {value}
                  </div>
                  <div className="text-gray-400 text-sm mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-500 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
}
