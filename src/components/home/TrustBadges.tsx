import React from 'react';
import { Cpu, Database, Sparkles, Languages, ShieldCheck, Check } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Cpu,
      title: 'ML Powered',
      subtitle: 'Computer Vision & XGBoost',
      color: 'emerald',
    },
    {
      icon: Database,
      title: 'RAG Grounded',
      subtitle: 'Vector DB Agricultural Corpus',
      color: 'teal',
    },
    {
      icon: Sparkles,
      title: 'GenAI Assisted',
      subtitle: 'Synthesized Reasoning',
      color: 'amber',
    },
    {
      icon: Languages,
      title: 'Multilingual',
      subtitle: '5 Regional Dialects',
      color: 'blue',
    },
    {
      icon: ShieldCheck,
      title: 'Evidence Based',
      subtitle: 'No Hallucinations / Verified Citations',
      color: 'green',
    },
  ];

  return (
    <div className="w-full py-8 border-y border-stone-200/70 bg-white/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-stone-50/80 hover:bg-emerald-50/80 border border-stone-200/60 hover:border-emerald-200 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-emerald-800 flex items-center justify-center shadow-xs border border-stone-200/80 group-hover:bg-emerald-700 group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-950 flex items-center gap-1">
                    <span>{b.title}</span>
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                  </div>
                  <div className="text-[11px] text-stone-600 truncate font-medium">
                    {b.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
