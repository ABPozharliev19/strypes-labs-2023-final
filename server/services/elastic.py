from elasticsearch_dsl import Search, Q

from server.models.elastic import client


class ElasticService:
    @staticmethod
    def _get_search() -> Search:
        return Search(using=client, index="listings")

    @staticmethod
    def _add_aggregations(query: Search):
        query.aggs.bucket("categories", "terms", field="category")
        query.aggs.bucket("vendors", "terms", field="source_name")
        query.aggs.bucket("price_ranges", "range", field="price", ranges=[
            {"to": 100.0},
            {"from": 100.0, "to": 200.0},
            {"from": 200.0}
        ])

    @staticmethod
    def search(text: str, params: dict | None):
        base = ElasticService._get_search() \
            .query(Q({
                "multi_match": {
                    "fields": ["name", "description^0.33"],
                    "query": text,
                    "fuzziness": "1"
                }
            }))

        # if params is not None:
        #     if "category" in params and params["category"] is not None and len(params["category"]) > 0:
        #         base = base.query(Q({
        #             "terms": {
        #                 "category": params["category"]
        #             }
        #         }))
        #
        #     if "vendor" in params and params["vendor"] is not None and len(params["vendor"]) > 0:
        #         base = base.query(Q({
        #             "terms": {
        #                 "source_name": params["vendor"]
        #             }
        #         }))

        ElasticService._add_aggregations(base)

        print(base.to_dict())

        base = base[0: base.count()]
        return base.execute()


