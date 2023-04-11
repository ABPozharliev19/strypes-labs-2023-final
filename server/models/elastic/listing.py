from elasticsearch import Elasticsearch
from elasticsearch_dsl import Document, Text, Integer, Keyword, Float, Object, analyzer, connections

connections.create_connection(hosts=["elasticsearch"])


class Listing(Document):
    identifier = Integer()
    name = Text()
    url = Text()
    price = Float()
    category = Keyword()
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


Listing.init()