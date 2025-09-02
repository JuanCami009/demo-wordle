from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from app.common.deps import get_db
from .schemas import GuessIn, GuessOut
from .service import make_guess

router = APIRouter()

@router.post("/{game_id}", response_model=GuessOut, status_code=201)
def create_guess(
    game_id: int = Path(..., ge=1),
    payload: GuessIn = ...,
    db: Session = Depends(get_db),
):
    data, code, err = make_guess(db, game_id, payload.text)
    if err:
        raise HTTPException(status_code=code, detail=err)
    return data
