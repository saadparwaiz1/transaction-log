import z from "zod";

export const TransactionType = z.enum([
  "Amex",
  "Lloyds",
  "Barclays",
  "Chase",
  "Current",
]);

export const TransactionCategory = z.enum([
  "Food",
  "Travel",
  "Grocery",
  "Rent",
  "Holiday",
  "Entertainment",
  "Bill",
  "Pet",
  "Unknown",
]);
