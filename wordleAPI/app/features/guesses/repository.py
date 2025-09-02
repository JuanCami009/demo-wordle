from sqlalchemy.orm import Session
from sqlalchemy import func
from .models import Guess

def insert_guess(db: Session, game_id: int, text: str, mask: str) -> Guess:
    g = Guess(game_id=game_id, text=text, result_mask=mask)
    db.add(g)
    db.flush()
    return g

def count_guesses(db: Session, game_id: int) -> int:
    return db.query(func.count(Guess.id)).filter(Guess.game_id == game_id).scalar() or 0
