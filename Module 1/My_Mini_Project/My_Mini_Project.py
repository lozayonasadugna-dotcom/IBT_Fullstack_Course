# ==========================================
# Loza's Smart Bank Management System
# Mini Project
# Created by: Loza Yonas
# ==========================================

import json

# Dictionary to store all bank accounts
accounts = {}

# List to store transaction history
transactions = []


# -------------------------------
# Bank Account Class
# -------------------------------

class BankAccount:

    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.balance = balance


# -------------------------------
# Create New Account
# -------------------------------

def create_account():

    print("\n------ Create New Account ------")

    owner = input("Enter customer name: ").strip()

    account_number = input("Enter account number (Example: ACC1001): ").strip().upper()

    if account_number in accounts:
        print("Account already exists.")
        return

    try:
        balance = float(input("Enter initial deposit (ETB): "))

        if balance < 0:
            print("Balance cannot be negative.")
            return

    except ValueError:
        print("Please enter a valid amount.")
        return

    new_account = BankAccount(owner, account_number, balance)

    accounts[account_number] = new_account

    transactions.append(f"{owner} created account with {balance:.2f} ETB")

    print("\nAccount created successfully!")


# -------------------------------
# Deposit Money
# -------------------------------

def deposit_money():

    print("\n------ Deposit Money ------")

    account_number = input("Enter account number: ").strip().upper()

    if account_number not in accounts:
        print("Account not found.")
        return

    try:
        amount = float(input("Enter deposit amount (ETB): "))

        if amount <= 0:
            print("Amount must be greater than zero.")
            return

    except ValueError:
        print("Invalid amount.")
        return

    accounts[account_number].balance += amount

    transactions.append(
        f"{accounts[account_number].owner} deposited {amount:.2f} ETB"
    )

    print("Deposit successful.")
    print(f"New Balance: {accounts[account_number].balance:.2f} ETB")


# -------------------------------
# Withdraw Money
# -------------------------------

def withdraw_money():

    print("\n------ Withdraw Money ------")

    account_number = input("Enter account number: ").strip().upper()

    if account_number not in accounts:
        print("Account not found.")
        return

    try:
        amount = float(input("Enter withdrawal amount (ETB): "))

        if amount <= 0:
            print("Amount must be greater than zero.")
            return

    except ValueError:
        print("Invalid amount.")
        return

    if amount > accounts[account_number].balance:
        print("Insufficient balance.")
        return

    accounts[account_number].balance -= amount

    transactions.append(
        f"{accounts[account_number].owner} withdrew {amount:.2f} ETB"
    )

    print("Withdrawal successful.")
    print(f"Remaining Balance: {accounts[account_number].balance:.2f} ETB")


# -------------------------------
# Check Balance
# -------------------------------

def check_balance():

    print("\n------ Check Balance ------")

    account_number = input("Enter account number: ").strip().upper()

    if account_number not in accounts:
        print("Account not found.")
        return

    account = accounts[account_number]

    print("\nCustomer Name :", account.owner)
    print("Account Number:", account.account_number)
    print(f"Current Balance: {account.balance:.2f} ETB")
    # -------------------------------
# View All Accounts
# -------------------------------

def view_all_accounts():

    print("\n------ All Bank Accounts ------")

    if len(accounts) == 0:
        print("No accounts found.")
        return

    for account in accounts.values():
        print("--------------------------------")
        print("Customer Name :", account.owner)
        print("Account Number:", account.account_number)
        print(f"Balance        : {account.balance:.2f} ETB")

    print("--------------------------------")


# -------------------------------
# Search Account
# -------------------------------

def search_account():

    print("\n------ Search Account ------")

    account_number = input("Enter account number: ").strip().upper()

    if account_number in accounts:

        account = accounts[account_number]

        print("\nAccount Found")
        print("Customer Name :", account.owner)
        print("Account Number:", account.account_number)
        print(f"Balance        : {account.balance:.2f} ETB")

    else:
        print("Account not found.")


# -------------------------------
# Delete Account
# -------------------------------

def delete_account():

    print("\n------ Delete Account ------")

    account_number = input("Enter account number: ").strip().upper()

    if account_number not in accounts:
        print("Account not found.")
        return

    customer = accounts[account_number].owner

    del accounts[account_number]

    transactions.append(f"{customer}'s account was deleted.")

    print("Account deleted successfully.")


# -------------------------------
# Transaction History
# -------------------------------

def show_transactions():

    print("\n------ Transaction History ------")

    if len(transactions) == 0:
        print("No transactions available.")
        return

    count = 1

    for item in transactions:
        print(f"{count}. {item}")
        count += 1


# -------------------------------
# Bank Statistics
# -------------------------------

def bank_statistics():

    print("\n------ Bank Statistics ------")

    total_money = 0

    richest_customer = None

    highest_balance = 0

    for account in accounts.values():

        total_money += account.balance

        if account.balance > highest_balance:
            highest_balance = account.balance
            richest_customer = account.owner

    print(f"Total Customers : {len(accounts)}")
    print(f"Total Money     : {total_money:.2f} ETB")

    if richest_customer:
        print(f"Highest Balance : {richest_customer} ({highest_balance:.2f} ETB)")
    else:
        print("No customers yet.")


# -------------------------------
# Change Customer Name
# -------------------------------

def change_customer_name():

    print("\n------ Change Customer Name ------")

    account_number = input("Enter account number: ").strip().upper()

    if account_number not in accounts:
        print("Account not found.")
        return

    new_name = input("Enter new customer name: ").strip()

    old_name = accounts[account_number].owner

    accounts[account_number].owner = new_name

    transactions.append(
        f"{old_name} changed name to {new_name}"
    )

    print("Customer name updated successfully.")
    # -------------------------------
# Save Accounts to JSON File
# -------------------------------

def save_accounts():

    data = {}

    for acc_num, account in accounts.items():
        data[acc_num] = {
            "owner": account.owner,
            "balance": account.balance
        }

    try:
        with open("accounts.json", "w") as file:
            json.dump(data, file, indent=4)

        print("Accounts saved successfully.")

    except Exception:
        print("Error while saving data.")


# -------------------------------
# Load Accounts from JSON File
# -------------------------------

def load_accounts():

    global accounts

    try:

        with open("accounts.json", "r") as file:
            data = json.load(file)

        accounts = {}

        for acc_num, info in data.items():
            accounts[acc_num] = BankAccount(
                info["owner"],
                acc_num,
                info["balance"]
            )

        print("Accounts loaded successfully.")

    except FileNotFoundError:
        print("No saved file found.")

    except Exception:
        print("Could not load the file.")


# -------------------------------
# Main Menu
# -------------------------------

def main():

    print("=" * 45)
    print("   Welcome to Loza's Smart Bank")
    print("        Management System")
    print("=" * 45)

    while True:

        print("\n----------- MENU -----------")
        print("1. Create New Account")
        print("2. Deposit Money")
        print("3. Withdraw Money")
        print("4. Check Balance")
        print("5. View All Accounts")
        print("6. Search Account")
        print("7. Delete Account")
        print("8. Change Customer Name")
        print("9. View Transaction History")
        print("10. Bank Statistics")
        print("11. Save Accounts")
        print("12. Load Accounts")
        print("13. Exit")

        choice = input("\nChoose an option (1-13): ").strip()

        if choice == "1":
            create_account()

        elif choice == "2":
            deposit_money()

        elif choice == "3":
            withdraw_money()

        elif choice == "4":
            check_balance()

        elif choice == "5":
            view_all_accounts()

        elif choice == "6":
            search_account()

        elif choice == "7":
            delete_account()

        elif choice == "8":
            change_customer_name()

        elif choice == "9":
            show_transactions()

        elif choice == "10":
            bank_statistics()

        elif choice == "11":
            save_accounts()

        elif choice == "12":
            load_accounts()

        elif choice == "13":

            print("\n===================================")
            print(" Thank you for using my project!")
            print(" Developed by: Loza Yonas")
            print(" Have a wonderful day!")
            print("===================================")

            break

        else:
            print("Invalid choice. Please try again.")


# -------------------------------
# Run the Program
# -------------------------------

if __name__ == "__main__":
    main()