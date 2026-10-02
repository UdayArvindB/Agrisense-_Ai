import React from 'react';
import { Sparkles, Info } from 'lucide-react';

interface DemoBadgeProps {
  variant?: 'subtle' | 'pill' | 'banner';
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({ variant = 'pill' }) => {
  if (variant === 'banner') {
    return (
      <aside aria-label="Demo notice" className="bg-emerald-950/90 text-emerald-200 border-b border-emerald-800/60 px-4 py-2 text-xs font-medium backdrop-blur-md flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>
            <strong className="text-white font-semibold">DEMO MODE:</strong> AgriSense AI is operating in interactive prototype mode. ML models, RAG vectors, and GenAI synthesis are simulated with high-fidelity agronomic datasets.
          </span>
        </div>
      </aside>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>HACKATHON DEMO MODE</span>
      <span className="text-emerald-400">•</span>
      <span className="text-emerald-600 font-normal">ML + RAG + GenAI</span>
    </div>
  );
};
