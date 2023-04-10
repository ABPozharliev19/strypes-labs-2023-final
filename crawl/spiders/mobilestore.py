import scrapy
from scrapy.http import Response

from crawl.utils import _str, _price
from crawl.items import CrawlItem


class MobilestoreSpider(scrapy.Spider):
    name = "mobilestore"
    start_urls = ["https://www.mobilestore.bg/Raspberry-Pi"]
    url = "https://www.mobilestore.bg"

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url=url,
                callback=self.extract_urls
            )

    def extract_urls(self, response: Response):
        urls = response.xpath("//*[@id='content']/div[@class='row']") \
            .xpath("./div[contains(@class, 'product-layout')]/div/div/a/@href") \
            .getall()

        for url in urls:
            yield scrapy.Request(
                url=url,
                callback=self.extract_info
            )

    def extract_info(self, response: Response):
        item = CrawlItem()

        name = response.xpath("//div/h1/text()").get()
        description = response.xpath("//div[@class='tab-content']/div[@id='tab-description']/p//text()").getall()
        price = response.xpath("//div/ul[2]/li/h2/text()").get()
        image = response.xpath("//ul[@class='thumbnails']/li[not(@class)]/a/img/@src").get()
        additional_images = response.xpath("//ul[@class='thumbnails']/li[@class='image-additional']/a/img/@src").getall()

        item["url"] = response.url
        item["name"] = name
        item["price"] = _price(price)
        item["image"] = image
        item["properties"] = {
            "description": _str(description),
            "images": additional_images
        }

        yield item


