balance = 0.0
def add_income():
    global balance
    try:
        amount = float(input("Enter the income amount (ETB): "))
        balance = balance + amount
        print("money added!")
    except ValueError:
        print("Invalid input. Please enter a valid number.")

def add_expense():
    global balance
    try:
        amount = float(input("Enter the expense amount (ETB): "))
        if amount > balance:
            print("Insufficient funds. Cannot add this expense.")
        else:
            balance = balance - amount
            print("Expense added!")
    except ValueError:
        print("Invalid input. Please enter a valid number.")

def show_balance():
    print(f"you bank has:{balance}etb")
while True:
    print("\n--- Simple Banking System ---")
    print("1. Add Income")
    print("2. Add Expense")
    print("3. Show Balance")
    print("4. Exit")

    choice = input("Choose an option (1-4): ")

    if choice == '1':
        add_income()
    elif choice == '2':
        add_expense()
    elif choice == '3':
        show_balance()
    elif choice == '4':
        print("Exiting the program. Goodbye!")
        break
    else:
        print("Invalid choice. Please select a valid option.")
