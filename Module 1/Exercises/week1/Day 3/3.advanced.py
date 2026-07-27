# ==========================================
# Level 3: Advanced
# ==========================================

# --- Question 8: File Reading & Writing ---

# 1. Write 5 student names and scores to students.txt
filename = "students.txt"

with open(filename, "w") as f:
    f.write("Loza,98\n")
    f.write("Hiwot,85\n")
    f.write("Amanuel,79\n")
    f.write("Eleni,91\n")
    f.write("Edom,88\n")

print("File written successfully!")

# 2. Read the file back and calculate average score
try:
    total_score = 0
    count = 0

    with open(filename, "r") as f:
        for line in f:
            # strip newline and split by comma
            data = line.strip().split(",")
            name = data[0]
            score = float(data[1])
            
            print(name, ":", score)
            
            total_score = total_score + score
            count = count + 1

    # Calculate average
    average = total_score / count
    print("Average Score:", average)

except FileNotFoundError:
    print("Error: The file does not exist.")


# --- Question 9: Error Handling ---

print("\n--- Division Calculator ---")

try:
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))
    
    result = num1 / num2
    print("Result:", result)

except ValueError:
    print("Please enter a valid number!")

except ZeroDivisionError:
    print("Cannot divide by zero!")

finally:
    print("Calculation attempt completed.")