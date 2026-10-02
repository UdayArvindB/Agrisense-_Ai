import { ChatMessage, SuggestedPrompt } from '../types/chat';

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-001',
    sender: 'user',
    timestamp: '10:14 AM',
    text: 'Why are my tomato leaves developing dark spots and yellow halos around the edges?'
  },
  {
    id: 'msg-002',
    sender: 'assistant',
    timestamp: '10:14 AM',
    text: `Based on the visual symptoms described (dark spots with concentric target-like rings and yellow chlorotic halos), your crop is exhibiting classic signs of **Early Blight** caused by the fungal pathogen *Alternaria solani*.\n\nHere is what our ML diagnosis and retrieved extension guidelines recommend:\n\n1. **Prune Lower Canopy:** Immediately remove infected leaves situated within the bottom 25-30cm of the stem. Dispose of them away from the field—never compost infected solanaceous foliage.\n2. **Irrigation Adjustment:** Cease any overhead sprinkler watering. Early blight spores require at least 2 to 4 hours of leaf moisture to penetrate leaf stomata. Transition to basal drip irrigation.\n3. **Protective Spray:** Apply an approved copper-based organic fungicide or *Bacillus subtilis* bio-fungicide to prevent spores from inoculating upper canopy leaves.\n\n*Would you like me to generate a personalized spray schedule based on your current field acreage?*`,
    sources: [
      {
        id: 'src-101',
        title: 'Tomato Disease Management Guide (Bulletin #AG-412)',
        category: 'Agricultural Research Document',
        sourceOrg: 'State Agricultural Extension University',
        publishedDate: 'March 2024',
        relevanceScore: 92,
        excerpt: 'Alternaria solani infection proliferates under temperatures between 24°C–29°C with high relative humidity (>80%). Targeted pruning of lower infected leaves reduces secondary infection by 78%.'
      },
      {
        id: 'src-102',
        title: 'Integrated Crop Protection Advisory: Solanaceae Pathogens',
        category: 'Agricultural Extension Document',
        sourceOrg: 'National Plant Protection Bureau',
        publishedDate: 'January 2024',
        relevanceScore: 88,
        excerpt: 'Eliminate infected foliar debris promptly. Maintain plant spacing to ensure minimum 15% improved cross-canopy airflow, and avoid overhead sprinkler systems.'
      }
    ]
  }
];

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: 'p1',
    label: 'Tomato leaf spots & yellowing',
    prompt: 'Why are my tomato leaves turning yellow with brown spots?',
    category: 'Disease'
  },
  {
    id: 'p2',
    label: 'What causes Early Blight?',
    prompt: 'What causes Early Blight and how quickly can it spread across a field?',
    category: 'Disease'
  },
  {
    id: 'p3',
    label: 'How to maximize crop yield?',
    prompt: 'How can I optimize NPK fertigation to increase my harvest yield this season?',
    category: 'Yield'
  },
  {
    id: 'p4',
    label: 'Explain in Telugu (తెలుగు)',
    prompt: 'మీ టమాటా మొక్క ఆకులపై మచ్చలు ఎందుకు వస్తున్నాయి?',
    category: 'Multilingual'
  },
  {
    id: 'p5',
    label: 'Explain in Hindi (हिंदी)',
    prompt: 'मेरी टमाटर की पत्तियों पर काले धब्बे क्यों आ रहे हैं? इसका उपचार क्या है?',
    category: 'Multilingual'
  },
  {
    id: 'p6',
    label: 'Which RAG sources support this?',
    prompt: 'What university documents and research papers support your blight management advice?',
    category: 'General'
  }
];

export const MULTILINGUAL_RESPONSES: Record<string, { reply: string; sources: any[] }> = {
  telugu: {
    reply: `**మీ టమాటా పంటలో ఆకులపై మచ్చలు రావడానికి ప్రధాన కారణాలు:**\n\n1. **ఎర్లీ బ్లైట్ (Early Blight / ఆకుమచ్చ తెగులు):** ఇది *ఆల్టర్నేరియా సొలాని* అనే ఫంగస్ వల్ల వస్తుంది. ఆకులపై నల్లటి లేదా ముదురు గోధుమ రంగు వలయాకార మచ్చలు (కంటి వంటి గుండ్రని గుర్తులు) ఏర్పడతాయి.\n2. **తీసుకోవాల్సిన తక్షణ చర్యలు:**\n   - తెగులు సోకిన కింది ఆకులను వెంటనే తుంచి నాశనం చేయండి (ఎరువు గుంటల్లో వేయవద్దు).\n   - పైనుంచి నీరు చల్లే స్ప్రింక్లర్లను ఆపి, కేవలం మొక్క మొదట్లోనే డ్రిప్ పద్ధతిలో నీరు అందించండి.\n   - కాపర్ ఆక్సీక్లోరైడ్ (COC) 3 గ్రాములు లేదా మాంకోజెబ్ 2 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి.\n3. **నివారణ చర్యలు:** చెట్ల మధ్య గాలి, వెలుతురు సరిపడా ఉండేలా చూసుకోండి. వేప నూనె (10,000 ppm) 2ml లీటరు నీటిలో కలిపి ముందస్తు రక్షణగా వాడవచ్చు.`,
    sources: [
      {
        id: 'tel-src-1',
        title: 'ఆచార్య ఎన్.జి. రంగా వ్యవసాయ విశ్వవిద్యాలయం - టమాటా పంట సస్యరక్షణ',
        category: 'ప్రాంతీయ వ్యవసాయ పరిశోధనా సమాచారం',
        sourceOrg: 'ANGRAU Regional Advisory',
        publishedDate: '2024',
        relevanceScore: 95,
        excerpt: 'టమాటాలో ఆకుమచ్చ తెగులు నివారణకు సమగ్ర సస్యరక్షణ పద్ధతులు పాటించాలి. వర్షాకాలంలో మొక్కల అడుగు ఆకులను తొలగించడం ద్వారా తెగులు వ్యాప్తిని 60% వరకు అరికట్టవచ్చు.'
      }
    ]
  },
  hindi: {
    reply: `**टमाटर की पत्तियों पर काले व भूरे धब्बे आने का मुख्य कारण:**\n\nयह लक्षण फफूंद जनित रोग **अगेती झुलसा (Early Blight - Alternaria solani)** के हो सकते हैं।\n\n**तुरंत किए जाने वाले उपाय:**\n1. **प्रभावित पत्तियों को हटाएं:** पौधे के निचले हिस्से की संक्रमित पत्तियों को काटकर खेत से दूर नष्ट कर दें।\n2. **सिंचाई में बदलाव:** पत्तियों पर पानी का छिड़काव न करें, ड्रिप सिंचाई का प्रयोग करें ताकि पत्तियां गीली न रहें।\n3. **उपचार:** कॉपर ऑक्सीक्लोराइड 50% WP (3 ग्राम प्रति लीटर) या मैंकोजेब 75% WP (2 ग्राम प्रति लीटर पानी) का छिड़काव 10 दिन के अंतराल पर करें।`,
    sources: [
      {
        id: 'hin-src-1',
        title: 'भारतीय कृषि अनुसंधान परिषद (ICAR) - सब्जी रोग प्रबंधन एडवाइजरी',
        category: 'कृषि विस्तार निर्देशिका',
        sourceOrg: 'ICAR New Delhi',
        publishedDate: '2024',
        relevanceScore: 93,
        excerpt: 'अगेती झुलसा के नियंत्रण हेतु संतुलित उर्वरक प्रयोग करें तथा खेत में जल निकास का समुचित प्रबंध रखें।'
      }
    ]
  }
};
