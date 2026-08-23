
# DAY 5 MINI PROJECT: Interactive Bank Management System

from abc import ABC, abstractmethod


# ---------------------------------------------------------
# 1. ABSTRACT BASE CLASS: Account
# ---------------------------------------------------------
class Account(ABC):

  def __init__(self, owner: str, number: str, balance: float = 0.0):
    self.owner = owner
    self.number = number
    self._balance = balance  # Encapsulated (protected)

  @property
  def balance(self) -> float:
    return self._balance

  def deposit(self, amount: float):
    if amount <= 0:
      raise ValueError("Deposit amount must be positive.")
    self._balance += amount
    print(
        f"✅ Successfully deposited {amount:.2f} ETB. New balance:"
        f" {self._balance:.2f} ETB"
    )

  @abstractmethod
  def withdraw(self, amount: float):
    pass

  @abstractmethod
  def statement(self):
    pass


# ---------------------------------------------------------
# 2. INHERITED CLASSES
# ---------------------------------------------------------
class SavingsAccount(Account):

  def __init__(
      self, owner: str, number: str, balance: float = 0.0, rate: float = 0.05
  ):
    super().__init__(owner, number, balance)
    self.rate = rate

  def withdraw(self, amount: float):
    if amount <= 0:
      raise ValueError("Withdrawal amount must be positive.")
    if amount > self._balance:
      raise ValueError("Insufficient balance!")
    self._balance -= amount
    print(
        f"✅ Withdrew {amount:.2f} ETB. Remaining balance:"
        f" {self._balance:.2f} ETB"
    )

  def apply_interest(self):
    interest = self._balance * self.rate
    self._balance += interest
    print(
        f"🎉 Interest applied ({self.rate * 100:.0f}%): +{interest:.2f} ETB."
        f" New balance: {self._balance:.2f} ETB"
    )

  def statement(self):
    print(
        f"🔹 [Savings] Owner: {self.owner} | Acc #: {self.number} | Balance:"
        f" {self._balance:.2f} ETB | Rate: {self.rate * 100:.0f}%"
    )


class CurrentAccount(Account):

  def __init__(
      self,
      owner: str,
      number: str,
      balance: float = 0.0,
      overdraft: float = 1000.0,
  ):
    super().__init__(owner, number, balance)
    self.overdraft = overdraft

  def withdraw(self, amount: float):
    if amount <= 0:
      raise ValueError("Withdrawal amount must be positive.")
    if amount > (self._balance + self.overdraft):
      raise ValueError("Exceeds allowed overdraft limit!")
    self._balance -= amount
    print(
        f"✅ Withdrew {amount:.2f} ETB. Remaining balance:"
        f" {self._balance:.2f} ETB"
    )

  def statement(self):
    print(
        f"🔸 [Current] Owner: {self.owner} | Acc #: {self.number} | Balance:"
        f" {self._balance:.2f} ETB | Overdraft Limit: {self.overdraft:.2f} ETB"
    )


class FixedDepositAccount(SavingsAccount):

  def __init__(
      self,
      owner: str,
      number: str,
      balance: float = 0.0,
      rate: float = 0.12,
      lock_months: int = 12,
  ):
    super().__init__(owner, number, balance, rate)
    self.lock_months = lock_months

  def withdraw(self, amount: float):
    raise PermissionError(
        f"🔒 Withdrawal locked! Funds locked for {self.lock_months} months."
    )

  def statement(self):
    print(
        f"🔒 [Fixed Deposit] Owner: {self.owner} | Acc #: {self.number} |"
        f" Balance: {self._balance:.2f} ETB | Lock Period:"
        f" {self.lock_months} months"
    )


# ---------------------------------------------------------
# 3. INTERACTIVE CLI APPLICATION
# ---------------------------------------------------------
class BankSystem:

  def __init__(self):
    self.accounts = {}

  def create_account(self):
    print("\n--- Select Account Type ---")
    print("1. Savings Account")
    print("2. Current Account")
    print("3. Fixed Deposit Account")
    choice = input("Enter choice (1-3): ").strip()

    owner = input("Enter Owner Name: ").strip()
    acc_num = input("Enter Account Number: ").strip()

    if acc_num in self.accounts:
      print("❌ Error: Account number already exists!")
      return

    try:
      initial_balance = float(input("Enter Initial Deposit (ETB): "))
      if choice == "1":
        self.accounts[acc_num] = SavingsAccount(
            owner, acc_num, initial_balance
        )
      elif choice == "2":
        self.accounts[acc_num] = CurrentAccount(owner, acc_num, initial_balance)
      elif choice == "3":
        self.accounts[acc_num] = FixedDepositAccount(
            owner, acc_num, initial_balance
        )
      else:
        print("❌ Invalid selection!")
        return

      print(f"✅ Account for {owner} created successfully!")
    except ValueError as e:
      print(f"❌ Input Error: {e}")

  def find_account(self) -> Account:
    acc_num = input("Enter Account Number: ").strip()
    acc = self.accounts.get(acc_num)
    if not acc:
      print("❌ Account not found!")
    return acc

  def run(self):
    while True:
      print("\n=========================================")
      print("       🏦 BANK MANAGEMENT SYSTEM       ")
      print("=========================================")
      print("1. Create New Account")
      print("2. View All Account Statements")
      print("3. Deposit Funds")
      print("4. Withdraw Funds")
      print("5. Apply Interest (Savings Only)")
      print("6. Exit")
      print("=========================================")

      option = input("Choose an option (1-6): ").strip()

      if option == "1":
        self.create_account()

      elif option == "2":
        print("\n--- All Account Statements ---")
        if not self.accounts:
          print("No accounts registered yet.")
        else:
          for acc in self.accounts.values():
            acc.statement()

      elif option == "3":
        acc = self.find_account()
        if acc:
          try:
            amt = float(input("Enter Deposit Amount: "))
            acc.deposit(amt)
          except ValueError as e:
            print(f"❌ Error: {e}")

      elif option == "4":
        acc = self.find_account()
        if acc:
          try:
            amt = float(input("Enter Withdrawal Amount: "))
            acc.withdraw(amt)
          except (ValueError, PermissionError) as e:
            print(f"❌ Error: {e}")

      elif option == "5":
        acc = self.find_account()
        if acc:
          if isinstance(acc, SavingsAccount):
            acc.apply_interest()
          else:
            print("❌ Interest can only be applied to Savings Accounts.")

      elif option == "6":
        print("\nThank you for using Bank Management System! Goodbye 👋")
        break
      else:
        print("❌ Invalid option. Please enter a number from 1 to 6.")


# ---------------------------------------------------------
# ENTRY POINT
# ---------------------------------------------------------
if __name__ == "__main__":
  bank_app = BankSystem()
  bank_app.run()