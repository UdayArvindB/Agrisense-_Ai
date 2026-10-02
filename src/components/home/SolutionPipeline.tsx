import React from 'react';
import { Cpu, Database, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SolutionPipeline: React.FC = () => {
  const pillars = [
    {
      icon: Cpu,
      tech: 'MACHINE LEARNING',
      role: 'Predict',
      badge: 'Step 01 • Inference',
      description: 'Convolutional Neural Networks (CNNs / EfficientNet) analyze crop foliage images down to the cellular lesion level, while XGBoost predicts yield and microclimate pathogen risks.',
      features: [
        '95%+ benchmark classification accuracy',
        'Multi-spectral foliar symptom segmentation',
        'Predictive yield & risk modeling'
      ],
      gradient: 'from-emerald-600 to-teal-700',
      lightBg: 'bg-emerald-50/70',
      borderColor: 'border-emerald-200',
    },
    {
      icon: Database,
      tech: 'RETRIEVAL-AUGMENTED GENERATION',
      role: 'Retrieve',
      badge: 'Step 02 • Grounding',
      description: 'A dense vector database embedded with thousands of verified ICAR, FAO, and university agricultural extension manuals. Ensures all reasoning is anchored in validated research.',
      features: [
        '10,000+ indexed agricultural manuals',
        'Semantic cosine distance >= 0.84 threshold',
        'Zero hallucinated agronomic treatments'
      ],
      gradient: 'from-teal-600 to-cyan-700',
      lightBg: 'bg-teal-50/70',
      borderColor: 'border-teal-200',
    },
    {
      icon: Sparkles,
      tech: 'GENERATIVE AI',
      role: 'Recommend',
      badge: 'Step 03 • Action Plan',
      description: 'Large Language Models synthesize the visual ML diagnosis and retrieved scientific corpus into clear, actionable, personalized farming directives translated into local languages.',
      features: [
        'Immediate, monitoring & preventive action plans',
        'Regional language synthesis (Telugu, Hindi, etc.)',
        'Transparent source attribution for every step'
      ],
      gradient: 'from-emerald-700 to-emerald-900',
      lightBg: 'bg-emerald-50/70',
      borderColor: 'border-emerald-300',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100/90 px-3.5 py-1.5 rounded-full border border-emerald-300">
            Core Architecture
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            One platform. Three intelligent technologies.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600">
            AgriSense AI combines Computer Vision, Vector Database RAG retrieval, and Generative AI reasoning to create a bulletproof agricultural decision pipeline.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="rounded-3xl p-8 bg-stone-50/80 border border-stone-200 hover:border-emerald-500/50 hover:bg-white hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} text-white flex items-center justify-center shadow-lg shadow-emerald-950/15 group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      {p.badge}
                    </span>
                  </div>

                  <span className="text-[11px] font-extrabold tracking-widest uppercase text-stone-500 block mb-1">
                    {p.tech}
                  </span>

                  <h3 className="text-2xl font-black text-stone-900 mb-3 group-hover:text-emerald-800 transition-colors">
                    {p.role}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed mb-6">
                    {p.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-stone-200/80 mb-6">
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Engine: {i === 0 ? 'CV / PyTorch' : i === 1 ? 'FAISS / LangChain' : 'Gemini / LLM'}</span>
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Formula Display: Prediction + Evidence -> AI Recommendation */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-stone-900 text-white shadow-2xl border border-stone-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-sm sm:text-base font-bold">
              <span className="px-4 py-2 rounded-xl bg-emerald-900/90 text-emerald-300 border border-emerald-600/50 flex items-center gap-2 shadow-sm">
                <Cpu className="w-4 h-4 text-emerald-400" />
                ML Prediction
              </span>
              <span className="text-xl font-black text-stone-500">+</span>
              <span className="px-4 py-2 rounded-xl bg-teal-900/90 text-teal-300 border border-teal-600/50 flex items-center gap-2 shadow-sm">
                <Database className="w-4 h-4 text-teal-400" />
                RAG Evidence
              </span>
              <span className="text-xl font-black text-stone-500">→</span>
              <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-stone-950 font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-4 h-4 text-stone-950" />
                Evidence-Grounded Action Plan
              </span>
            </div>

            <Link
              to="/how-it-works"
              className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Explore Technical Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
