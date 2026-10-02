from .disease import router as disease_router
from .rag import router as rag_router
from .assistant import router as assistant_router
from .farm import router as farm_router
from .speech import router as speech_router
from .health import router as health_router

__all__ = [
    "disease_router",
    "rag_router",
    "assistant_router",
    "farm_router",
    "speech_router",
    "health_router",
]
