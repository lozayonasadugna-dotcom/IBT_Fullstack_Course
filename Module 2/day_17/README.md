# Module 2 Day 17: Functions, Closures & Higher-Order Functions

This repository contains the solutions for Day 17 exercises and the TeleBirr Loyalty Points Mini-Project.

## Files
- `exercises.js`: Contains all 5 daily exercises covering default parameters, arrow functions, closures, factories, higher-order functions, and `forEach`.
- `loyalty.js`: The core module utilizing closures to maintain private loyalty points.
- `demo.js`: Test script demonstrating card creation, earning, redeeming, and custom earn rules.

## How the Balance Stays Private
In `loyalty.js`, the `points` variable is declared inside `createLoyalty()` using `let points = 0;`. 

Because `points` is not attached as a property on the object returned by `createLoyalty()`, typing `card.points` returns `undefined`. The exposed methods (`earn`, `redeem`, and `balance`) retain access to `points` via **lexical scope closure**, making them the only way to read or modify the balance.

## How to Run
Run the scripts in Node.js:
```bash
node exercises.js
node demo.js