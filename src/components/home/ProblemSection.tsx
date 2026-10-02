import React from 'react';
import { AlertCircle, TrendingDown, BookX, Globe2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: AlertCircle,
      title: 'Crop Disease',
      subtitle: 'Delayed Visual Detection',
      description: 'Identifying foliar pathogens in early stages is notoriously difficult. By the time lesions become conspicuous, fungal mycelium has colonized deep vascular tissue, leading to 30-50% harvest loss.',
      stat: 'Up to 40% Global Harvest Loss',
      color: 'rose',
    },
    {
      icon: TrendingDown,
      title: 'Yield Uncertainty',
      subtitle: 'Lack of Predictive Modeling',
      description: 'Farmers lack accessible, data-driven yield and climate-risk forecasting. Decisions about irrigation and chemical application are often made on intuition rather than predictive agronomics.',
      stat: 'Unpredictable Net Incomes',
      color: 'amber',
    },
    {
      icon: BookX,
      title: 'Scattered Information',
      subtitle: 'Information Overload & Silos',
      description: 'High-quality agricultural research is locked away in hundreds of academic PDF bulletins, government extension advisories, and obscure databases inaccessible to field operators.',
      stat: '10,000+ Fragmented Manuals',
      color: 'blue',
    },
    {
      icon: Globe2,
      title: 'Language Barriers',
      subtitle: 'Digital Exclusion of Farmers',
      description: 'The vast majority of digital farming tech is built solely in English, creating a massive digital divide for regional farmers who speak Telugu, Hindi, Tamil, Kannada, or regional dialects.',
      stat: '85% Speak Regional Dialects',
      color: 'emerald',
    },
  ];

  return (
    <section className="py-24 bg-stone-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-300">
            The Agricultural Challenge
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Farmers face complex decisions every single day.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600">
            Traditional farming relies on guesswork when confronted with unprecedented climate variability, emerging fungal mutations, and fragmented advisories.
          </p>
        </div>

        {/* 4 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-sm hover:shadow-card-hover hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                    0{i + 1} • {p.subtitle}
                  </span>

                  <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-emerald-800 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {p.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Solution Bridge Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/50">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              The AgriSense AI Breakthrough
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
              AgriSense AI brings these capabilities together in one unified platform.
            </h3>
            <p className="text-emerald-100/90 text-sm mt-2">
              Combining visual computer vision prediction, vector knowledge grounding, and personalized GenAI recommendations.
            </p>
          </div>

          <Link
            to="/disease-detection"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-stone-900 bg-emerald-300 hover:bg-emerald-200 transition-colors whitespace-nowrap shadow-lg shadow-emerald-950/20 group"
          >
            <span>Experience The Live Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
