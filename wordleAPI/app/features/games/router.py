from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.common.deps import get_db
from .schemas import GameCreate, GameOut
from .service import start_game, get_game_state

router = APIRouter()

@router.post("", response_model=GameOut, status_code=201)
def create_game(_: GameCreate | None = None, db: Session = Depends(get_db)):
    game = start_game(db)
    return {
        "id": game.id,
        "status": game.status.value,
        "attempts_left": game.max_attempts,
        "solution_len": 5,
    }

@router.get("/{game_id}", response_model=GameOut)
def read_game(game_id: int, db: Session = Depends(get_db)):
    state = get_game_state(db, game_id)
    if not state:
        raise HTTPException(status_code=404, detail="Game not found")
    return state
