from functools import lru_cache
from typing import List, Optional
import json

from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator, computed_field


class Settings(BaseSettings):
    # --- Base de datos (siempre localhost) ---
    # Formato SQLAlchemy: dialect+driver://user:password@host:port/dbname
    # Usamos el driver psycopg (Psycopg 3) para PostgreSQL.
    DATABASE_URL: str = "postgresql+psycopg://wordle:wordle@localhost:5432/wordle"

    # --- CORS ---
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173"]

    # --- Otros ---
    DEBUG: bool = True

    # Cargar variables desde .env (puedes cambiar el nombre si quieres)
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
    )

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def _parse_origins(cls, v):
        # Acepta lista JSON o CSV en .env
        if isinstance(v, str):
            s = v.strip()
            if s.startswith("["):  # JSON list
                try:
                    return json.loads(s)
                except Exception:
                    pass
            return [p.strip() for p in s.split(",") if p.strip()]
        return v

    @computed_field
    @property
    def database_url(self) -> str:
        # Alias conveniente si tu código usa settings.database_url
        return self.DATABASE_URL


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
