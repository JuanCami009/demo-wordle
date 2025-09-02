from typing import Literal, List
from pydantic import BaseModel, Field

MaskChar = Literal["G","Y","B"]

class GuessIn(BaseModel):
    text: str = Field(min_length=5, max_length=5, description="Palabra de 5 letras (se normaliza a MAYÚSCULAS)")

class GuessOut(BaseModel):
    mask: List[MaskChar]
    attempts_left: int
    status: Literal["playing","won","lost"]
