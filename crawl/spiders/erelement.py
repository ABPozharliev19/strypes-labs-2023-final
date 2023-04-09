from typing import Iterator, List
import scrapy
from scrapy.http import Response, Request
from w3lib.html import remove_tags


class ErelementSpider(scrapy.spiders.CrawlSpider):
    name = "erelement"
    start_urls = ['https://erelement.com/raspberry-pi-4']

    URL = "https://erelement.com/"

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

    @staticmethod
    def filter_price(price: str) -> str:
        """
        Filters price by removing spaces and unneeded characters.

        Args:
            price: Unfiltered price.

        Returns:
            price: Filtered price.
        """
        price = price.replace('\n', '')
        price = price.replace('Цена: ', '')
        price = price.replace('лв', '')

        return price

    # TODO: Convert to a normal for loop
    @staticmethod
    def filter_description(description: List[str]) -> str:
        """
        Filters description by removing html tags and spaces.

        Args:
            description: Unfiltered description

        Returns:
            description: Filtered description
        """
        return ''.join([remove_tags(elem).replace('\n', '').replace('\r', '').replace('\t', '').replace(u'\xa0', u' ') for elem in description])

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
            yield Request(url, callback=self.parse, meta = {'dont_redirect': True})

    def parse(self, response: Response):
        name = response.xpath('//*[@id="productName"]/text()').get()
        description = response.xpath('//*[@id="productbox"]').getall()
        price = response.xpath('//*[@id="productPrices"]/text()').get()
        category = response.url.replace(self.URL, '').rsplit('/')[0].rsplit('?')[0]
        image = self.URL + response.xpath('//*[@id="productMainImage"]//a/img/@src').get()
        url = response.url

        item = {
            "name": name,
            "description": self.filter_description(description),
            "price": self.filter_price(price),
            "category": self.filter_category(category),
            "image": image,
            "url": url
        }

        yield item
