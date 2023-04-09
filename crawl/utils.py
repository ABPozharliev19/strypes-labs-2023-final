from typing import List
from w3lib.html import remove_tags
from price_parser import Price


def _str(string: List[str] | str) -> str:
    """
    Formats a string
    Args:
        string: The string to be formatted

    Returns:
        The formatted string
    """
    if isinstance(string, str):
        return string \
            .strip() \
            .replace('\n', '') \
            .replace('\r', '') \
            .replace('\t', '') \
            .replace(u'\xa0', u' ')
    elif isinstance(string, list):
        return "".join(
            [remove_tags(x)
                 .strip()
                 .replace('\n', '')
                 .replace('\r', '')
                 .replace('\t', '')
                 .replace(u'\xa0', u' ')
             for x in string]
        )
    return string


def _price(price: List[str | float] | str | float) -> str | float:
    """
    Formats a price
    Args:
        price: The price to be formatted

    Returns:
        The formatted price
    """
    if isinstance(price, str) or isinstance(price, list):
        real_price = Price.fromstring(_str(price).replace('Цена', ''))
        return real_price.amount_float
    elif isinstance(price, float):
        return price
    return price
