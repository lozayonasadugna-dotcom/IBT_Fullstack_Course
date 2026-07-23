# Exercise 1: Simple Class - Person

class Pecdrson:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old.")

# Create 2 Person objects
person1 = Person("Loza", 22)
person2 = Person("Dawit", 24)

# Call introduce() on both
person1.introduce()
person2.introduce()

# ==========================================
# Exercise 1: Simple Class - Person
# ==========================================
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old.")

person1 = Person("Loza", 22)
person2 = Person("Dawit", 24)

person1.introduce()
person2.introduce()


# Exercise 2: Rectangle Class

class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

    def perimeter(self):
        return 2 * (self.length + self.width)

rect1 = Rectangle(10, 5)
rect2 = Rectangle(8, 4)

print(f"Rect1 Area: {rect1.area()}, Perimeter: {rect1.perimeter()}")
print(f"Rect2 Area: {rect2.area()}, Perimeter: {rect2.perimeter()}")


# Exercise 3: Bank Account (Basic)

class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited {amount} ETB. New balance: {self.balance} ETB")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds!")
        else:
            self.balance -= amount
            print(f"Withdrew {amount} ETB. New balance: {self.balance} ETB")

# Create an account object and test deposits and withdrawals
my_account = Account("Loza", 1000)
my_account.deposit(500)
my_account.withdraw(200)


