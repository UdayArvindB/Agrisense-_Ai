export interface FarmMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  status: 'positive' | 'warning' | 'critical' | 'neutral';
  description: string;
}

export interface CropHealthPoint {
  month: string;
  healthy: number;
  atRisk: number;
  diseased: number;
}

export interface YieldDataPoint {
  yearOrSeason: string;
  crop: string;
  historicalYield: number; // tons / acre
  predictedYield: number;
  actualAchieved?: number;
}

export interface DiseaseRiskDistribution {
  zone: string;
  fungalRisk: number;
  bacterialRisk: number;
  pestRisk: number;
}

export interface CropDistributionItem {
  name: string;
  value: number; // percentage or acreage
  color: string;
  variety: string;
}

export interface FarmReport {
  id: string;
  generatedDate: string;
  farmName: string;
  farmerName: string;
  location: string;
  totalAcreage: number;
  overallHealthScore: number;
  predictedTotalYield: string;
  primaryAlerts: string[];
  recentAnalyses: {
    crop: string;
    disease: string;
    confidence: number;
    status: string;
    date: string;
  }[];
  ragSourcesCount: number;
  aiAdvisorySummary: string;
}
