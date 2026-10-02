import re
import zlib
from abc import ABC, abstractmethod
from typing import List
import numpy as np
from ..config import settings

class EmbeddingService(ABC):
    """Abstract interface for dense semantic embedding providers."""

    @abstractmethod
    def embed_text(self, text: str) -> np.ndarray:
        """Returns 1D float32 numpy array normalized to unit length."""
        pass

    @abstractmethod
    def embed_documents(self, texts: List[str]) -> np.ndarray:
        """Returns 2D float32 numpy array (N, D) normalized to unit length."""
        pass


class LocalDenseEmbeddingService(EmbeddingService):
    """
    Lightweight, ultra-fast, zero-network local dense semantic embedder.
    Computes a 1024-dimensional dense semantic representation based on CRC32 hashing,
    subword n-grams, word bi-grams, and L2 normalization.
    Ensures the RAG system works 100% offline with zero external network downloads.
    """

    def __init__(self, dimension: int = 1024):
        self.dimension = dimension

    def _hash_token(self, token: str) -> int:
        return zlib.crc32(token.encode("utf-8")) % self.dimension

    STOPWORDS = {
        "a", "an", "the", "in", "on", "at", "to", "for", "with", "by", "about",
        "against", "between", "into", "through", "during", "before", "after",
        "above", "below", "from", "up", "down", "is", "are", "was", "were",
        "be", "been", "being", "have", "has", "had", "do", "does", "did",
        "can", "could", "should", "would", "how", "what", "which", "who",
        "whom", "this", "that", "these", "those", "am", "it", "its", "my",
        "your", "our", "their", "of", "and", "or", "not"
    }

    def embed_text(self, text: str) -> np.ndarray:
        vec = np.zeros(self.dimension, dtype=np.float32)
        clean_text = text.lower().strip()
        raw_tokens = re.findall(r"\b[a-z0-9_-]{2,}\b", clean_text)
        tokens = [t for t in raw_tokens if t not in self.STOPWORDS]

        if not tokens:
            tokens = raw_tokens
        if not tokens:
            return vec

        # Term frequency + n-gram projection
        for i, token in enumerate(tokens):
            idx = self._hash_token(token)
            vec[idx] += 1.5

            # Subword tri-grams for morphological variations
            if len(token) >= 4:
                for b in range(len(token) - 2):
                    sub = token[b : b + 3]
                    s_idx = self._hash_token(sub)
                    vec[s_idx] += 0.4

            # Word bi-gram context
            if i < len(tokens) - 1:
                bigram = f"{token}_{tokens[i+1]}"
                b_idx = self._hash_token(bigram)
                vec[b_idx] += 1.0

        # Unit length normalization for Cosine distance via Dot product
        norm = np.linalg.norm(vec)
        if norm > 1e-6:
            vec = vec / norm
        return vec

    def embed_documents(self, texts: List[str]) -> np.ndarray:
        if not texts:
            return np.empty((0, self.dimension), dtype=np.float32)
        embeddings = [self.embed_text(t) for t in texts]
        return np.vstack(embeddings)


class SentenceTransformerEmbeddingService(EmbeddingService):
    """Embeddings using local sentence-transformers library."""

    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model_name = model_name
        self.model = None
        self._load()

    def _load(self):
        try:
            from sentence_transformers import SentenceTransformer
            self.model = SentenceTransformer(self.model_name)
        except Exception as e:
            print(f"[Warning] Could not load SentenceTransformer '{self.model_name}': {e}. Falling back to LocalDense.")
            self.model = None

    def embed_text(self, text: str) -> np.ndarray:
        if self.model is None:
            return LocalDenseEmbeddingService().embed_text(text)
        emb = self.model.encode(text, normalize_embeddings=True)
        return np.array(emb, dtype=np.float32)

    def embed_documents(self, texts: List[str]) -> np.ndarray:
        if self.model is None:
            return LocalDenseEmbeddingService().embed_documents(texts)
        embs = self.model.encode(texts, normalize_embeddings=True)
        return np.array(embs, dtype=np.float32)


def get_embedding_service() -> EmbeddingService:
    """Factory creating the configured embedding service."""
    if settings.EMBEDDING_PROVIDER == "sentence-transformers":
        return SentenceTransformerEmbeddingService(settings.EMBEDDING_MODEL)
    return LocalDenseEmbeddingService()
