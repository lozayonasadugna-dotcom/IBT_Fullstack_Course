# ==========================================
# Level 2: Intermediate Exercises
# ==========================================

# --- Exercise 4: List Operations ---

numbers = [10, 25, 40, 15, 60, 30]

# Print numbers greater than 30
print("Numbers greater than 30:")
for num in numbers:
    if num > 30:
        print(num)

# Sort and print list
numbers.sort()
print("Sorted list:", numbers)

# Sum and Average
total = sum(numbers)
average = total / len(numbers)
print("Sum:", total)
print("Average:", average)


# --- Exercise 5: Dictionary Operations ---

# Product catalog
products = {
    "Laptop": 45000,
    "Phone": 25000,
    "Headphones": 3000,
    "Keyboard": 1500,
    "Mouse": 800
}

# Print each product with price
print("\n--- Product List ---")
for product, price in products.items():
    print(product, ":", price, "ETB")

# Check price with .get()
user_choice = input("\nEnter product name to check price: ")
price = products.get(user_choice, "Product not found")
print("Price:", price)


# --- Exercise 6: List Comprehension ---

# 1 to 20
numbers_1_to_20 = [x for x in range(1, 21)]
print("\nNumbers 1 to 20:", numbers_1_to_20)

# Evens 1 to 30
evens = [x for x in range(1, 31) if x % 2 == 0]
print("Even numbers 1 to 30:", evens)

# Odds 1 to 10
odds = [x for x in range(1, 11) if x % 2 != 0]
print("Odd numbers 1 to 10:", odds)


# --- Exercise 7: Modules & Import ---

# Import add_tax from utils.py
from utils import add_tax

item_price = 100
price_with_tax = add_tax(item_price)

print("\nOriginal price:", item_price)
print("Price with tax:", price_with_tax)