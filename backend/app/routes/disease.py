from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from typing import Optional
from ..schemas.disease import DiseasePredictionResponse, ActionPlanRequest, ActionPlanResponse
from ..utils.image_processing import validate_and_preprocess_image
from ..services.ml_service import get_disease_model
from ..services.llm_service import get_llm_service
from ..services.rag_service import get_rag_service

router = APIRouter(prefix="/api", tags=["Disease Detection & AI Guidance"])

@router.post(
    "/disease/predict",
    response_model=DiseasePredictionResponse,
    summary="Predict Crop Disease from Foliar Image",
    description="Accepts crop image (JPG, PNG, WEBP), performs image validation, normalization, and runs computer vision inference."
)
async def predict_crop_disease(
    image: Optional[UploadFile] = File(default=None),
    preset_id: Optional[str] = Form(default=None),
    crop_hint: Optional[str] = Form(default=None)
):
    # Check if a preset identifier was provided (for quick demo mode)
    if not image and preset_id:
        model = get_disease_model()
        import numpy as np
        dummy_tensor = np.zeros((1, 3, 224, 224), dtype=np.float32)
        hint = "tomato"
        if "corn" in preset_id:
            hint = "corn"
        elif "potato" in preset_id:
            hint = "potato"
        elif "healthy" in preset_id:
            hint = "apple"
        return model.predict(dummy_tensor, crop_hint=hint)

    if not image:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No image file provided. Please upload an image file (multipart/form-data) under key 'image'."
        )

    try:
        file_bytes = await image.read()
        content_type = image.content_type or "image/jpeg"
        tensor_batch, pil_img = validate_and_preprocess_image(file_bytes, content_type)
    except ValueError as val_err:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(val_err))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Image processing failed: {str(e)}")

    model = get_disease_model()
    try:
        prediction_result = model.predict(tensor_batch, crop_hint=crop_hint)
        return prediction_result
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Model inference failed: {str(e)}")


@router.post(
    "/ai/recommend",
    response_model=ActionPlanResponse,
    summary="Generate Evidence-Grounded AI Action Plan",
    description="Synthesizes ML prediction with retrieved RAG context to formulate structured immediate, monitoring, and preventive guidance."
)
async def generate_agronomic_recommendation(payload: ActionPlanRequest):
    rag_service = get_rag_service()
    llm_service = get_llm_service()

    # If caller didn't pass context, retrieve it automatically
    if not payload.retrieved_context:
        rag_query = f"{payload.prediction} {payload.crop} symptoms management prevention"
        rag_res = rag_service.query(rag_query, crop_context=payload.crop, top_k=3)
        sources = rag_res.sources
    else:
        # Convert incoming dicts to RagSource
        from ..schemas.rag import RagSource
        sources = [RagSource(**s) for s in payload.retrieved_context]

    action_plan = llm_service.generate_recommendation(
        crop=payload.crop,
        prediction=payload.prediction,
        confidence=payload.confidence,
        retrieved_sources=sources,
        language=payload.language
    )
    return action_plan
