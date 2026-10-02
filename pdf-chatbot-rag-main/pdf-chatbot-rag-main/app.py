import os

from utils.pdf_reader import read_pdf
from utils.chunking import create_chunks
from utils.embeddings import generate_embeddings
from utils.vector_db import store_in_chromadb
from utils.vector_db import show_database
from utils.retriever import semantic_search
from utils.prompt_builder import build_prompt
from utils.openrouter_llm import generate_answer


def main():

    print("=" * 60)
    print("     AI PDF CHATBOT USING MANUAL RAG")
    print("=" * 60)

    pdf_path = "data/sample.pdf"

    if not os.path.exists(pdf_path):

        print("PDF Not Found!")

        return

    # ==========================================
    # Step 1 — Read PDF
    # ==========================================

    text = read_pdf(pdf_path)

    # ==========================================
    # Step 2 — Create Chunks
    # ==========================================

    chunks = create_chunks(text)

    print(f"\nTotal Chunks Created: {len(chunks)}")

    # ==========================================
    # Step 3 — Generate Embeddings
    # ==========================================

    embeddings = generate_embeddings(chunks)

    # ==========================================
    # Step 4 — Store in ChromaDB
    # ==========================================

    collection = store_in_chromadb(
        chunks,
        embeddings
    )

    # ==========================================
    # Step 5 — Show Database
    # ==========================================

    show_database(collection)

    # ==========================================
    # Question / Answer Loop
    # ==========================================

    while True:

        print("\n" + "=" * 60)

        question = input(
            "\nAsk Question (exit to quit): "
        )

        if question.lower().strip() == "exit":

            print("\nExiting chatbot...")

            break

        if not question.strip():

            print("Please enter a question.")

            continue

        # ======================================
        # Step 6 — Semantic Search
        # ======================================

        retrieved_chunks = semantic_search(
            collection,
            question
        )

        # ======================================
        # Step 7 — Build Prompt
        # ======================================

        prompt = build_prompt(
            question,
            retrieved_chunks
        )

        # ======================================
        # Step 8 — Generate Answer
        # ======================================

        answer = generate_answer(prompt)

        print("\n" + "=" * 60)
        print("ANSWER")
        print("=" * 60)

        print(answer)


if __name__ == "__main__":
    main()