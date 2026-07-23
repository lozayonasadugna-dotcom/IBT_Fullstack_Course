cities = ["addis abeba", "adama", "bahir dar", "mekelle", "gondar"]

print (cities[0])
print (cities[1])
print (cities[2])
print (cities[3])
print (cities[4])

mynumber = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
print (mynumber[0])
print (mynumber[1])
print (mynumber[2])
print (mynumber[3])

mynumber.remove(20)
print (mynumber)

mynumber.append(55)

mynumber.sort()
print (mynumber)
# addisAbabacordinates -tuple - its not changable
location = ("tuple", 9.0192, 38.7525)

print(location[0])

import math
print(math.sqrt(16))
print(math.tan(45))

from random import choice 
choices =["addis ababa", "adama"]
print(choice(choices))

from math import sqrt as s 
print(s(25))

customer = ("loza", 25, "addis ababa")
print(customer[0])

with open("x.py", "w") as file:
    file.write("this is my first file")

try:
    amount = int(input("amount: "))
    result = 1000 / amount
except ZeroDivisionError:
    print("you cannot divide by zero")

try:
    f = open ("telebirr.txt") as f:
        content = f.read()