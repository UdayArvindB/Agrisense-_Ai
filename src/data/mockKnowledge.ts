import { KnowledgeDocument } from '../types/knowledge';

export const KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'doc-001',
    title: 'Comprehensive Management of Solanaceous Blights & Wilts',
    category: 'Crop Diseases',
    source: 'ICAR - Indian Institute of Horticultural Research',
    date: 'February 2024',
    relevanceScore: 96,
    readTime: '6 min read',
    description: 'Epidemiological review of Alternaria and Phytophthora foliar pathogens, canopy airflow dynamics, and biorational fungicidal regimes.',
    tags: ['Tomato', 'Potato', 'Early Blight', 'Late Blight', 'Biorationals'],
    pdfAvailable: true,
    content: {
      overview: 'Early blight caused by Alternaria solani is a major fungal threat to tomato and potato cultivation globally. Primary infection occurs through lower senescing leaves via splashing rainfall or overhead irrigation.',
      keyFindings: [
        'Conidia survive in solanaceous plant residue for up to 18 months.',
        'Canopy wetness periods exceeding 4 hours under 24°C–29°C conditions precipitate rapid spore germination.',
        'Biological seed treatment with Trichoderma asperellum reduces seedling damp-off by 62%.'
      ],
      recommendedPractices: [
        'Maintain minimum plant spacing of 60cm × 45cm to allow cross-canopy wind movement.',
        'Apply copper hydroxide or chlorothalonil at first visual lesion confirmation.',
        'Adopt black plastic or organic straw mulching to physically block soil splash.'
      ],
      citations: 'IIHR Tech Bulletin #Solan-2024-08 | Indexed in AgriSense RAG Corpus'
    }
  },
  {
    id: 'doc-002',
    title: 'Precision Micro-Irrigation & Soil Moisture Tension Protocols',
    category: 'Irrigation',
    source: 'National Water Technology Center',
    date: 'January 2024',
    relevanceScore: 92,
    readTime: '8 min read',
    description: 'Optimizing drip irrigation scheduling using tensiometer sensors to reduce foliar disease risk and preserve root respiration.',
    tags: ['Drip Irrigation', 'Water Conservation', 'Tensiometers', 'Foliar Health'],
    pdfAvailable: true,
    content: {
      overview: 'Excess surface irrigation and overhead sprinkler systems dramatically increase the incidence of foliar fungal and bacterial blights. Precision subsurface drip delivers moisture directly to the root profile without wetting canopy leaves.',
      keyFindings: [
        'Subsurface drip reduces foliar disease pressure by 44% compared to impact sprinklers.',
        'Maintains soil moisture tension between -25 to -40 kPa for optimal tomato nutrient uptake.',
        'Reduces seasonal farm water consumption by up to 35%.'
      ],
      recommendedPractices: [
        'Place inline drip emitters spaced 30cm apart directly under mulch film.',
        'Irrigate in early morning hours to allow any ambient humidity to dissipate with sunrise.',
        'Conduct monthly acid flushes (pH 6.0) to eliminate carbonate clogging in emitters.'
      ],
      citations: 'NWTC Bulletin Vol 18: Integrated Water & Crop Health'
    }
  },
  {
    id: 'doc-003',
    title: 'Regenerative Soil Health & Carbon Sequestration Guidelines',
    category: 'Soil Management',
    source: 'Bureau of Soil Survey & Land Use Planning',
    date: 'November 2023',
    relevanceScore: 89,
    readTime: '10 min read',
    description: 'Enhancing soil organic carbon (SOC), microbial biomass, and mycorrhizal networks to naturally resist soil-borne wilt pathogens.',
    tags: ['Soil Organic Carbon', 'Mycorrhizae', 'Crop Rotation', 'Soil Health'],
    pdfAvailable: true,
    content: {
      overview: 'Healthy living soils naturally suppress root-knot nematodes and Fusarium wilts. Building soil organic matter strengthens plant immune signaling via Systemic Acquired Resistance (SAR).',
      keyFindings: [
        'Every 0.5% increase in SOC elevates soil water retention by 18,000 liters per hectare.',
        'Inoculation with Arbuscular Mycorrhizal Fungi (AMF) increases phosphorus solubilization by 30%.'
      ],
      recommendedPractices: [
        'Incorporate green manure crops like Sunn Hemp (Crotalaria juncea) during fallow periods.',
        'Adopt reduced tillage to avoid disrupting established fungal hyphal networks.'
      ],
      citations: 'BSS-LUP Publication Series 2023: Living Soil Agroecosystems'
    }
  },
  {
    id: 'doc-004',
    title: 'Targeted Nutrient Balancing & Micronutrient Fortification',
    category: 'Fertilizers',
    source: 'Fertilizer Association Research Council',
    date: 'March 2024',
    relevanceScore: 88,
    readTime: '7 min read',
    description: 'Diagnosing calcium deficiency blossom-end rot and balancing nitrogen-to-potassium ratios to harden vegetative cell walls.',
    tags: ['Fertigation', 'NPK Ratio', 'Calcium Deficiency', 'Leaf Cuticle'],
    pdfAvailable: true,
    content: {
      overview: 'Excessive vegetative nitrogen promotes soft, succulent plant tissues that are vulnerable to fungal penetration. Balancing potassium and calcium fortifies epidermal cell walls.',
      keyFindings: [
        'A K:N ratio of 1.4:1 during fruiting minimizes hollow stem and soft rot.',
        'Foliar calcium chelate sprays prevent physiological blossom-end rot in solanaceous fruits.'
      ],
      recommendedPractices: [
        'Apply boron (0.1%) synergistically with calcium during flowering.',
        'Avoid high ammonium fertilizer forms in alkaline soils to prevent salt stress.'
      ],
      citations: 'FARC Standardized Fertigation Manual 2024'
    }
  },
  {
    id: 'doc-005',
    title: 'Integrated Pest Management: Biological Control of Whiteflies & Thrips',
    category: 'Pest Management',
    source: 'Directorate of Plant Protection & Biocontrol',
    date: 'December 2023',
    relevanceScore: 94,
    readTime: '9 min read',
    description: 'Pheromone trapping, parasitoid wasps (Encarsia formosa), and botanical neem formulations to arrest viral transmission vectors.',
    tags: ['IPM', 'Whitefly Vector', 'Tomato Leaf Curl Virus', 'Biocontrol'],
    pdfAvailable: true,
    content: {
      overview: 'Whiteflies (Bemisia tabaci) and thrips are prime vectors for devastating viral syndromes like Tomato Leaf Curl New Delhi Virus. Non-chemical biological interventions preserve beneficial pollinator populations.',
      keyFindings: [
        'Yellow sticky traps placed at canopy height reduce flying whitefly populations by 38%.',
        'Beauveria bassiana entomopathogenic fungus achieves 70% nymph mortality within 5 days.'
      ],
      recommendedPractices: [
        'Deploy 25 yellow sticky cards per hectare for early seasonal monitoring.',
        'Spray cold-pressed Azadirachtin (10,000 ppm) at 2ml/L during evening twilight.'
      ],
      citations: 'DPP-BC-Advisory-2023-VectorControl'
    }
  },
  {
    id: 'doc-006',
    title: 'Microclimate Weather Forecasting & Fungal Spore Index Modeling',
    category: 'Weather',
    source: 'National Agro-Meteorological Division',
    date: 'March 2024',
    relevanceScore: 91,
    readTime: '5 min read',
    description: 'Using IoT field weather stations and satellite vapor pressure deficit data to anticipate severe pathogen sporulation events.',
    tags: ['Weather Forecasting', 'Vapor Pressure Deficit', 'Humidity', 'Spore Model'],
    pdfAvailable: true,
    content: {
      overview: 'Predictive agro-meteorology enables farmers to apply preventative bio-fungicides hours before spores germinate, rather than relying on reactive and expensive chemical salvages.',
      keyFindings: [
        'Smith Period alerts (consecutive 48 hours >90% RH and >10°C) predict late blight outbreaks 4 days in advance.',
        'High wind velocity combined with relative humidity drop promotes spore detachment and regional spread.'
      ],
      recommendedPractices: [
        'Scout leeward field edges immediately following thunderstorms.',
        'Review AgriSense weather alerts prior to scheduling foliar treatments.'
      ],
      citations: 'NAMD Technical Monograph: Microclimate Pathometry'
    }
  },
  {
    id: 'doc-007',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY) & Smart Agriculture Subsidies',
    category: 'Government Schemes',
    source: 'Ministry of Agriculture & Farmers Welfare',
    date: 'January 2024',
    relevanceScore: 85,
    readTime: '6 min read',
    description: 'Crop insurance enrollment protocols, remote-sensing loss assessment guidelines, and AI diagnostic evidence submissions.',
    tags: ['PMFBY', 'Subsidies', 'Crop Insurance', 'Farmer Welfare', 'Drone Grants'],
    pdfAvailable: true,
    content: {
      overview: 'The PMFBY scheme provides comprehensive financial protection against non-preventable natural risks from pre-sowing to post-harvest. AI-verified disease reports expedite claim processing.',
      keyFindings: [
        'Farmers can claim up to 100% sum insured for localized calamities with photographic proof.',
        'Direct subsidy of 40-50% on solar pumps and drip micro-irrigation hardware.'
      ],
      recommendedPractices: [
        'Export AgriSense AI farm diagnostic logs within 72 hours of adverse pest or hail damage.',
        'Maintain geotagged field photos for institutional verification.'
      ],
      citations: 'MoAFW PMFBY Operational Guidelines Revision 2024'
    }
  },
  {
    id: 'doc-008',
    title: 'Standard Operating Procedures: High-Density Trellising & Canopy Hygiene',
    category: 'Crop Management',
    source: 'Horticulture Development Mission',
    date: 'February 2024',
    relevanceScore: 90,
    readTime: '8 min read',
    description: 'Vertical stake trellising, sucker pruning schedules, and post-harvest residue sanitization for indeterminate varieties.',
    tags: ['Canopy Management', 'Trellising', 'Sanitation', 'Pruning'],
    pdfAvailable: true,
    content: {
      overview: 'Proper vertical trellising elevates vegetative growth away from wet soil contact, maximizing sunlight penetration and dramatically curbing foliar pathogens.',
      keyFindings: [
        'Staked indeterminate tomatoes yield 28% more marketable grade-A fruit than prostrate crops.',
        'Removing lower foliage up to 30cm off the ground creates an effective anti-splash buffer zone.'
      ],
      recommendedPractices: [
        'Erect 2-meter bamboo stakes or wire trellises at 25 days post-transplantation.',
        'Prune lateral suckers when less than 5cm long during dry sunny mornings.'
      ],
      citations: 'HDM Field Manual #Crop-Hygiene-Trellis'
    }
  }
];
