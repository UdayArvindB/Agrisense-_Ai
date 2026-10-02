import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Scan,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  FileCheck2,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { DEMO_PRESETS } from '../../data/mockDiseases';
import { Link } from 'react-router-dom';

export const HeroVisualization: React.FC = () => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const activePreset = DEMO_PRESETS[activePresetIndex];
  const result = activePreset.presetResult;

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background Ambient Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-lime-500/10 rounded-3xl blur-2xl -z-10" />

      {/* Main Glassmorphic Card */}
      <div className="relative rounded-3xl bg-white/95 border border-emerald-900/15 shadow-2xl shadow-emerald-950/10 overflow-hidden backdrop-blur-xl">
        {/* Top Window Bar */}
        <div className="px-5 py-3.5 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-800/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-xs font-mono text-emerald-300 font-semibold tracking-wide">
              AgriSense-Vision-Engine // Live Inference
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-700/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Real-time RAG Stream
          </div>
        </div>

        {/* Interactive Preset Selector Bar */}
        <div className="px-4 py-2 bg-stone-100/90 border-b border-stone-200/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px] whitespace-nowrap">
            Switch Demo:
          </span>
          {DEMO_PRESETS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActivePresetIndex(idx)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                activePresetIndex === idx
                  ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-200/70 border border-stone-200'
              }`}
            >
              {p.cropName} ({p.presetResult.diseaseName.split(' ')[0]})
            </button>
          ))}
        </div>

        {/* Leaf & Scanning Container */}
        <div className="relative aspect-4/3 w-full bg-stone-900 overflow-hidden group">
          {/* Image */}
          <img
            src={activePreset.thumbnail}
            alt={activePreset.imagePromptDescription}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
          />

          {/* Grid Overlay for ML Scanner */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(16, 185, 129, 0.4) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(16, 185, 129, 0.4) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          {/* Animated Scanning Laser Line */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-scan-line pointer-events-none" />

          {/* Targeting Bounding Boxes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/4 left-1/3 w-32 h-32 border-2 border-dashed border-emerald-400/90 rounded-2xl bg-emerald-500/10 pointer-events-none flex flex-col justify-between p-2 backdrop-blur-[1px]"
          >
            <div className="flex justify-between items-center text-[10px] text-emerald-300 font-mono font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded">
              <span>PATHOLOGY_ROI</span>
              <span>{(result.confidence / 100).toFixed(2)}</span>
            </div>
            <div className="text-[9px] text-emerald-200 font-mono text-center bg-emerald-950/70 rounded py-0.5">
              Necrotic Lesion Cluster
            </div>
          </motion.div>

          {/* Live Scanner Tag */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 text-white text-xs font-semibold">
            <Scan className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>AI Scanning Active</span>
          </div>

          {/* Floating Pill on top right */}
          <div className="absolute top-4 right-4 z-10 bg-emerald-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-600/50 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>RAG Verified: {result.retrievedSources.length} Sources</span>
          </div>
        </div>

        {/* Hero Result Card Banner */}
        <div className="p-6 bg-gradient-to-b from-white to-stone-50 border-t border-emerald-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
            <div>
              <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase">
                AI Crop Analysis
              </span>
              <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2 mt-0.5">
                {result.diseaseName}
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {result.cropName}
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-700 leading-none">
                  {result.confidence}%
                </div>
                <div className="text-[11px] font-medium text-stone-500">Confidence</div>
              </div>

              <div
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
                  result.riskLevel === 'Low'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : result.riskLevel === 'Moderate'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {result.riskLevel === 'Low' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" />
                )}
                <span>Risk: {result.riskLevel}</span>
              </div>
            </div>
          </div>

          {/* Recommendations Preview */}
          <div className="mt-4 pt-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>3 AI Recommendations Generated</span>
              </span>
              <Link
                to="/disease-detection"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                Full Action Plan <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-1.5">
              {result.actionPlan.immediateActions.slice(0, 2).map((act, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-200/90 shadow-2xs"
                >
                  <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="line-clamp-1">{act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
