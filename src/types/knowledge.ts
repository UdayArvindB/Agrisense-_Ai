export type KnowledgeCategory =
  | 'All'
  | 'Crop Diseases'
  | 'Soil Management'
  | 'Irrigation'
  | 'Fertilizers'
  | 'Pest Management'
  | 'Weather'
  | 'Government Schemes'
  | 'Crop Management';

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: KnowledgeCategory;
  source: string;
  date: string;
  relevanceScore: number;
  readTime: string;
  description: string;
  tags: string[];
  pdfAvailable?: boolean;
  content: {
    overview: string;
    keyFindings: string[];
    recommendedPractices: string[];
    citations: string;
  };
}
