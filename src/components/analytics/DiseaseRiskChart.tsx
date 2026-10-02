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
import { DISEASE_RISK_ZONES } from '../../data/mockAnalytics';

export const DiseaseRiskChart: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            Pathogen Pressure Vectors
          </span>
          <h3 className="text-xl font-extrabold text-stone-900 tracking-tight mt-1">
            Disease Risk Forecast by Field Block
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Breakdown of fungal, bacterial, and pest vulnerability indices across farm plots.
          </p>
        </div>
      </div>

      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DISEASE_RISK_ZONES}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1ed" />
            <XAxis dataKey="zone" stroke="#78716c" fontSize={11} tickLine={false} />
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
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="fungalRisk" name="Fungal Risk" fill="#E11D48" radius={[4, 4, 0, 0]} />
            <Bar dataKey="bacterialRisk" name="Bacterial Risk" fill="#D97706" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pestRisk" name="Pest Vector" fill="#2563EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
