"""FastAPI application entry point."""



from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from services.prediction import predict_news


app = FastAPI(
    title="Fake News Detector API",
    description="Machine Learning Based Fake News Detection System",
    version="1.0.0"
)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Request schema
class NewsRequest(BaseModel):

    news: str = Field(
        ...,
        min_length=20,
        max_length=20000,
        description="Enter news article text"
    )


# Home route
@app.get("/")
def home():

    return {
        "message": "Fake News Detector API is running",
        "status": "success"
    }


# Health check
@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


# Prediction route
@app.post("/predict")
def prediction(request: NewsRequest):

    try:

        result = predict_news(request.news)

        return {
            "success": True,
            "data": result
        }

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except FileNotFoundError as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    except Exception:

        raise HTTPException(
            status_code=500,
            detail="An internal prediction error occurred."
        )
