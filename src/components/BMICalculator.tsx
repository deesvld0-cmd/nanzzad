import { useState } from 'react';
import { Calculator, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  advice: string;
  percentage: number;
}

function getBMIResult(bmi: number): BMIResult {
  if (bmi < 18.5) {
    return {
      bmi,
      category: 'Underweight',
      color: 'text-blue-400',
      advice:
        'Focus on building lean muscle mass with strength training and a calorie surplus diet rich in protein.',
      percentage: (bmi / 40) * 100,
    };
  } else if (bmi < 25) {
    return {
      bmi,
      category: 'Normal Weight',
      color: 'text-green-400',
      advice:
        'Great work! Maintain your current lifestyle with regular exercise and balanced nutrition.',
      percentage: (bmi / 40) * 100,
    };
  } else if (bmi < 30) {
    return {
      bmi,
      category: 'Overweight',
      color: 'text-amber-400',
      advice:
        'A combination of cardio and strength training with a moderate calorie deficit will help you reach your ideal weight.',
      percentage: (bmi / 40) * 100,
    };
  } else {
    return {
      bmi,
      category: 'Obese',
      color: 'text-red-400',
      advice:
        'Consult a healthcare professional and start with low-impact exercises like walking or swimming to build a safe foundation.',
      percentage: Math.min((bmi / 40) * 100, 100),
    };
  }
}

const bmiRanges = [
  { label: 'Underweight', range: '< 18.5', color: 'bg-blue-400' },
  { label: 'Normal', range: '18.5 - 24.9', color: 'bg-green-400' },
  { label: 'Overweight', range: '25 - 29.9', color: 'bg-amber-400' },
  { label: 'Obese', range: '≥ 30', color: 'bg-red-400' },
];

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const calculate = async () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;

    const heightM = h / 100;
    const bmi = parseFloat((w / (heightM * heightM)).toFixed(1));
    const res = getBMIResult(bmi);
    setResult(res);
    setSaved(false);

    setSaving(true);
    const sessionId = `anon_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    await supabase.from('bmi_records').insert({
      session_id: sessionId,
      height_cm: h,
      weight_kg: w,
      bmi,
      category: res.category,
    });
    setSaving(false);
    setSaved(true);
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setResult(null);
    setSaved(false);
  };

  return (
    <section id="bmi" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">
            Health Check
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            BMI <span className="text-orange-500">Calculator</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Calculate your Body Mass Index and get personalized fitness
            recommendations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Calculator className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-white font-bold text-xl">Your Measurements</h3>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  min="1"
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  min="1"
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={calculate}
                disabled={!height || !weight || saving}
                className="flex-1 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
              >
                {saving ? 'Calculating...' : 'Calculate BMI'}
              </button>
              {result && (
                <button
                  onClick={reset}
                  className="px-5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white font-semibold rounded-xl transition-all duration-200"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="mt-8 space-y-2">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-3">
                BMI Reference
              </p>
              {bmiRanges.map((range) => (
                <div key={range.label} className="flex items-center gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${range.color}`}
                  />
                  <span className="text-gray-400 text-sm flex-1">
                    {range.label}
                  </span>
                  <span className="text-gray-500 text-sm">{range.range}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-2xl p-8 flex flex-col">
            {result ? (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl">Your Results</h3>
                  {saved && (
                    <div className="ml-auto flex items-center gap-1.5 text-green-400 text-xs">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Saved</span>
                    </div>
                  )}
                </div>

                <div className="text-center mb-8">
                  <div className={`text-7xl font-black mb-2 ${result.color}`}>
                    {result.bmi}
                  </div>
                  <div
                    className={`text-xl font-bold ${result.color} mb-1`}
                  >
                    {result.category}
                  </div>
                  <div className="text-gray-500 text-sm">Body Mass Index</div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>15</span>
                    <span>25</span>
                    <span>40+</span>
                  </div>
                  <div className="h-3 bg-[#222] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 via-green-400 via-amber-400 to-red-400 rounded-full relative"
                      style={{ width: '100%' }}
                    >
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-gray-800 transition-all duration-500"
                        style={{
                          left: `calc(${Math.min(result.percentage, 95)}% - 8px)`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Obese</span>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 flex-1">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-semibold mb-1">
                        Recommendation
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {result.advice}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-5">
                  <Calculator className="w-10 h-10 text-orange-500/50" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Enter your height and weight to get your BMI score and
                  personalized fitness advice.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
