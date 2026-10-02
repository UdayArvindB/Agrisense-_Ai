import React, { useState } from 'react';
import { DemoBadge } from '../components/common/DemoBadge';
import {
  Cpu,
  Database,
  Sparkles,
  ArrowDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Layers,
  Zap,
  Terminal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksPage: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const architectureNodes = [
    {
      id: 1,
      title: 'Farmer Input & Telemetry',
      subtitle: 'Input Acquisition',
      tech: 'React / Smartphone WebRTC / GPS',
      desc: 'High-resolution RGB leaf photograph, field coordinates, crop type, acreage, and ambient humidity parameters captured by the farmer.',
      color: 'emerald',
    },
    {
      id: 2,
      title: 'Computer Vision ML Classifier',
      subtitle: 'Visual Feature Extraction',
      tech: 'EfficientNet-B4 / PyTorch / TorchVision',
      desc: 'Pre-processed RGB tensor (224x224x3) evaluated against 38 plant disease classes. Outputs top pathogen probability distribution, lesion bounding mask, and confidence score.',
      color: 'teal',
    },
    {
      id: 3,
      title: 'Disease Prediction Vector',
      subtitle: 'Pathology Embedding',
      tech: 'OpenAI text-embedding-3-small / HuggingFace All-MiniLM',
      desc: 'Extracted disease metadata and visual symptom signatures are transformed into a dense 1536-dimensional semantic query embedding.',
      color: 'cyan',
    },
    {
      id: 4,
      title: 'Vector Database & RAG Retrieval',
      subtitle: 'Semantic Document Search',
      tech: 'FAISS / Chroma / Pinecone (Cosine Similarity >= 0.84)',
      desc: 'Executes high-speed nearest-neighbor search across indexed corpus of 10,000+ university extension bulletins and ICAR peer-reviewed papers.',
      color: 'blue',
    },
    {
      id: 5,
      title: 'Agricultural Knowledge Extraction',
      subtitle: 'Evidence Verification',
      tech: 'LangChain / Chunk Re-ranker (Cohere)',
      desc: 'Retrieves top-k evidence passages, verifies citation authenticity, and extracts specific chemical and biological thresholds.',
      color: 'indigo',
    },
    {
      id: 6,
      title: 'Generative AI Reasoning Engine',
      subtitle: 'Contextual Action Plan Synthesis',
      tech: 'Gemini 1.5 Pro / GPT-4o / Regional Tokenizer',
      desc: 'Synthesizes the ML visual diagnosis with the retrieved extension evidence, eliminating hallucinations and formulating step-by-step guidance.',
      color: 'amber',
    },
    {
      id: 7,
      title: 'Personalized Guidance & Multilingual Output',
      subtitle: 'Localized Farmer Delivery',
      tech: 'Telugu, Hindi, Tamil, Kannada & English TTS',
      desc: 'Farmer receives immediate action plans, scouting schedules, and voice-assisted instructions in their native language.',
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <DemoBadge variant="pill" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Behind AgriSense AI
          </h1>

          <p className="text-base sm:text-lg text-stone-600">
            A technical deep dive for hackathon judges into the multi-modal integration of <strong>Computer Vision Machine Learning</strong>, <strong>RAG Vector Grounding</strong>, and <strong>Generative AI</strong>.
          </p>
        </div>

        {/* Core Triad Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-emerald-900/10 shadow-sm hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 block mb-1">
              Part 1: The Eyes
            </span>
            <h3 className="text-2xl font-black text-stone-900 mb-2">
              ML → Predict
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Predicts possible crop diseases and farm risks by analyzing raw foliar photographs down to necrotic cell margins.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-teal-900/10 shadow-sm hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
              <Database className="w-6 h-6" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700 block mb-1">
              Part 2: The Memory
            </span>
            <h3 className="text-2xl font-black text-stone-900 mb-2">
              RAG → Retrieve
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Retrieves authoritative, peer-reviewed extension evidence from dense vector indices, grounding all AI reasoning in science.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-amber-900/10 shadow-sm hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 block mb-1">
              Part 3: The Brain
            </span>
            <h3 className="text-2xl font-black text-stone-900 mb-2">
              GenAI → Recommend
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Converts complex multi-source findings into simple, actionable agricultural directives localized into regional dialects.
            </p>
          </div>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-12 border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-stone-800">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                SYSTEM PIPELINE TOPOLOGY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                Data Flow & Inference Pipeline
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-400 bg-stone-800/80 px-4 py-2 rounded-xl border border-stone-700">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>LATENCY: ~1.2s END-TO-END</span>
            </div>
          </div>

          {/* Vertical Pipeline Nodes */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {architectureNodes.map((node, i) => (
              <React.Fragment key={node.id}>
                <div
                  onMouseEnter={() => setActiveStage(node.id)}
                  onMouseLeave={() => setActiveStage(null)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    activeStage === node.id
                      ? 'bg-stone-800 border-emerald-400 shadow-lg shadow-emerald-950/40 translate-x-2'
                      : 'bg-stone-800/60 border-stone-700/80 hover:bg-stone-800 hover:border-stone-600'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-xs font-bold flex items-center justify-center">
                        0{node.id}
                      </span>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {node.title}
                      </h4>
                    </div>

                    <span className="text-xs font-mono text-emerald-400 bg-stone-900 px-2.5 py-1 rounded-md border border-stone-700/60">
                      {node.tech}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed pl-10">
                    {node.desc}
                  </p>
                </div>

                {i < architectureNodes.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown className="w-5 h-5 text-emerald-500/80 animate-bounce" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Technical Specification Matrix */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-emerald-700" />
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Model & Service Topology
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100 text-stone-700 uppercase font-mono text-[11px]">
                <tr>
                  <th className="p-3 rounded-l-xl">Subsystem</th>
                  <th className="p-3">Primary Tech / Model</th>
                  <th className="p-3">Target Performance</th>
                  <th className="p-3 rounded-r-xl">Failure Safeguard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                <tr>
                  <td className="p-3 font-bold text-stone-900">Computer Vision</td>
                  <td className="p-3 font-mono text-xs">EfficientNet-B4 + PyTorch</td>
                  <td className="p-3">&lt;450ms inference time</td>
                  <td className="p-3 text-stone-500">Confidence thresholding &lt;70% triggers manual review flag</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900">Vector Store (RAG)</td>
                  <td className="p-3 font-mono text-xs">FAISS / LangChain / MiniLM</td>
                  <td className="p-3">&lt;80ms cosine search</td>
                  <td className="p-3 text-stone-500">Requires minimum 3 peer-reviewed citations per recommendation</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900">GenAI Reasoning</td>
                  <td className="p-3 font-mono text-xs">Gemini 1.5 / OpenAI LLM</td>
                  <td className="p-3">&lt;900ms streaming</td>
                  <td className="p-3 text-stone-500">Strict system prompt prevents speculative chemical dosages</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900">Multilingual Audio</td>
                  <td className="p-3 font-mono text-xs">Web Speech API / Whisper</td>
                  <td className="p-3">Real-time local dialect TTS</td>
                  <td className="p-3 text-stone-500">Fallback to romanized vernacular text and English summary</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/disease-detection"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-xl shadow-emerald-950/20 text-base"
          >
            <span>Launch Live Hackathon Pipeline Demo</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
