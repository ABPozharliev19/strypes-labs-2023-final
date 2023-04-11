from elasticsearch_dsl import Search


def agg_to_dict(aggs):
    return {agg.key: agg.doc_count for agg in aggs}


def to_dict(query: Search):
    results = []
    for result in query:
        results.append(result.to_dict())

    facets = {
        "categories": agg_to_dict(query.aggregations.categories.buckets),
        "vendors": agg_to_dict(query.aggregations.vendors.buckets),
        "price": agg_to_dict(query.aggregations.price_ranges.buckets),
    }

    return {
        "results": results,
        "facets": facets
    }