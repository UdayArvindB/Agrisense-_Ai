import React from 'react';
import { DiseaseDetectionResult } from '../../types/disease';
import { ConfidenceMeter } from '../common/ConfidenceMeter';
import { AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, Tag, Eye } from 'lucide-react';

interface DiseaseResultCardProps {
  result: DiseaseDetectionResult;
}

export const DiseaseResultCard: React.FC<DiseaseResultCardProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl shadow-stone-900/5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Computer Vision Classification
          </span>
          <div className="flex items-center gap-3 mt-2">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {result.diseaseName}
            </h2>
            <span className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-1 rounded-xl border border-stone-200">
              {result.cropName}
            </span>
          </div>
          {result.cropVariety && (
            <p className="text-xs text-stone-500 mt-1 font-medium">
              Taxonomy: <span className="italic">{result.cropVariety}</span>
            </p>
          )}
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs font-medium text-stone-600 block">Inference Completed</span>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50/90 px-2.5 py-1 rounded-lg border border-emerald-200/80 inline-block mt-0.5">
            {result.detectedAt}
          </span>
        </div>
      </div>

      {/* Main Grid: Image + Analysis Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
        {/* Crop Image with Inspection Box */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md border border-stone-200 bg-stone-900 group">
          <img
            src={result.imageUrl}
            alt={result.diseaseName}
            className="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold">
            CANOPY_ROI: {result.affectedAreaPercentage}%
          </div>

          <div className="absolute bottom-3 inset-x-3 bg-stone-950/85 backdrop-blur-md p-3 rounded-xl border border-stone-800 text-white text-xs">
            <div className="flex justify-between items-center text-[11px] text-stone-400 mb-1">
              <span>Pathogen Category</span>
              <span className="text-emerald-400 font-bold">{result.pathogenType}</span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>
        </div>

        {/* Confidence Meter and Symptoms */}
        <div className="lg:col-span-7 space-y-6">
          {/* Visual Confidence Meter */}
          <div className="bg-stone-50/80 rounded-2xl p-5 border border-stone-200/80">
            <ConfidenceMeter
              confidence={result.confidence}
              riskLevel={result.riskLevel}
              pathogenType={result.pathogenType}
            />
          </div>

          {/* Symptoms Detected List */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-emerald-700" />
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Symptoms Detected
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {result.symptoms.map((symptom, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200/90 text-xs font-medium text-stone-700 shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="leading-snug">{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Explanation Box */}
          <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200/80 text-xs text-stone-700 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Diagnostic Rationale:</span>
            </div>
            <p>{result.aiExplanation}</p>
          </div>
        </div>
      </div>

      {/* Trust & Safety Disclaimer Notice */}
      <div className="pt-4 border-t border-stone-100 flex items-start gap-3 text-stone-600 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60 text-xs">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-amber-950 font-bold block mb-0.5">
            AI-assisted prediction — not a confirmed agricultural diagnosis.
          </strong>
          <span>{result.disclaimer}</span>
        </div>
      </div>
    </div>
  );
};
