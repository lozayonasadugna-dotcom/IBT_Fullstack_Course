# Level 2: Intermediate

#  Import the Account parent class from day5_exerciseslv1.py
from day5_exerciseslv1 import Account

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

  # Overriding the withdraw method from Account
  def withdraw(self, amount: float):
    if amount <= 0:
      raise ValueError("Withdrawal amount must be positive.")
    if amount > self._balance + self.overdraft:
      raise ValueError("Exceeds overdraft limit!")
    self._balance -= amount

  def calculate_interest(self) -> float:
    return 0.0  # Current accounts do not earn interest

  # Overriding statement to include overdraft details
  def statement(self):
    print(
        f"[CurrentAccount] Owner: {self.owner} | Acc #: {self.number} |"
        f" Balance: {self._balance:.2f} ETB | Overdraft Limit:"
        f" {self.overdraft:.2f} ETB"
    )


# --- Level 2 Quick Test ---
if __name__ == "__main__":
  acc2 = CurrentAccount("Dawit", "CUR-202", balance=200, overdraft=500)
  acc2.withdraw(600)  # Allowed because 600 <= 200 + 500
  acc2.statement()  # Output: Balance: -400.00 ETB