# 07. Setup, Deployment & Testing Guide

## 1. System Prerequisites

Before running the AgriSense AI platform, ensure your local development machine meets these requirements:

- **Operating System:** Windows 10/11, macOS 12+, or Ubuntu 20.04+
- **Node.js:** v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **Python:** v3.10, v3.11, or v3.12 ([Download Python](https://www.python.org/))
- **Package Managers:** `npm` (bundled with Node) and `pip`
- **Modern Web Browser:** Google Chrome, Microsoft Edge, Brave, or Mozilla Firefox

---

## 2. Quick Start Guide (Run in 2 Minutes)

Open two separate terminal windows for the frontend and backend.

### Terminal 1: Backend Setup & Launch (FastAPI)
```bash
# 1. Navigate to the backend directory
cd backend

# 2. (Optional but recommended) Create and activate a virtual environment
python -m venv venv

# On Windows PowerShell / Command Prompt:
.\venv\Scripts\activate
# On Linux / macOS:
# source venv/bin/activate

# 3. Install backend dependencies
pip install -r requirements.txt

# 4. Copy environment configuration
cp .env.example .env

# 5. Launch the FastAPI Uvicorn server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
✅ **Backend API running at:** `http://localhost:8000`  
✅ **Interactive Swagger docs at:** `http://localhost:8000/docs`

---

### Terminal 2: Frontend Setup & Launch (React + Vite)
```bash
# 1. Ensure you are in the project root directory
cd d:\gen_ai_workshop

# 2. Install Node packages
npm install

# 3. Launch Vite development server
npm run dev
```
✅ **Frontend Web UI running at:** `http://localhost:3000`

---

## 3. Environment Variables Configuration (`backend/.env`)

Create a `.env` file inside the `backend/` directory by copying `.env.example`:

```env
# Application Host & Port
APP_ENV=development
HOST=0.0.0.0
PORT=8000

# Machine Learning Configuration
# Options: 'mock' (instant deterministic testbed) or 'torch' (loads PyTorch weights)
ML_MODEL_TYPE=mock
ML_MODEL_PATH=app/models/crop_disease_model/efficientnet_agri.pth
CONFIDENCE_THRESHOLD=0.60

# Vector RAG Configuration
# Options: 'local_dense' (zero-dependency 1024-dim CRC32) or 'sentence_transformers'
EMBEDDING_PROVIDER=local_dense
VECTOR_DB_PATH=knowledge/vector_store
KNOWLEDGE_DOCS_PATH=knowledge/documents

# Generative AI Configuration
# Options: 'auto', 'gemini', 'openai', or 'rule_based'
LLM_PROVIDER=auto
GEMINI_API_KEY=
OPENAI_API_KEY=
LLM_MODEL=gemini-1.5-flash
```

> **Zero-API-Key Hackathon Mode:**  
> If you leave `GEMINI_API_KEY` and `OPENAI_API_KEY` empty, AgriSense AI **automatically switches to its built-in Multilingual Grounded Synthesis Engine**. It will process RAG context, formulate action plans, and translate into Telugu, Hindi, Tamil, Kannada, and English with **zero cloud dependencies and zero cost**!

---

## 4. Running Automated Tests

The backend includes a comprehensive automated test suite verifying ML preprocessing, RAG vector retrieval, LLM grounding, and API schemas.

To run the test suite:
```bash
cd backend
python -m pytest tests/ -v
```

### Automated Test Coverage Breakdown:
1. `test_health_endpoint`: Asserts that `GET /api/health` returns HTTP 200 and healthy subsystems.
2. `test_disease_predict_valid_image`: Asserts that a synthetic leaf image returns valid disease predictions and confidence scores.
3. `test_disease_predict_invalid_mime`: Asserts that uploading a `.txt` file is rejected with HTTP 400.
4. `test_disease_predict_oversized_file`: Asserts that files exceeding 10 MB are rejected.
5. `test_rag_query_retrieves_documents`: Queries for "Early Blight" and confirms relevant agricultural sources are returned.
6. `test_rag_query_empty_knowledge`: Validates graceful fallback when querying unseen terms.
7. `test_ai_recommend_structured_output`: Confirms that the LLM response contains `summary`, `immediate_actions`, `monitoring`, `prevention`, and `sources`.
8. `test_ai_recommend_low_confidence_warning`: Asserts that predictions below 60% trigger caution advisories.
9. `test_farm_predict_yield`: Verifies the agronomic regression yield calculation.
10. `test_multilingual_assistant_chat`: Validates query processing in Telugu and Hindi.

---

## 5. Production Docker Deployment

A production-ready `Dockerfile` and `docker-compose.yml` can be deployed with a single command:

```bash
docker-compose up --build -d
```

### Sample `docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - APP_ENV=production
      - ML_MODEL_TYPE=mock
      - EMBEDDING_PROVIDER=local_dense
    volumes:
      - ./backend/knowledge:/app/knowledge

  frontend:
    build: .
    ports:
      - "3000:80"
    depends_on:
      - backend
```

---

## 6. Common Gotchas & Troubleshooting

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| **Port 8000 already in use** | A previous Python/Uvicorn process is still bound to port 8000. | In PowerShell run: `Get-Process python \| Stop-Process -Force` or specify another port: `--port 8001`. |
| **Port 3000 already in use** | Vite defaulted to 3001 or 5173. | Check the terminal output from `npm run dev` to see the assigned port, or kill existing Node processes. |
| **CORS error in browser console** | Frontend origin not whitelisted in `backend/app/main.py`. | Origins `http://localhost:3000`, `http://127.0.0.1:3000` are already whitelisted by default. Ensure request URL matches. |
| **Vector dimension mismatch error** | An old `vectors.npy` was generated with a different embedding dimension. | Delete `backend/knowledge/vector_store/vectors.npy` and restart the backend. The service will auto-reindex. |
| **Image upload fails with 400** | Uploaded file is corrupt or not in JPEG/PNG/WebP format. | Test using the preset benchmark chips (e.g., "Tomato Early Blight") on the `/disease-detection` page. |
