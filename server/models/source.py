from sqlalchemy import event, String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class Source(Base):
    __tablename__ = "sources"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(128), unique=True)
    url: Mapped[str] = mapped_column(String(128), unique=True)