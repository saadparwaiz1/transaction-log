import type { Statement, Statements } from "./schema";
import { Statements as RulesSchema } from "./schema";

const STORAGE_KEY = "transactions::statenments";

export function getStatements(): Statements {
  const rawData = localStorage.getItem(STORAGE_KEY);
  if (rawData == null) {
    return [];
  }
  return RulesSchema.parse(JSON.parse(rawData));
}

export function addStatement(rule: Statement) {
  const currentRules = getStatements();
  currentRules.push(rule);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentRules));
}

export function deleteStatement(id: string) {
  const currentRules = getStatements().filter((rule) => rule.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentRules));
}
