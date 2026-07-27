"""
Day 6 - Intermediate Exercises (Level 2)
SOLID Principles & Design Patterns
"""

from abc import ABC, abstractmethod


# ==============================================================================
# Exercise 4: Interface Segregation Principle (ISP)
# Create a small InterestBearing interface so only interest-bearing accounts implement it.
# ==============================================================================


class InterestBearing(ABC):

  @abstractmethod
  def calculate_interest(self) -> float:
    pass


# ==============================================================================
# Exercise 1 & 3: SRP + DIP & Observer Pattern
# Account focuses only on balance. Persistence & notifications are separate.
# Observer system notifies subscribers when withdraw > 3000.
# ==============================================================================


# Observers for Exercise 3
class SMSAlert:

  def update(self, message: str):
    print(f"📱 [SMS Alert] {message}")


class AuditLog:

  def update(self, message: str):
    print(f"📝 [Audit Log] {message}")


# Base Account with SRP, DIP, and Observer capabilities
class Account(ABC):

  def __init__(self, owner: str, number: str, balance: float = 0.0):
    self.owner = owner
    self.number = number
    self._balance = balance
    self._observers = []

  @property
  def balance(self) -> float:
    return self._balance

  def subscribe(self, observer):
    self._observers.append(observer)

  def _notify(self, message: str):
    for obs in self._observers:
      obs.update(message)

  def deposit(self, amount: float):
    if amount <= 0:
      raise ValueError("Deposit must be positive.")
    self._balance += amount
    print(
        f"✅ Deposited {amount} ETB to {self.number}. Balance: {self._balance}"
    )

  def withdraw(self, amount: float):
    if amount <= 0:
      raise ValueError("Withdrawal must be positive.")
    if amount > self._balance:
      raise ValueError("Insufficient balance!")

    self._balance -= amount
    print(
        f"✅ Withdrew {amount} ETB from {self.number}. Remaining:"
        f" {self._balance}"
    )

    # Exercise 3 requirement: Trigger Observers if withdrawal > 3000
    if amount > 3000:
      self._notify(
          f"Large Withdrawal Alert: {amount} ETB withdrawn from account"
          f" {self.number} ({self.owner})"
      )


# SavingsAccount implements both Account and InterestBearing (ISP)
class SavingsAccount(Account, InterestBearing):

  def __init__(
      self, owner: str, number: str, balance: float = 0.0, rate: float = 0.05
  ):
    super().__init__(owner, number, balance)
    self.rate = rate

  def calculate_interest(self) -> float:
    return self._balance * self.rate


# CurrentAccount only implements Account (not forced to calculate interest)
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


class FixedDepositAccount(Account, InterestBearing):

  def __init__(
      self, owner: str, number: str, balance: float = 0.0, rate: float = 0.10
  ):
    super().__init__(owner, number, balance)
    self.rate = rate

  def calculate_interest(self) -> float:
    return self._balance * self.rate


# Separate Repository for Persistence (SRP)
class AccountRepository:

  def save_to_db(self, account: Account):
    print(
        f"💾 [Database Saved] Account #{account.number} ({account.owner}) saved."
    )


# ==============================================================================
# Exercise 2: Factory Pattern
# AccountFactory class creates accounts by kind string.
# ==============================================================================


class AccountFactory:

  @staticmethod
  def create(
      kind: str, owner: str, number: str, balance: float = 0.0
  ) -> Account:
    kind_clean = kind.lower().strip()
    if kind_clean == "savings":
      return SavingsAccount(owner, number, balance)
    elif kind_clean == "current":
      return CurrentAccount(owner, number, balance)
    elif kind_clean == "fixed deposit":
      return FixedDepositAccount(owner, number, balance)
    else:
      raise ValueError(f"Unknown account type: {kind}")


# ==============================================================================
# TESTING / VERIFYING ALL LEVEL 2 EXERCISES
# ==============================================================================
if __name__ == "__main__":
  print("--- Exercise 2: Factory Pattern Creation ---")
  savings = AccountFactory.create("savings", "Loza", "SAV-101", 5000.0)
  current = AccountFactory.create("current", "Abebe", "CUR-202", 2000.0)

  print("\n--- Exercise 3: Observer System (Large Withdrawal > 3000) ---")
  # Attach Observers to savings account
  savings.subscribe(SMSAlert())
  savings.subscribe(AuditLog())

  # Normal withdrawal (<= 3000) -> No observers triggered
  savings.withdraw(1000)

  print("\nPerforming large withdrawal:")
  # Large withdrawal (> 3000) -> Both observers trigger
  savings.withdraw(3500)

  print("\n--- Exercise 4: ISP Verification ---")
  if isinstance(savings, InterestBearing):
    print(f"Savings Interest: {savings.calculate_interest()} ETB")

  if not isinstance(current, InterestBearing):
    print("✅ CurrentAccount is clean and does NOT implement InterestBearing!")

  print("\n--- Exercise 1: SRP Persistence ---")
  repo = AccountRepository()
  repo.save_to_db(savings)