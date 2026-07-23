# Exercise 4: Student Class

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = []

    def add_grade(self, grade):
        self.grades.append(grade)

    def average_grade(self):
        if not self.grades:
            return 0
        return sum(self.grades) / len(self.grades)



# Exercise 5: Product Class

class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def sell(self, quantity):
        if quantity > self.stock:
            print(f"Cannot sell {quantity} {self.name}(s). Only {self.stock} left in stock!")
        else:
            self.stock -= quantity
            print(f"Sold {quantity} {self.name}(s). Remaining stock: {self.stock}")

    def restock(self, quantity):
        self.stock += quantity
        print(f"Restocked {quantity} {self.name}(s). Total stock: {self.stock}")


# Exercise 6: Encapsulation Practice

class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance  # Private attribute 
        
    # @property decorator creates a read-only getter
    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive!")
        else:
            self._balance += amount
            print(f"Deposited {amount} ETB. New balance: {self.balance} ETB")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive!")
        elif amount > self._balance:
            print("Insufficient funds! Transaction cancelled.")
        else:
            self._balance -= amount
            print(f"Withdrew {amount} ETB. New balance: {self.balance} ETB")


# --- Testing Level 2 Exercises ---
if __name__ == "__main__":
    print("--- Exercise 4: Student ---")
    student = Student("Loza", "HU-1024")
    student.add_grade(90)
    student.add_grade(95)
    student.add_grade(88)
    print(f"Student: {student.name}, Average: {student.average_grade():.2f}\n")

    print("--- Exercise 5: Product ---")
    laptop = Product("Laptop", 45000, 10)
    laptop.sell(3)
    laptop.restock(5)
    print()

    print("--- Exercise 6: Encapsulated Account ---")
    acc = Account("Loza", 1000)
    print(f"Current Balance: {acc.balance} ETB")  # Read via @property
    acc.deposit(500)
    acc.withdraw(2000)  # Should trigger overdraft validation
    acc.withdraw(300)