import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CROP_DISTRIBUTION } from '../../data/mockAnalytics';

export const CropDistributionChart: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Acreage Allocation
          </span>
          <h3 className="text-xl font-extrabold text-stone-900 tracking-tight mt-1">
            Active Crop Distribution
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Total of 28.5 Hectares under active AI monitoring.
          </p>
        </div>
      </div>

      <div className="w-full h-72 sm:h-80 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={CROP_DISTRIBUTION}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
            >
              {CROP_DISTRIBUTION.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any, name: any, props: any) => [
                `${value}% (${props.payload.variety})`,
                name,
              ]}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                border: '1px solid #e7e5e4',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                fontSize: '12px',
              }}
            />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
