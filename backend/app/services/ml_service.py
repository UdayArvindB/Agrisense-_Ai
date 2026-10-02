import os
import time
from abc import ABC, abstractmethod
from typing import Dict, Any, List
import numpy as np
from ..config import settings
from ..schemas.disease import DiseasePredictionResponse

# Known Crop Disease Classes
CROP_DISEASE_CLASSES = [
    {
        "crop": "Tomato",
        "disease": "Early Blight (Alternaria solani)",
        "pathogen_type": "Fungal",
        "risk_level": "Moderate",
        "symptoms": [
            "Concentric target-like circular dark brown lesions",
            "Yellow chlorotic halos surrounding leaf lesions",
            "Lower canopy foliar necrosis and premature senescence"
        ],
        "affected_area_percentage": 24.0,
    },
    {
        "crop": "Potato",
        "disease": "Late Blight (Phytophthora infestans)",
        "pathogen_type": "Fungal",
        "risk_level": "High",
        "symptoms": [
            "Water-soaked irregular pale to dark green lesions expanding rapidly",
            "White downy fungal growth on the underside of leaves",
            "Brown necrotic lesions on petioles and stems"
        ],
        "affected_area_percentage": 35.0,
    },
    {
        "crop": "Corn (Maize)",
        "disease": "Common Rust (Puccinia sorghi)",
        "pathogen_type": "Fungal",
        "risk_level": "Moderate",
        "symptoms": [
            "Golden-brown to cinnamon-brown powdery pustules",
            "Pustules scattered across upper and lower leaf surfaces",
            "Leaf chlorosis surrounding dense pustule clusters"
        ],
        "affected_area_percentage": 18.0,
    },
    {
        "crop": "Apple / Foliage",
        "disease": "Healthy Crop (Optimal Vigor)",
        "pathogen_type": "Healthy",
        "risk_level": "Low",
        "symptoms": [
            "Vibrant chlorophyll distribution with consistent deep green coloration",
            "Intact leaf margin architecture without necrotic spots",
            "Smooth cuticle free of fungal spores or pest damage"
        ],
        "affected_area_percentage": 0.0,
    }
]

class DiseaseModel(ABC):
    """Abstract interface for crop disease computer vision models."""

    @abstractmethod
    def predict(self, image_tensor: np.ndarray, crop_hint: str = None) -> DiseasePredictionResponse:
        pass


class MockDiseaseModel(DiseaseModel):
    """
    Clearly labeled Development / Mock ML Provider.
    Calculates dynamic image feature statistics (mean RGB channels, greenness ratio)
    to deterministically map foliar traits while clearly documenting simulated inference.
    """

    def predict(self, image_tensor: np.ndarray, crop_hint: str = None) -> DiseasePredictionResponse:
        start_time = time.perf_counter()

        # Extract basic visual color channels from tensor (shape: 1, 3, 224, 224)
        # channel 0 = Red, 1 = Green, 2 = Blue
        mean_r = float(np.mean(image_tensor[0, 0, :, :]))
        mean_g = float(np.mean(image_tensor[0, 1, :, :]))
        mean_b = float(np.mean(image_tensor[0, 2, :, :]))

        # Calculate vegetative greenness ratio vs necrosis (red-brown shift)
        # Higher red relative to green suggests necrotic spots / blight / rust
        necrosis_index = mean_r - mean_g

        # Select class based on crop hint or necrosis index
        if crop_hint and "potato" in crop_hint.lower():
            selected = CROP_DISEASE_CLASSES[1]  # Potato Late Blight
            confidence = 0.94
        elif crop_hint and "corn" in crop_hint.lower():
            selected = CROP_DISEASE_CLASSES[2]  # Corn Common Rust
            confidence = 0.89
        elif crop_hint and "apple" in crop_hint.lower():
            selected = CROP_DISEASE_CLASSES[3]  # Healthy
            confidence = 0.97
        elif necrosis_index > 0.15:
            # High necrotic brown/red ratio -> Late Blight or severe rust
            selected = CROP_DISEASE_CLASSES[1]
            confidence = 0.93
        elif necrosis_index < -0.35:
            # High green chlorophyll -> Healthy
            selected = CROP_DISEASE_CLASSES[3]
            confidence = 0.96
        else:
            # Default / Early Blight benchmark
            selected = CROP_DISEASE_CLASSES[0]
            confidence = 0.91

        latency_ms = (time.perf_counter() - start_time) * 1000 + 42.0

        is_low = confidence < settings.CONFIDENCE_THRESHOLD

        return DiseasePredictionResponse(
            crop=selected["crop"],
            disease=selected["disease"],
            pathogen_type=selected["pathogen_type"],
            confidence=round(confidence, 2),
            risk_level=selected["risk_level"] if not is_low else "Low (Uncertain)",
            symptoms=selected["symptoms"],
            affected_area_percentage=selected["affected_area_percentage"],
            inference_time_ms=round(latency_ms, 2),
            model_provider="Development Provider (EfficientNet-B4 Simulation)",
            is_low_confidence=is_low,
            disclaimer="AI-assisted classification (Demo Provider). Always verify critical treatments with an agronomy officer."
        )


class RealDiseaseModel(DiseaseModel):
    """
    Production PyTorch Transfer Learning Classifier.
    Loads real weights (.pth) for EfficientNet / ResNet if available on disk.
    """

    def __init__(self, model_path: str):
        self.model_path = model_path
        self.model = None
        self._load_weights()

    def _load_weights(self):
        try:
            import torch
            if os.path.exists(self.model_path):
                self.model = torch.load(self.model_path, map_location="cpu")
                self.model.eval()
            else:
                self.model = None
        except Exception as e:
            print(f"[Warning] Failed loading PyTorch weights from {self.model_path}: {e}")
            self.model = None

    def predict(self, image_tensor: np.ndarray, crop_hint: str = None) -> DiseasePredictionResponse:
        if self.model is None:
            # Graceful fallback to mock provider if weights not loaded
            mock = MockDiseaseModel()
            res = mock.predict(image_tensor, crop_hint)
            res.model_provider = "Fallback ML Provider (Weights not located on disk)"
            return res

        import torch
        start_time = time.perf_counter()
        tensor_t = torch.from_numpy(image_tensor).float()

        with torch.no_grad():
            outputs = self.model(tensor_t)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, class_idx = torch.max(probabilities, dim=1)

        idx = class_idx.item() % len(CROP_DISEASE_CLASSES)
        selected = CROP_DISEASE_CLASSES[idx]
        conf_val = round(confidence.item(), 2)
        latency_ms = (time.perf_counter() - start_time) * 1000

        is_low = conf_val < settings.CONFIDENCE_THRESHOLD

        return DiseasePredictionResponse(
            crop=selected["crop"],
            disease=selected["disease"],
            pathogen_type=selected["pathogen_type"],
            confidence=conf_val,
            risk_level=selected["risk_level"] if not is_low else "Low (Uncertain)",
            symptoms=selected["symptoms"],
            affected_area_percentage=selected["affected_area_percentage"],
            inference_time_ms=round(latency_ms, 2),
            model_provider=f"PyTorch EfficientNet ({os.path.basename(self.model_path)})",
            is_low_confidence=is_low,
            disclaimer="AI-assisted classification. Confirm with an agricultural professional."
        )


def get_disease_model() -> DiseaseModel:
    """Factory returning RealDiseaseModel if configured weight file exists, else MockDiseaseModel."""
    if settings.ML_MODEL_PATH.exists() and settings.ML_MODEL_TYPE == "torch":
        return RealDiseaseModel(str(settings.ML_MODEL_PATH))
    return MockDiseaseModel()
