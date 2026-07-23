# Day 2: Level 1 - Variables & Data Types


full_name = "Loza Yonas"      
age = 24                     
height = 1.65               
is_student = True            
favorite_food = "Beyaynetu"   


introduction = f"Hello! My name is {full_name}. I am {age} years old and {height}m tall. Is it true that I am a student? {is_student}! My favorite food to power my coding sessions is {favorite_food}."

print(introduction)





num1 = float(input("Enter your first number: "))
num2 = float(input("Enter your second number: "))


sum_result = num1 + num2
diff_result = num1 - num2
prod_result = num1 * num2
div_result = num1 / num2
floor_div = num1 // num2
remainder = num1 % num2


print("\n--- Arithmetic Results ---")
print(f"Sum: {num1} + {num2} = {sum_result}")
print(f"Difference: {num1} - {num2} = {diff_result}")
print(f"Product: {num1} * {num2} = {prod_result}")
print(f"Division: {num1} / {num2} = {div_result}")
print(f"Floor Division: {num1} // {num2} = {floor_div}")
print(f"Remainder: {num1} % {num2} = {remainder}")




birth_year_text = input("Enter your birth year (e.g., 2002): ")
birth_year = int(birth_year_text)


current_year = 2026
calculated_age = current_year - birth_year


print(f"Since your birth year is {birth_year}, you will turn {calculated_age} years old in the year {current_year}.")




score_text = input("Enter your score (0-100): ")
score = int(score_text)


if score >= 50:
    print("Pass")
else:
    print("Fail")