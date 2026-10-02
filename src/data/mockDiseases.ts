import { DiseaseDetectionResult, DemoCropPreset } from '../types/disease';

export const TOMATO_EARLY_BLIGHT_RESULT: DiseaseDetectionResult = {
  id: 'det-001',
  cropName: 'Tomato',
  cropVariety: 'Solanum lycopersicum (Hybrid Roma)',
  diseaseName: 'Early Blight',
  pathogenType: 'Fungal',
  confidence: 91,
  riskLevel: 'Moderate',
  symptoms: [
    'Concentric target-like circular dark brown lesions',
    'Yellow chlorotic halos surrounding leaf lesions',
    'Lower canopy foliar necrosis and premature senescence',
    'Stem lesions forming dark sunken collar rot'
  ],
  affectedAreaPercentage: 24,
  detectedAt: 'Just now (Simulated Inference: 412ms)',
  imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=800&q=80',
  
  retrievedSources: [
    {
      id: 'src-101',
      title: 'Tomato Disease Management Guide (Bulletin #AG-412)',
      category: 'Agricultural Research Document',
      sourceOrg: 'State Agricultural Extension University',
      publishedDate: 'March 2024',
      relevanceScore: 92,
      excerpt: 'Alternaria solani infection proliferates under temperatures between 24°C–29°C with high relative humidity (>80%). Targeted pruning of lower infected leaves coupled with preventative copper or chlorothalonil fungicides suppresses canopy spread by up to 78%.',
      fullContent: 'Early blight caused by Alternaria solani is an economically damaging disease across Solanaceous crops. In warm, humid environments, fungal conidia germinate within 2 hours of free moisture on foliage. Effective integrated pest management requires crop rotation with non-solanaceous species, drip irrigation to reduce leaf wetness, and biological bio-fungicides like Bacillus subtilis at first symptom onset.',
      doiOrRef: 'ICAR-Ext-2024-T09',
      isDemo: true
    },
    {
      id: 'src-102',
      title: 'Integrated Crop Protection Advisory: Solanaceae Foliar Pathogens',
      category: 'Agricultural Extension Document',
      sourceOrg: 'National Plant Protection Bureau',
      publishedDate: 'January 2024',
      relevanceScore: 88,
      excerpt: 'Early blight management begins with sanitation. Eliminate infected foliar debris promptly. Maintain plant spacing to ensure minimum 15% improved cross-canopy airflow, and avoid overhead sprinkler systems which elevate splash transmission.',
      fullContent: 'Field trials confirm that leaf moisture duration is the single greatest predictor of severe blight outbreaks. Utilizing organic mulching suppresses splash-dispersed spore inoculums resident in upper soil horizons.',
      doiOrRef: 'NPPB-ADVISORY-Solan-V4',
      isDemo: true
    },
    {
      id: 'src-103',
      title: 'Tomato Disease Prevention Guidelines & Biological Controls',
      category: 'Agricultural Knowledge Base',
      sourceOrg: 'Global Agricultural Knowledge Network (GAKN)',
      publishedDate: 'November 2023',
      relevanceScore: 84,
      excerpt: 'Bio-fungicidal treatments utilizing Trichoderma harzianum and copper hydroxide formulations show optimal efficacy when applied during early lesion development (<15% foliar canopy coverage).',
      fullContent: 'Preventative treatment thresholds: If fewer than 3 lesions per plant are visible on lower leaves, non-synthetic bio-control sprays combined with potassium silicate foliar feeds harden leaf cuticles against fungal hyphal penetration.',
      doiOrRef: 'GAKN-KB-2023-Fung-88',
      isDemo: true
    }
  ],

  actionPlan: {
    immediateActions: [
      'Remove and safely dispose of severely affected lower leaves (do not compost infected foliage)',
      'Sterilize pruning shears between plants using a 10% bleach solution or 70% isopropyl alcohol',
      'Improve cross-airflow by thinning non-fruiting suckers in dense canopy sections',
      'Cease all overhead sprinkler irrigation; transition exclusively to basal drip irrigation'
    ],
    monitoring: [
      'Inspect adjacent plants within a 5-meter radius daily for concentric bullseye lesions',
      'Check underside of leaves during morning hours for velvety dark fungal sporulation',
      'Monitor local weather for forecasted high relative humidity (>75%) or rain showers'
    ],
    prevention: [
      'Apply a certified copper octanoate or Bacillus subtilis preventative spray within 48 hours',
      'Lay organic straw mulch (5cm depth) around plant base to prevent rain-splash spore transmission',
      'Ensure 3-year crop rotation schedule away from potato, tomato, and eggplant families'
    ],
    organicAlternatives: [
      'Neem oil extract (1.5% v/v) with potassium bicarbonate foliar wash',
      'Trichoderma viride root drench to induce systemic acquired resistance (SAR)'
    ]
  },

  aiExplanation: 'The computer vision model identified characteristic concentric concentric "bullseye" dark brown necrotic rings typical of Alternaria solani. The RAG pipeline retrieved 3 verified regional extension guidelines confirming early stage infection (24% canopy area). Synthesizing these vectors, the GenAI engine recommends targeted pruning and air circulation enhancements prior to chemical intervention.',
  disclaimer: 'AgriSense AI provides AI-assisted classification and evidence-based decision support. This output is not a certified diagnostic laboratory certificate. Verify high-consequence treatments with your local agricultural extension officer.'
};

export const CORN_RUST_RESULT: DiseaseDetectionResult = {
  id: 'det-002',
  cropName: 'Corn (Maize)',
  cropVariety: 'Zea mays (Sweet Corn Pioneer)',
  diseaseName: 'Common Rust',
  pathogenType: 'Fungal',
  confidence: 89,
  riskLevel: 'Moderate',
  symptoms: [
    'Golden-brown to cinnamon-brown powdery pustules (uredinia)',
    'Pustules scattered across both upper and lower leaf surfaces',
    'Leaf chlorosis surrounding dense pustule clusters'
  ],
  affectedAreaPercentage: 18,
  detectedAt: 'Simulated Demo (Puccinia sorghi)',
  imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
  
  retrievedSources: [
    {
      id: 'src-201',
      title: 'Cereal Pathology Manual: Maize Rust Management',
      category: 'Agricultural Research Document',
      sourceOrg: 'International Maize and Wheat Improvement Center',
      publishedDate: 'February 2024',
      relevanceScore: 94,
      excerpt: 'Puccinia sorghi develops under moderate temperatures (16°C–25°C) with persistent dew. Fungicide threshold is triggered if pustules appear on ear leaves prior to tasseling.',
      doiOrRef: 'CIMMYT-MAIZE-2024',
      isDemo: true
    },
    {
      id: 'src-202',
      title: 'Foliar Fungicides for Field Corn Protection',
      category: 'Extension Advisory',
      sourceOrg: 'National Agronomy Council',
      publishedDate: 'May 2023',
      relevanceScore: 87,
      excerpt: 'Strobilurin and triazole combinations provide 21-day residual protection against secondary spore dispersal when applied at VT stage.',
      doiOrRef: 'NAC-2023-CORN-RUST',
      isDemo: true
    }
  ],

  actionPlan: {
    immediateActions: [
      'Evaluate rust pustule density on the leaves below and adjacent to the primary ear leaf',
      'Assess stage of corn development (pre-tassel vs post-silk) to determine economic threshold',
      'Ensure adequate potassium soil nutrition to fortify plant vascular tissue'
    ],
    monitoring: [
      'Track dew duration and nighttime temperatures; dew periods exceeding 6 hours accelerate pustule rupture',
      'Scout field perimeter rows facing prevailing winds for fresh spore clouds'
    ],
    prevention: [
      'Select certified rust-resistant hybrids featuring Rp-gene resistance for next planting cycle',
      'Implement early planting to avoid peak mid-season airborne spore migrations'
    ]
  },

  aiExplanation: 'Microscopic pattern recognition detected oval cinnamon-colored pustules erupting through the epidermal leaf tissue. RAG matching against cereal pathology corpora indicates Puccinia sorghi. The GenAI recommendation balances crop maturity stage with economic action thresholds.',
  disclaimer: 'AI-assisted classification. Confirm with an agronomy field expert before initiating aerial chemical applications.'
};

export const POTATO_LATE_BLIGHT_RESULT: DiseaseDetectionResult = {
  id: 'det-003',
  cropName: 'Potato',
  cropVariety: 'Solanum tuberosum (Kufri Jyoti)',
  diseaseName: 'Late Blight',
  pathogenType: 'Fungal',
  confidence: 94,
  riskLevel: 'High',
  symptoms: [
    'Water-soaked irregular pale to dark green lesions expanding rapidly',
    'White downy fungal growth on the underside of leaves during humid conditions',
    'Brown necrotic lesions on petioles and stems'
  ],
  affectedAreaPercentage: 35,
  detectedAt: 'Simulated Demo (Phytophthora infestans)',
  imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',

  retrievedSources: [
    {
      id: 'src-301',
      title: 'Late Blight Alert System & Emergency Response Protocol',
      category: 'Emergency Agronomy Directive',
      sourceOrg: 'International Potato Center (CIP)',
      publishedDate: 'December 2023',
      relevanceScore: 96,
      excerpt: 'Phytophthora infestans can decimate entire field plots within 7-10 days under continuous moist conditions. Immediate systemic fungicide application is critical upon first detection.',
      doiOrRef: 'CIP-BLIGHT-2023-EMERGENCY',
      isDemo: true
    },
    {
      id: 'src-302',
      title: 'Tuber Protection and Post-Infection Field Sanitation',
      category: 'Extension Advisory',
      sourceOrg: 'Central Tuber Crops Institute',
      publishedDate: 'October 2023',
      relevanceScore: 91,
      excerpt: 'Hilling up soil around potato hills prevents zoospores from washing down into developing tubers during rain events.',
      doiOrRef: 'CTC-AGRI-409',
      isDemo: true
    }
  ],

  actionPlan: {
    immediateActions: [
      'Apply systemic translaminar fungicide (e.g. Cymoxanil + Mancozeb) within 24 hours',
      'Do not harvest wet crops; hill up ridges with clean soil to shield tubers from zoospore runoff',
      'Isolate the infected field block and sanitize tractor tires and boots before moving to adjacent fields'
    ],
    monitoring: [
      'Check daily at dawn for white fuzzy mycelium on leaf margins',
      'Coordinate with regional weather stations for blight risk forecast indices (Smith Periods)'
    ],
    prevention: [
      'Destroy volunteer potato plants and cull piles which serve as primary overwintering reservoirs',
      'Use certified disease-free seed tubers with documented late blight resistance ratings'
    ]
  },

  aiExplanation: 'The model identified expansive water-soaked marginal lesions and stem rot characteristic of Phytophthora infestans. Given the high risk classification (94% confidence, 35% foliage impacted), RAG retrieval flagged the emergency protocol recommending rapid curative spraying.',
  disclaimer: 'Late blight spreads exponentially. Prompt verification by an agronomic specialist is urgently advised.'
};

export const HEALTHY_CROP_RESULT: DiseaseDetectionResult = {
  id: 'det-004',
  cropName: 'Apple Foliage',
  cropVariety: 'Malus domestica (Honeycrisp)',
  diseaseName: 'Healthy Crop (No Disease Detected)',
  pathogenType: 'Healthy',
  confidence: 97,
  riskLevel: 'Low',
  symptoms: [
    'Vibrant chlorophyll distribution with consistent deep green coloration',
    'Intact leaf margin architecture without necrotic spots or chlorosis',
    'Clean, smooth cuticle free of fungal spores or pest rasping damage'
  ],
  affectedAreaPercentage: 0,
  detectedAt: 'Simulated Demo (Vigor Benchmark)',
  imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',

  retrievedSources: [
    {
      id: 'src-401',
      title: 'Optimal Foliar Nutrition & Photosynthetic Vigor Index',
      category: 'Crop Physiology Standards',
      sourceOrg: 'Horticultural Sciences Research Station',
      publishedDate: 'February 2024',
      relevanceScore: 95,
      excerpt: 'Maintaining leaf nitrogen and zinc levels supports optimal stomatal conductance and durable natural cuticle barrier thickness.',
      doiOrRef: 'HORT-SCI-2024-VIGOR',
      isDemo: true
    }
  ],

  actionPlan: {
    immediateActions: [
      'Maintain standard scheduled drip irrigation cycle based on current evapotranspiration rates',
      'No chemical or curative pesticide applications needed'
    ],
    monitoring: [
      'Perform regular bi-weekly visual canopy scouting',
      'Check soil moisture tension at root zone depth (15cm and 30cm)'
    ],
    prevention: [
      'Continue balanced macronutrient and micronutrient fertigation program',
      'Ensure weed-free tree basins to minimize moisture competition'
    ]
  },

  aiExplanation: 'Computer vision analysis verified healthy epidermal leaf tissue with 97% confidence and zero detectable pathogenic lesions. RAG benchmarks confirm optimum canopy health. GenAI recommends maintaining regular preventive agronomic maintenance.',
  disclaimer: 'Foliar health status verified by AI visual model. Periodic physical scouting remains recommended.'
};

export const DEMO_PRESETS: DemoCropPreset[] = [
  {
    id: 'preset-tomato',
    cropName: 'Tomato',
    diseaseName: 'Early Blight (Alternaria solani)',
    badge: 'Popular Demo',
    thumbnail: 'https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=400&q=80',
    imagePromptDescription: 'Tomato leaf showing concentric dark brown bullseye spots and chlorotic yellow halos',
    presetResult: TOMATO_EARLY_BLIGHT_RESULT
  },
  {
    id: 'preset-corn',
    cropName: 'Corn / Maize',
    diseaseName: 'Common Rust (Puccinia sorghi)',
    badge: 'Cereal Pathogen',
    thumbnail: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80',
    imagePromptDescription: 'Corn leaf showing golden-brown powdery fungal pustules',
    presetResult: CORN_RUST_RESULT
  },
  {
    id: 'preset-potato',
    cropName: 'Potato',
    diseaseName: 'Late Blight (Phytophthora infestans)',
    badge: 'High Risk Alert',
    thumbnail: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
    imagePromptDescription: 'Potato leaf exhibiting water-soaked dark lesions and white downy margin',
    presetResult: POTATO_LATE_BLIGHT_RESULT
  },
  {
    id: 'preset-healthy',
    cropName: 'Apple / Orchard',
    diseaseName: 'Healthy Crop (Optimal Vigor)',
    badge: 'Vigor Benchmark',
    thumbnail: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80',
    imagePromptDescription: 'Vibrant green healthy leaves with no visible lesions',
    presetResult: HEALTHY_CROP_RESULT
  }
];
