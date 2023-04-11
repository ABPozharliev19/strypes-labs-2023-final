from fastapi import APIRouter

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
    return session.query(Listing) \
        .where(Listing.price is not None) \
        .order_by(Listing.price.desc()) \
        .all()


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
