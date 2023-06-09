from elasticsearch_dsl import Search


def agg_to_dict(aggs):
    return {agg.key: agg.doc_count for agg in aggs}


def to_dict(query: Search, aggregations: bool = True):
    results = []
    for result in query:
        results.append(result.to_dict())

    if aggregations:
        facets = {
            "categories": agg_to_dict(query.aggregations.categories.buckets),
            "vendors": agg_to_dict(query.aggregations.vendors.buckets),
            "price": agg_to_dict(query.aggregations.price_ranges.buckets),
        }

    base = {
        "results": results
    }

    if aggregations:
        base["facets"] = facets
    return base
