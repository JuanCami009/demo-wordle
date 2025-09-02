from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Iterable, List

from .models import Word

def get_random_word(db: Session) -> Word:
    return db.query(Word).order_by(func.random()).limit(1).one()

def exists_word(db: Session, text: str) -> bool:
    return db.query(Word.id).filter(Word.text == text).first() is not None

def list_words(db: Session, q: str | None, limit: int, offset: int) -> List[Word]:
    query = db.query(Word)
    if q:
        query = query.filter(Word.text.ilike(f"%{q.upper()}%"))
    return query.order_by(Word.text.asc()).offset(offset).limit(limit).all()

def bulk_upsert_words(db: Session, words: Iterable[str]) -> list[Word]:

    existing = {w.text for w in db.query(Word).filter(Word.text.in_(list(words))).all()}
    to_create = [Word(text=w) for w in words if w not in existing]
    db.add_all(to_create)
    db.commit()
    for w in to_create:
        db.refresh(w)
    return to_create
