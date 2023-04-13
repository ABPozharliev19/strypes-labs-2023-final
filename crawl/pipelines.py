import os
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from crawl.models.base import Base
from crawl.models.listing import Listing
from crawl.models.source import Source
from crawl.models.fluctuation import Fluctuation

from .items import CrawlItem
from .services import ImageService


class CrawlPipeline:
    def __init__(self):
        self.engine = create_engine(
            f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@"
            f"{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
        )
        self.session = Session(self.engine)

        Base.metadata.create_all(self.engine)

    @staticmethod
    def clean_description(description: str):
        new_description = ""
        for i in range(len(description)):
            if i == 0:
                new_description += description[i]
            else:
                if description[i].isupper() and description[i - 1].islower():
                    new_description += ". " + description[i]
                else:
                    new_description += description[i]

        return new_description

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

            item["properties"]["description"] = CrawlPipeline.clean_description(item["properties"]["description"])

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

            ImageService.save_image(item.get("image"), new_item.id)

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

