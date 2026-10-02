import React from 'react';

export const VoiceVisualizer: React.FC<{ isListening: boolean }> = ({ isListening }) => {
  if (!isListening) return null;

  return (
    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold animate-pulse">
      <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
      <span>Listening (Mic Active):</span>
      <div className="flex items-center gap-0.5 ml-1 h-3">
        <span className="w-1 bg-rose-500 rounded-full animate-[bounce_1s_infinite_100ms] h-2" />
        <span className="w-1 bg-rose-500 rounded-full animate-[bounce_1s_infinite_200ms] h-3" />
        <span className="w-1 bg-rose-500 rounded-full animate-[bounce_1s_infinite_300ms] h-1.5" />
        <span className="w-1 bg-rose-500 rounded-full animate-[bounce_1s_infinite_400ms] h-3" />
        <span className="w-1 bg-rose-500 rounded-full animate-[bounce_1s_infinite_250ms] h-2" />
      </div>
    </div>
  );
};
