"""
Addis Bank System - SOLID Principles & Design Patterns Implementation

SOLID Breakdown:
- Single Responsibility (S): Separate classes for Account models, Bank Configuration,
  Observers (SMS/Audit), and User Interface logic.
- Open/Closed (O): Easy to add new account types (e.g., StudentAccount) or new observers
  (e.g., EmailNotifier) without modifying existing core logic.
- Liskov Substitution (L): All account subtypes inherit from abstract Account and honor its contract.
- Interface Segregation (I): Notification observers adhere to a lean, specific interface.
- Dependency Inversion (D): Bank Service depends on abstract Account and Observer interfaces,
  not concrete details.
"""

from abc import ABC, abstractmethod


# ==========================================
# 1. SINGLETON PATTERN: BankConfig
# ==========================================
class BankConfig:
    """
    Singleton class to manage bank-wide rules centrally.
    Ensures only one configuration instance exists across the system.
    """
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BankConfig, cls).__new__(cls)
            # Default bank rules
            cls._instance.interest_rate = 0.07  # 7% annual interest
            cls._instance.overdraft_limit = 500.0  # Max negative balance
            cls._instance.large_withdrawal_threshold = 5000.0  # Triggers alerts
        return cls._instance


# ==========================================
# 2. ACCOUNT CLASSES & FACTORY PATTERN
# ==========================================
class Account(ABC):
    """Abstract Base Account following Liskov Substitution & Open/Closed Principles."""
    def __init__(self, account_number: str, owner: str, balance: float = 0.0):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.balance += amount

    def withdraw(self, amount: float) -> float:
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if not self._can_withdraw(amount):
            raise ValueError("Insufficient funds / Limit exceeded.")
        self.balance -= amount
        return amount

    @abstractmethod
    def _can_withdraw(self, amount: float) -> bool:
        """Encapsulated check overridden by specific account policies."""
        pass

    @abstractmethod
    def apply_interest(self):
        """Feature: Calculate and apply interest easily without breaking core code."""
        pass


class SavingsAccount(Account):
    """Savings Account: cannot overdraw; earns interest configured in BankConfig."""
    def _can_withdraw(self, amount: float) -> bool:
        return self.balance >= amount

    def apply_interest(self):
        config = BankConfig()
        interest = self.balance * config.interest_rate
        self.balance += interest
        print(f"💰 Applied {config.interest_rate * 100}% interest (${interest:.2f}) to Savings Account #{self.account_number}.")


class CheckingAccount(Account):
    """Checking Account: supports overdraft up to BankConfig limit."""
    def _can_withdraw(self, amount: float) -> bool:
        config = BankConfig()
        return (self.balance - amount) >= -config.overdraft_limit

    def apply_interest(self):
        # Checking accounts don't earn interest, but implement the method safely
        print(f"ℹ️ Account #{self.account_number} is Checking (No interest applied).")


class AccountFactory:
    """Factory Pattern: Encapsulates account creation logic (Open/Closed Principle)."""
    @staticmethod
    def create_account(account_type: str, acc_num: str, owner: str, initial_deposit: float) -> Account:
        acc_type_clean = account_type.strip().lower()
        if acc_type_clean == "savings":
            return SavingsAccount(acc_num, owner, initial_deposit)
        elif acc_type_clean == "checking":
            return CheckingAccount(acc_num, owner, initial_deposit)
        else:
            raise ValueError(f"Unknown account type '{account_type}'. Choose 'savings' or 'checking'.")


# ==========================================
# 3. OBSERVER PATTERN: Notifications & Audit
# ==========================================
class Observer(ABC):
    """Abstract Observer interface."""
    @abstractmethod
    def update(self, account: Account, amount: float, transaction_type: str):
        pass


class SMSNotifier(Observer):
    """Concrete Observer: Sends SMS alerts for transactions."""
    def update(self, account: Account, amount: float, transaction_type: str):
        print(f"📱 [SMS ALERT to {account.owner}]: A large {transaction_type} of ${amount:.2f} was processed on account #{account.account_number}. New Balance: ${account.balance:.2f}")


class AuditLogger(Observer):
    """Concrete Observer: Logs high-value transactions for safety."""
    def update(self, account: Account, amount: float, transaction_type: str):
        print(f"📋 [AUDIT LOG]: High-Value Event! {transaction_type.upper()} | Account: {account.account_number} | Amount: ${amount:.2f} | Owner: {account.owner}")


# ==========================================
# 4. BANK SYSTEM MANAGER (Dependency Inversion)
# ==========================================
class AddisBankSystem:
    """
    Main manager coordinating accounts, operations, and observers.
    Depends on abstract interfaces (Account, Observer) rather than concrete implementations.
    """
    def __init__(self):
        self.accounts = {}
        self.observers = []
        self.config = BankConfig()

    def attach_observer(self, observer: Observer):
        """Register transaction event listeners."""
        self.observers.append(observer)

    def _notify_observers(self, account: Account, amount: float, transaction_type: str):
        """Notify observers if transaction exceeds threshold."""
        if amount >= self.config.large_withdrawal_threshold:
            for observer in self.observers:
                observer.update(account, amount, transaction_type)

    def create_account(self, acc_type: str, acc_num: str, owner: str, initial_deposit: float):
        if acc_num in self.accounts:
            raise ValueError(f"Account number '{acc_num}' already exists.")
        account = AccountFactory.create_account(acc_type, acc_num, owner, initial_deposit)
        self.accounts[acc_num] = account
        print(f"✅ Created {acc_type.capitalize()} Account #{acc_num} for {owner} with initial deposit of ${initial_deposit:.2f}.")

    def deposit(self, acc_num: str, amount: float):
        account = self._get_account(acc_num)
        account.deposit(amount)
        print(f"✅ Deposited ${amount:.2f} to #{acc_num}. Current Balance: ${account.balance:.2f}")
        self._notify_observers(account, amount, "Deposit")

    def withdraw(self, acc_num: str, amount: float):
        account = self._get_account(acc_num)
        account.withdraw(amount)
        print(f"✅ Withdrew ${amount:.2f} from #{acc_num}. Current Balance: ${account.balance:.2f}")
        self._notify_observers(account, amount, "Withdrawal")

    def apply_interest_all(self):
        """New Feature: Easily apply interest across all accounts without breaking code."""
        if not self.accounts:
            print("No accounts available.")
            return
        print("\n--- Applying Interest to All Accounts ---")
        for account in self.accounts.values():
            account.apply_interest()

    def display_all_accounts(self):
        if not self.accounts:
            print("No registered accounts.")
            return
        print("\n--- Addis Bank Account Roster ---")
        for acc in self.accounts.values():
            type_str = acc.__class__.__name__
            print(f"• #{acc.account_number} | Owner: {acc.owner} | Type: {type_str} | Balance: ${acc.balance:.2f}")

    def _get_account(self, acc_num: str) -> Account:
        if acc_num not in self.accounts:
            raise KeyError(f"Account #{acc_num} not found.")
        return self.accounts[acc_num]


# ==========================================
# 5. USER INTERFACE (Console Menu)
# ==========================================
def main():
    bank = AddisBankSystem()

    # Register Observers (SMS & Audit Logging)
    bank.attach_observer(SMSNotifier())
    bank.attach_observer(AuditLogger())

    while True:
        print("\n==========================================")
        print("         CLEAN ADDIS BANK SYSTEM          ")
        print("==========================================")
        print("1. Create New Account (Factory Pattern)")
        print("2. Deposit Funds")
        print("3. Withdraw Funds (Triggers Observer if >= $5000)")
        print("4. Apply Interest to All Accounts (New Feature)")
        print("5. View All Accounts")
        print("6. Exit")

        choice = input("Select option (1-6): ").strip()

        if choice == "1":
            acc_type = input("Enter Account Type (savings/checking): ").strip()
            acc_num = input("Enter Unique Account Number (e.g., 1001): ").strip()
            owner = input("Enter Owner Name: ").strip()
            
            while True:
                try:
                    deposit = float(input("Enter Initial Deposit Amount: "))
                    if deposit < 0:
                        print("❌ Amount cannot be negative.")
                        continue
                    break
                except ValueError:
                    print("❌ Please enter a valid numerical amount.")

            try:
                bank.create_account(acc_type, acc_num, owner, deposit)
            except Exception as e:
                print(f"❌ Error: {e}")

        elif choice == "2":
            acc_num = input("Enter Account Number: ").strip()
            while True:
                try:
                    amount = float(input("Enter Deposit Amount: "))
                    break
                except ValueError:
                    print("❌ Please enter a valid numerical amount.")

            try:
                bank.deposit(acc_num, amount)
            except Exception as e:
                print(f"❌ Error: {e}")

        elif choice == "3":
            acc_num = input("Enter Account Number: ").strip()
            while True:
                try:
                    amount = float(input("Enter Withdrawal Amount: "))
                    break
                except ValueError:
                    print("❌ Please enter a valid numerical amount.")

            try:
                bank.withdraw(acc_num, amount)
            except Exception as e:
                print(f"❌ Error: {e}")

        elif choice == "4":
            bank.apply_interest_all()

        elif choice == "5":
            bank.display_all_accounts()

        elif choice == "6":
            print("Thank you for using Addis Bank System. Goodbye!")
            break

        else:
            print("Invalid option! Please select between 1 and 6.")


if __name__ == "__main__":
    main()