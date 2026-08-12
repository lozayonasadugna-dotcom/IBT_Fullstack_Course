import { VAT, addVat } from "./money.js";

const basePrice = 500;
console.log(`VAT Rate: ${VAT * 100}%`);
console.log(`Price with VAT: ${addVat(basePrice)} ETB`);