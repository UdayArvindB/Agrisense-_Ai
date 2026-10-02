from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
from ..schemas.rag import RagQueryRequest, RagQueryResponse, RagSource
from ..services.rag_service import get_rag_service

router = APIRouter(prefix="/api", tags=["RAG & Knowledge Retrieval"])

@router.post(
    "/rag/query",
    response_model=RagQueryResponse,
    summary="Query Vector Database for Agricultural Knowledge",
    description="Vector search across indexed ICAR, FAO, and university extension publications."
)
async def query_knowledge_base(payload: RagQueryRequest):
    rag = get_rag_service()
    try:
        response = rag.query(
            query=payload.query,
            crop_context=payload.crop_context,
            top_k=payload.top_k
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"RAG query execution failed: {str(e)}")


@router.get(
    "/knowledge/search",
    response_model=List[RagSource],
    summary="Search Indexed Knowledge Documents",
    description="Full text and category search over the local agronomic vector knowledge base."
)
async def search_knowledge(
    q: Optional[str] = Query(default="", description="Search query string"),
    category: Optional[str] = Query(default="All", description="Category filter")
):
    rag = get_rag_service()
    query_str = q if q else (category if category != "All" else "crop disease management")
    sources = rag.search_documents(query_str, top_k=6)

    if category and category != "All":
        sources = [s for s in sources if category.lower() in s.category.lower() or category.lower() in s.title.lower()]

    return sources
