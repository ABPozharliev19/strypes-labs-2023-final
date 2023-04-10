import re

import scrapy
from scrapy.http import Response

from crawl.items import CrawlItem
from crawl.utils import _str, _price
import crawl.models.Source


class RobotevSpider(scrapy.Spider):
    name = "robotev"
    url = "https://www.robotev.com/"
    start_urls = ["https://www.robotev.com/index.php?cPath=1_48&page=1"]

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url=url,
                callback=self.extract_urls
            )

    def extract_urls(self, response: Response):
        urls = response.xpath("//*[@id='Page']/table[1]/tr/td[@class='productListing-data']/a/@href").getall()

        for url in urls:
            yield scrapy.Request(
                url=url,
                callback=self.extract_info
            )

        # Handle pagination
        base_pagination = response.xpath("//*[@id='Page']/table[2]/tr/td[@class='smallText'][2]")

        prev_page = base_pagination.xpath("./a/u[translate(text(), '0123456789', '') = '']/text()").get()
        [url, current_page] = response.url.split("&page=")

        if int(prev_page) > int(current_page):
            yield scrapy.Request(
                url=url + f"&page={int(current_page) + 1}",
                callback=self.extract_urls
            )

    def extract_info(self, response: Response):
        item = CrawlItem()

        base = response.xpath("//form[@name='cart_quantity']")

        name = base.xpath("./*[@class='ProductName']/text()").get()
        price = base.xpath("./*[@class='ProductPrice']/text()").getall()
        image = base.xpath(".//div/a/img/@src").get()
        description = base.xpath("./p//text() | ./ul//text()").getall()

        product_id = re.search(r".*products_id=([a-zA-z0-9]+).*", response.url)

        if product_id:
            product_id = product_id.group(1)

        item["url"] = response.url
        item["name"] = _str(name)
        item["price"] = 2
        item["image"] = self.url + image if image is not None else None
        item["properties"] = {
            "description": _str(description),
            "product_id": product_id,
        }

        if response.url.find("shopping_cart") == -1:
            yield item
