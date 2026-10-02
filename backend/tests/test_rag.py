from app.services.rag_service import RagService
from app.services.embedding_service import LocalDenseEmbeddingService

def test_rag_chunking_and_retrieval():
    embedder = LocalDenseEmbeddingService(dimension=384)
    rag = RagService(embedding_service=embedder)

    # Ingest test sample documents
    rag.ingest_documents()

    assert len(rag.vector_store.metadata) > 0

    # Query RAG
    query_res = rag.query("tomato early blight Alternaria solani symptoms")
    assert query_res.total_retrieved > 0
    top_source = query_res.sources[0]
    assert "early blight" in top_source.title.lower() or "blight" in top_source.title.lower()
    assert top_source.relevance_score > 0.0
