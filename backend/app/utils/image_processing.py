import io
from typing import Tuple
from PIL import Image
import numpy as np

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp", "image/jpg"}
MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024  # 15 MB
MIN_DIMENSION = 32
TARGET_SIZE = (224, 224)

# ImageNet normalization standards
IMAGENET_MEAN = np.array([0.485, 0.456, 0.406], dtype=np.float32)
IMAGENET_STD = np.array([0.229, 0.224, 0.225], dtype=np.float32)

def validate_and_preprocess_image(file_bytes: bytes, content_type: str) -> Tuple[np.ndarray, Image.Image]:
    """
    Validates uploaded crop image:
    1. Size check
    2. Content type check
    3. Pil verification
    4. Resizes to (224, 224)
    5. Normalizes to ImageNet standards
    Returns: (preprocessed_tensor (1, 3, 224, 224), PIL_Image)
    """
    # 1. Size check
    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise ValueError(f"Image file exceeds maximum allowable size of 15MB (got {len(file_bytes) / 1024 / 1024:.2f}MB)")

    if len(file_bytes) < 100:
        raise ValueError("Image file is empty or corrupted.")

    # 2. Content-type check
    if content_type.lower() not in ALLOWED_MIME_TYPES:
        raise ValueError(f"Unsupported file type '{content_type}'. Please upload JPG, PNG, or WEBP.")

    # 3. PIL load verification
    try:
        image = Image.open(io.BytesIO(file_bytes))
        image.verify()  # verify integrity
        # Reopen for transformation (verify() closes buffer state)
        image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    except Exception as e:
        raise ValueError(f"Corrupted or invalid image data: {str(e)}")

    width, height = image.size
    if width < MIN_DIMENSION or height < MIN_DIMENSION:
        raise ValueError(f"Image dimensions too small ({width}x{height}). Minimum required is {MIN_DIMENSION}x{MIN_DIMENSION} pixels.")

    # 4. Resize
    resized_image = image.resize(TARGET_SIZE, Image.Resampling.BILINEAR)

    # 5. Convert to array and normalize
    img_array = np.array(resized_image, dtype=np.float32) / 255.0
    normalized_array = (img_array - IMAGENET_MEAN) / IMAGENET_STD

    # Transpose to Channel-First: (3, 224, 224) then add Batch dimension: (1, 3, 224, 224)
    tensor = np.transpose(normalized_array, (2, 0, 1))
    tensor_batch = np.expand_dims(tensor, axis=0)

    return tensor_batch, image
