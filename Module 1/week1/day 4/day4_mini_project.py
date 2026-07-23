# Exercise 10: Addis Bank Account System (V1)


class BankAccount:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            print("\n❌ Error: Deposit amount must be greater than 0.")
            return False
        self._balance += amount
        print(f"\n✅ Deposited {amount:,.2f} ETB. New balance: {self._balance:,.2f} ETB")
        return True

    def withdraw(self, amount):
        if amount <= 0:
            print("\n❌ Error: Withdrawal amount must be greater than 0.")
            return False
        if amount > self._balance:
            print("\n❌ Error: Insufficient funds. Transaction cancelled.")
            return False
        self._balance -= amount
        print(f"\n✅ Withdrew {amount:,.2f} ETB. New balance: {self._balance:,.2f} ETB")
        return True

    def display_info(self):
        print(f"\n--- Account Information ---")
        print(f"Owner Name     : {self.owner}")
        print(f"Account Number : {self.account_number}")
        print(f"Current Balance: {self._balance:,.2f} ETB")


def main():
    accounts = {}  # Dictionary mapping account_number -> BankAccount object

    while True:
        print("\n=================================")
        print("  🏦 ADDIS BANK MANAGEMENT V1 🏦  ")
        print("=================================")
        print("1. Create New Account")
        print("2. Deposit Funds")
        print("3. Withdraw Funds")
        print("4. Check Balance")
        print("5. View Account Details")
        print("6. Exit")
        print("=================================")
        
        choice = input("Select an option (1-6): ").strip()

        if choice == "1":
            owner = input("Enter account owner name: ").strip()
            acc_num = input("Enter account number (e.g., CBE-1001): ").strip()

            if not owner or not acc_num:
                print("\n❌ Error: Owner name and account number cannot be empty.")
                continue

            if acc_num in accounts:
                print("\n❌ Error: An account with this number already exists!")
                continue

            try:
                initial_dep = float(input("Enter initial deposit amount (ETB): "))
                if initial_dep < 0:
                    print("\n❌ Error: Initial deposit cannot be negative.")
                    continue
            except ValueError:
                print("\n❌ Error: Please enter a valid numerical amount.")
                continue

            accounts[acc_num] = BankAccount(owner, acc_num, initial_dep)
            print(f"\n🎉 Account created successfully for {owner}!")

        elif choice in ["2", "3", "4", "5"]:
            acc_num = input("Enter your account number: ").strip()
            
            if acc_num not in accounts:
                print("\n❌ Account not found!")
                continue

            acc = accounts[acc_num]

            if choice == "2":
                try:
                    amount = float(input("Enter deposit amount (ETB): "))
                    acc.deposit(amount)
                except ValueError:
                    print("\n❌ Error: Invalid input.")

            elif choice == "3":
                try:
                    amount = float(input("Enter withdrawal amount (ETB): "))
                    acc.withdraw(amount)
                except ValueError:
                    print("\n❌ Error: Invalid input.")

            elif choice == "4":
                print(f"\n💰 Current Balance for {acc.owner}: {acc.balance:,.2f} ETB")

            elif choice == "5":
                acc.display_info()

        elif choice == "6":
            print("\nThank you for using Addis Bank System! Goodbye! 👋")
            break

        else:
            print("\n❌ Invalid choice! Please select an option between 1 and 6.")


if __name__ == "__main__":
    main()