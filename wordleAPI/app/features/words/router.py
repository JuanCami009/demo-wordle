from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from app.common.deps import get_db
from .schemas import WordOut, BulkUpsertIn, BulkUpsertOut, ExistsOut
from .service import pick_solution, bulk_upsert, word_exists, find_words

router = APIRouter()

@router.get("/random", response_model=WordOut)
def random_word(db: Session = Depends(get_db)):

    w = pick_solution(db)
    return {"id": w.id, "text": w.text}

@router.get("", response_model=List[WordOut])
def list_words(
    q: str | None = Query(default=None, description="Filtro parcial (contiene)"),
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
):
    items = find_words(db, q, limit, offset)
    return [{"id": w.id, "text": w.text} for w in items]

@router.get("/exists", response_model=ExistsOut)
def exists(text: str = Query(..., min_length=5, max_length=5), db: Session = Depends(get_db)):
    try:
        ok = word_exists(db, text)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"exists": ok}

@router.post("/bulk", response_model=BulkUpsertOut, status_code=201)
def bulk_add(payload: BulkUpsertIn, db: Session = Depends(get_db)):
    created = bulk_upsert(db, payload.words)
    return {
        "created": len(created),
        "skipped": len(payload.words) - len(created),
        "total": len(payload.words),
        "items": [{"id": w.id, "text": w.text} for w in created],
    }
