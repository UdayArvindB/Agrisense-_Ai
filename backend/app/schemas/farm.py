from typing import Optional
from pydantic import BaseModel, Field

class YieldPredictionRequest(BaseModel):
    crop: str = Field(default="Tomato", description="Target crop")
    soil_type: str = Field(default="Loamy", description="Soil classification")
    rainfall: float = Field(default=720.0, description="Annual / seasonal precipitation in mm")
    temperature: float = Field(default=27.0, description="Mean temperature in Celsius")
    irrigation: str = Field(default="Drip", description="Irrigation method: Drip, Sprinkler, Flood")
    fertilizer: float = Field(default=120.0, description="Fertilizer application in kg/acre")

class YieldPredictionResponse(BaseModel):
    crop: str
    predicted_yield: float = Field(..., description="Estimated tons per acre")
    unit: str = "tons/acre"
    confidence: float = Field(default=0.82, ge=0.0, le=1.0)
    factors: list[str] = Field(default_factory=list)
    model_provider: str = "XGBoost Agro-Regressor v2.1"
    disclaimer: str = "Simulated yield estimation. Calibrate against local soil test reports."
