from abc import ABC, abstractmethod


# ---------------------------------------------------------
# LEVEL 1: Base Account Class
# ---------------------------------------------------------
class Account(ABC):

  def __init__(self, owner: str, number: str, balance: float = 0.0):
    self.owner = owner
    self.number = number
    self._balance = balance

  @property
  def balance(self):
    return self._balance

  def deposit(self, amount: float):
    if amount <= 0:
      raise ValueError("Deposit amount must be positive.")
    self._balance += amount

  def withdraw(self, amount: float):
    if amount > self._balance:
      raise ValueError("Insufficient balance.")
    self._balance -= amount

  def statement(self):
    print(
        f"[{self.__class__.__name__}] Owner: {self.owner} | Acc #:"
        f" {self.number} | Balance: {self._balance:.2f} ETB"
    )

  @abstractmethod
  def calculate_interest(self) -> float:
    pass


# ---------------------------------------------------------
# LEVEL 1: SavingsAccount Subclass
# ---------------------------------------------------------
class SavingsAccount(Account):

  def __init__(
      self, owner: str, number: str, balance: float = 0.0, rate: float = 0.05
  ):
    super().__init__(owner, number, balance)
    self.rate = rate

  def calculate_interest(self) -> float:
    return self._balance * self.rate

  def add_interest(self):
    interest = self.calculate_interest()
    self.deposit(interest)


# ---------------------------------------------------------
# LEVEL 2: CurrentAccount Subclass
# ---------------------------------------------------------
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
    if amount > self._balance + self.overdraft:
      raise ValueError("Exceeds overdraft limit!")
    self._balance -= amount

  def calculate_interest(self) -> float:
    return 0.0

  def statement(self):
    print(
        f"[CurrentAccount] Owner: {self.owner} | Acc #: {self.number} |"
        f" Balance: {self._balance:.2f} ETB | Overdraft Limit:"
        f" {self.overdraft:.2f} ETB"
    )


# ---------------------------------------------------------
# LEVEL 4 (BONUS): FixedDepositAccount Subclass
# (Inherits from SavingsAccount -> Multi-Level Inheritance!)
# ---------------------------------------------------------
class FixedDepositAccount(SavingsAccount):

  def __init__(
      self,
      owner: str,
      number: str,
      balance: float = 0.0,
      rate: float = 0.12,  # Default 12% interest
      lock_months: int = 12,  # Time lock
  ):
    super().__init__(owner, number, balance, rate)
    self.lock_months = lock_months

  # Overriding withdraw to lock funds completely
  def withdraw(self, amount: float):
    raise PermissionError(
        f"Withdrawal locked! Funds are locked for {self.lock_months} months."
    )

  def statement(self):
    print(
        f"[FixedDeposit] Owner: {self.owner} | Acc #: {self.number} |"
        f" Balance: {self._balance:.2f} ETB | Interest: {self.rate * 100:.0f}% |"
        f" Lock Period: {self.lock_months} months"
    )


# ---------------------------------------------------------
# LEVEL 3: Polymorphic Bank Management System Test
# ---------------------------------------------------------
def run_bank_system():
  # Creating a list with ALL account types including the Level 4 Bonus
  accounts = [
      SavingsAccount("Almaz", "SAV-101", balance=2000, rate=0.05),
      CurrentAccount("Dawit", "CUR-202", balance=500, overdraft=1000),
      SavingsAccount("Abebe", "SAV-103", balance=5000, rate=0.07),
      FixedDepositAccount(
          "Loza", "FIX-303", balance=10000, rate=0.12, lock_months=12
      ),
  ]

  print("=== ADDIS BANK MANAGEMENT SYSTEM (LEVEL 1-4) ===\n")

  # 1. Deposit 200 ETB into all accounts (Polymorphism)
  print("--- 1. Depositing 200 ETB into all accounts ---")
  for acc in accounts:
    acc.deposit(200)

  # 2. Add interest to both Savings and Fixed Deposit accounts!
  # (isinstance works for FixedDepositAccount too because it inherits from SavingsAccount!)
  print("\n--- 2. Applying Interest to Savings & Fixed Deposit Accounts ---")
  for acc in accounts:
    if isinstance(acc, SavingsAccount):
      acc.add_interest()
      print(f"Added interest to {acc.owner}'s account.")

  # 3. Print statements for all accounts
  print("\n--- 3. Printing All Account Statements ---")
  for acc in accounts:
    acc.statement()

  # 4. Test Bonus Withdrawal Lock on FixedDepositAccount
  print("\n--- 4. Testing Fixed Deposit Lock ---")
  fixed_acc = accounts[3]  # Loza's Fixed Deposit Account
  try:
    fixed_acc.withdraw(500)
  except PermissionError as e:
    print(f"Error caught successfully 🔒 -> {e}")


if __name__ == "__main__":
  run_bank_system()