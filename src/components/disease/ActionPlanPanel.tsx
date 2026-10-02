import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, AlertCircle, Eye, ShieldCheck, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DiseaseDetectionResult } from '../../types/disease';

interface ActionPlanPanelProps {
  result: DiseaseDetectionResult;
}

export const ActionPlanPanel: React.FC<ActionPlanPanelProps> = ({ result }) => {
  const navigate = useNavigate();
  const { actionPlan } = result;

  const handleAskFollowUp = () => {
    navigate('/ai-assistant', {
      state: {
        prefilledQuery: `What is the recommended spray dosage and timing for ${result.diseaseName} on ${result.cropName}?`,
        diseaseContext: result,
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/15 shadow-xl shadow-emerald-900/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-700" />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Generative AI Synthesis
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-2">
            Your AI Action Plan
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Personalized agronomic intervention synthesized from {result.retrievedSources.length} peer-reviewed research papers.
          </p>
        </div>

        <button
          onClick={handleAskFollowUp}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-950/15 transition-all text-sm whitespace-nowrap self-start sm:self-auto group"
        >
          <MessageSquare className="w-4 h-4 text-emerald-200" />
          <span>Ask AI a Follow-up</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3 Pillar Action Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {/* Immediate Actions */}
        <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-200/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </span>
              <h4 className="text-base font-bold text-rose-950">Immediate Actions</h4>
            </div>

            <ul className="space-y-3">
              {actionPlan.immediateActions.map((action, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-rose-900 leading-relaxed">
                  <span className="w-5 h-5 rounded-md bg-rose-200/80 text-rose-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-200/60 text-[11px] font-semibold text-rose-800">
            Window: First 24-48 Hours
          </div>
        </div>

        {/* Monitoring */}
        <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </span>
              <h4 className="text-base font-bold text-amber-950">Monitoring</h4>
            </div>

            <ul className="space-y-3">
              {actionPlan.monitoring.map((action, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
                  <span className="w-5 h-5 rounded-md bg-amber-200/80 text-amber-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200/60 text-[11px] font-semibold text-amber-800">
            Frequency: Daily Dawn Scouting
          </div>
        </div>

        {/* Prevention */}
        <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-200/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h4 className="text-base font-bold text-emerald-950">Prevention</h4>
            </div>

            <ul className="space-y-3">
              {actionPlan.prevention.map((action, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-emerald-900 leading-relaxed">
                  <span className="w-5 h-5 rounded-md bg-emerald-200/80 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200/60 text-[11px] font-semibold text-emerald-800">
            Scope: Full Crop Rotation Cycle
          </div>
        </div>
      </div>

      {/* Verification footer note */}
      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 flex items-center justify-between flex-wrap gap-3">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Recommendations are cross-referenced with regional ICAR spray schedules.</span>
        </span>
        <button
          onClick={handleAskFollowUp}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1"
        >
          Discuss with AgriSense AI Assistant →
        </button>
      </div>
    </div>
  );
};
