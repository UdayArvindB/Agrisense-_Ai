import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { YIELD_COMPARISON_DATA } from '../../data/mockAnalytics';

export const YieldComparisonChart: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Predictive ML Modeling
          </span>
          <h3 className="text-xl font-extrabold text-stone-900 tracking-tight mt-1">
            Historical vs Predicted Yield (Tons / Acre)
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            XGBoost harvest projections benchmarked against multi-year historical logs.
          </p>
        </div>
      </div>

      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={YIELD_COMPARISON_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1ed" />
            <XAxis dataKey="yearOrSeason" stroke="#78716c" fontSize={11} tickLine={false} />
            <YAxis stroke="#78716c" fontSize={12} tickLine={false} unit="t" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                border: '1px solid #e7e5e4',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar
              dataKey="historicalYield"
              name="Historical Baseline (t/ac)"
              fill="#A8A29E"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="predictedYield"
              name="AI Predicted Yield (t/ac)"
              fill="#059669"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
