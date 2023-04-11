from elasticsearch import Elasticsearch
from elasticsearch_dsl import connections

connections.create_connection(hosts=["elasticsearch"])
client = Elasticsearch(hosts=["elasticsearch"])
