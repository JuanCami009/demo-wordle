from fastapi import APIRouter
from app.features.words.router import router as words
from app.features.games.router import router as games
from app.features.guesses.router import router as guesses

api = APIRouter(prefix="/api/v1")
api.include_router(words, prefix="/words", tags=["words"])
api.include_router(games, prefix="/games", tags=["games"])
api.include_router(guesses, prefix="/guesses", tags=["guesses"])
