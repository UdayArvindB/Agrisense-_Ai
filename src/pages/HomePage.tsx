import React from 'react';
import { Link } from 'react-router-dom';
import { HeroVisualization } from '../components/home/HeroVisualization';
import { TrustBadges } from '../components/home/TrustBadges';
import { ProblemSection } from '../components/home/ProblemSection';
import { SolutionPipeline } from '../components/home/SolutionPipeline';
import { HowItWorksWorkflow } from '../components/home/HowItWorksWorkflow';
import { DemoBadge } from '../components/common/DemoBadge';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Cpu,
  Database,
  Languages,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hackathon Demo Notice Banner */}
      <DemoBadge variant="banner" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F7F5F0] via-emerald-50/20 to-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2">
                <DemoBadge variant="pill" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.08]">
                Smarter Farming.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600">
                  Powered by AI.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Detect crop diseases, analyze farm risks, and receive evidence-based agricultural recommendations using <strong>Machine Learning</strong>, <strong>RAG</strong>, and <strong>Generative AI</strong>.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/disease-detection"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-extrabold text-white bg-gradient-to-r from-emerald-800 to-emerald-600 hover:from-emerald-900 hover:to-emerald-700 shadow-xl shadow-emerald-950/20 hover:shadow-glow-md transition-all text-base group"
                >
                  <Sparkles className="w-5 h-5 text-emerald-200 group-hover:rotate-12 transition-transform" />
                  <span>Analyze My Crop</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/ai-assistant"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 shadow-xs hover:border-emerald-400 transition-all text-base"
                >
                  <span>Ask AI Assistant</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-600 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 95%+ Diagnostic Precision
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> RAG Grounded Advice
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multilingual Support
                </span>
              </div>
            </div>

            {/* Right Hero Interactive Visual */}
            <div className="lg:col-span-6">
              <HeroVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <TrustBadges />

      {/* Problem Section */}
      <ProblemSection />

      {/* Solution Section (ML + RAG + GenAI) */}
      <SolutionPipeline />

      {/* How It Works Workflow (4 Steps) */}
      <HowItWorksWorkflow />

      {/* Hackathon Impact & Measurable Metrics */}
      <section className="py-20 bg-stone-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-800">
              Measurable Innovation
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
              From Data to Decisions
            </h2>
            <p className="mt-3 text-stone-400 text-sm">
              Demonstration benchmark metrics engineered for national agricultural hackathon evaluation.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-stone-800/80 border border-stone-700/80 text-center">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">10K+</div>
              <div className="text-xs font-bold text-stone-200 mt-1">Agricultural Documents</div>
              <div className="text-[11px] text-stone-400 mt-1">Indexed in Vector Database</div>
            </div>

            <div className="p-6 rounded-3xl bg-stone-800/80 border border-stone-700/80 text-center">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">95%</div>
              <div className="text-xs font-bold text-stone-200 mt-1">Demo Classification</div>
              <div className="text-[11px] text-stone-400 mt-1">Computer Vision Accuracy</div>
            </div>

            <div className="p-6 rounded-3xl bg-stone-800/80 border border-stone-700/80 text-center">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">5</div>
              <div className="text-xs font-bold text-stone-200 mt-1">Supported Languages</div>
              <div className="text-[11px] text-stone-400 mt-1">Telugu, Hindi, Tamil & more</div>
            </div>

            <div className="p-6 rounded-3xl bg-stone-800/80 border border-stone-700/80 text-center">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">24/7</div>
              <div className="text-xs font-bold text-stone-200 mt-1">AI Assistance</div>
              <div className="text-[11px] text-stone-400 mt-1">Real-time Agronomic Chat</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Strong Call-to-Action */}
      <section className="py-24 bg-gradient-to-tr from-emerald-950 via-emerald-900 to-teal-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-900/60 px-3.5 py-1.5 rounded-full border border-emerald-700">
            Empowering Every Field
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Give every farmer an AI-powered agricultural assistant.
          </h2>
          <p className="text-base sm:text-lg text-emerald-200/90 max-w-2xl mx-auto">
            Experience the complete user journey: upload a crop image, view the ML prediction, inspect the RAG retrieved research papers, and receive a personalized action plan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/disease-detection"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-stone-950 bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-950/40 transition-all text-base"
            >
              <Sparkles className="w-5 h-5 text-stone-950" />
              <span>Analyze My Crop</span>
            </Link>

            <Link
              to="/ai-assistant"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-emerald-900/80 hover:bg-emerald-900 border border-emerald-600/60 transition-all text-base"
            >
              <span>Talk to AgriSense AI</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
