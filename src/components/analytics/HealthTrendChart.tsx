import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CROP_HEALTH_TREND } from '../../data/mockAnalytics';

export const HealthTrendChart: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Temporal Foliar Index
          </span>
          <h3 className="text-xl font-extrabold text-stone-900 tracking-tight mt-1">
            Crop Health Trend (7-Month Progression)
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Percentage of canopy categorized as Healthy, At-Risk, or Diseased.
          </p>
        </div>
      </div>

      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={CROP_HEALTH_TREND}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorHealthy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorAtRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1ed" />
            <XAxis dataKey="month" stroke="#78716c" fontSize={12} tickLine={false} />
            <YAxis stroke="#78716c" fontSize={12} tickLine={false} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                border: '1px solid #e7e5e4',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                fontSize: '12px',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            <Area
              type="monotone"
              dataKey="healthy"
              name="Healthy Foliage (%)"
              stroke="#059669"
              fillOpacity={1}
              fill="url(#colorHealthy)"
              strokeWidth={2.5}
            />
            <Area
              type="monotone"
              dataKey="atRisk"
              name="At-Risk Canopy (%)"
              stroke="#D97706"
              fillOpacity={1}
              fill="url(#colorAtRisk)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
