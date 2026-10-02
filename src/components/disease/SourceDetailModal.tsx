import React from 'react';
import { RetrievedSource } from '../../types/disease';
import { X, FileText, ExternalLink, ShieldCheck, BookOpen, Quote } from 'lucide-react';

interface SourceDetailModalProps {
  source: RetrievedSource | null;
  onClose: () => void;
}

export const SourceDetailModal: React.FC<SourceDetailModalProps> = ({ source, onClose }) => {
  if (!source) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-emerald-900/10 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {source.category}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-snug">
                {source.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Meta Bar */}
        <div className="my-5 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-stone-500 font-medium block">Publishing Authority</span>
            <strong className="text-stone-800 font-bold">{source.sourceOrg}</strong>
          </div>

          <div>
            <span className="text-stone-500 font-medium block">Publication Date</span>
            <strong className="text-stone-800 font-bold">{source.publishedDate || '2024'}</strong>
          </div>

          <div>
            <span className="text-stone-500 font-medium block">Vector Relevance Match</span>
            <span className="inline-flex items-center gap-1 font-extrabold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {source.relevanceScore}%
            </span>
          </div>
        </div>

        {/* Extracted Excerpt */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
            <Quote className="w-3.5 h-3.5 text-emerald-600" />
            Extracted Semantic Passage (Grounding Evidence)
          </h4>
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-700 text-sm leading-relaxed italic">
            "{source.excerpt}"
          </div>
        </div>

        {/* Full Content if available */}
        {source.fullContent && (
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              Agronomic Advisory Context
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-white p-4 rounded-2xl border border-stone-200/80">
              {source.fullContent}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-stone-400">
            Reference Token: <code className="text-stone-600 bg-stone-100 px-2 py-0.5 rounded">{source.doiOrRef || 'RAG-VECTOR-REF-409'}</code>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              Close
            </button>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
              Demo Document (Simulation)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
