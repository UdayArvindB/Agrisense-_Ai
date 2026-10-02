from typing import List, Optional
from pydantic import BaseModel, Field

class RagQueryRequest(BaseModel):
    query: str = Field(..., min_length=2, description="Agricultural question or disease keyword query")
    crop_context: Optional[str] = Field(default=None, description="Optional crop filter context")
    top_k: int = Field(default=3, ge=1, le=10, description="Number of top relevant chunks to retrieve")

class RagSource(BaseModel):
    id: str
    title: str
    section: Optional[str] = None
    source_org: str
    category: str
    year: int = 2026
    relevance_score: float = Field(..., ge=0.0, le=1.0)
    snippet: str
    full_content: Optional[str] = None
    doi_or_ref: Optional[str] = None

class RagQueryResponse(BaseModel):
    query: str
    answer_context: str
    sources: List[RagSource]
    total_retrieved: int

class KnowledgeSearchRequest(BaseModel):
    q: Optional[str] = None
    category: Optional[str] = "All"
