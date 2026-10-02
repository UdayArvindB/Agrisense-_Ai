import { LanguageCode } from '../types/chat';

export interface TranslationStrings {
  appName: string;
  tagline: string;
  navHome: string;
  navDisease: string;
  navAnalytics: string;
  navAssistant: string;
  navKnowledge: string;
  navHowItWorks: string;
  navDashboard: string;
  ctaAnalyze: string;
  ctaAssistant: string;
  greetingMorning: string;
  demoModeBadge: string;
  confidenceLabel: string;
  riskLabel: string;
  actionPlanTitle: string;
  sourcesTitle: string;
  searchPlaceholder: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  en: {
    appName: 'AgriSense AI',
    tagline: 'Smarter Farming. Powered by AI.',
    navHome: 'Home',
    navDisease: 'Disease Detection',
    navAnalytics: 'Farm Analytics',
    navAssistant: 'AI Assistant',
    navKnowledge: 'Knowledge Hub',
    navHowItWorks: 'How It Works',
    navDashboard: 'Dashboard',
    ctaAnalyze: 'Analyze My Crop',
    ctaAssistant: 'Ask AI Assistant',
    greetingMorning: 'Good Morning, Farmer 👋',
    demoModeBadge: 'DEMO MODE',
    confidenceLabel: 'Confidence Score',
    riskLabel: 'Risk Level',
    actionPlanTitle: 'Your AI Action Plan',
    sourcesTitle: 'Retrieved Agricultural Sources',
    searchPlaceholder: 'Search agricultural knowledge, diseases, crops...'
  },
  te: {
    appName: 'అగ్రిసెన్స్ AI',
    tagline: 'తెలివైన వ్యవసాయం. AI శక్తితో.',
    navHome: 'హోమ్',
    navDisease: 'పంట తెగుళ్ల గుర్తింపు',
    navAnalytics: 'వ్యవసాయ విశ్లేషణలు',
    navAssistant: 'AI సహాయకుడు',
    navKnowledge: 'జ్ఞాన కేంద్రం',
    navHowItWorks: 'ఇది ఎలా పనిచేస్తుంది',
    navDashboard: 'డ్యాష్‌బోర్డ్',
    ctaAnalyze: 'నా పంటను విశ్లేషించండి',
    ctaAssistant: 'AI తో మాట్లాడండి',
    greetingMorning: 'శుభోదయం, రైతు మిత్రమా 👋',
    demoModeBadge: 'డెమో మోడ్',
    confidenceLabel: 'ఖచ్చితత్వ శాతం',
    riskLabel: 'ప్రమాద స్థాయి',
    actionPlanTitle: 'మీ AI కార్యాచరణ ప్రణాళిక',
    sourcesTitle: 'సేకరించిన పరిశోధనా ఆధారాలు',
    searchPlaceholder: 'వ్యవసాయ సమాచారం, తెగుళ్లు శోధించండి...'
  },
  hi: {
    appName: 'एग्रीसेंस AI',
    tagline: 'स्मार्ट खेती। AI की शक्ति।',
    navHome: 'होम',
    navDisease: 'फसल रोग पहचान',
    navAnalytics: 'फार्म एनालिटिक्स',
    navAssistant: 'AI सहायक',
    navKnowledge: 'ज्ञान केंद्र',
    navHowItWorks: 'यह कैसे काम करता है',
    navDashboard: 'डैशबोर्ड',
    ctaAnalyze: 'मेरी फसल की जांच करें',
    ctaAssistant: 'AI सहायक से पूछें',
    greetingMorning: 'शुभ प्रभात, किसान बंधु 👋',
    demoModeBadge: 'डेमो मोड',
    confidenceLabel: 'सटीकता स्कोर',
    riskLabel: 'जोखिम स्तर',
    actionPlanTitle: 'आपकी AI कार्ययोजना',
    sourcesTitle: 'प्राप्त कृषि संदर्भ दस्तावेज',
    searchPlaceholder: 'कृषि ज्ञान, रोग और उपचार खोजें...'
  },
  ta: {
    appName: 'அக்ரிசென்ஸ் AI',
    tagline: 'புத்திசாலி விவசாயம். AI துணையுடன்.',
    navHome: 'முகப்பு',
    navDisease: 'பயிர் நோய் கண்டறிதல்',
    navAnalytics: 'பண்ணை பகுப்பாய்வு',
    navAssistant: 'AI உதவியாளர்',
    navKnowledge: 'அறிவு மையம்',
    navHowItWorks: 'செயல்படும் முறை',
    navDashboard: 'கட்டுப்பாட்டு பலகை',
    ctaAnalyze: 'பயிரை சோதிக்கவும்',
    ctaAssistant: 'AI உதவியாளரிடம் கேளுங்கள்',
    greetingMorning: 'காலை வணக்கம், விவசாய தோழரே 👋',
    demoModeBadge: 'டெமோ முறை',
    confidenceLabel: 'துல்லிய மதிப்பெண்',
    riskLabel: 'ஆபத்து நிலை',
    actionPlanTitle: 'உங்கள் AI செயல் திட்டம்',
    sourcesTitle: 'ஆதார வேளாண் ஆவணங்கள்',
    searchPlaceholder: 'விவசாய தகவல்களைத் தேடுங்கள்...'
  },
  kn: {
    appName: 'ಅಗ್ರಿಸೆನ್ಸ್ AI',
    tagline: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ. AI ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ.',
    navHome: 'ಮುಖಪುಟ',
    navDisease: 'ಬೆಳೆ ರೋಗ ಪತ್ತೆ',
    navAnalytics: 'ಕೃಷಿ ವಿಶ್ಲೇಷಣೆ',
    navAssistant: 'AI ಸಹಾಯಕ',
    navKnowledge: 'ಜ್ಞಾನ ಕೇಂದ್ರ',
    navHowItWorks: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    ctaAnalyze: 'ನನ್ನ ಬೆಳೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
    ctaAssistant: 'AI ಸಹಾಯಕರನ್ನು ಕೇಳಿ',
    greetingMorning: 'ಶುಭೋದಯ, ರೈತ ಬಾಂಧವರೇ 👋',
    demoModeBadge: 'ಡೆಮೊ ಮೋಡ್',
    confidenceLabel: 'ನಿಖರತೆಯ ಸ್ಕೋರ್',
    riskLabel: 'ಅಪಾಯ ಮಟ್ಟ',
    actionPlanTitle: 'ನಿಮ್ಮ AI ಕ್ರಿಯಾ ಯೋಜನೆ',
    sourcesTitle: 'ಪಡೆದ ಕೃಷಿ ದಾಖಲೆಗಳು',
    searchPlaceholder: 'ಕೃಷಿ ಮಾಹಿತಿ ಮತ್ತು ರೋಗಗಳನ್ನು ಹುಡುಕಿ...'
  }
};
