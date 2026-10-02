# 03. Frontend Engineering & UI/UX Design System

## 1. Frontend Technology Stack

The AgriSense AI frontend is engineered as a startup-quality, production-ready web application built on modern, battle-tested technologies:

- **Core Framework:** [React 18](https://react.dev/) with [TypeScript 5](https://www.typescriptlang.org/) for type-safe component development.
- **Build Tool:** [Vite 5](https://vitejs.dev/) providing sub-second Hot Module Replacement (HMR) and optimized Rollup production bundling.
- **Styling & CSS:** [Tailwind CSS 3](https://tailwindcss.com/) with a bespoke design system token set, custom color utilities, and modern glassmorphic backdrops.
- **Icons:** [Lucide React](https://lucide.dev/) for crisp, scalable agricultural and technological iconography.
- **Motion & Transitions:** [Framer Motion](https://www.framer.com/motion/) for fluid page transitions, interactive hover lifts, and the leaf-scanning laser animation.
- **Data Visualizations:** [Recharts](https://recharts.org/) for responsive, hardware-accelerated time-series and agronomic distribution charts.
- **Routing:** [React Router v6](https://reactrouter.com/) for declarative client-side navigation with scroll restoration.

---

## 2. Visual Design Philosophy & Color Palette

AgriSense AI eschews generic dashboard templates in favor of a refined, nature-inspired modern SaaS aesthetic:

```
  Primary Emerald      Deep Forest         Golden Amber         Dark Charcoal        Clean Canvas
     #10B981             #064E3B              #F59E0B              #0F172A             #F8FAFC
   (Growth / AI)       (Authority / Ag)     (Risk / Warning)    (High-Contrast Text)  (Modern Backdrop)
```

- **Nature-Inspired Palette:** Harmonious emeralds and deep evergreen tones evoke organic agricultural vitality, balanced with dark charcoal typography to guarantee maximum outdoor contrast in direct sunlight.
- **Visual Depth & Glassmorphism:** Subtle background blurs (`backdrop-blur-md`), micro-borders (`border-emerald-100`), and layered drop shadows (`shadow-sm`, `shadow-xl`) create a tactile sense of depth.
- **Zero Placeholder Polish:** Every section is populated with realistic agronomic telemetry, scientific pathogen names (*Alternaria solani*, *Phytophthora infestans*), and validated agronomic metrics.

---

## 3. Page-by-Page Feature Matrix & UX Workflows

### 1. Home Page (`/`)
- **Interactive Scanning Hero:** A live preview of a tomato leaf scanned by an animated neon-green laser bar, communicating the AI vision capability instantly.
- **Problem Statement Grid:** Highlights the $220B annual crop loss, pesticide overuse, and extension officer shortages with clear quantitative metrics.
- **Triad Pipeline Visualizer:** Interactive cards illustrating the distinct roles of Machine Learning, Vector RAG, and Grounded GenAI.
- **4-Step Farmer Journey:** Intuitive visual roadmap (Snap Leaf $\rightarrow$ Rapid Analysis $\rightarrow$ RAG Verification $\rightarrow$ Actionable Plan).
- **Social Proof & Impact Metrics:** Displays simulated field metrics: 94.2% diagnostic accuracy, 12,400+ farmers assisted, 35% average chemical savings.

### 2. Disease Detection Lab (`/disease-detection`)
The central showcase of the application:
- **Dual Input Modes:** Drag-and-drop file upload with format validation, plus a simulated real-time camera viewfinder with a capture shutter.
- **Benchmark Presets:** 4 instant test chips for rapid hackathon judge demonstrations:
  - 🍅 *Tomato Early Blight* (High Confidence 91%)
  - 🥔 *Potato Late Blight* (High Confidence 94%)
  - 🌽 *Corn Common Rust* (High Confidence 88%)
  - 🌿 *Healthy Soybean* (Healthy Reference 97%)
- **Live 5-Stage Pipeline Stepper:** Animates each step of execution in real time:
  1. *Uploading image...*
  2. *Running ML inference...*
  3. *Disease classified: Early Blight (91%)*
  4. *Querying vector store for agronomic literature...*
  5. *Synthesizing personalized multilingual action plan...*
- **Calibrated Confidence Meter:** Radial gauge displaying the exact percentage with color-coded safety boundaries (Green: $\ge 75\%$, Amber: $60-74\%$, Red: $<60\%$).
- **RAG Evidence Drawer:** Interactive cards listing retrieved document titles, publication year, section names, and similarity percentages. Clicking **"View Source"** opens `SourceDetailModal.tsx` showing the raw verified scientific text chunk.
- **Structured Action Plan:** Displays distinct, prioritized columns:
  - 🚨 **Immediate Actions:** Emergency containment steps (e.g., pruning infected foliage, burning diseased debris).
  - 👁️ **Monitoring Schedule:** 48-72 hour foliar observation guidelines.
  - 🛡️ **Long-Term Prevention:** Drip irrigation adjustments, crop rotation, and copper fungicide schedules.
- **Contextual Follow-up Chat:** A one-click button opening a targeted conversation pre-populated with the diagnosed disease context.

### 3. Farm Analytics & Yield Predictor (`/farm-analytics`)
- **4 Key Performance Indicator (KPI) Cards:**
  - *Crop Health Index (NDVI):* 84% (+3.2% vs last week)
  - *Yield Forecast:* 4.2 tons/acre (92% confidence)
  - *Active Pathogen Threats:* 2 flagged zones
  - *Soil Moisture Level:* 68% (Optimal field capacity)
- **Recharts Data Visualizations:**
  - **Foliar Health Trend:** Area chart plotting NDVI vigor indices across a 30-day timeline.
  - **Yield Comparison:** Bar chart comparing current projected yields against historical regional averages.
  - **Pathogen Risk Distribution:** Radar/Bar chart categorizing vulnerability across Tomato, Corn, Potato, and Cotton.
  - **Acreage Allocation:** Donut chart breaking down field parcels by crop type.
- **Interactive ML Yield Predictor:** A live form allowing farmers to input crop type, soil type, rainfall, temperature, irrigation method, and fertilizer rates to calculate predicted yield in metric tons.

### 4. AI Agronomist Chat (`/ai-assistant`)
- **Conversational Interface:** Real-time conversational interface with speech balloon styling and responsive scroll-to-bottom behavior.
- **Source Citation Chips:** Every assistant reply containing RAG information renders clickable source badges beneath the message.
- **Simulated Voice Transcription:** An animated audio wave frequency bar simulates microphone speech-to-text input.
- **Multilingual Support:** Instant query translation in Telugu (*టమోటా ఆకులపై మచ్చలు*), Hindi (*टमाटर के पत्तों पर काले धब्बे*), Tamil, Kannada, and English.

### 5. Agricultural Knowledge Base (`/knowledge`)
- **8 Agronomic Categories:** Crop Diseases, Integrated Pest Management, Precision Irrigation, Soil Health, Organic Fertilizers, Post-Harvest Handling, Climate Resilience, and Equipment Maintenance.
- **Real-Time Text Search:** Instantly filters documents by keyword, pathogen species, or crop name.
- **Full Document Modal Viewer:** Clicking any card opens `DocumentViewerModal.tsx` rendering formatted scientific guides, preventative spray ratios, and citations.

### 6. System Architecture & "How It Works" (`/how-it-works`)
- Dedicated transparency page explaining the technical distinction between ML classification, Vector RAG, and GenAI synthesis.
- Displays performance metrics: Average ML latency (210ms), RAG vector search (45ms), LLM synthesis (1.2s).

### 7. Farmer Dashboard (`/dashboard`)
- Executive overview summarizing current weather conditions, critical frost/rain warnings, soil sensor feeds, and an audit table of recent leaf scans.

### 8. Diagnostic Reports Generator (`/reports`)
- One-click comprehensive agronomic report generator featuring a confetti celebratory trigger and instant `.txt` / printable download.

### 9. System Settings & Customization (`/settings`)
- Regional language selector with persistent local storage.
- Safety confidence threshold slider (default 60%).
- API server connectivity status indicator with automatic fallback toggle.

---

## 4. Frontend Component Architecture Directory

```
src/
├── components/
│   ├── analytics/        # Metric cards, Recharts plots & Yield Predictor Form
│   ├── chat/             # ChatMessage, ChatInput, AudioWaveVisualizer, SourceBadge
│   ├── common/           # Navbar, Footer, LanguageSelector, AlertBanner, Badges
│   ├── dashboard/        # FarmOverviewCard, ActiveAlertsCard, RecentHistoryTable
│   ├── disease/          # ImageUploader, CameraCapture, Stepper, ConfidenceMeter, 
│   │                     # RagEvidencePanel, SourceDetailModal, AiRecommendationPlan
│   ├── home/             # HeroSection, ProblemSection, SolutionPipeline, ImpactMetrics
│   └── knowledge/        # CategoryChips, DocumentSearchInput, DocumentCard, ViewerModal
├── context/              # LanguageContext & AppConfigContext
├── data/                 # Benchmark mock samples, knowledge docs & demo datasets
├── pages/                # 9 primary top-level route pages
├── services/
│   └── api.ts            # Centralized API bridge connecting to FastAPI backend
└── types/                # TypeScript interfaces for Disease, RAG, ActionPlan & Analytics
```

---

## 5. Resilient API Integration Bridge (`src/services/api.ts`)

The frontend features a dual-mode communication bridge:
- **Live Mode:** Dispatches asynchronous `fetch()` HTTP requests to the FastAPI backend at `http://localhost:8000/api`.
- **Graceful Fallback Mode:** If the backend is offline or an API request encounters a network partition, the frontend seamlessly falls back to high-fidelity local agronomic data without throwing unhandled exceptions or crashing the user interface.
