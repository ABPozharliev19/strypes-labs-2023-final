from fastapi import FastAPI

from .routes.listings import listing_router

app = FastAPI()

app.include_router(listing_router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
