import React, { useState } from 'react';
import { FARM_METRICS } from '../data/mockAnalytics';
import { MetricCard } from '../components/analytics/MetricCard';
import { HealthTrendChart } from '../components/analytics/HealthTrendChart';
import { YieldComparisonChart } from '../components/analytics/YieldComparisonChart';
import { DiseaseRiskChart } from '../components/analytics/DiseaseRiskChart';
import { CropDistributionChart } from '../components/analytics/CropDistributionChart';
import { DemoBadge } from '../components/common/DemoBadge';
import { Link } from 'react-router-dom';
import { BarChart3, Filter, Calendar, Sparkles, Download, Layers, ShieldCheck } from 'lucide-react';

export const FarmAnalyticsPage: React.FC = () => {
  const [selectedField, setSelectedField] = useState('All Fields (28.5 Ha)');
  const [selectedSeason, setSelectedSeason] = useState('2024 Current Cycle');

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <DemoBadge variant="pill" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
              Farm Intelligence
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-xl">
              Real-time agro-informatics combining foliar health indexes, XGBoost yield projections, and pathogen pressure forecasts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Field selector */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 shadow-2xs">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option>All Fields (28.5 Ha)</option>
                <option>Block A — Tomato (8.5 Ha)</option>
                <option>Block B — Corn (7.0 Ha)</option>
                <option>Block C — Potato (6.5 Ha)</option>
                <option>Block D — Soybean (6.5 Ha)</option>
              </select>
            </div>

            {/* Season selector */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option>2024 Current Cycle</option>
                <option>2023 Kharif Season</option>
                <option>2023 Rabi Season</option>
              </select>
            </div>

            <Link
              to="/reports"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-emerald-200" />
              <span>Export Report</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FARM_METRICS.map((metric, i) => (
            <MetricCard key={i} metric={metric} />
          ))}
        </div>

        {/* 4 Interactive Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HealthTrendChart />
          <YieldComparisonChart />
          <DiseaseRiskChart />
          <CropDistributionChart />
        </div>

        {/* Bottom Banner */}
        <div className="p-6 rounded-3xl bg-stone-900 text-white border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-900 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm">Need deep insights on your soil & crop metrics?</div>
              <p className="text-xs text-stone-400">Ask the AI assistant to correlate yield curves with moisture levels.</p>
            </div>
          </div>

          <Link
            to="/ai-assistant"
            className="px-5 py-2.5 rounded-xl font-bold text-stone-950 bg-emerald-400 hover:bg-emerald-300 text-xs transition-colors whitespace-nowrap"
          >
            Chat with Farm Assistant →
          </Link>
        </div>
      </div>
    </div>
  );
};
