import React, { useEffect, useState } from 'react';
import { Check, Loader2, Sparkles, Database, Cpu, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalysisProgressProps {
  currentStepText?: string;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ currentStepText }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    { title: 'Image uploaded & received', icon: ImageIcon, detail: 'RGB foliar matrix decoded' },
    { title: 'Image preprocessing', icon: ImageIcon, detail: '224x224 normalization & color calibration' },
    { title: 'ML analysis', icon: Cpu, detail: 'EfficientNet-B4 foliar feature extraction' },
    { title: 'Disease prediction', icon: Sparkles, detail: 'Computing pathogen probability distribution' },
    { title: 'RAG retrieval', icon: Database, detail: 'Querying vector database extension corpus' },
    { title: 'Generating recommendation', icon: Sparkles, detail: 'GenAI synthesizing personalized action plan' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white rounded-3xl p-8 border border-emerald-900/10 shadow-2xl shadow-emerald-900/10 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Real-time Pipeline
          </span>
          <h3 className="text-2xl font-black text-stone-900 mt-1">
            Analyzing Crop Pathology...
          </h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-900 text-emerald-200 text-xs font-mono">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
          <span>INFERENCE_RUNNING</span>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((s, idx) => {
          const isDone = idx < activeStepIndex;
          const isCurrent = idx === activeStepIndex;
          const isPending = idx > activeStepIndex;

          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                isCurrent
                  ? 'bg-emerald-50/80 border-emerald-400 shadow-sm'
                  : isDone
                  ? 'bg-stone-50 border-stone-200/80'
                  : 'bg-white/40 border-stone-100 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-emerald-900 text-emerald-300 animate-pulse'
                      : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                  ) : (
                    <span>○</span>
                  )}
                </div>

                <div>
                  <div
                    className={`text-sm font-bold ${
                      isDone
                        ? 'text-stone-800'
                        : isCurrent
                        ? 'text-emerald-950 font-extrabold'
                        : 'text-stone-400'
                    }`}
                  >
                    {s.title}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">
                    {s.detail}
                  </div>
                </div>
              </div>

              <div className="text-xs font-mono font-semibold">
                {isDone && <span className="text-emerald-700">✓ Complete</span>}
                {isCurrent && <span className="text-emerald-800 animate-pulse font-bold">● Active...</span>}
                {isPending && <span className="text-stone-400">Waiting</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Step update banner */}
      {currentStepText && (
        <div className="mt-6 p-3.5 rounded-xl bg-stone-100 border border-stone-200/80 text-xs font-mono text-stone-600 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          <span>{currentStepText}</span>
        </div>
      )}
    </div>
  );
};
