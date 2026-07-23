# Exercise 7: Full Bank Account with Properties

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Balance cannot be negative!")
        self._balance = value

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive!")
            return
        self._balance += amount
        print(f"[{self.owner}] Deposited {amount} ETB. New balance: {self._balance} ETB")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive!")
            return
        if amount > self._balance:
            print(f"[{self.owner}] Insufficient funds for withdrawal of {amount} ETB.")
            return
        self._balance -= amount
        print(f"[{self.owner}] Withdrew {amount} ETB. New balance: {self._balance} ETB")

    def transfer(self, to_account, amount):
        if amount <= 0:
            print("Transfer amount must be positive!")
            return
        if amount > self._balance:
            print(f"[{self.owner}] Transfer failed: Insufficient funds.")
            return
        self._balance -= amount
        to_account._balance += amount
        print(f"Transferred {amount} ETB from {self.owner} to {to_account.owner}.")



# Exercise 8: Library System

class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self._available = True

    @property
    def available(self):
        return self._available


class Library:
    def __init__(self):
        self.books = []

    def add_book(self, book):
        self.books.append(book)
        print(f"Added '{book.title}' to the library.")

    def borrow_book(self, isbn):
        for book in self.books:
            if book.isbn == isbn:
                if book._available:
                    book._available = False
                    print(f"You successfully borrowed '{book.title}'.")
                    return
                else:
                    print(f"Sorry, '{book.title}' is currently borrowed.")
                    return
        print("Book not found in library.")

    def return_book(self, isbn):
        for book in self.books:
            if book.isbn == isbn:
                if not book._available:
                    book._available = True
                    print(f"Successfully returned '{book.title}'.")
                    return
                else:
                    print(f"'{book.title}' was not borrowed.")
                    return
        print("Book not found in library.")



# Exercise 9: Car Class with Encapsulation

class Car:
    def __init__(self, make, model):
        self.make = make
        self.model = model
        self._speed = 0
        self._fuel = 100

    @property
    def speed(self):
        return self._speed

    @property
    def fuel(self):
        return self._fuel

    def accelerate(self):
        if self._fuel <= 0:
            print(f"Out of fuel! {self.make} {self.model} cannot accelerate.")
            return
        self._speed += 10
        self._fuel -= 5
        print(f"Accelerating... Speed: {self._speed} km/h, Fuel remaining: {self._fuel}%")

    def brake(self):
        self._speed = max(0, self._speed - 10)
        print(f"Braking... Speed reduced to {self._speed} km/h")

    def refuel(self, amount):
        if amount <= 0:
            print("Refuel amount must be positive!")
            return
        self._fuel = min(100, self._fuel + amount)
        print(f"Refueled! Current fuel level: {self._fuel}%")


# --- Testing Level 3 Exercises ---
if __name__ == "__main__":
    print("--- Exercise 7: Bank Account & Transfer ---")
    acc1 = BankAccount("Loza", 1000)
    acc2 = BankAccount("Dawit", 500)
    acc1.transfer(acc2, 300)
    print(f"Loza Balance: {acc1.balance} ETB | Dawit Balance: {acc2.balance} ETB\n")

    print("--- Exercise 8: Library System ---")
    lib = Library()
    b1 = Book("Python Crash Course", "Eric Matthes", "978-1593279288")
    lib.add_book(b1)
    lib.borrow_book("978-1593279288")
    lib.borrow_book("978-1593279288")  # Try borrowing again
    lib.return_book("978-1593279288")
    print()

    print("--- Exercise 9: Car Class ---")
    my_car = Car("Toyota", "Corolla")
    my_car.accelerate()
    my_car.brake()
    my_car.refuel(10)