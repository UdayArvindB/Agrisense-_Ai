import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AnalysisProvider } from './context/AnalysisContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { DiseaseDetectionPage } from './pages/DiseaseDetectionPage';
import { FarmAnalyticsPage } from './pages/FarmAnalyticsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { KnowledgeHubPage } from './pages/KnowledgeHubPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { DashboardPage } from './pages/DashboardPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <LanguageProvider>
      <AnalysisProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/disease-detection" element={<DiseaseDetectionPage />} />
                <Route path="/farm-analytics" element={<FarmAnalyticsPage />} />
                <Route path="/ai-assistant" element={<AIAssistantPage />} />
                <Route path="/knowledge" element={<KnowledgeHubPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AnalysisProvider>
    </LanguageProvider>
  );
}

export default App;
