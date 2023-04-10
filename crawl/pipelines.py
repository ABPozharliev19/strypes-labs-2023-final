import os
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from crawl.models.Base import Base
from crawl.models.Listing import Listing
from crawl.models.Source import Source
from crawl.models.Fluctuation import Fluctuation

from .items import CrawlItem


class CrawlPipeline:
    def __init__(self):
        self.engine = create_engine(
            f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@"
            f"{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
        )
        self.session = Session(self.engine)

        Base.metadata.create_all(self.engine)

    def process_item(self, item: CrawlItem, spider):
        db_item = self.session.query(Listing) \
            .join(Source, Listing.source_id == Source.id) \
            .filter(
                Listing.name.like(item.get("name")),
                Source.name.like(spider.name)
            )

        if spider.name == "robotev":
            db_item.filter(
                Listing.url.like(f"products_id={item.get('properties', {}).get('product_id')}")
            )

        db_item = db_item.first()

        if not bool(db_item):
            source = self.session.query(Source) \
                .filter(
                    Source.name.like(spider.name)
                ) \
                .one()

            new_item = Listing(
                source_id=source.id,
                name=item.get("name"),
                url=item.get("url"),
                price=item.get("price"),
                category=item.get("category"),
                image=item.get("image"),
                properties=item.get("properties"),
            )
            self.session.add(new_item)
            self.session.commit()

        else:
            if db_item.price != item.get("price"):
                fluctuation = Fluctuation(
                    listing_id=db_item.id,
                    type="price",
                    previous=db_item.price,
                    new=item.get("price")
                )
                self.session.add(fluctuation)

            db_item.price = item.get("price")
            db_item.category = item.get("category")
            db_item.image = item.get("image")
            db_item.properties = item.get("properties")
            db_item.updated_at = datetime.now()

            self.session.commit()

