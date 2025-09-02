from fastapi import FastAPI
from app.core.config import settings
from app.core.middleware import setup_middlewares
from app.core.lifespan import lifespan
from app.api.router import api  

app = FastAPI(title="Wordle API", version="0.1.0", lifespan=lifespan)

setup_middlewares(app, allowed_origins=settings.ALLOWED_ORIGINS)
app.include_router(api)  
