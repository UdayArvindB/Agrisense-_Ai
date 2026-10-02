from typing import List, Optional
from pydantic import BaseModel, Field
from .rag import RagSource

class AssistantChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="Farmer user prompt")
    language: str = Field(default="en", description="Language code: en, te, hi, ta, kn or English, Telugu, etc.")
    crop_context: Optional[str] = Field(default=None)
    image_url: Optional[str] = Field(default=None)

class AssistantChatResponse(BaseModel):
    reply: str
    language: str
    sources: List[RagSource] = Field(default_factory=list)
    confidence: float = 0.95
    suggested_followups: List[str] = Field(default_factory=list)
