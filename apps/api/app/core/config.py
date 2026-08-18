from __future__ import annotations

from dataclasses import dataclass
from os import getenv


def _parse_csv(value: str | None) -> list[str]:
  if not value:
    return []

  return [item.strip() for item in value.split(",") if item.strip()]


@dataclass(frozen=True)
class Settings:
  api_cors_origins: tuple[str, ...]

  @classmethod
  def load(cls) -> Settings:
    origins = _parse_csv(getenv("API_CORS_ORIGINS", "http://localhost:3000"))
    return cls(api_cors_origins=tuple(origins))

  @property
  def allowed_origins(self) -> list[str]:
    return list(dict.fromkeys(self.api_cors_origins))


settings = Settings.load()
