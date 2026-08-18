from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.core.cors import ALLOWED_ORIGINS

app = FastAPI(
    title="Roster Converter API",
    version="0.1.0",
    description="FastAPI backend for roster conversion workflows.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)


@app.get("/", tags=["system"])
async def root() -> dict[str, str]:
    return {"message": "Roster Converter API is running"}
