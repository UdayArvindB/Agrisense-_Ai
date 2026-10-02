import {
  FarmMetric,
  CropHealthPoint,
  YieldDataPoint,
  DiseaseRiskDistribution,
  CropDistributionItem,
  FarmReport
} from '../types/farm';

export const FARM_METRICS: FarmMetric[] = [
  {
    title: 'Crop Health',
    value: '87%',
    change: '+4.2% vs last week',
    trend: 'up',
    status: 'positive',
    description: 'Based on multispectral leaf index & visual inference'
  },
  {
    title: 'Disease Risk',
    value: 'Low',
    change: 'Down from Moderate',
    trend: 'down',
    status: 'positive',
    description: 'Regional fungal spore load index is minimal'
  },
  {
    title: 'Predicted Yield',
    value: '4.2 tons/ac',
    change: '+8.5% above seasonal avg',
    trend: 'up',
    status: 'positive',
    description: 'Ensemble ML model (XGBoost + Soil Moisture)'
  },
  {
    title: 'Active Crops',
    value: '4 Crops',
    change: 'Across 12.5 Hectares',
    trend: 'neutral',
    status: 'neutral',
    description: 'Tomato, Maize, Potato & High-Yield Soybean'
  }
];

export const CROP_HEALTH_TREND: CropHealthPoint[] = [
  { month: 'Apr', healthy: 82, atRisk: 14, diseased: 4 },
  { month: 'May', healthy: 85, atRisk: 11, diseased: 4 },
  { month: 'Jun', healthy: 79, atRisk: 17, diseased: 4 },
  { month: 'Jul', healthy: 74, atRisk: 21, diseased: 5 },
  { month: 'Aug', healthy: 83, atRisk: 13, diseased: 4 },
  { month: 'Sep', healthy: 88, atRisk: 9, diseased: 3 },
  { month: 'Oct', healthy: 87, atRisk: 10, diseased: 3 },
];

export const YIELD_COMPARISON_DATA: YieldDataPoint[] = [
  { yearOrSeason: '2022 Season', crop: 'Tomato', historicalYield: 3.4, predictedYield: 3.5, actualAchieved: 3.45 },
  { yearOrSeason: '2023 Kharif', crop: 'Corn', historicalYield: 3.8, predictedYield: 3.9, actualAchieved: 3.92 },
  { yearOrSeason: '2023 Rabi', crop: 'Potato', historicalYield: 4.0, predictedYield: 4.1, actualAchieved: 4.15 },
  { yearOrSeason: '2024 Kharif', crop: 'Soybean', historicalYield: 3.6, predictedYield: 4.0, actualAchieved: 3.98 },
  { yearOrSeason: '2024 Current', crop: 'Tomato (Active)', historicalYield: 3.7, predictedYield: 4.2 },
];

export const DISEASE_RISK_ZONES: DiseaseRiskDistribution[] = [
  { zone: 'Field Block A (Tomato)', fungalRisk: 42, bacterialRisk: 18, pestRisk: 12 },
  { zone: 'Field Block B (Corn)', fungalRisk: 25, bacterialRisk: 10, pestRisk: 30 },
  { zone: 'Field Block C (Potato)', fungalRisk: 55, bacterialRisk: 20, pestRisk: 15 },
  { zone: 'Field Block D (Soybean)', fungalRisk: 15, bacterialRisk: 8, pestRisk: 18 },
];

export const CROP_DISTRIBUTION: CropDistributionItem[] = [
  { name: 'Tomato (Roma)', value: 35, color: '#10B981', variety: 'Hybrid VF-Roma' },
  { name: 'Corn (Sweet)', value: 28, color: '#059669', variety: 'Pioneer 3394' },
  { name: 'Potato (Kufri)', value: 22, color: '#34D399', variety: 'Kufri Jyoti' },
  { name: 'Soybean', value: 15, color: '#84CC16', variety: 'JS-335 Nitrogen Fixer' },
];

export const SAMPLE_FARM_REPORT: FarmReport = {
  id: 'AGRI-REPORT-2024-OCT',
  generatedDate: 'October 2, 2026',
  farmName: 'GreenValley Agro Research Station',
  farmerName: 'Ramesh Reddy',
  location: 'Warangal District, Telangana',
  totalAcreage: 28.5,
  overallHealthScore: 87,
  predictedTotalYield: '119.7 Metric Tons',
  primaryAlerts: [
    'Moderate Early Blight detected in lower canopy of Block A (Tomato)',
    'Relative humidity forecasted >82% for next 72 hours; precautionary anti-fungal spray recommended',
    'Soil moisture in Block C (Potato) is optimal at 68% field capacity'
  ],
  recentAnalyses: [
    { crop: 'Tomato', disease: 'Early Blight', confidence: 91, status: 'Action Plan Generated', date: 'Today, 14:20' },
    { crop: 'Corn', disease: 'Common Rust', confidence: 89, status: 'Under Surveillance', date: 'Yesterday' },
    { crop: 'Potato', disease: 'Healthy Foliage', confidence: 96, status: 'Vigor Confirmed', date: '3 days ago' },
    { crop: 'Soybean', disease: 'Healthy Vigor', confidence: 94, status: 'Optimal', date: '5 days ago' },
  ],
  ragSourcesCount: 14,
  aiAdvisorySummary: 'Overall farm health is in good standing (87%). Prompt sanitation in Block A will prevent Early Blight spore transmission to neighboring plots. Expected yield remains strong at 4.2 tons/acre under current fertigation regimes.'
};
