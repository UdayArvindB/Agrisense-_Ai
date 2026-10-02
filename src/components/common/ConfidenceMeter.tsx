import React from 'react';
import { RiskLevel } from '../../types/disease';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ConfidenceMeterProps {
  confidence: number;
  riskLevel: RiskLevel;
  pathogenType?: string;
  showLabels?: boolean;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  confidence,
  riskLevel,
  pathogenType,
  showLabels = true,
}) => {
  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'Low':
        return 'text-emerald-700 bg-emerald-100 border-emerald-300';
      case 'Moderate':
        return 'text-amber-800 bg-amber-100 border-amber-300';
      case 'High':
      case 'Severe':
        return 'text-rose-700 bg-rose-100 border-rose-300';
      default:
        return 'text-emerald-700 bg-emerald-100 border-emerald-300';
    }
  };

  const getMeterColor = (val: number) => {
    if (val >= 85) return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
    if (val >= 65) return 'bg-gradient-to-r from-amber-400 to-amber-500';
    return 'bg-gradient-to-r from-rose-500 to-rose-600';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          {showLabels && (
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              ML Inference Confidence
            </span>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900 tracking-tight">
              {confidence}%
            </span>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              High Precision
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {pathogenType && pathogenType !== 'Healthy' && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-100 text-stone-700 border border-stone-200">
              {pathogenType}
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(
              riskLevel
            )}`}
          >
            {riskLevel === 'Low' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5" />
            )}
            Risk: {riskLevel}
          </span>
        </div>
      </div>

      {/* Segmented Progress Bar */}
      <div className="relative w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200/80">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${getMeterColor(
            confidence
          )}`}
          style={{ width: `${confidence}%` }}
        />
      </div>

      <div className="flex justify-between text-[11px] text-stone-600 font-medium">
        <span>0% Baseline</span>
        <span>50% Threshold</span>
        <span>75% High</span>
        <span>100% Certain</span>
      </div>
    </div>
  );
};
