# TeleBirr Transaction Report Mini-Project

## Module Architecture
- `transactions.js`: Exports the raw array of transaction objects[cite: 1].
- `report.js`: Pure functions for calculations (`totalByType`), receipt formatting (`generateReceipts`), and immutable updates (`updateTransactionAmount`)[cite: 1].
- `app.js`: Main entry point importing business logic and outputting formatted reports[cite: 1].

## Running the Project
```bash
node app.js