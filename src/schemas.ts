import z from "zod";

export const TransactionType = z.enum([
  "Amex",
  "Lloyds",
  "Barclays",
  "Chase",
  "Current",
]);
