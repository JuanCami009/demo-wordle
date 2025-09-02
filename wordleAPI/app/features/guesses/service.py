from sqlalchemy.orm import Session
from sqlalchemy import func
from app.features.games.models import Game, GameStatus
from app.features.words.models import Word
from .repository import insert_guess, count_guesses

def _evaluate_guess(solution: str, guess: str) -> str:
   
    n = len(guess)
    res = ["B"] * n
    remaining = {}

    for i in range(n):
        if guess[i] == solution[i]:
            res[i] = "G"
        else:
            remaining[solution[i]] = remaining.get(solution[i], 0) + 1

    for i in range(n):
        if res[i] == "G":
            continue
        ch = guess[i]
        cnt = remaining.get(ch, 0)
        if cnt > 0:
            res[i] = "Y"
            remaining[ch] = cnt - 1
    return "".join(res)

def make_guess(db: Session, game_id: int, guess_text: str):
    game = db.get(Game, game_id)
    if not game:
        return None, 404, "Game not found"
    if game.status != GameStatus.playing:
        return None, 409, "Game already finished"

    guess = guess_text.upper()
    if len(guess) != 5 or not guess.isalpha():
        return None, 400, "Guess must be a 5-letter word"

    exists = db.query(Word.id).filter(Word.text == guess).first()
    if not exists:
        return None, 400, "Invalid word"

    mask = _evaluate_guess(game.solution.text, guess)
    insert_guess(db, game.id, guess, mask)

    used = count_guesses(db, game.id)
    attempts_left = max(game.max_attempts - used, 0)

    if guess == game.solution.text:
        game.status = GameStatus.won
        game.finished_at = func.now()
    elif attempts_left <= 0:
        game.status = GameStatus.lost
        game.finished_at = func.now()

    db.commit()

    return {
        "mask": list(mask),
        "attempts_left": attempts_left,
        "status": game.status.value,
    }, 201, None
