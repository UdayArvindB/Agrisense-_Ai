from fastapi import APIRouter
from abc import ABC, abstractmethod
from typing import Dict, Any
from ..schemas.farm import YieldPredictionRequest, YieldPredictionResponse

router = APIRouter(prefix="/api/farm", tags=["Farm Intelligence & Analytics"])

class YieldPredictionModel(ABC):
    """Abstract interface for crop harvest yield regression."""

    @abstractmethod
    def predict(self, features: YieldPredictionRequest) -> YieldPredictionResponse:
        pass


class MockYieldPredictionModel(YieldPredictionModel):
    """
    Clearly labeled Development / Heuristic Regressor.
    Applies agronomic moisture-fertility response curves to estimate yield bounds.
    """

    def predict(self, f: YieldPredictionRequest) -> YieldPredictionResponse:
        # Base yields by crop (tons/acre)
        base_yields = {
            "tomato": 3.8,
            "corn": 3.9,
            "maize": 3.9,
            "potato": 4.1,
            "soybean": 3.6,
        }

        crop_key = f.crop.lower()
        base = base_yields.get(crop_key, 3.5)

        # Irrigation factor
        irrigation_bonus = 0.3 if f.irrigation.lower() == "drip" else (0.1 if f.irrigation.lower() == "sprinkler" else 0.0)

        # Rainfall factor (optimal 600 - 800 mm)
        rain_diff = abs(f.rainfall - 700.0) / 700.0
        rain_factor = max(-0.3, 0.2 - (rain_diff * 0.4))

        # Fertilizer factor (optimal ~120-140 kg/acre)
        fert_factor = 0.2 if f.fertilizer >= 100 else -0.1

        predicted = base + irrigation_bonus + rain_factor + fert_factor
        predicted = max(1.5, min(6.5, round(predicted, 2)))

        factors = [
            f"Irrigation ({f.irrigation}): +{irrigation_bonus:.1f} t/ac efficiency",
            f"Soil Type ({f.soil_type}): High water retention capacity",
            f"Fertility Input ({f.fertilizer} kg/ac): Balanced N-P-K regime"
        ]

        return YieldPredictionResponse(
            crop=f.crop,
            predicted_yield=predicted,
            unit="tons/acre",
            confidence=0.84,
            factors=factors,
            model_provider="Mock Agro-Regressor v2.1 (Development Provider)",
            disclaimer="Simulated yield estimation. Calibrate against actual laboratory soil testing reports."
        )


_yield_model = MockYieldPredictionModel()

@router.post(
    "/predict-yield",
    response_model=YieldPredictionResponse,
    summary="Predict Seasonal Harvest Yield",
    description="Calculates expected biomass yield based on soil classification, rainfall, temperature, and micro-irrigation parameters."
)
async def predict_farm_yield(payload: YieldPredictionRequest):
    return _yield_model.predict(payload)
