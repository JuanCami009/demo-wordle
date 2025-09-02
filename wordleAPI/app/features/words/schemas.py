from typing import Annotated, List
from pydantic import BaseModel, Field, field_validator

WordText = Annotated[str, Field(min_length=5, max_length=5, pattern=r"^[A-Za-z]{5}$")]

class WordOut(BaseModel):
    id: int
    text: str

class BulkUpsertIn(BaseModel):
    words: List[WordText]

    @field_validator("words", mode="before")
    @classmethod
    def normalize_and_dedupe(cls, v):
        if not isinstance(v, list):
            raise ValueError("words must be a list")
        cleaned = []
        seen = set()
        for w in v:
            w2 = str(w).upper()
            if len(w2) != 5 or not w2.isalpha():
                raise ValueError(f"invalid word: {w}")
            if w2 not in seen:
                seen.add(w2)
                cleaned.append(w2)
        return cleaned

class BulkUpsertOut(BaseModel):
    created: int
    skipped: int
    total: int
    items: List[WordOut]

class ExistsOut(BaseModel):
    exists: bool
