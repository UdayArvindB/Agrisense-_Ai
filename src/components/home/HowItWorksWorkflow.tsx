import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Cpu, Database, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksWorkflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Upload Crop Image',
      subtitle: 'Input Acquisition',
      icon: UploadCloud,
      desc: 'The farmer captures or uploads a leaf/crop image directly via smartphone camera or drag-and-drop. Farm parameters like acreage and crop variety can also be attached.',
      highlight: 'Image normalization (224×224 RGB), noise filtering & geo-tagging.',
    },
    {
      num: '02',
      title: 'ML Visual Inference',
      subtitle: 'Computer Vision Prediction',
      icon: Cpu,
      desc: 'Deep Convolutional Neural Networks (EfficientNet-B4) segment the foliar canopy, isolate necrotic lesions, and compute a probability distribution across 38+ plant disease classes.',
      highlight: 'Extracts pathology features, lesion diameter, and confidence percentage.',
    },
    {
      num: '03',
      title: 'RAG Knowledge Retrieval',
      subtitle: 'Vector Semantic Grounding',
      icon: Database,
      desc: 'The predicted disease vectors query a dense semantic index of ICAR, FAO, and university agronomic publications. Top matching documents with cosine similarity > 0.80 are retrieved.',
      highlight: 'Guarantees zero hallucinations; extracts verified treatment dosages and thresholds.',
    },
    {
      num: '04',
      title: 'GenAI Action Plan',
      subtitle: 'Personalized Synthesis',
      icon: Sparkles,
      desc: 'An agricultural Large Language Model synthesizes the ML diagnosis with the retrieved extension research, generating an actionable treatment plan in the farmer’s regional language.',
      highlight: 'Immediate pruning, environmental monitoring, organic alternatives & spray schedules.',
    },
  ];

  return (
    <section className="py-24 bg-stone-50 border-t border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
            End-To-End Pipeline
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            How AgriSense AI Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600">
            A transparent 4-stage pipeline connecting the farmer’s smartphone camera to rigorous scientific research.
          </p>

          {/* Interactive Pipeline Badges */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-2xl border border-stone-200 shadow-sm">
            {['INPUT', 'ML PREDICT', 'RAG RETRIEVE', 'GENAI EXPLAIN', 'ACTION PLAN'].map((step, idx) => (
              <React.Fragment key={step}>
                <span
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold tracking-wider transition-all cursor-pointer ${
                    activeStep === Math.min(idx, 3)
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                  onClick={() => setActiveStep(Math.min(idx, 3))}
                >
                  {step}
                </span>
                {idx < 4 && <span className="text-stone-300 font-bold">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStep === idx;
            return (
              <motion.div
                key={s.num}
                whileHover={{ y: -6 }}
                onClick={() => setActiveStep(idx)}
                className={`rounded-3xl p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white border-emerald-500 shadow-card-hover ring-2 ring-emerald-500/20'
                    : 'bg-white/70 border-stone-200/90 hover:bg-white hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-emerald-700/40">
                      {s.num}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-emerald-700 text-white shadow-md shadow-emerald-950/20'
                          : 'bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    {s.subtitle}
                  </span>

                  <h3 className="text-xl font-extrabold text-stone-900 mb-3">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 bg-stone-50/80 -mx-7 -mb-7 p-5 rounded-b-3xl">
                  <div className="text-[11px] font-semibold text-emerald-800 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{s.highlight}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/disease-detection"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-800 to-emerald-600 hover:from-emerald-900 hover:to-emerald-700 shadow-xl shadow-emerald-950/20 hover:shadow-glow-md transition-all text-base group"
          >
            <span>Run Pipeline On Sample Leaf Image</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
