import sys
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routes import (
    disease_router,
    rag_router,
    assistant_router,
    farm_router,
    speech_router,
    health_router,
)
from .services.rag_service import get_rag_service

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ingest knowledge documents into Vector Store if not already indexed
    rag = get_rag_service()
    if len(rag.vector_store.metadata) == 0:
        print("[Startup] Indexing knowledge documents into vector database...")
        rag.ingest_documents()
    else:
        print(f"[Startup] Found {len(rag.vector_store.metadata)} cached document vectors.")
    print(f"[Startup] AgriSense AI Backend running on port {settings.PORT} in {settings.ENVIRONMENT} mode.")
    yield
    print("[Shutdown] AgriSense AI Backend shutting down.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="""
# 🌱 AgriSense AI — Backend API
### Machine Learning + RAG + Generative AI for Precision Agriculture

Core Pipeline:
1. **Machine Learning**: Foliar image classification (EfficientNet-B4 / MobileNet)
2. **RAG Vector Search**: Dense semantic search over peer-reviewed extension manuals (FAISS / Local Vector Store)
3. **Generative AI**: Strict evidence-grounded action plans in English, Telugu, Hindi, Tamil, and Kannada.
    """,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(disease_router)
app.include_router(rag_router)
app.include_router(assistant_router)
app.include_router(farm_router)
app.include_router(speech_router)
app.include_router(health_router)

@app.get("/", tags=["Root"])
async def root():
    return {
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "tagline": "Smarter Farming. Powered by AI.",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
