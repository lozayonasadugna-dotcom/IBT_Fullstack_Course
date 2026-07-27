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




def check_answer(question, correct_answer):
    print("\n" + question)
    user_ans = input("Your answer: ").strip().lower()
    
    if user_ans == correct_answer.lower():
        print("Correct! 🎉")
        return 1
    else:
        print(f"Incorrect. The correct answer was: {correct_answer} ❌")
        return 0


def show_results(score, total_questions):
    print("\n=========================")
    print(f"Game Over! Your final score is: {score}/{total_questions}")
    
    if score == total_questions:
        print("Perfect score! You are an absolute genius! 🏆")
    elif score >= 3:
        print("Great job! You know your stuff! 👍")
    else:
        print("Good effort! Try again to improve your score. 🙂")
    print("=========================")

# Main Quiz Function
def play_quiz():
    print("\n--- Welcome to the Ethiopia General Knowledge Quiz ---")
    score = 0
    

    questions = [
        ("What is the capital city of Ethiopia?", "Addis Ababa"),
        ("Which currency is used in Ethiopia?", "Birr"),
        ("What is the official working language of the federal government of Ethiopia?", "Amharic"),
        ("Which Ethiopian athlete is famous for running barefoot and winning Olympic gold?", "Abebe Bikila"),
        ("Is Ethiopia the only country in Africa that was never colonized? (Yes/No)", "Yes")
    ]
    
   
    for q, a in questions:
        score += check_answer(q, a)
        
   
    show_results(score, len(questions))


play_quiz()




print("\n--- Testing Function with Default Parameters ---")


def calculate_final_price(price, tax_rate=0.15, discount=0):
    
    discounted_price = price - discount
    
    
    tax_amount = discounted_price * tax_rate
    

    final_price = discounted_price + tax_amount
    return final_price


price1 = calculate_final_price(100)
print(f"Test 1 (Base 100): {price1} ETB")

price2 = calculate_final_price(100, tax_rate=0.10)
print(f"Test 2 (Base 100 + 10% Tax): {price2} ETB")


price3 = calculate_final_price(100, discount=20)
print(f"Test 3 (Base 100 - 20 Discount + 15% Tax): {price3} ETB")