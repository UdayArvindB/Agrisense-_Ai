import React from 'react';
import { FarmMetric } from '../../types/farm';
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export const MetricCard: React.FC<{ metric: FarmMetric }> = ({ metric }) => {
  const getTrendIcon = () => {
    if (metric.trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />;
    if (metric.trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />;
    return <Minus className="w-3.5 h-3.5 text-stone-400" />;
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            {metric.title}
          </span>
          <span className="p-1.5 rounded-lg bg-stone-100 group-hover:bg-emerald-50 transition-colors">
            {getTrendIcon()}
          </span>
        </div>

        <div className="flex items-baseline gap-2 my-1">
          <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {metric.value}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-1">
          <span>{metric.change}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 line-clamp-1 font-medium">
        {metric.description}
      </div>
    </div>
  );
};
