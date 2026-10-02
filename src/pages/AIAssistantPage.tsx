import React from 'react';
import { ChatInterface } from '../components/chat/ChatInterface';
import { DemoBadge } from '../components/common/DemoBadge';
import { MessageSquare, Sparkles, Database, ShieldCheck, Languages } from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <DemoBadge variant="pill" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Ask AgriSense AI
          </h1>

          <p className="text-sm sm:text-base text-stone-600">
            Your intelligent agricultural assistant. Get evidence-grounded answers to plant pathology, fertilization, irrigation, and yield optimization queries in multiple regional languages.
          </p>

          <div className="inline-flex items-center justify-center gap-4 text-xs text-stone-500 font-semibold pt-1">
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-teal-600" /> Grounded in 10,000+ Extension PDFs
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-emerald-600" /> Telugu • Hindi • Tamil • Kannada
            </span>
          </div>
        </div>

        {/* Chat Interface */}
        <ChatInterface />
      </div>
    </div>
  );
};
