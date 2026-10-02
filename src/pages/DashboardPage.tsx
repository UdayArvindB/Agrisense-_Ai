import React from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { FARM_METRICS, SAMPLE_FARM_REPORT } from '../data/mockAnalytics';
import { MetricCard } from '../components/analytics/MetricCard';
import { HealthTrendChart } from '../components/analytics/HealthTrendChart';
import { DemoBadge } from '../components/common/DemoBadge';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ScanLine,
  MessageSquare,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen bg-[#F7F5F0]">
      {/* Sidebar (Desktop) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5">
              <DemoBadge variant="pill" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {t.greetingMorning}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              GreenValley Agro Research Station • Warangal, Telangana (28.5 Hectares)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/disease-detection"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-950/15 transition-all text-xs sm:text-sm"
            >
              <ScanLine className="w-4 h-4 text-emerald-200" />
              <span>New Disease Scan</span>
            </Link>

            <Link
              to="/reports"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-200 transition-colors text-xs sm:text-sm"
            >
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>View Reports</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FARM_METRICS.map((metric, i) => (
            <MetricCard key={i} metric={metric} />
          ))}
        </div>

        {/* Active Alert Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <strong className="text-xs sm:text-sm font-bold block">
                Field Alert: Moderate Early Blight Detected in Block A (Tomato)
              </strong>
              <p className="text-xs text-amber-900/80">
                Relative humidity forecast is high (&gt;82%). Prune infected lower leaves within 24 hours.
              </p>
            </div>
          </div>

          <Link
            to="/disease-detection"
            className="px-4 py-2 rounded-xl text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 transition-colors whitespace-nowrap self-end sm:self-auto"
          >
            Review Diagnosis & Action Plan →
          </Link>
        </div>

        {/* Middle Section: Chart & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <HealthTrendChart />
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <h3 className="font-extrabold text-base text-stone-900 tracking-tight">
                AI Agricultural Assistant
              </h3>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Have questions about your crop health, fertigation schedules, or pest infestations? Get evidence-grounded answers in seconds.
            </p>

            <div className="space-y-2">
              <Link
                to="/ai-assistant"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-xs font-semibold text-stone-800 transition-colors border border-stone-200"
              >
                <span>"Why are tomato leaves yellowing?"</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </Link>
              <Link
                to="/ai-assistant"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-xs font-semibold text-stone-800 transition-colors border border-stone-200"
              >
                <span>"What causes corn rust?"</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </Link>
            </div>

            <Link
              to="/ai-assistant"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200" />
              <span>Open AI Assistant</span>
            </Link>
          </div>
        </div>

        {/* Recent Analyses Log */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Inspection History
              </span>
              <h3 className="text-xl font-extrabold text-stone-900 tracking-tight mt-1">
                Recent Foliar Pathology Analyses
              </h3>
            </div>

            <Link
              to="/disease-detection"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
            >
              Run New Scan →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 text-stone-600 uppercase font-mono text-[11px] border-b border-stone-200">
                <tr>
                  <th className="p-3">Crop</th>
                  <th className="p-3">Pathology Finding</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Time</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium">
                {SAMPLE_FARM_REPORT.recentAnalyses.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                    <td className="p-3 font-bold text-stone-900">{item.crop}</td>
                    <td className="p-3 text-stone-800">{item.disease}</td>
                    <td className="p-3 font-mono text-emerald-700 font-bold">{item.confidence}%</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 text-stone-500 text-xs">{item.date}</td>
                    <td className="p-3 text-right">
                      <Link
                        to="/disease-detection"
                        className="text-xs font-bold text-emerald-700 hover:underline"
                      >
                        View Plan
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
