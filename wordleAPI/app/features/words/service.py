from sqlalchemy.orm import Session
from typing import Iterable

from .models import Word
from . import repository as repo

def pick_solution(db: Session) -> Word:
    return repo.get_random_word(db)

def ensure_upper_5(text: str) -> str:
    t = text.upper()
    if len(t) != 5 or not t.isalpha():
        raise ValueError("word must be 5 alphabetic chars")
    return t

def word_exists(db: Session, text: str) -> bool:
    return repo.exists_word(db, ensure_upper_5(text))

def find_words(db: Session, q: str | None, limit: int = 50, offset: int = 0):
    if limit > 100:  
        limit = 100
    return repo.list_words(db, q, limit, offset)

def bulk_upsert(db: Session, words: Iterable[str]):
    created = repo.bulk_upsert_words(db, words)
    return created
