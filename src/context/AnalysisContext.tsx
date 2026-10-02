import React, { createContext, useContext, useState } from 'react';
import { DiseaseDetectionResult } from '../types/disease';
import { TOMATO_EARLY_BLIGHT_RESULT } from '../data/mockDiseases';
import { predictDisease } from '../services/api';

interface AnalysisContextType {
  currentAnalysis: DiseaseDetectionResult | null;
  isAnalyzing: boolean;
  analysisStep: string;
  runAnalysis: (fileOrPreset: File | string) => Promise<DiseaseDetectionResult>;
  resetAnalysis: () => void;
  setCurrentAnalysis: (res: DiseaseDetectionResult | null) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAnalysis, setCurrentAnalysis] = useState<DiseaseDetectionResult | null>(
    TOMATO_EARLY_BLIGHT_RESULT
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');

  const runAnalysis = async (fileOrPreset: File | string): Promise<DiseaseDetectionResult> => {
    setIsAnalyzing(true);
    setAnalysisStep('Initializing pipeline...');
    try {
      const result = await predictDisease(fileOrPreset, (step) => {
        setAnalysisStep(step);
      });
      setCurrentAnalysis(result);
      return result;
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const resetAnalysis = () => {
    setCurrentAnalysis(null);
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentAnalysis,
        isAnalyzing,
        analysisStep,
        runAnalysis,
        resetAnalysis,
        setCurrentAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
