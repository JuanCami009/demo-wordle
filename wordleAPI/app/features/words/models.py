from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, CheckConstraint
from app.db.base import Base

class Word(Base):
    __tablename__ = "words"

    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str] = mapped_column(String(5), unique=True, index=True)

    __table_args__ = (
        CheckConstraint("char_length(text) = 5", name="ck_words_len_5"),
    )
