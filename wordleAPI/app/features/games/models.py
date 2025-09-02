from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, DateTime, Integer, Enum, func
import enum

from app.db.base import Base
from app.features.words.models import Word  

class GameStatus(str, enum.Enum):
    playing = "playing"
    won = "won"
    lost = "lost"

class Game(Base):
    __tablename__ = "games"

    id: Mapped[int] = mapped_column(primary_key=True)
    solution_id: Mapped[int] = mapped_column(ForeignKey("words.id"), index=True)
    status: Mapped[GameStatus] = mapped_column(Enum(GameStatus), default=GameStatus.playing, index=True)
    started_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
    finished_at: Mapped["DateTime | None"] = mapped_column(DateTime(timezone=True), nullable=True)
    max_attempts: Mapped[int] = mapped_column(Integer, default=6)

    solution: Mapped["Word"] = relationship()
