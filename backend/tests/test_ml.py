import io
import numpy as np
from PIL import Image
from app.utils.image_processing import validate_and_preprocess_image
from app.services.ml_service import MockDiseaseModel

def test_image_preprocessing():
    # Create test 100x100 RGB image
    img = Image.new("RGB", (100, 100), color=(80, 160, 40))
    buffer = io.BytesIO()
    img.save(buffer, format="JPEG")
    img_bytes = buffer.getvalue()

    tensor, pil_img = validate_and_preprocess_image(img_bytes, "image/jpeg")

    # Verify tensor shape is (1, 3, 224, 224)
    assert tensor.shape == (1, 3, 224, 224)
    assert pil_img.size == (100, 100)

def test_mock_disease_model():
    model = MockDiseaseModel()
    tensor = np.zeros((1, 3, 224, 224), dtype=np.float32)

    res = model.predict(tensor, crop_hint="Tomato")
    assert res.crop == "Tomato"
    assert res.confidence >= 0.50
    assert len(res.symptoms) > 0
    assert res.risk_level in ["Low", "Moderate", "High", "Severe", "Low (Uncertain)"]
