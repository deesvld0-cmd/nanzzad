import { Zap, Instagram, Twitter, Youtube, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const links = {
  Programs: ['Strength Training', 'HIIT Cardio', 'Yoga & Flexibility', 'Athletic Performance', 'Beginner Plans'],
  Resources: ['Exercise Library', 'Nutrition Guide', 'BMI Calculator', 'Workout Tips', 'Blog'],
  Company: ['About Us', 'Careers', 'Press', 'Partners', 'Contact'],
};

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Facebook, label: 'Facebook' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <button
              onClick={() => scrollTo('#home')}
              className="flex items-center gap-2 mb-5"
            >
              <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-white font-bold text-xl">
                Vital<span className="text-orange-500">Fitness</span>
              </span>
            </button>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your ultimate fitness destination. Expert programs, smart tracking,
              and a community that keeps you moving toward your goals every day.
            </p>

            <div className="flex gap-3 mb-8">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/30 text-gray-400 hover:text-orange-400 rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            <div className="space-y-2.5 text-sm text-gray-500">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500/60" />
                <span>hello@vitalfitness.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500/60" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500/60" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <button className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200 text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} VitalFitness Hub. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-gray-600 text-sm">
            <button className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-gray-400 transition-colors">
              Terms of Service
            </button>
            <button className="hover:text-gray-400 transition-colors">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
