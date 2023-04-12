from elasticsearch import Elasticsearch
from elasticsearch_dsl import Document, Text, Integer, Keyword, Float, Object, connections
from crawl.models.source import Source

connections.create_connection(hosts=["elasticsearch"])
client = Elasticsearch(hosts=["elasticsearch"])


class Listing(Document):
    identifier = Integer()
    name = Keyword()
    url = Text()
    price = Float()
    category = Text(fielddata=True)
    image = Text()
    properties = Object()
    source_id = Integer()
    source_name = Keyword()
    source_url = Keyword()

    class Index:
        name = "listings"
        settings = {
            "number_of_shards": 2
        }

    @classmethod
    def on_create(cls, target, connection):
        new_object = cls()

        new_object.identifier = target.id
        new_object.name = target.name
        new_object.url = target.url
        new_object.price = target.price
        new_object.category = target.category
        new_object.image = target.image
        new_object.properties = target.properties
        new_object.source_id = target.source_id

        source = connection.execute(Source.__table__.select().where(Source.id == target.source_id)).first()

        new_object.source_name = source.name
        new_object.source_url = source.url

        new_object.save()

    @classmethod
    def on_update(cls, target):
        old_object = cls.search().query("match", identifier=target.id).execute()[0]

        old_object.name = target.name
        old_object.url = target.url
        old_object.price = target.price
        old_object.category = target.category
        old_object.image = target.image
        old_object.properties = target.properties
        old_object.source_id = target.source_id

        old_object.save()

Listing.init()