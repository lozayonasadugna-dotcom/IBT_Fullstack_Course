# Level 1: Basic 
# 1. Simple Inheritance 

from abc import ABC, abstractmethod


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
        f"[{self.__class__.__name__}] Owner: {self.owner} | Acc #: {self.number}"
        f" | Balance: {self._balance:.2f} ETB"
    )

  @abstractmethod
  def calculate_interest(self) -> float:
    """Must be implemented by subclasses."""
    pass


class SavingsAccount(Account):

  def __init__(
      self, owner: str, number: str, balance: float = 0.0, rate: float = 0.05
  ):
    # Call parent constructor to handle owner, number, and balance
    super().__init__(owner, number, balance)
    self.rate = rate

  def calculate_interest(self) -> float:
    return self._balance * self.rate

  def add_interest(self):
    interest = self.calculate_interest()
    self.deposit(interest)


# --- Level 1 Quick Test ---
if __name__ == "__main__":
  acc1 = SavingsAccount("Almaz", "SAV-101", balance=1000, rate=0.05)
  acc1.add_interest()
  acc1.statement()  # Output: Balance: 1050.00 ETB