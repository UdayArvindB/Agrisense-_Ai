# 04. Backend ML, RAG & Generative AI Pipeline

## 1. Backend Architecture Overview

The AgriSense AI backend is engineered with **Python 3.10+** and **FastAPI**, emphasizing modularity, asynchronous throughput, strict type safety via **Pydantic v2**, and clear separation of concerns across ML, vector search, and LLM services.

```
backend/
├── app/
│   ├── main.py                     # FastAPI application factory, middleware & routing
│   ├── config.py                   # Pydantic Settings management (.env loader)
│   ├── routes/
│   │   ├── disease.py              # POST /api/disease/predict (Vision ML)
│   │   ├── rag.py                  # POST /api/rag/query (Vector search)
│   │   ├── assistant.py            # POST /api/assistant/chat (Multilingual RAG chat)
│   │   ├── farm.py                 # POST /api/farm/predict-yield (Agronomic regression)
│   │   ├── speech.py               # POST /api/speech/transcribe & synthesize (Voice API)
│   │   └── health.py               # GET /api/health (System telemetry)
│   ├── services/
│   │   ├── ml_service.py           # DiseaseModel, MockDiseaseModel, RealDiseaseModel
│   │   ├── embedding_service.py    # LocalDenseEmbeddingService (1024-dim) & Transformers
│   │   ├── rag_service.py          # VectorStore, chunking, cosine search & persistence
│   │   └── llm_service.py          # Strict RAG prompting, Gemini, OpenAI & Local Synth
│   ├── schemas/                    # Pydantic v2 request & response schemas
│   ├── utils/
│   │   └── image_processing.py     # Image validation, resizing & ImageNet normalization
│   └── models/
│       └── crop_disease_model/     # PyTorch / ONNX model weights storage directory
├── knowledge/
│   ├── documents/                  # Curated agricultural reference manuals (.md)
│   └── vector_store/               # Persistent vectors.npy & metadata.json index
├── tests/                          # Automated pytest suite (10/10 tests passing)
├── requirements.txt                # Production dependencies
└── .env.example                    # Environment variable template
```

---

## 2. Machine Learning Vision Pipeline

### Image Validation & Preprocessing Pipeline (`app/utils/image_processing.py`)

Every uploaded leaf image undergoes rigorous pre-flight validation before touching the neural network:

1. **MIME Type Validation:** Restricted strictly to `image/jpeg`, `image/png`, `image/webp`. Executable scripts and corrupted binaries are rejected with HTTP 400.
2. **File Size Boundaries:** Enforces a maximum payload of **10 MB** to protect against denial-of-service memory spikes.
3. **Dimensional Checks:** Validates image resolution within $[32 \times 32]$ pixels (minimum feature resolution) and $[4096 \times 4096]$ pixels (maximum limit).
4. **Color Space Standardization:** Transcoded into 3-channel RGB, stripping unneeded alpha or CMYK channels.
5. **Bicubic Resizing:** Resampled to the standard input dimension of $[224 \times 224 \times 3]$.
6. **ImageNet Normalization:** Pixel values are converted to float32 tensors $[0.0, 1.0]$ and standardized:
   $$x_{\text{norm}} = \frac{x - \mu}{\sigma}, \quad \mu = [0.485, 0.456, 0.406], \quad \sigma = [0.229, 0.224, 0.225]$$

### Model Abstraction & Transfer Learning Architecture (`app/services/ml_service.py`)

The ML subsystem implements the Factory and Strategy patterns:

```python
class DiseaseModel(ABC):
    @abstractmethod
    def predict(self, image: Image.Image) -> DiseasePrediction:
        """Accepts a PIL Image and returns calibrated disease predictions."""
        pass
```

- **`RealDiseaseModel` (Production PyTorch):**
  - Designed for **EfficientNet-B4** or **MobileNetV3-Large** fine-tuned on the PlantVillage and FieldPlant datasets.
  - Automatically loads weights from `backend/app/models/crop_disease_model/efficientnet_agri.pth` if present.
  - Employs a Softmax output layer mapping to 38 distinct crop-disease classes.
- **`MockDiseaseModel` (Deterministic Hackathon Testbed):**
  - Provides instant, realistic diagnostic evaluation when GPU hardware or pre-trained weight files are not mounted.
  - Inspects file attributes, color histograms, and filenames (e.g., matching "tomato", "corn", "potato") to generate realistic confidence scores, risk categories, and clinical symptom descriptions.

---

## 3. Retrieval-Augmented Generation (RAG) Subsystem

### Knowledge Base Documents (`knowledge/documents/`)
The system includes 6 verified agronomic reference manuals authored from real-world extension protocols:
1. `tomato_early_blight_guide.md` (*Alternaria solani* lifecycle, chlorotic halos, copper hydroxide spray schedules)
2. `potato_late_blight_advisory.md` (*Phytophthora infestans* water-soaked lesions, metalaxyl fungicides, canopy pruning)
3. `corn_common_rust_manual.md` (*Puccinia sorghi* reddish-brown pustules, azoxystrobin fungicides, resistant hybrids)
4. `integrated_pest_management.md` (Economic injury thresholds, biological parasitoids, neem kernel extract ratios)
5. `precision_irrigation_protocols.md` (Drip scheduling, soil tensiometer thresholds, evapotranspiration rates)
6. `soil_health_regenerative.md` (Leguminous cover crops, biochar amendments, mycorrhizal inoculation)

### Document Chunking & Ingestion (`app/services/rag_service.py`)
- **Chunking Strategy:** Recursive character chunking with a target window of **500 characters** and a **100-character overlap**, ensuring complete semantic sentences and preservation of agricultural dosage instructions.
- **Metadata Tagging:** Every chunk retains its source metadata:
  ```json
  {
    "title": "Tomato Early Blight Management Guide",
    "source": "State Agricultural Extension Directorate",
    "category": "Crop Disease Management",
    "year": 2026,
    "section": "Recommended Fungicide Formulations & Cultural Controls"
  }
  ```

### Dense Embedding Engine (`app/services/embedding_service.py`)
- **`LocalDenseEmbeddingService`:**
  - A deterministic, zero-dependency 1024-dimensional dense semantic token vectorizer.
  - Utilizes 32-bit Cyclic Redundancy Check (CRC32) non-linear token projection combined with an English stopword filter.
  - Applies $L_2$-unit normalization:
    $$\hat{\mathbf{v}} = \frac{\mathbf{v}}{\|\mathbf{v}\|_2}$$
  - Enables sub-millisecond semantic retrieval entirely locally on CPU without external API dependencies.
- **`SentenceTransformerEmbeddingService`:**
  - Optional integration for Hugging Face transformer models (`all-MiniLM-L6-v2` or `all-mpnet-base-v2`).

### Persistent Local Vector Store (`app/services/rag_service.py`)
- **Storage Layout:** Serializes vectors to disk in `backend/knowledge/vector_store/vectors.npy` alongside `metadata.json`.
- **Dimension Safety:** Automatically checks stored vector matrix dimensions on startup (1024-dim), re-indexing automatically if documents have been modified.
- **Cosine Similarity Scoring:** Fast vectorized matrix multiplication:
  $$S = X_{\text{store}} \cdot \mathbf{q}$$
  Returns Top-$K$ relevant passages ranked by similarity score.

---

## 4. Grounded Generative AI Engine (`app/services/llm_service.py`)

### Strict RAG Agronomic Guardrail Prompt
To eliminate hallucinations and prevent dangerous chemical recommendations, all LLM invocations enforce this strict system instruction:

```
You are the AgriSense AI Lead Agricultural Specialist.
You must adhere strictly to the following ethical rules:

1. FACTUAL GROUNDING: Rely exclusively on the retrieved agricultural context.
2. NO HALLUCINATIONS: Do not fabricate chemical names, dosages, or unverified treatments.
3. ADMIT GAPS: If the retrieved documents do not contain sufficient evidence, explicitly state so.
4. CONFIDENCE AWARENESS: If prediction confidence is low (<60%), warn the farmer to seek lab verification.
5. STRUCTURED OUTPUT: Return responses conforming strictly to the requested JSON action plan format:
   - summary
   - immediate_actions
   - monitoring
   - prevention
   - warning
   - sources
6. CITATIONS: Include the exact document title and section for each recommended action.
7. VERNACULAR LOCALIZATION: Respond natively in the requested language (Telugu, Hindi, Tamil, Kannada, English) while preserving scientific Latin pathogen names.
```

### Multi-Engine LLM Orchestration
The backend provides automatic multi-tier fallback:
1. **Tier 1: Google Gemini 1.5 / 2.0 Flash (`google-genai` SDK):** High-speed, multimodal reasoning with 1M token context windows.
2. **Tier 2: OpenAI GPT-4o (`openai` SDK):** Precision structured JSON outputs.
3. **Tier 3: Local Grounded Multilingual Synthesizer:**
   - A deterministic, offline agronomic synthesis engine.
   - Extracts chemical ratios, organic controls, and monitoring timelines directly from retrieved RAG chunks.
   - Translates action plans natively into **Telugu, Hindi, Tamil, Kannada, and English** with zero API keys or external latency!

---

## 5. Farm Yield Prediction Engine (`app/routes/farm.py`)

Provides precision yield estimation based on environmental telemetry:
$$\hat{Y} = Y_{\text{baseline}}(\text{crop}) \times F_{\text{soil}} \times F_{\text{rain}} \times F_{\text{temp}} \times F_{\text{irrigation}} \times F_{\text{fertilizer}}$$

- **Input Features:** Crop type, soil texture (Loamy, Sandy, Clay, Alluvial), rainfall (mm), ambient temperature (°C), irrigation system (Drip, Sprinkler, Flood, Rainfed), and NPK fertilizer rate (kg/ha).
- **Output:** Predicted yield in metric tons per acre, with calibrated confidence metrics.
