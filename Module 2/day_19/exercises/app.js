
// Exercise 1: Selection & classList.toggle

const heading = document.querySelector("#title");
if (heading) {
  heading.textContent = "Welcome to DOM & Events Exploration";
   // Update text
  heading.classList.toggle("highlight"); 
  // Toggle class[cite: 1]
}


// Exercise 2: Dynamic List from Array

const cities = ["Addis Ababa", "Hawassa", "Dire Dawa"];
const cityList = document.querySelector("#city-list");

cities.forEach((cityName) => {
  const li = document.createElement("li"); // Create <li>[cite: 1]
  li.textContent = cityName;               // Set content[cite: 1]
  cityList.append(li);                      // Append to <ul>[cite: 1]
});


// Exercise 3: Event Bubbling Demonstration

const cardWrapper = document.querySelector("#card-wrapper");
const bubbleBtn = document.querySelector("#bubble-btn");

bubbleBtn.addEventListener("click", (event) => {
  console.log("Button listener triggered. Target:", event.target); //[cite: 1]
});

cardWrapper.addEventListener("click", (event) => {
  console.log("Parent Div listener triggered via Bubbling. Target:", event.target); //[cite: 1]
});


// Exercise 4: Delegated Listener for Deletion

const deleteList = document.querySelector("#delete-list");

// Single event listener on parent element[cite: 1]
deleteList.addEventListener("click", (event) => {
  if (event.target.matches(".del-btn")) {
    const itemToRemove = event.target.closest("li");
    itemToRemove.remove(); // Remove item from DOM[cite: 1]
  }
});


// Exercise 5: Form Submission Handling

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const dynamicTaskList = document.querySelector("#dynamic-task-list");

taskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop form reload[cite: 1]

  const inputValue = taskInput.value.trim();
  if (inputValue) {
    const newLi = document.createElement("li");
    newLi.textContent = inputValue;
    dynamicTaskList.append(newLi); // Append input to list[cite: 1]
    taskInput.value = "";          // Clear input field[cite: 1]
  }
});