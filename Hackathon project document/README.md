# 🌿 AgriSense AI — Hackathon Project Documentation Hub

Welcome to the official documentation package for **AgriSense AI: Smarter Farming. Powered by AI.**

This documentation suite is organized for hackathon evaluators, technical judges, software engineers, and agronomic domain experts to review the system architecture, product vision, technical implementation, and live demonstration workflows.

---

## 📑 Documentation Index

| Document | Description | Target Audience |
| :--- | :--- | :--- |
| [**01. Executive Summary & Product Vision**](./01_EXECUTIVE_SUMMARY_AND_VISION.md) | Problem statement, target personas, value proposition, and market impact. | Judges, Mentors, Evaluators |
| [**02. System Architecture & Data Flow**](./02_SYSTEM_ARCHITECTURE_AND_DATA_FLOW.md) | The Triad Pipeline (ML + RAG + GenAI), data topologies, and safety guardrails. | Technical Judges, System Architects |
| [**03. Frontend Engineering & UI/UX**](./03_FRONTEND_ENGINEERING_AND_UI_UX.md) | React 18, TypeScript, Tailwind CSS, components, state management, and accessibility. | Frontend Evaluators, Designers |
| [**04. Backend ML, RAG & GenAI Pipeline**](./04_BACKEND_ML_RAG_GENAI_PIPELINE.md) | FastAPI, PyTorch model abstraction, custom Vector Store, dense embeddings, and LLM grounding. | AI/ML Engineers, Backend Evaluators |
| [**05. API Reference & Endpoint Specifications**](./05_API_DOCUMENTATION_AND_ENDPOINTS.md) | Complete OpenAPI/REST specifications with sample request and response payloads. | API Consumers, Integrators |
| [**06. Hackathon Pitch & Live Demo Script**](./06_HACKATHON_DEMO_SCRIPT_AND_PITCH.md) | 3-minute judging pitch, click-by-click live demo walkthrough, and Q&A defense answers. | Presentation Team, Live Evaluators |
| [**07. Setup, Deployment & Testing Guide**](./07_SETUP_DEPLOYMENT_AND_TESTING_GUIDE.md) | Step-by-step instructions to install, configure, run, and test both frontend and backend. | Reviewers, Technical Evaluators |
| [**Master Document: Complete Project Documentation**](./COMPLETE_PROJECT_DOCUMENTATION.md) | Monolithic all-in-one document containing the complete documentation for export to PDF or single-file review. | Hackathon Submission Portals |

---

## 🚀 Quick Verification Links

When running the project locally:
- **Frontend Web Application:** [`http://localhost:3000`](http://localhost:3000)
- **Backend FastAPI Server:** [`http://localhost:8000`](http://localhost:8000)
- **Interactive Swagger API Docs:** [`http://localhost:8000/docs`](http://localhost:8000/docs)
- **Backend Health Check:** [`http://localhost:8000/api/health`](http://localhost:8000/api/health)

---

## 🌟 The Core Innovation: The Triad Pipeline

```
  ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
  │  1. ML VISION   │       │  2. VECTOR RAG  │       │   3. GENAI      │
  │ Disease Detect  ├──────►│ Trusted Ag Docs ├──────►│ Action Plan     │
  │ "What is this?" │       │ "Why/Evidence?" │       │ "What to do?"   │
  └─────────────────┘       └─────────────────┘       └─────────────────┘
```

1. **Machine Learning (Computer Vision):** Accurately diagnoses crop leaf pathogens from raw image uploads with calibrated confidence scoring.
2. **Retrieval-Augmented Generation (RAG):** Dynamically retrieves verified, peer-reviewed agronomic management guides from a persistent local vector database.
3. **Generative AI (Evidence Grounding):** Synthesizes a structured, personalized action plan strictly grounded in retrieved evidence—preventing hallucinations and communicating in native regional languages (Telugu, Hindi, Tamil, Kannada, English).
