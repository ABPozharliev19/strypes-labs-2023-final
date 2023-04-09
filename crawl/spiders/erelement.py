from typing import Iterator, List

import scrapy
from scrapy.http import Response, Request

from crawl.items import CrawlItem
from crawl.utils import _str, _price


class ErelementSpider(scrapy.spiders.CrawlSpider):
    name = "erelement"
    url = "https://erelement.com/"
    start_urls = ['https://erelement.com/raspberry-pi-4']

    categories = {
        'raspberry-pi': [
            'raspberry-pi-4-2gb', 'raspberry-pi-4-4gb', 'raspberry-pi-4-8gb'
        ],
        'accessories': [
            'mini-pc', 'displays', 'raspberry-pi',
        ],
        'others': [
            'power-supplies', 'components', 'adafruit-motor-pihat', 'wireless', 'programmers-usb-modules', 'servos', 'motor-control', 'microbit'
        ]
    }

    def filter_category(self, category: str) -> str:
        """
        Filters categories by using pre-defined categories.

        Args:
            category: The unfiltered category

        Returns:
            category: The filtered category
        """
        for key, categories in self.categories.items():
            if category in categories:
                return key

        # Default case
        return 'others'

    def start_requests(self) -> Iterator[Request]:
        """
        Goes through every url and calls get_urls on every one

        Returns:
            request
        """
        for url in self.start_urls:
            yield Request(url, callback=self.get_urls)

    def get_urls(self, response: Response) -> Iterator[Request]:
        """
        Finds all urls of items and calls parse on them.

        Args:
            response

        Returns:
            request
        """
        urls = response.xpath('//td/a/@href').getall()
        urls = [url for url in urls if url.find('buy_now') == -1]
        for url in urls:
            yield Request(url, callback=self.parse, meta={'dont_redirect': True})

    def parse(self, response: Response):
        item = CrawlItem()

        name = response.xpath('//*[@id="productName"]/text()').get()
        description = response.xpath('//*[@id="productbox"]//text()').getall()
        price = response.xpath('//*[@id="productPrices"]/text()').get()
        category = response.url.replace(self.url, '').rsplit('/')[0].rsplit('?')[0]
        image = self.url + response.xpath('//*[@id="productMainImage"]//a/img/@src').get()
        url = response.url

        item['name'] = name
        item['url'] = url
        item['price'] = _price(price)
        item['category'] = self.filter_category(category)
        item['image'] = image
        item['properties'] = {
            'description': _str(description),
        }

        yield item
