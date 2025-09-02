from sqlalchemy.orm import Session
from .repository import create_game as repo_create, get_game as repo_get, count_guesses

def start_game(db: Session):
    return repo_create(db)

def get_game_state(db: Session, game_id: int):
    game = repo_get(db, game_id)
    if not game:
        return None
    attempts_used = count_guesses(db, game_id)
    return {
        "id": game.id,
        "status": game.status.value,
        "attempts_left": max(game.max_attempts - attempts_used, 0),
        "solution_len": 5,
    }
