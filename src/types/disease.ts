export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Severe';

export interface RetrievedSource {
  id: string;
  title: string;
  category: string;
  sourceOrg: string;
  publishedDate: string;
  relevanceScore: number; // e.g. 92%
  excerpt: string;
  fullContent?: string;
  doiOrRef?: string;
  isDemo?: boolean;
}

export interface DiseaseDetectionResult {
  id: string;
  cropName: string;
  cropVariety?: string;
  diseaseName: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Nutritional' | 'Healthy';
  confidence: number; // 0 - 100
  riskLevel: RiskLevel;
  symptoms: string[];
  affectedAreaPercentage: number;
  detectedAt: string;
  imageUrl: string;
  
  // RAG Grounding
  retrievedSources: RetrievedSource[];

  // GenAI Recommendations
  actionPlan: {
    immediateActions: string[];
    monitoring: string[];
    prevention: string[];
    organicAlternatives?: string[];
  };

  aiExplanation: string;
  disclaimer: string;
}

export interface DemoCropPreset {
  id: string;
  cropName: string;
  diseaseName: string;
  badge: string;
  thumbnail: string;
  imagePromptDescription: string;
  presetResult: DiseaseDetectionResult;
}
