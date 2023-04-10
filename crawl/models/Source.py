from sqlalchemy import event, String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from .Base import Base, TimestampMixin


class Source(Base):
    __tablename__ = "sources"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(128), unique=True)
    url: Mapped[str] = mapped_column(String(128), unique=True)

    data = [
        {
            "id": 1,
            "name": "erelement",
            "url": "https://erelement.com"
        },
        {
            "id": 2,
            "name": "robotev",
            "url": "https://www.robotev.com"
        },
        {
            "id": 3,
            "name": "mobilestore",
            "url": "https://www.mobilestore.bg"
        }
    ]

    @staticmethod
    def init_data(target, connection, **kwargs):
        table_name = str(target)

        if table_name == Source.__tablename__:
            connection.execute(target.insert(), Source.data)


event.listen(Source.__table__, "after_create", Source.init_data)