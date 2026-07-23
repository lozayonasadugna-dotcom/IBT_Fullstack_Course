"""
Day 6 - Basic Exercises (Level 1)
SOLID Principles & Design Patterns
"""

# ==============================================================================
# Exercise 1: Single Responsibility Principle (SRP)
# Refactor Employee into separate focused classes.
# ==============================================================================

# BAD (Violates SRP): Employee handles salary, file saving, and email sending.
# GOOD (Follows SRP): Split into three focused classes.


class Employee:

  def __init__(self, name: str, salary: float):
    self.name = name
    self.salary = salary

  def calculate_pay(self) -> float:
    return self.salary


class EmployeeSaver:

  def save_to_file(self, employee: Employee):
    print(f"💾 Saving {employee.name}'s data to database file...")


class EmployeeEmailer:

  def send_email(self, employee: Employee, message: str):
    print(f"📧 Sending email to {employee.name}: '{message}'")


# ==============================================================================
# Exercise 2: Open/Closed Principle (OCP)
# Refactor calculate_bonus to use class inheritance instead of if-elif chains.
# ==============================================================================

from abc import ABC, abstractmethod


class BonusCalculator(ABC):

  @abstractmethod
  def calculate_bonus(self, salary: float) -> float:
    pass


class FullTimeEmployeeBonus(BonusCalculator):

  def calculate_bonus(self, salary: float) -> float:
    return salary * 0.20  # 20% bonus


class PartTimeEmployeeBonus(BonusCalculator):

  def calculate_bonus(self, salary: float) -> float:
    return salary * 0.10  # 10% bonus


class InternBonus(BonusCalculator):

  def calculate_bonus(self, salary: float) -> float:
    return 500.0  # Fixed bonus


# ==============================================================================
# Exercise 3: Liskov Substitution Principle (LSP)
# Fix Bird & Penguin so make_bird_fly() works properly without crashing.
# ==============================================================================


class Bird:

  def __init__(self, name: str):
    self.name = name


class FlyingBird(Bird):

  def fly(self):
    print(f"🕊️ {self.name} is flying high in the sky!")


class NonFlyingBird(Bird):

  def swim(self):
    print(f"🐧 {self.name} is swimming in the water!")


def make_bird_fly(bird: FlyingBird):
  bird.fly()


# ==============================================================================
# Exercise 4: Identify SOLID Violations
# ==============================================================================
"""
Question: What SOLID principles are violated in this code?

class Account:
    def __init__(self):
        self.notifier = EmailNotifier()
    def withdraw(self, amount):
        self.notifier.send_email(...)
        self.save_to_db(...)

Answer:
1. Single Responsibility Principle (SRP): 
   The Account class is managing balance logic, sending emails, AND saving to the database.

2. Dependency Inversion Principle (DIP): 
   Account hardcodes 'self.notifier = EmailNotifier()' directly inside __init__ 
   instead of receiving a Notifier abstraction passed into it.
"""

# ==============================================================================
# TESTING / VERIFYING ALL EXERCISES
# ==============================================================================
if __name__ == "__main__":
  print("--- Exercise 1: SRP ---")
  emp = Employee("Loza", 5000)
  EmployeeSaver().save_to_file(emp)
  EmployeeEmailer().send_email(emp, "Welcome to the team!")

  print("\n--- Exercise 2: OCP ---")
  ft_bonus = FullTimeEmployeeBonus().calculate_bonus(emp.salary)
  print(f"Full-time Bonus: {ft_bonus} ETB")

  print("\n--- Exercise 3: LSP ---")
  eagle = FlyingBird("Eagle")
  make_bird_fly(eagle)

  penguin = NonFlyingBird("Penguin")
  penguin.swim()