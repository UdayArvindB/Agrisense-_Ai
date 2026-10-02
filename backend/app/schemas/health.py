from typing import Optional
from pydantic import BaseModel, Field

class SpeechTranscribeResponse(BaseModel):
    text: str
    detected_language: str = "en"
    duration_seconds: float = 0.0
    status: str = "success"

class SpeechSynthesizeRequest(BaseModel):
    text: str
    language: str = "en"
    voice_gender: Optional[str] = "neutral"

class SpeechSynthesizeResponse(BaseModel):
    audio_base64: Optional[str] = None
    format: str = "audio/mp3"
    message: str = "Speech synthesis rendered or web speech fallback supported"

class HealthResponse(BaseModel):
    status: str = "healthy"
    version: str = "2.0.0"
    ml_service: str = "available"
    rag_service: str = "available"
    llm_service: str = "configured"
    indexed_documents_count: int = 0
