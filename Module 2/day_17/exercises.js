/* ==========================================================================
   Day 17 Exercises
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. VAT Function with Default Parameter & Arrow Implicit Return
// --------------------------------------------------------------------------
function vat(amount, rate = 0.15) {
  return amount * rate;
}

// Arrow function with implicit return
const vatArrow = (amount, rate = 0.15) => amount * rate;

console.log("Ex 1 - Standard VAT (1000 ETB):", vat(1000));
console.log("Ex 1 - Arrow VAT (1000 ETB):", vatArrow(1000));


// --------------------------------------------------------------------------
// 2. makeCounter Closure
// --------------------------------------------------------------------------
function makeCounter() {
  let count = 0; // Private count variable

  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
console.log("Ex 2 - Count call 1:", counter()); // 1
console.log("Ex 2 - Count call 2:", counter()); // 2
console.log("Ex 2 - Count call 3:", counter()); // 3

/*
  WHY COUNT STAYS PRIVATE:
  'count' is declared inside 'makeCounter'. In JavaScript, variables declared 
  inside a function cannot be accessed from the outside. The inner returned 
  function forms a 'closure', keeping access to 'count' even after 'makeCounter' 
  finishes. Outside code has no direct way to read or change 'count'.
*/


// --------------------------------------------------------------------------
// 3. discountBy(rate) Factory Function
// --------------------------------------------------------------------------
function discountBy(rate) {
  return function (price) {
    return price * (1 - rate);
  };
}

const memberPrice = discountBy(0.10); // 10% discount
const salePrice = discountBy(0.30);   // 30% discount

const basePrice = 1000;
console.log("Ex 3 - Member Price (1000 ETB):", memberPrice(basePrice)); // 900
console.log("Ex 3 - Sale Price (1000 ETB):", salePrice(basePrice));     // 700


// --------------------------------------------------------------------------
// 4. applyToAll(list, fn) Higher-Order Function
// --------------------------------------------------------------------------
function applyToAll(list, fn) {
  let results = [];
  for (let item of list) {
    results.push(fn(item));
  }
  return results;
}

const addVat = (price) => price * 1.15;
const rawPrices = [100, 200, 500];
const totalPrices = applyToAll(rawPrices, addVat);

console.log("Ex 4 - Raw Prices:", rawPrices);
console.log("Ex 4 - Prices with VAT:", totalPrices);


// --------------------------------------------------------------------------
// 5. forEach with Ethiopian Cities
// --------------------------------------------------------------------------
const cities = ["Addis Ababa", "Hawassa", "Bahar Dar", "Dire Dawa", "Gonder"];

console.log("Ex 5 - Ethiopian Cities:");
cities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});