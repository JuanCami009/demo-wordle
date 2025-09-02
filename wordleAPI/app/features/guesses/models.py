from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, DateTime, ForeignKey, func
from app.db.base import Base

class Guess(Base):
    __tablename__ = "guesses"

    id: Mapped[int] = mapped_column(primary_key=True)
    game_id: Mapped[int] = mapped_column(ForeignKey("games.id"), index=True)
    text: Mapped[str] = mapped_column(String(5))           
    result_mask: Mapped[str] = mapped_column(String(5))    
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
