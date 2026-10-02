import io
from fastapi.testclient import TestClient
from PIL import Image
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert "ml_service" in data
    assert "rag_service" in data

def test_disease_predict_preset():
    res = client.post("/api/disease/predict", data={"preset_id": "preset-tomato"})
    assert res.status_code == 200
    data = res.json()
    assert data["crop"] == "Tomato"
    assert "Early Blight" in data["disease"]
    assert data["confidence"] > 0.70

def test_disease_predict_image_upload():
    img = Image.new("RGB", (100, 100), color=(120, 180, 50))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    buf.seek(0)

    res = client.post(
        "/api/disease/predict",
        files={"image": ("test_leaf.jpg", buf, "image/jpeg")}
    )
    assert res.status_code == 200
    data = res.json()
    assert "disease" in data
    assert "confidence" in data
    assert len(data["symptoms"]) > 0

def test_rag_query_endpoint():
    res = client.post("/api/rag/query", json={"query": "How to treat early blight on tomatoes?", "top_k": 2})
    assert res.status_code == 200
    data = res.json()
    assert len(data["sources"]) > 0
    assert "Early Blight" in data["sources"][0]["title"]

def test_ai_recommend_endpoint():
    payload = {
        "crop": "Tomato",
        "prediction": "Early Blight",
        "confidence": 0.91,
        "retrieved_context": [
            {
                "id": "s1",
                "title": "Tomato Disease Guide",
                "source_org": "Agri Extension",
                "category": "Crop Disease",
                "relevance_score": 0.92,
                "snippet": "Prune lower infected leaves and avoid overhead sprinklers."
            }
        ],
        "language": "English"
    }
    res = client.post("/api/ai/recommend", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert len(data["immediate_actions"]) > 0
    assert len(data["monitoring"]) > 0
    assert len(data["prevention"]) > 0

def test_assistant_chat_endpoint():
    res = client.post("/api/assistant/chat", json={"message": "Why are my tomato leaves turning yellow?", "language": "en"})
    assert res.status_code == 200
    data = res.json()
    assert "reply" in data
    assert len(data["sources"]) > 0

def test_farm_yield_endpoint():
    payload = {
        "crop": "Tomato",
        "soil_type": "Loamy",
        "rainfall": 720.0,
        "temperature": 27.0,
        "irrigation": "Drip",
        "fertilizer": 120.0
    }
    res = client.post("/api/farm/predict-yield", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["predicted_yield"] > 0
    assert data["unit"] == "tons/acre"
