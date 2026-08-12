// Exercise 1: map, filter, reduce
const prices = [250, 600, 180, 900, 1200];

const grandTotal = prices
  .map(price => price * 1.15)
  .filter(priceWithVAT => priceWithVAT < 1000)
  .reduce((sum, price) => sum + price, 0);

console.log("Exercise 1 - Grand Total:", grandTotal);


// Exercise 2: Object iteration with for...of
const customer = {
  name: "loza Yonas",
  city: "Addis Ababa",
  balance: 1500
};

console.log("\nExercise 2 - Object Entries:");
for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}


// Exercise 3: Single-Line & Parameter Destructuring
const { name, city } = customer;
console.log(`\nExercise 3 - Extracted: ${name} from ${city}`);

function greet({ name }) {
  return `Selam ${name}`;
}
console.log(greet(customer));


// Exercise 4: Immutable Update with Spread
const updatedCustomer = {
  ...customer,
  city: "hawassa",
  phone: "0911234567"
};

console.log("\nExercise 4 - Immutability Check:");
console.log("Original Object:", customer);
console.log("Updated Copy:", updatedCustomer);