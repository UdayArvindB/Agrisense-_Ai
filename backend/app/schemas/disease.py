from typing import List, Optional
from pydantic import BaseModel, Field

class DiseasePredictionResponse(BaseModel):
    crop: str = Field(..., description="Identified or provided crop name")
    disease: str = Field(..., description="Predicted plant pathology or healthy status")
    pathogen_type: str = Field(default="Fungal", description="Category: Fungal, Bacterial, Viral, Pest, Healthy")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Model prediction confidence score (0 to 1)")
    risk_level: str = Field(..., description="Low, Moderate, High, Severe")
    symptoms: List[str] = Field(default_factory=list, description="Observed foliar symptoms")
    affected_area_percentage: float = Field(default=0.0, description="Estimated canopy surface area affected")
    inference_time_ms: float = Field(default=0.0, description="Latency in milliseconds")
    model_provider: str = Field(default="EfficientNet-B4 (PyTorch)", description="Inference engine name")
    is_low_confidence: bool = Field(default=False, description="Flag if confidence is below safety threshold")
    disclaimer: str = Field(
        default="AI-assisted classification. Not a certified laboratory diagnostic certificate.",
        description="Mandatory agricultural trust & safety disclaimer"
    )

class ActionPlanRequest(BaseModel):
    crop: str = Field(default="Tomato")
    prediction: str = Field(default="Early Blight")
    confidence: float = Field(default=0.91)
    retrieved_context: List[dict] = Field(default_factory=list)
    language: str = Field(default="English")

class ActionPlanResponse(BaseModel):
    summary: str
    immediate_actions: List[str]
    monitoring: List[str]
    prevention: List[str]
    warning: str
    sources: List[dict]
    language: str = "English"
