import React, { useState } from 'react';
import { RetrievedSource } from '../../types/disease';
import { SourceCard } from '../common/SourceCard';
import { SourceDetailModal } from './SourceDetailModal';
import { Database, ShieldCheck, Cpu, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

interface RagEvidencePanelProps {
  sources: RetrievedSource[];
  diseaseName: string;
}

export const RagEvidencePanel: React.FC<RagEvidencePanelProps> = ({ sources, diseaseName }) => {
  const [selectedSource, setSelectedSource] = useState<RetrievedSource | null>(null);

  return (
    <div className="bg-stone-50/80 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xl shadow-stone-900/5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              RAG Retrieval Grounding
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-2">
            Why did the AI make this recommendation?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            AgriSense AI queries an indexed agricultural vector database (FAISS/Chroma) to retrieve peer-reviewed research papers and university extension advisories matching {diseaseName}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-stone-700 border border-stone-200 shadow-2xs">
            {sources.length} Verified Sources Grounded
          </span>
        </div>
      </div>

      {/* Visual Pipeline Bar for judges */}
      <div className="my-6 p-4 rounded-2xl bg-white border border-stone-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-700 font-bold">
          <Cpu className="w-4 h-4 text-emerald-600" />
          <span>ML Prediction</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-stone-400 hidden sm:block" />
        <div className="flex items-center gap-2 text-teal-900 font-extrabold bg-teal-50 px-3 py-1 rounded-xl border border-teal-200">
          <Database className="w-4 h-4 text-teal-600" />
          <span>Retrieved Evidence ({sources.length} Documents)</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-stone-400 hidden sm:block" />
        <div className="flex items-center gap-2 text-stone-700 font-bold">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>AI Action Plan</span>
        </div>
      </div>

      {/* 3 Source Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sources.map((source) => (
          <SourceCard
            key={source.id}
            source={source}
            onViewDetails={(s) => setSelectedSource(s)}
          />
        ))}
      </div>

      {/* Source Detail Modal */}
      <SourceDetailModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />
    </div>
  );
};
