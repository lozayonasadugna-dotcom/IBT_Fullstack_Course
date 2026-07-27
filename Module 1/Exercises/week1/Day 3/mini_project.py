# ==========================================
# Full Program - Inventory Manager
# ==========================================

FILENAME = "stock.txt"
stock = {}


def load_from_file():
    """Loads inventory from stock.txt into the dictionary."""
    global stock
    try:
        stock = {}
        with open(FILENAME, "r") as f:
            for line in f:
                if line.strip():
                    item, qty = line.strip().split(",")
                    stock[item] = int(qty)
        print("Inventory loaded successfully from file!")
    except FileNotFoundError:
        print("File not found! Starting with an empty inventory.")


def save_to_file():
    """Saves the current inventory dictionary to stock.txt."""
    with open(FILENAME, "w") as f:
        for item, qty in stock.items():
            f.write(f"{item},{qty}\n")
    print("Inventory saved to file successfully!")


# --- Main Menu Loop ---

# Auto-load existing file at startup if available
load_from_file()

while True:
    print("\n==============================")
    print("      INVENTORY MANAGER       ")
    print("==============================")
    print("1. Add new product")
    print("2. Update quantity")
    print("3. View all products")
    print("4. Save to file")
    print("5. Load from file")
    print("6. Exit")

    choice = input("\nSelect an option (1-6): ").strip()

    if choice == "1":
        # Add new product
        product_name = input("Enter new product name: ").strip().capitalize()
        if product_name in stock:
            print("Product already exists! Use option 2 to update quantity.")
        else:
            try:
                quantity = int(input("Enter initial quantity: "))
                stock[product_name] = quantity
                print(f"Added '{product_name}' with quantity {quantity}.")
            except ValueError:
                print("Invalid quantity! Please enter a number.")

    elif choice == "2":
        # Update quantity
        product_name = input("Enter product name: ").strip().capitalize()
        if product_name in stock:
            try:
                amount = int(
                    input(
                        "Enter quantity change (+ to add, - to subtract): "
                    )
                )
                stock[product_name] = stock.get(product_name, 0) + amount
                print(
                    f"Updated '{product_name}'. New total: {stock[product_name]}"
                )
            except ValueError:
                print("Invalid amount! Please enter a number.")
        else:
            print("Product not found in inventory!")

    elif choice == "3":
        # View all products
        if not stock:
            print("The inventory is currently empty.")
        else:
            print("\n--- Current Inventory ---")
            for product, qty in stock.items():
                print(f"* {product}: {qty}")

    elif choice == "4":
        # Save to file
        save_to_file()

    elif choice == "5":
        # Load from file
        load_from_file()

    elif choice == "6":
        # Exit
        print("Exiting Inventory Manager. Goodbye!")
        break

    else:
        print("Invalid choice! Please select a number between 1 and 6.")