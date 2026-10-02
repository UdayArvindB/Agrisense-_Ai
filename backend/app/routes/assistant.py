from fastapi import APIRouter, HTTPException
from ..schemas.assistant import AssistantChatRequest, AssistantChatResponse
from ..services.rag_service import get_rag_service
from ..services.llm_service import get_llm_service

router = APIRouter(prefix="/api/assistant", tags=["AI Farm Assistant"])

@router.post(
    "/chat",
    response_model=AssistantChatResponse,
    summary="Chat with Evidence-Grounded Agricultural AI Assistant",
    description="Processes farmer queries through vector RAG retrieval and synthesizes answers with source citations in the requested regional language."
)
async def chat_with_assistant(payload: AssistantChatRequest):
    rag = get_rag_service()
    llm = get_llm_service()

    try:
        # Step 1: Semantic vector retrieval
        retrieved_sources = rag.search_documents(
            query=payload.message,
            top_k=3,
            crop_filter=payload.crop_context
        )

        # Step 2: LLM Synthesis with strict grounding
        reply_text = llm.generate_chat_reply(
            message=payload.message,
            retrieved_sources=retrieved_sources,
            language=payload.language,
            crop_context=payload.crop_context
        )

        # Step 3: Compile suggested followups
        suggested = [
            "What is the recommended spray dosage?",
            "How do I prevent rain splash contamination?",
            "Explain organic biological controls."
        ]

        return AssistantChatResponse(
            reply=reply_text,
            language=payload.language,
            sources=retrieved_sources,
            confidence=0.92,
            suggested_followups=suggested
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Assistant chat error: {str(e)}")
