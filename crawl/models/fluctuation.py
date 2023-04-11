import datetime

from sqlalchemy import Integer, String, DateTime, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class Fluctuation(Base):
    __tablename__ = "fluctuations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    listing_id: Mapped[int] = mapped_column(ForeignKey("listings.id"))
    type: Mapped[str] = mapped_column(String(128), nullable=False)
    previous: Mapped[str] = mapped_column(String(256), nullable=False)
    new: Mapped[str] = mapped_column(String(256), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


