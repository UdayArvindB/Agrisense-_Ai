import React from 'react';
import { KnowledgeDocument } from '../../types/knowledge';
import { X, BookOpen, Download, FileText, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

interface DocumentViewerModalProps {
  document: KnowledgeDocument | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-emerald-900/10 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {document.category} • {document.readTime}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-snug">
                {document.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metadata */}
        <div className="my-5 p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-stone-500 font-medium block">Authoritative Publisher</span>
            <strong className="text-stone-900 font-bold">{document.source}</strong>
          </div>
          <div>
            <span className="text-stone-500 font-medium block">Revision Date</span>
            <strong className="text-stone-900 font-bold">{document.date}</strong>
          </div>
          <div>
            <span className="text-stone-500 font-medium block">RAG Corpus Index</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {document.relevanceScore}% Priority
            </span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-sm text-stone-700">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Overview & Agronomic Background
            </h4>
            <p className="leading-relaxed bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100 text-stone-800">
              {document.content.overview}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Scientific Key Findings
            </h4>
            <div className="space-y-2">
              {document.content.keyFindings.map((finding, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{finding}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Recommended Field Practices
            </h4>
            <div className="space-y-2">
              {document.content.recommendedPractices.map((practice, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200/80 text-xs shadow-2xs">
                  <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{practice}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-bold text-stone-500 block mb-2">Indexed Tags:</span>
            <div className="flex flex-wrap gap-1.5">
              {document.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-400">
            Citation: {document.content.citations}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 text-xs transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
