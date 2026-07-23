# Day 2: Level 2 - Intermediate Exercises



score_text = input("Enter a score to classify: ")
score = int(score_text)


if score >= 90 and score <= 100:
    print("Excellent")
elif score >= 80 and score <= 89:
    print("Very Good")
elif score >= 70 and score <= 79:
    print("Good")
elif score >= 50 and score <= 69:
    print("Pass")
else:
    print("Fail")


    # ----------------------------------------------------
# 6. Number Pattern

print("\n--- Odd Numbers and Divisible by 5 ---")


for number in range(1, 21):
   

    if number % 2 != 0:
        print(f"{number} is odd")
        
  
    if number % 5 == 0:
        print(f"--> {number} is divisible by 5!")

      

print("\n--- While Loop: Adding Positive Numbers ---")

total_sum = 0


while True:
    user_num = float(input("Enter a positive number (or 0 to stop): "))
    
   
    if user_num == 0:
        break  # This exit route stops the loop immediately!
        
   
    total_sum = total_sum + user_num

print(f"The total sum of all entered numbers is: {total_sum}")




print("\n--- Function Practice ---")


def greet(name):
    print(f"Welcome to Full Stack Development, {name}!")

def square(number):
    return number * number

def is_even(number):
    return number % 2 == 0


greet("Loza")

result_square = square(4)
print(f"The square of 4 is: {result_square}")

check_even = is_even(8)
print(f"Is 8 even? {check_even}")

check_odd = is_even(7)
print(f"Is 7 even? {check_odd}")


# Day 2: Level 3 - Advanced Exercises


def calculate_tip(bill, tip_percent):
    return bill * (tip_percent / 100)


def calculate_split(total_amount, number_of_people):
    return total_amount / number_of_people


print("--- Welcome to the Tip Calculator ---")


bill_amount = float(input("Enter the total bill amount (ETB): "))
tip_percentage = float(input("Enter tip percentage (10, 15, or 20): "))
payers = int(input("How many people are splitting the bill? "))


tip_amount = calculate_tip(bill_amount, tip_percentage)
total_amount = bill_amount + tip_amount
amount_per_person = calculate_split(total_amount, payers)


print("\n--- Tip Calculator Results ---")
print(f"Original Bill:  {bill_amount:.2f} ETB")
print(f"Tip Amount:     {tip_amount:.2f} ETB")
print(f"Total Bill:     {total_amount:.2f} ETB")
print(f"Each Person Pays: {amount_per_person:.2f} ETB")