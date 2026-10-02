import React, { useRef } from 'react';
import { UploadZone } from '../components/disease/UploadZone';
import { AnalysisProgress } from '../components/disease/AnalysisProgress';
import { DiseaseResultCard } from '../components/disease/DiseaseResultCard';
import { RagEvidencePanel } from '../components/disease/RagEvidencePanel';
import { ActionPlanPanel } from '../components/disease/ActionPlanPanel';
import { useAnalysis } from '../context/AnalysisContext';
import { DemoBadge } from '../components/common/DemoBadge';
import { Sparkles, ShieldCheck, Database, Cpu, ArrowDown } from 'lucide-react';

export const DiseaseDetectionPage: React.FC = () => {
  const { currentAnalysis, isAnalyzing, analysisStep, runAnalysis } = useAnalysis();
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (fileOrPreset: File | string) => {
    await runAnalysis(fileOrPreset);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <DemoBadge variant="pill" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            AI Crop Disease Detection
          </h1>

          <p className="text-base sm:text-lg text-stone-600">
            Upload a crop or leaf image and let AgriSense AI analyze it with deep learning, retrieve research evidence, and synthesize an agronomic action plan.
          </p>

          <div className="inline-flex items-center gap-3 text-xs font-semibold text-stone-500 pt-2">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" /> EfficientNet-B4
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-teal-600" /> Vector Database RAG
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> GenAI Synthesis
            </span>
          </div>
        </div>

        {/* Upload Zone */}
        <div className="max-w-4xl mx-auto">
          <UploadZone onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </div>

        {/* Live Analysis Progress Animation */}
        {isAnalyzing && (
          <div className="max-w-4xl mx-auto">
            <AnalysisProgress currentStepText={analysisStep} />
          </div>
        )}

        {/* Analysis Results Display */}
        {currentAnalysis && !isAnalyzing && (
          <div ref={resultsRef} className="space-y-10 animate-in fade-in duration-500">
            {/* Transition Divider */}
            <div className="flex items-center justify-center gap-3 text-emerald-800 text-xs font-bold uppercase tracking-widest pt-4">
              <span className="h-px bg-stone-300 w-16" />
              <span>Multi-Stage Inference Complete</span>
              <span className="h-px bg-stone-300 w-16" />
            </div>

            {/* 1. Disease Result Card (ML Inference) */}
            <DiseaseResultCard result={currentAnalysis} />

            {/* 2. RAG Evidence Panel (Vector Grounding) */}
            <RagEvidencePanel
              sources={currentAnalysis.retrievedSources}
              diseaseName={currentAnalysis.diseaseName}
            />

            {/* 3. AI Action Plan Panel (GenAI Reasoning) */}
            <ActionPlanPanel result={currentAnalysis} />
          </div>
        )}
      </div>
    </div>
  );
};
