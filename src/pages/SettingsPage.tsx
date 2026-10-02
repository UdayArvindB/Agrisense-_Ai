import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DemoBadge } from '../components/common/DemoBadge';
import { LanguageCode } from '../types/chat';
import {
  User,
  Sliders,
  Bell,
  Cpu,
  ShieldCheck,
  Save,
  CheckCircle2,
  Globe,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [farmerName, setFarmerName] = useState('Ramesh Reddy');
  const [location, setLocation] = useState('Warangal District, Telangana');
  const [farmType, setFarmType] = useState('Horticulture & Cash Crops (Tomato, Corn, Potato)');
  const [acreage, setAcreage] = useState('28.5');
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [notifications, setNotifications] = useState(true);
  const [demoMode, setDemoMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <DemoBadge variant="pill" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Settings & Configuration
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Configure your farm profile, local dialect preferences, and AI inference thresholds.
            </p>
          </div>

          {saved && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Settings Saved Successfully</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: Farmer Profile */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-stone-100">
              <User className="w-5 h-5 text-emerald-700" />
              <h2 className="text-lg font-bold text-stone-900">Farm & Operator Profile</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Lead Farmer / Operator Name
                </label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Geographic Location / District
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Farm Type & Active Crop Varieties
                </label>
                <input
                  type="text"
                  value={farmType}
                  onChange={(e) => setFarmType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Total Operational Acreage (Hectares)
                </label>
                <input
                  type="text"
                  value={acreage}
                  onChange={(e) => setAcreage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Regional Language & Interface Preferences */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-stone-100">
              <Globe className="w-5 h-5 text-emerald-700" />
              <h2 className="text-lg font-bold text-stone-900">Regional Language & Notifications</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                  Primary Dialect (భాష)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {availableLanguages.map((l) => (
                    <button
                      type="button"
                      key={l.code}
                      onClick={() => setLanguage(l.code)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        language === l.code
                          ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm font-bold'
                          : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800 font-medium'
                      }`}
                    >
                      <div className="text-xl mb-1">{l.flag}</div>
                      <div className="text-xs">{l.nativeName}</div>
                      <div className="text-[10px] opacity-70">{l.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <strong className="text-sm font-bold text-stone-900 block">
                    Disease Outbreak Early Warning Alerts
                  </strong>
                  <p className="text-xs text-stone-500">
                    Receive instant push notification when regional fungal spore counts spike.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded cursor-pointer accent-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Section 3: AI Inference & Model Tuning */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-stone-100">
              <Sliders className="w-5 h-5 text-emerald-700" />
              <h2 className="text-lg font-bold text-stone-900">AI Inference Engine Parameters</h2>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Minimum Diagnostic Confidence Threshold
                  </label>
                  <span className="text-sm font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 font-mono">
                    {confidenceThreshold}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-600 mt-1">
                  <span>50% (Permissive)</span>
                  <span>75% (Recommended)</span>
                  <span>95% (High Precision)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <strong className="text-sm font-bold text-stone-900 block">
                    Hackathon Demo Simulation Mode
                  </strong>
                  <p className="text-xs text-stone-500">
                    When enabled, uses high-fidelity agronomic synthetic datasets without requiring live GPU clusters.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={demoMode}
                  onChange={(e) => setDemoMode(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded cursor-pointer accent-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-lg shadow-emerald-950/20 text-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
