# utils.py

def add_tax(price, rate=0.15):
    # Accepts a price and adds tax (default 15%)
    return price + (price * rate)