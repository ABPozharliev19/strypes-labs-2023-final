from typing import List

from fastapi_camelcase import CamelModel


class SearchRequest(CamelModel):
    search_text: str | None = None
    category: List[str] | None = None
    vendor: List[str] | None = None