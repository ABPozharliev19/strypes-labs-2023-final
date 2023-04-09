import scrapy


class CrawlItem(scrapy.Item):
    name = scrapy.Field()
    url = scrapy.Field()
    price = scrapy.Field()
    category = scrapy.Field()
    image = scrapy.Field()
    properties = scrapy.Field()