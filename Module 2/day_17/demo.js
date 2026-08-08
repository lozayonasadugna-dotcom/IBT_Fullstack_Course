/* ==========================================================================
   Mini-Project Demo Script
   ========================================================================== */

const { createLoyalty } = require("./loyalty");

console.log("=== TeleBirr Loyalty Points Demo ===");

// 1. Standard Loyalty Card
const standardCard = createLoyalty();
console.log("Initial Balance:", standardCard.balance()); // 0

standardCard.earn(250); // Earns 25 points
console.log("After earning (250 ETB spent):", standardCard.balance()); // 25

standardCard.redeem(10);
console.log("After redeeming 10 points:", standardCard.balance()); // 15

standardCard.redeem(100); // Tries to over-redeem
console.log("After over-redeeming 100 points (floor guard):", standardCard.balance()); // 0

// 2. Swapped-in Holiday Earn Rule (Double Points)
console.log("\n--- Holiday Double Points Rule ---");
const holidayRule = (etb) => Math.floor(etb / 10) * 2;
const holidayCard = createLoyalty(holidayRule);

holidayCard.earn(250); // Earns 50 points
console.log("Holiday Card Balance (250 ETB spent):", holidayCard.balance()); // 50

// 3. Confirm Independent Balances
console.log("\n--- Checking Independence ---");
console.log("Standard Card Balance:", standardCard.balance()); // 0
console.log("Holiday Card Balance:", holidayCard.balance());   // 50