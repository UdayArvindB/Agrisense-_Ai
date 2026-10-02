import os
import json
from pathlib import Path
from typing import List, Dict, Any, Optional
import numpy as np
from ..config import settings
from ..schemas.rag import RagSource, RagQueryResponse
from .embedding_service import get_embedding_service, EmbeddingService

class VectorStore:
    """
    Local Vector Database with FAISS / Cosine Matrix persistence.
    Saves index and metadata chunks to disk under settings.VECTOR_DB_DIR.
    """

    def __init__(self, storage_dir: Path, dimension: int = 1024):
        self.storage_dir = storage_dir
        self.dimension = dimension
        self.chunks_file = storage_dir / "chunks_metadata.json"
        self.vectors_file = storage_dir / "vectors.npy"
        self.metadata: List[Dict[str, Any]] = []
        self.vectors: np.ndarray = np.empty((0, dimension), dtype=np.float32)
        self.load()

    def load(self):
        """Loads persistent vector store from disk if present."""
        if self.chunks_file.exists() and self.vectors_file.exists():
            try:
                with open(self.chunks_file, "r", encoding="utf-8") as f:
                    meta = json.load(f)
                vecs = np.load(self.vectors_file)
                if vecs.ndim == 2 and vecs.shape[1] == self.dimension:
                    self.metadata = meta
                    self.vectors = vecs
                    print(f"[VectorStore] Successfully loaded {len(self.metadata)} chunks from {self.storage_dir}")
                else:
                    print(f"[VectorStore] Dimension mismatch ({vecs.shape[1]} vs {self.dimension}). Re-indexing...")
                    self.metadata = []
                    self.vectors = np.empty((0, self.dimension), dtype=np.float32)
            except Exception as e:
                print(f"[VectorStore] Error loading cache: {e}. Starting fresh.")
                self.metadata = []
                self.vectors = np.empty((0, self.dimension), dtype=np.float32)

    def save(self):
        """Persists vectors and metadata to disk."""
        self.storage_dir.mkdir(parents=True, exist_ok=True)
        with open(self.chunks_file, "w", encoding="utf-8") as f:
            json.dump(self.metadata, f, indent=2, ensure_ascii=False)
        np.save(self.vectors_file, self.vectors)

    def add(self, chunks: List[Dict[str, Any]], embeddings: np.ndarray):
        """Appends new chunks and embeddings to the store."""
        if not chunks:
            return
        self.metadata.extend(chunks)
        if self.vectors.shape[0] == 0:
            self.vectors = embeddings
        else:
            self.vectors = np.vstack([self.vectors, embeddings])
        self.save()

    def search(self, query_vec: np.ndarray, top_k: int = 3) -> List[tuple[Dict[str, Any], float]]:
        """
        Executes normalized cosine similarity search.
        Returns list of (chunk_dict, cosine_similarity_score).
        """
        if self.vectors.shape[0] == 0:
            return []

        # query_vec is (D,), self.vectors is (N, D)
        # Dot product of unit vectors = cosine similarity
        similarities = np.dot(self.vectors, query_vec)
        # Sort descending
        top_indices = np.argsort(similarities)[::-1][:top_k]

        results = []
        for idx in top_indices:
            score = float(similarities[idx])
            # Bound between 0 and 1
            normalized_score = max(0.0, min(1.0, (score + 1.0) / 2.0 if score < 0 else score))
            results.append((self.metadata[idx], normalized_score))

        return results


class RagService:
    """
    Complete RAG Ingestion and Retrieval Pipeline.
    Manages document extraction, text chunking, embedding generation,
    vector storage, and contextual retrieval.
    """

    def __init__(self, embedding_service: Optional[EmbeddingService] = None):
        self.embedder = embedding_service or get_embedding_service()
        self.vector_store = VectorStore(settings.VECTOR_DB_DIR, dimension=1024)

    def chunk_text(self, text: str, chunk_size: int = 450, overlap: int = 80) -> List[str]:
        """Splits long text into overlapping semantic passages."""
        clean_text = " ".join(text.split())
        if len(clean_text) <= chunk_size:
            return [clean_text] if clean_text else []

        chunks = []
        start = 0
        while start < len(clean_text):
            end = start + chunk_size
            chunk = clean_text[start:end]
            if chunk.strip():
                chunks.append(chunk.strip())
            start += chunk_size - overlap
        return chunks

    def ingest_documents(self, documents_dir: Optional[Path] = None):
        """Reads all Markdown, TXT, and PDF files in knowledge directory and indexes them."""
        doc_dir = documents_dir or settings.DOCUMENTS_DIR
        if not doc_dir.exists():
            return

        all_chunks: List[Dict[str, Any]] = []
        all_texts: List[str] = []

        for file_path in doc_dir.glob("**/*"):
            if not file_path.is_file():
                continue

            content = ""
            category = "General Agronomy"
            source_org = "Agricultural Extension Corpus"
            title = file_path.stem.replace("_", " ").title()

            if file_path.suffix.lower() in [".md", ".txt"]:
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        raw = f.read()

                    # Simple frontmatter / header parsing
                    lines = raw.split("\n")
                    cleaned_lines = []
                    for line in lines:
                        if line.startswith("# Title:"):
                            title = line.replace("# Title:", "").strip()
                        elif line.startswith("# Category:"):
                            category = line.replace("# Category:", "").strip()
                        elif line.startswith("# Source:"):
                            source_org = line.replace("# Source:", "").strip()
                        else:
                            cleaned_lines.append(line)
                    content = "\n".join(cleaned_lines)
                except Exception as e:
                    print(f"[RAG] Error reading text file {file_path}: {e}")

            elif file_path.suffix.lower() == ".pdf":
                try:
                    import pypdf
                    reader = pypdf.PdfReader(str(file_path))
                    content = " ".join([page.extract_text() or "" for page in reader.pages])
                except Exception as e:
                    print(f"[RAG] Error reading PDF {file_path}: {e}")

            if not content.strip():
                continue

            text_chunks = self.chunk_text(content)
            for i, chunk in enumerate(text_chunks):
                chunk_id = f"{file_path.stem}-chunk-{i}"
                meta = {
                    "id": chunk_id,
                    "title": title,
                    "source_org": source_org,
                    "category": category,
                    "section": f"Section {i + 1}",
                    "snippet": chunk,
                    "year": 2026,
                    "filename": file_path.name,
                }
                all_chunks.append(meta)
                all_texts.append(f"{title} {category} {chunk}")

        if all_texts:
            print(f"[RAG] Ingesting {len(all_texts)} text chunks from {doc_dir}...")
            embeddings = self.embedder.embed_documents(all_texts)
            self.vector_store.metadata = []
            self.vector_store.vectors = np.empty((0, 1024), dtype=np.float32)
            self.vector_store.add(all_chunks, embeddings)
            print(f"[RAG] Successfully indexed {len(all_chunks)} chunks.")

    def search_documents(
        self, query: str, top_k: int = 3, crop_filter: Optional[str] = None
    ) -> List[RagSource]:
        """
        Embeds query and queries vector store for semantic matches.
        Returns top-k validated RagSource models.
        """
        if len(self.vector_store.metadata) == 0:
            self.ingest_documents()

        query_vec = self.embedder.embed_text(query)
        # Search a slightly larger pool to allow crop-filtering if needed
        raw_matches = self.vector_store.search(query_vec, top_k=top_k * 2)

        results: List[RagSource] = []
        for meta, score in raw_matches:
            if crop_filter:
                text_to_check = (meta["title"] + " " + meta["snippet"]).lower()
                if crop_filter.lower() not in text_to_check:
                    continue

            source = RagSource(
                id=meta["id"],
                title=meta["title"],
                section=meta.get("section", "General Advisory"),
                source_org=meta.get("source_org", "State Agricultural University"),
                category=meta.get("category", "Crop Disease"),
                year=meta.get("year", 2026),
                relevance_score=round(score, 2),
                snippet=meta["snippet"],
                full_content=meta["snippet"],
                doi_or_ref=f"RAG-REF-{meta['id'][:12]}"
            )
            results.append(source)
            if len(results) >= top_k:
                break

        return results

    def query(self, query: str, crop_context: Optional[str] = None, top_k: int = 3) -> RagQueryResponse:
        """Executes full RAG query and compiles structured answer context."""
        sources = self.search_documents(query, top_k=top_k, crop_filter=crop_context)

        if not sources:
            context_str = "No verified agricultural documents met the relevance threshold in the local knowledge base."
        else:
            context_parts = []
            for i, s in enumerate(sources):
                context_parts.append(
                    f"--- Source [{i+1}]: {s.title} ({s.source_org}) [Relevance: {s.relevance_score*100:.0f}%] ---\n{s.snippet}"
                )
            context_str = "\n\n".join(context_parts)

        return RagQueryResponse(
            query=query,
            answer_context=context_str,
            sources=sources,
            total_retrieved=len(sources)
        )


_rag_singleton: Optional[RagService] = None

def get_rag_service() -> RagService:
    global _rag_singleton
    if _rag_singleton is None:
        _rag_singleton = RagService()
    return _rag_singleton
