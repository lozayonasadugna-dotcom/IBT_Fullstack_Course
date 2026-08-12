import { transactions } from "./transactions.js";
import { totalByType, generateReceipts, updateTransactionAmount } from "./report.js";

console.log("===================================");
console.log("   TELEBIRR TRANSACTION REPORT     ");
console.log("===================================\n");

const debits = totalByType(transactions, "debit");
const credits = totalByType(transactions, "credit");

console.log(`Total Debits : ${debits} ETB`);
console.log(`Total Credits: ${credits} ETB`);
console.log("-----------------------------------");

console.log("\nReceipt Summary:");
const receipts = generateReceipts(transactions);
receipts.forEach(r => console.log(` • ${r}`));

console.log("\n-----------------------------------");
console.log("Updating Transaction #1 amount to 300 ETB immutably...\n");

const updatedTxn = updateTransactionAmount(transactions, 1, 300);

console.log("Original Record (Unchanged):", transactions[0]);
console.log("Updated Copy (New Reference):", updatedTxn);