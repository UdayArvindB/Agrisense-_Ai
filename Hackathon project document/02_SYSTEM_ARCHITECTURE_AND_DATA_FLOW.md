# 02. System Architecture & Data Flow

## 1. High-Level Architectural Topology

AgriSense AI adopts a modern, decoupled microservices-ready architecture consisting of:
1. **Presentation Layer (Client):** Responsive Single-Page Application (SPA) built with React 18, TypeScript, Tailwind CSS, Vite, Framer Motion, and Recharts.
2. **Application Gateway & API Layer:** Python 3.10+ FastAPI framework with asynchronous non-blocking event loops, Pydantic v2 data validation schemas, and automated OpenAPI (Swagger) generation.
3. **Machine Learning Vision Engine:** Modular computer vision classification pipeline supporting transfer learning architectures (EfficientNet-B4 / MobileNetV3) with an abstract `DiseaseModel` interface supporting real PyTorch weights and deterministic mock test beds.
4. **Vector Retrieval-Augmented Generation (RAG) Subsystem:** In-memory and disk-persisted vector store utilizing 1024-dimensional dense semantic token embeddings with cosine similarity matching and agricultural document chunks.
5. **Generative AI Grounding Engine:** Multilingual reasoning service orchestrating Google Gemini 1.5/2.0 Flash, OpenAI GPT-4o, and an intelligent zero-external-API fallback rule synthesizer with strict agronomic safety guardrails.

---

## 2. End-to-End System Architecture Diagram

```mermaid
graph TB
    subgraph Client ["Client Presentation Tier (React 18 + Vite)"]
        UI["Modern Web Application (Port 3000)"]
        Upload["Leaf Upload / Camera Capture"]
        Stepper["5-Stage Pipeline Stepper"]
        Evidence["RAG Source Evidence Drawer"]
        ActionPlan["AI Action Plan (Immediate, Monitor, Prevent)"]
        Analytics["Interactive Recharts Analytics & KPI Cards"]
    end

    subgraph Gateway ["API & Application Gateway (FastAPI - Port 8000)"]
        Router["FastAPI Central Router (/api)"]
        CORS["CORS & Request Sanitizer"]
        Health["Health Check & Telemetry (/api/health)"]
    end

    subgraph ML_Subsystem ["Machine Learning Vision Pipeline"]
        Preprocess["Image Preprocessor (Resize 224x224, ImageNet Normalization)"]
        ModelInterface["DiseaseModel Abstract Interface"]
        MockModel["MockDiseaseModel (Deterministic Benchmarks)"]
        RealModel["RealDiseaseModel (PyTorch EfficientNet-B4)"]
        ConfidenceCheck{"Confidence >= 0.60?"}
        LowConfNotice["Low Confidence Warning (<60%)"]
    end

    subgraph RAG_Subsystem ["Knowledge Ingestion & Vector RAG"]
        DocIngest["Markdown / PDF / TXT Ingestion"]
        Chunker["Recursive Character Chunker (500 tokens, 100 overlap)"]
        Embedder["EmbeddingService (1024-dim CRC32 Dense Embeddings)"]
        VectorDB["Local Persistent Vector Store (vectors.npy + metadata.json)"]
        QueryEngine["Semantic Query Engine & Cosine Scorer"]
    end

    subgraph GenAI_Subsystem ["Grounded Generative AI Engine"]
        PromptEngine["Strict RAG Agronomic Guardrail Prompt"]
        LLMOrchestrator["LlmService Orchestrator"]
        GeminiAPI["Google Gemini 1.5/2.0 API"]
        OpenAIAPI["OpenAI GPT-4o API"]
        LocalSynth["Multilingual Grounded Rule-Based Synthesizer"]
        LanguageFilter["Vernacular Localization (Telugu, Hindi, Tamil, Kannada)"]
    end

    %% Connections
    Upload -->|multipart/form-data| Router
    Router -->|POST /api/disease/predict| Preprocess
    Preprocess --> ModelInterface
    ModelInterface -.-> RealModel
    ModelInterface -.-> MockModel
    MockModel --> ConfidenceCheck
    RealModel --> ConfidenceCheck

    ConfidenceCheck -- No --> LowConfNotice --> UI
    ConfidenceCheck -- Yes --> Router

    Router -->|POST /api/rag/query| QueryEngine
    QueryEngine --> Embedder
    Embedder --> VectorDB
    VectorDB -->|Top-K Chunks + Source Metadata| QueryEngine
    QueryEngine --> Router

    Router -->|POST /api/ai/recommend| LLMOrchestrator
    LLMOrchestrator --> PromptEngine
    PromptEngine --> GeminiAPI
    PromptEngine --> OpenAIAPI
    PromptEngine --> LocalSynth
    GeminiAPI --> LanguageFilter
    OpenAIAPI --> LanguageFilter
    LocalSynth --> LanguageFilter

    LanguageFilter --> ActionPlan
    QueryEngine --> Evidence
    Router --> Stepper
```

---

## 3. Step-by-Step Data Flow Sequence

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as Farmer / Extension Worker
    participant Frontend as React Frontend UI
    participant Backend as FastAPI Gateway
    participant ML as ML Vision Service
    participant RAG as Vector RAG Service
    participant LLM as Grounded GenAI Service

    Farmer->>Frontend: Selects/Uploads Leaf Image (e.g., Tomato)
    Frontend->>Frontend: Validates MIME type & dimensions
    Frontend->>Frontend: Starts Stepper: Stage 1 (Uploading...)
    
    Frontend->>Backend: POST /api/disease/predict (multipart/form-data)
    Backend->>ML: Image Preprocessing (224x224 RGB, ImageNet Norm)
    ML->>ML: Forward Pass (EfficientNet-B4 / Mock Classifier)
    ML-->>Backend: {disease: "Early Blight", confidence: 0.91, risk_level: "Moderate", symptoms: [...]}
    Backend-->>Frontend: 200 OK (ML Results)
    
    Frontend->>Frontend: Updates Stepper: Stage 2 & 3 Complete
    Frontend->>Frontend: Formulates RAG Query ("Tomato Early Blight management prevention")
    
    Frontend->>Backend: POST /api/rag/query {query, top_k: 4}
    Backend->>RAG: Generate 1024-dim Query Vector
    RAG->>RAG: Cosine Similarity Scan over persistent vector_store
    RAG-->>Backend: {answer_context, sources: [{title, section, relevance_score, text}]}
    Backend-->>Frontend: 200 OK (Retrieved Sources)
    
    Frontend->>Frontend: Updates Stepper: Stage 4 (Knowledge Retrieved)
    Frontend->>Frontend: Renders RAG Evidence Cards with Source Badges
    
    Frontend->>Backend: POST /api/ai/recommend {crop, prediction, confidence, retrieved_context, language}
    Backend->>LLM: Injects Strict RAG System Prompt + Evidence Context
    LLM->>LLM: Synthesizes Action Plan (Immediate, Monitoring, Prevention)
    LLM-->>Backend: {summary, immediate_actions, monitoring, prevention, warning, sources}
    Backend-->>Frontend: 200 OK (Structured Recommendation)
    
    Frontend->>Frontend: Updates Stepper: Stage 5 Complete (Action Plan Ready)
    Frontend->>Farmer: Displays Action Plan, Confidence Gauge & "View Source" Modal
```

---

## 4. Architectural Deep Dive: The Triad Modules

### Module 1: The Machine Learning Classifier
- **Image Pipeline:** Ingested images are checked against size thresholds (max 10 MB) and dimension bounds ($32 \times 32$ to $4096 \times 4096$ pixels).
- **Tensor Conversion:** Transformed into 3-channel RGB float32 arrays and normalized against ImageNet standards:
  $$\mu = [0.485, 0.456, 0.406], \quad \sigma = [0.229, 0.224, 0.225]$$
- **Inference Abstraction:**
  ```python
  class DiseaseModel(ABC):
      @abstractmethod
      def predict(self, image: Image.Image) -> DiseasePrediction:
          pass
  ```
  This cleanly decouples inference logic from storage, enabling drop-in replacement with PyTorch or ONNX models without modifying API routes.

### Module 2: The Vector RAG Subsystem
- **Knowledge Base Storage:** Ingestion documents are stored under `backend/knowledge/documents/` as human-readable Markdown and text guides covering:
  - *Tomato Early Blight (Alternaria solani)*
  - *Potato Late Blight (Phytophthora infestans)*
  - *Corn Common Rust (Puccinia sorghi)*
  - *Integrated Pest Management & Biopesticides*
  - *Precision Drip Irrigation Protocols*
  - *Soil Health & Regenerative Agriculture*
- **Vector Storage:** Chunks and embeddings are indexed in `backend/knowledge/vector_store/` using two files:
  - `vectors.npy`: A contiguous NumPy float32 matrix of dimension $(N \times 1024)$.
  - `metadata.json`: Chunk textual content, document title, section heading, category, and publication year.
- **Cosine Similarity:** Scored via normalized dot products:
  $$\text{Similarity}(u, v) = \frac{u \cdot v}{\|u\|_2 \|v\|_2}$$

### Module 3: Strict Grounding & Ethical GenAI
The generative AI layer enforces prompt-level and code-level constraints:
1. **Primary Grounding Rule:** All chemical remedies and organic dosages must originate from retrieved text chunks. If the retrieved context contains no data on a requested pathogen, the model returns a transparent negative disclosure.
2. **Confidence-Aware Phrasing:** For predictions below 70%, the LLM qualifies all statements with probabilistic phrases (e.g., *"Symptoms indicate potential susceptibility to..."*) rather than declarative certainty.
3. **Safety Disclaimer:** Every generated response appends a standardized statutory advisory:
   > *"Disclaimer: AgriSense AI is an assistive decision-support tool, not a certified agronomic laboratory diagnosis. For severe infestations, verify with a local agricultural extension officer."*
