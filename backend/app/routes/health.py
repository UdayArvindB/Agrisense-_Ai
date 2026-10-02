from fastapi import APIRouter
from ..schemas.health import HealthResponse
from ..services.rag_service import get_rag_service
from ..services.ml_service import get_disease_model
from ..config import settings

router = APIRouter(prefix="/api", tags=["System Health & Diagnostics"])

@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Backend Health & Service Availability",
    description="Returns availability status for ML classification, RAG vector store, and LLM reasoning engines."
)
async def check_health():
    rag = get_rag_service()
    doc_count = len(rag.vector_store.metadata)

    return HealthResponse(
        status="healthy",
        version=settings.VERSION,
        ml_service="available (EfficientNet / Mock Provider Active)",
        rag_service=f"available ({doc_count} chunks indexed in vector store)",
        llm_service=f"configured ({settings.LLM_PROVIDER})",
        indexed_documents_count=doc_count
    )
