from typing import Literal
from pydantic import BaseModel

class GameCreate(BaseModel):
    pass

class GameOut(BaseModel):
    id: int
    status: Literal["playing", "won", "lost"]
    attempts_left: int
    solution_len: int = 5
