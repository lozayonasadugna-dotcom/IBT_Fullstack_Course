# ==========================================
# Loza's Smart Bank Management System
# Mini Project
# Created by: Loza Yonas
# ==========================================

accounts = {}
transactions = []


# -----------------------------
# Bank Account Class
# -----------------------------
class BankAccount:

    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.balance = balance


# -----------------------------
# Create Account
# -----------------------------
def create_account():

    print("\n===== Create New Account =====")

    owner = input("Enter customer name: ")

    account_number = input("Enter account number (Example ACC1001): ").upper()

    if account_number in accounts:
        print("This account already exists.")
        return

    try:
        balance = float(input("Enter opening balance (ETB): "))

        if balance < 0:
            print("Balance cannot be negative.")
            return

    except ValueError:
        print("Please enter numbers only.")
        return

    new_account = BankAccount(owner, account_number, balance)

    accounts[account_number] = new_account

    transactions.append(owner + " created a new account.")

    print("Account created successfully!")


# -----------------------------
# Deposit Money
# -----------------------------
def deposit_money():

    print("\n===== Deposit Money =====")

    account_number = input("Enter account number: ").upper()

    if account_number not in accounts:
        print("Account not found.")
        return

    try:
        amount = float(input("Enter deposit amount: "))

    except ValueError:
        print("Invalid amount.")
        return

    if amount <= 0:
        print("Amount must be greater than zero.")
        return

    accounts[account_number].balance += amount

    transactions.append(
        accounts[account_number].owner +
        " deposited " +
        str(amount) +
        " ETB"
    )

    print("Deposit successful.")
    print("Current Balance:", accounts[account_number].balance, "ETB")


# -----------------------------
# Withdraw Money
# -----------------------------
def withdraw_money():

    print("\n===== Withdraw Money =====")

    account_number = input("Enter account number: ").upper()

    if account_number not in accounts:
        print("Account not found.")
        return

    try:
        amount = float(input("Enter withdrawal amount: "))

    except ValueError:
        print("Invalid amount.")
        return

    if amount <= 0:
        print("Amount must be greater than zero.")
        return

    if amount > accounts[account_number].balance:
        print("Insufficient balance.")
        return

    accounts[account_number].balance -= amount

    transactions.append(
        accounts[account_number].owner +
        " withdrew " +
        str(amount) +
        " ETB"
    )

    print("Withdrawal successful.")
    print("Current Balance:", accounts[account_number].balance, "ETB")


# -----------------------------
# Check Balance
# -----------------------------
def check_balance():

    print("\n===== Check Balance =====")

    account_number = input("Enter account number: ").upper()

    if account_number not in accounts:
        print("Account not found.")
        return

    account = accounts[account_number]

    print("\nCustomer Name :", account.owner)
    print("Account Number:", account.account_number)
    print("Balance:", account.balance, "ETB")
    # -----------------------------
# Transfer Money
# -----------------------------
def transfer_money():

    print("\n===== Transfer Money =====")

    sender = input("Enter sender account number: ").upper()

    if sender not in accounts:
        print("Sender account not found.")
        return

    receiver = input("Enter receiver account number: ").upper()

    if receiver not in accounts:
        print("Receiver account not found.")
        return

    if sender == receiver:
        print("You cannot transfer to the same account.")
        return

    try:
        amount = float(input("Enter amount to transfer: "))

    except ValueError:
        print("Invalid amount.")
        return

    if amount <= 0:
        print("Amount must be greater than zero.")
        return

    if amount > accounts[sender].balance:
        print("Insufficient balance.")
        return

    accounts[sender].balance -= amount
    accounts[receiver].balance += amount

    transactions.append(
        accounts[sender].owner +
        " transferred " +
        str(amount) +
        " ETB to " +
        accounts[receiver].owner
    )

    print("Transfer completed successfully.")


# -----------------------------
# View All Accounts
# -----------------------------
def view_all_accounts():

    print("\n===== All Accounts =====")

    if len(accounts) == 0:
        print("No accounts available.")
        return

    for account in accounts.values():

        print("----------------------------")
        print("Customer :", account.owner)
        print("Account  :", account.account_number)
        print("Balance  :", account.balance, "ETB")

    print("----------------------------")


# -----------------------------
# Search Account
# -----------------------------
def search_account():

    print("\n===== Search Account =====")

    account_number = input("Enter account number: ").upper()

    if account_number in accounts:

        account = accounts[account_number]

        print("Customer Name :", account.owner)
        print("Account Number:", account.account_number)
        print("Balance        :", account.balance, "ETB")

    else:
        print("Account not found.")


# -----------------------------
# Delete Account
# -----------------------------
def delete_account():

    print("\n===== Delete Account =====")

    account_number = input("Enter account number: ").upper()

    if account_number not in accounts:
        print("Account not found.")
        return

    customer = accounts[account_number].owner

    del accounts[account_number]

    transactions.append(customer + "'s account was deleted.")

    print("Account deleted successfully.")


# -----------------------------
# Change Customer Name
# -----------------------------
def change_customer_name():

    print("\n===== Change Customer Name =====")

    account_number = input("Enter account number: ").upper()

    if account_number not in accounts:
        print("Account not found.")
        return

    new_name = input("Enter new customer name: ")

    old_name = accounts[account_number].owner

    accounts[account_number].owner = new_name

    transactions.append(
        old_name +
        " changed name to " +
        new_name
    )

    print("Customer name updated successfully.")
    # -----------------------------
# Transaction History
# -----------------------------
def show_transactions():

    print("\n===== Transaction History =====")

    if len(transactions) == 0:
        print("No transactions available.")
        return

    number = 1

    for transaction in transactions:
        print(str(number) + ".", transaction)
        number += 1


# -----------------------------
# Bank Statistics
# -----------------------------
def bank_statistics():

    print("\n===== Bank Statistics =====")

    total_customers = len(accounts)
    total_money = 0

    richest_customer = ""
    highest_balance = 0

    if total_customers == 0:
        print("No accounts available.")
        return

    for account in accounts.values():

        total_money += account.balance

        if account.balance > highest_balance:
            highest_balance = account.balance
            richest_customer = account.owner

    average_balance = total_money / total_customers

    print("Total Customers :", total_customers)
    print("Total Money     :", total_money, "ETB")
    print("Average Balance :", round(average_balance, 2), "ETB")
    print("Richest Customer:", richest_customer)
    print("Highest Balance :", highest_balance, "ETB")


# -----------------------------
# Main Menu
# -----------------------------
def menu():

    while True:

        print("\n")
        print("====================================")
        print("  LOZA'S SMART BANK MANAGEMENT")
        print("====================================")
        print("1. Create Account")
        print("2. Deposit Money")
        print("3. Withdraw Money")
        print("4. Check Balance")
        print("5. Transfer Money")
        print("6. View All Accounts")
        print("7. Search Account")
        print("8. Delete Account")
        print("9. Change Customer Name")
        print("10. Transaction History")
        print("11. Bank Statistics")
        print("12. Exit")

        choice = input("\nEnter your choice: ")

        if choice == "1":
            create_account()

        elif choice == "2":
            deposit_money()

        elif choice == "3":
            withdraw_money()

        elif choice == "4":
            check_balance()

        elif choice == "5":
            transfer_money()

        elif choice == "6":
            view_all_accounts()

        elif choice == "7":
            search_account()

        elif choice == "8":
            delete_account()

        elif choice == "9":
            change_customer_name()

        elif choice == "10":
            show_transactions()

        elif choice == "11":
            bank_statistics()

        elif choice == "12":

            print("\n====================================")
            print(" Thank you for using my project!")
            print(" Created by: Loza Yonas")
            print(" Have a great day!")
            print("====================================")

            break

        else:
            print("Invalid choice. Please try again.")


# -----------------------------
# Start the Program
# -----------------------------
print("====================================")
print(" Welcome to Loza's Smart Bank")
print(" Management System")
print("====================================")

menu()