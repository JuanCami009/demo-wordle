from sqlalchemy.orm import Session
from sqlalchemy import func

from app.features.words.models import Word
from .models import Game

def create_game(db: Session) -> Game:
    solution = db.query(Word).order_by(func.random()).limit(1).one()
    game = Game(solution_id=solution.id)
    db.add(game)
    db.commit()
    db.refresh(game)
    return game

def get_game(db: Session, game_id: int) -> Game | None:
    return db.get(Game, game_id)

def count_guesses(db: Session, game_id: int) -> int:
    from app.features.guesses.models import Guess
    return db.query(Guess).filter(Guess.game_id == game_id).count()
