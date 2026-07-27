"""
Day 6 - Advanced Exercises (Level 3)
SOLID Principles & Design Patterns
"""

from abc import ABC, abstractmethod


# ==============================================================================
# Exercise 10: BankConfig Singleton
# Guarantees a single bank-wide source of truth for rates and limits.
# ==============================================================================


class BankConfig:
  _instance = None

  def __new__(cls):
    if cls._instance is None:
      cls._instance = super().__new__(cls)
      cls._instance.savings_interest_rate = 0.07  # 7% interest rate
      cls._instance.overdraft_limit = 2000.0  # Overdraft limit
      cls._instance.large_transaction_threshold = 3000.0  # Alert limit
    return cls._instance


# ==============================================================================
# Observer Pattern (Subscriber Interfaces & Observers)
# ==============================================================================


class Observer(ABC):

  @abstractmethod
  def update(self, message: str):
    pass


class SMSAlert(Observer):

  def update(self, message: str):
    print(f"📱 [TeleBirr SMS] {message}")


class AuditLog(Observer):

  def update(self, message: str):
    print(f"📝 [Audit Log System] {message}")


# ==============================================================================
# ISP: Optional Interfaces
# ==============================================================================


class InterestBearing(ABC):

  @abstractmethod
  def calculate_interest(self) -> float:
    pass


# ==============================================================================
# Core Account System (SOLID Refactored)
# ==============================================================================


class Account(ABC):

  def __init__(self, owner: str, number: str, balance: float = 0.0):
    self.owner = owner
    self.number = number
    self._balance = balance
    self._observers = []
    self.config = BankConfig()  # Singleton instance

  @property
  def balance(self) -> float:
    return self._balance

  def subscribe(self, observer: Observer):
    self._observers.append(observer)

  def _notify(self, message: str):
    for obs in self._observers:
      obs.update(message)

  def deposit(self, amount: float):
    if amount <= 0:
      raise ValueError("Deposit must be positive.")
    self._balance += amount
    print(f"✅ Deposited {amount:.2f} ETB. New Balance: {self._balance:.2f} ETB")

  def withdraw(self, amount: float):
    if amount <= 0:
      raise ValueError("Withdrawal must be positive.")
    if amount > self._balance:
      raise ValueError("Insufficient balance!")

    self._balance -= amount
    print(
        f"✅ Withdrew {amount:.2f} ETB. Remaining Balance:"
        f" {self._balance:.2f} ETB"
    )

    # Check against Singleton threshold for alerts
    if amount >= self.config.large_transaction_threshold:
      self._notify(
          f"ALERT: Large withdrawal of {amount:.2f} ETB on Account #{self.number}"
      )


class SavingsAccount(Account, InterestBearing):

  def calculate_interest(self) -> float:
    return self._balance * self.config.savings_interest_rate


class CurrentAccount(Account):

  def withdraw(self, amount: float):
    if amount <= 0:
      raise ValueError("Withdrawal must be positive.")
    if amount > (self._balance + self.config.overdraft_limit):
      raise ValueError("Exceeds allowed overdraft limit!")

    self._balance -= amount
    print(
        f"✅ Withdrew {amount:.2f} ETB (Current Acc). Balance:"
        f" {self._balance:.2f} ETB"
    )

    if amount >= self.config.large_transaction_threshold:
      self._notify(
          f"ALERT: Large withdrawal of {amount:.2f} ETB on Current Account"
          f" #{self.number}"
      )


# ==============================================================================
# Exercise 11: Adding New InvestmentAccount (OCP Demonstration)
# We add this new feature without touching any existing Account code!
# ==============================================================================


class InvestmentAccount(Account, InterestBearing):

  def __init__(
      self,
      owner: str,
      number: str,
      balance: float = 0.0,
      risk_factor: float = 0.12,
  ):
    super().__init__(owner, number, balance)
    self.risk_factor = risk_factor

  def calculate_interest(self) -> float:
    # High-yield return calculation
    return self._balance * self.risk_factor


# ==============================================================================
# Exercise 10: AccountFactory
# Centralized creation point for all account types
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
    elif kind_clean == "investment":
      return InvestmentAccount(owner, number, balance)
    else:
      raise ValueError(f"Unknown account type: '{kind}'")


# ==============================================================================
# TESTING / VERIFYING LEVEL 3 EXERCISES
# ==============================================================================
if __name__ == "__main__":
  print("--- Exercise 10: Singleton BankConfig ---")
  config1 = BankConfig()
  config2 = BankConfig()
  print(f"Are config1 and config2 the same instance? {config1 is config2}")
  print(f"Savings Interest Rate: {config1.savings_interest_rate * 100}%")

  print("\n--- Exercise 10 & 11: Factory + New Investment Account ---")
  # Creating standard and new investment accounts via Factory
  sav = AccountFactory.create("savings", "Loza", "SAV-999", 10000.0)
  inv = AccountFactory.create("investment", "Abebe", "INV-555", 25000.0)

  print("\n--- Exercise 10: Observer Notifications ---")
  sms = SMSAlert()
  audit = AuditLog()

  # Subscribe observers to savings account
  sav.subscribe(sms)
  sav.subscribe(audit)

  # Trigger withdrawal >= 3000 (BankConfig threshold)
  sav.withdraw(4000.0)

  print("\n--- Exercise 11: Investment Account Interest ---")
  if isinstance(inv, InterestBearing):
    print(
        f"Investment Account Expected Yield: {inv.calculate_interest():.2f} ETB"
    )