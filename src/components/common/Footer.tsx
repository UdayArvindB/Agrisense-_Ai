import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Github, Linkedin, ShieldCheck, Heart, ExternalLink, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-900/30">
                <Leaf className="w-5 h-5 text-emerald-950" />
              </div>
              <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                AgriSense<span className="text-emerald-400">.AI</span>
              </span>
            </Link>

            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Smarter Farming. Powered by AI. Combining Computer Vision, Vector Database RAG retrieval, and Generative AI reasoning to deliver trustworthy, evidence-based agronomic guidance.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Hackathon AI Platform
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-medium">
                ML • RAG • GenAI
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/disease-detection" className="hover:text-emerald-400 transition-colors">
                  Disease Detection
                </Link>
              </li>
              <li>
                <Link to="/farm-analytics" className="hover:text-emerald-400 transition-colors">
                  Farm Analytics
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-emerald-400 transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="hover:text-emerald-400 transition-colors">
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Management */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Management
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Farm Dashboard
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-emerald-400 transition-colors">
                  AI Farm Reports
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-emerald-400 transition-colors">
                  Settings & Profiles
                </Link>
              </li>
              <li>
                <span className="text-stone-500 cursor-not-allowed">
                  IoT Sensor Gateway (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-stone-500 cursor-not-allowed">
                  Satellite NDVI Sync (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Trust & Ethics */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Trust & Verification
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Predictions are AI-assisted classifications grounded by scientific extension manuals. Never substitute for laboratory diagnostic verification.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-emerald-900/60 hover:text-emerald-400 flex items-center justify-center transition-colors text-stone-400"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-emerald-900/60 hover:text-emerald-400 flex items-center justify-center transition-colors text-stone-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} AgriSense AI. All rights reserved. Built for Smart Agriculture Hackathon.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span className="text-emerald-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> RAG Grounded System
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
