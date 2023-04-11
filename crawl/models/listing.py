from sqlalchemy import Integer, String, Float, JSON, ForeignKey, event
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, TimestampMixin

from crawl import es


class Listing(Base, TimestampMixin):
    __tablename__ = "listings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    source_id: Mapped[int] = mapped_column(ForeignKey("sources.id"))
    name: Mapped[str] = mapped_column(String, nullable=False)
    url: Mapped[str] = mapped_column(String, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=True)
    category: Mapped[str] = mapped_column(String, nullable=True)
    image: Mapped[str] = mapped_column(String, nullable=False)
    properties: Mapped[dict] = mapped_column(JSON, nullable=False)


@event.listens_for(Listing, "after_insert")
def create_listing(mapper, connection, target):
    es.Listing.on_create(target, connection)


@event.listens_for(Listing, "after_update")
def create_listing(mapper, connection, target):
    es.Listing.on_update(target)
