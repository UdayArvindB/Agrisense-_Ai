import React from 'react';
import { RetrievedSource } from '../../types/disease';
import { FileText, ExternalLink, BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';

interface SourceCardProps {
  source: RetrievedSource;
  onViewDetails?: (source: RetrievedSource) => void;
  compact?: boolean;
}

export const SourceCard: React.FC<SourceCardProps> = ({
  source,
  onViewDetails,
  compact = false,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm hover:shadow-card-hover hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Header Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                {source.category}
              </span>
              <span className="text-[11px] text-stone-600 block">
                {source.sourceOrg} {source.publishedDate && `• ${source.publishedDate}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold whitespace-nowrap shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{source.relevanceScore}% Relevance</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-emerald-800 transition-colors">
          {source.title}
        </h4>

        {/* Excerpt */}
        <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4 bg-stone-50/70 p-3 rounded-xl border border-stone-100 italic">
          "{source.excerpt}"
        </p>
      </div>

      {/* Footer Details */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
        <span className="text-[11px] font-medium text-stone-600 flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-emerald-600" />
          {source.doiOrRef || 'RAG Grounded Node'}
        </span>

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(source)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200"
          >
            <span>View Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
