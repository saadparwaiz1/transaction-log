import type { Recurring, RecurringList } from "./schema";
import { RecurringList as RulesSchema } from "./schema";

const STORAGE_KEY = "transactions::recurring";

export function getRecurring(): RecurringList {
  const rawData = localStorage.getItem(STORAGE_KEY);
  if (rawData == null) {
    return [];
  }
  return RulesSchema.parse(JSON.parse(rawData));
}

export function addRecurring(rule: Recurring) {
  const currentRules = getRecurring();
  currentRules.push(rule);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentRules));
}

export function deleteRecurring(id: string) {
  const currentRules = getRecurring().filter((rule) => rule.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentRules));
}
