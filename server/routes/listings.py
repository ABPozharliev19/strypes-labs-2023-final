from fastapi import APIRouter
from fastapi.responses import FileResponse

from server.models.listing import Listing
from server.models.base import session

from server.types.search import SearchRequest
from server.services.elastic import ElasticService
from server.utils.elastic_to_dict import to_dict

listing_router = APIRouter(
    prefix="/listing",
    tags=["listings"],
    responses={404: {"description": "Not found"}},
)


@listing_router.get("/")
async def get_listings():
    return {
        "results": session.query(Listing) \
            .where(Listing.price is not None) \
            .order_by(Listing.price.desc()) \
            .all()
    }


@listing_router.post("/")
async def search_listings(data: SearchRequest):
    results = ElasticService.search(
        data.search_text,
        {
            "category": data.category,
            "vendor": data.vendor,
        }
    )

    return to_dict(results)


@listing_router.get("/{identifier}")
async def get_listing(identifier: int):
    results = ElasticService.get(identifier)
    base = to_dict(results, aggregations=False)

    if len(base["results"]) > 0:
        base["results"] = base["results"][0]

    return base


@listing_router.get("/similar/{name}")
async def get_similar_listings(name: str):
    results = ElasticService.similar_results(name)
    base = to_dict(results, aggregations=False)

    return base


@listing_router.get("/bonus/{category}")
async def get_similar_listings(category: str):
    results = ElasticService.bonus_results(category)
    base = to_dict(results, aggregations=False)

    return base



@listing_router.get("/image/{identifier}")
async def get_image(identifier: int):
    return FileResponse(f"images/{identifier}.png")


