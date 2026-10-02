# 05. API Reference & Endpoint Specifications

## 1. Overview & Base URLs

AgriSense AI exposes a high-performance RESTful API adhering strictly to OpenAPI 3.0 standards.

- **Base URL:** `http://localhost:8000/api`
- **Interactive Swagger UI:** [`http://localhost:8000/docs`](http://localhost:8000/docs)
- **Alternative ReDoc UI:** [`http://localhost:8000/redoc`](http://localhost:8000/redoc)
- **JSON Schema:** [`http://localhost:8000/openapi.json`](http://localhost:8000/openapi.json)

---

## 2. Endpoints Summary Table

| Method | Endpoint | Description | Content-Type |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | System telemetry & service readiness | `application/json` |
| `POST` | `/api/disease/predict` | Computer Vision crop disease inference | `multipart/form-data` |
| `POST` | `/api/rag/query` | Semantic vector search over agronomic literature | `application/json` |
| `POST` | `/api/ai/recommend` | Synthesizes grounded, structured action plan | `application/json` |
| `POST` | `/api/assistant/chat` | Multilingual conversational RAG assistant | `application/json` |
| `POST` | `/api/farm/predict-yield` | Agronomic ML crop yield estimation | `application/json` |
| `POST` | `/api/speech/transcribe` | Converts farmer audio speech to text | `multipart/form-data` |
| `POST` | `/api/speech/synthesize` | Generates audio voice stream from text | `application/json` |

---

## 3. Detailed Endpoint Specifications

### 1. System Health Check
**`GET /api/health`**

Returns operational status across all backend subcomponents. Never exposes secret keys.

#### Response (200 OK)
```json
{
  "status": "healthy",
  "ml_service": "available",
  "rag_service": "available",
  "llm_service": "configured",
  "version": "1.0.0"
}
```

---

### 2. Disease Detection ML Inference
**`POST /api/disease/predict`**

Accepts an uploaded image file, applies ImageNet preprocessing, and executes classification.

#### Request Parameters
- `image` *(UploadFile, Required)*: Binary image file (`image/jpeg`, `image/png`, or `image/webp`). Max size: 10 MB.

#### Response (200 OK)
```json
{
  "disease": "Early Blight",
  "crop": "Tomato",
  "confidence": 0.91,
  "risk_level": "Moderate",
  "symptoms": [
    "Dark brown to black concentric circular rings (target spots)",
    "Yellow chlorotic halos surrounding lesions on lower foliage",
    "Progressive upward foliar defoliation",
    "Collar rot lesions near the base of young stems"
  ]
}
```

#### Error Response (400 Bad Request)
```json
{
  "detail": "Invalid file format: text/plain. Only JPEG, PNG, and WebP are supported."
}
```

---

### 3. Agricultural Vector RAG Query
**`POST /api/rag/query`**

Generates a 1024-dimensional dense query vector and performs cosine similarity search over persistent vector stores.

#### Request Body
```json
{
  "query": "What are the recommended management practices for tomato early blight?",
  "top_k": 3
}
```

#### Response (200 OK)
```json
{
  "answer_context": "Recommended fungicide formulations include Copper Hydroxide (2.5 g/L) and Chlorothalonil applied at first sign of target spots. Cultural management requires staking plants, drip irrigation to prevent foliar splashing, and a 3-year solanaceous crop rotation.",
  "sources": [
    {
      "title": "Tomato Early Blight (Alternaria solani) Comprehensive Management Guide",
      "section": "Chemical Control & Fungicide Formulations",
      "relevance_score": 0.912,
      "text": "Upon first detection of circular brown spots with concentric rings, spray Copper Hydroxide 77% WP @ 2.5 g/L or Mancozeb 75% WP @ 2.0 g/L at 7 to 10 day intervals...",
      "category": "Crop Disease Management",
      "year": 2026
    }
  ]
}
```

---

### 4. Grounded AI Action Plan Recommendation
**`POST /api/ai/recommend`**

Passes the ML disease prediction and retrieved RAG context through strict agronomic guardrails to generate a structured action plan.

#### Request Body
```json
{
  "crop": "Tomato",
  "prediction": "Early Blight",
  "confidence": 0.91,
  "retrieved_context": [
    "Copper Hydroxide 77% WP applied @ 2.5g/L water at 7-10 day intervals.",
    "Remove lower 30cm foliage to improve air circulation and prevent soil splash."
  ],
  "language": "English"
}
```

#### Response (200 OK)
```json
{
  "summary": "Early Blight detected on Tomato foliage with high confidence (91%). Fungal pathogen Alternaria solani confirmed by concentric target lesions.",
  "immediate_actions": [
    "Prune and safely burn or bury all infected lower leaves showing concentric rings.",
    "Apply Copper Hydroxide 77% WP @ 2.5g/L of water to healthy leaves to inhibit spore spread."
  ],
  "monitoring": [
    "Inspect upper canopy every 48 hours for new target lesions.",
    "Check stem collars for dark sunken cankers after morning dew."
  ],
  "prevention": [
    "Transition to drip irrigation to prevent foliar wetness.",
    "Implement a 3-year crop rotation avoiding potato, pepper, or eggplant."
  ],
  "warning": "Do not compost infected foliage as fungal spores survive in soil for over 12 months.",
  "sources": [
    "Tomato Early Blight Comprehensive Management Guide (Section: Chemical Control)"
  ]
}
```

---

### 5. Multilingual AI Assistant Chat
**`POST /api/assistant/chat`**

Conversational agronomic assistant retrieving RAG context dynamically and responding natively in regional languages.

#### Request Body (Telugu Query Example)
```json
{
  "query": "నా టమోటా ఆకులపై నల్లటి మచ్చలు ఉన్నాయి, నేను ఏమి చేయాలి?",
  "history": [],
  "language": "Telugu"
}
```

#### Response (200 OK)
```json
{
  "response": "మీ టమోటా పంటపై కనిపిస్తున్న నల్లటి వలయాల మచ్చలు ముందస్తు తెగులు (Early Blight) లక్షణాలు కావచ్చు. \n\nవెంటనే చేయవలసిన పనులు:\n1. సోకిన కింది ఆకులను వెంటనే తుంచి నాశనం చేయండి.\n2. కాపర్ హైడ్రాక్సైడ్ (Copper Hydroxide) 2.5 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి.\n3. ఆకులపై నీరు పడకుండా డ్రిప్ పద్ధతి ద్వారా మాత్రమే నీరందించండి.",
  "sources": [
    {
      "title": "టమోటా ఎర్లీ బ్లైట్ నివారణ మార్గదర్శకాలు",
      "section": "రసాయన మరియు సేంద్రీయ యాజమాన్యం",
      "relevance_score": 0.89
    }
  ],
  "suggested_followups": [
    "పిచికారీ చేయడానికి సరైన సమయం ఏది?",
    "సేంద్రీయ వేప నూనెను ఎలా ఉపయోగించాలి?"
  ]
}
```

---

### 6. Farm Yield Prediction
**`POST /api/farm/predict-yield`**

Calculates predicted crop yield using environmental and agronomic input parameters.

#### Request Body
```json
{
  "crop": "Tomato",
  "soil_type": "Loamy",
  "rainfall": 720,
  "temperature": 27.5,
  "irrigation": "Drip",
  "fertilizer": 120
}
```

#### Response (200 OK)
```json
{
  "predicted_yield": 4.35,
  "unit": "tons/acre",
  "confidence": 0.88,
  "baseline_yield": 3.8,
  "limiting_factor": "Optimal irrigation and loamy soil boost potential yield by +14.5%."
}
```

---

### 7. Voice Speech-to-Text & Text-to-Speech
**`POST /api/speech/transcribe`**
- Ingests audio streams (`.wav`, `.mp3`) and returns recognized text.

**`POST /api/speech/synthesize`**
- Converts translated action plans into audio streams for low-literacy farmers.
