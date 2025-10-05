import type { Rule, Rules } from "./schema";
import { Rules as RulesSchema } from "./schema";

const STORAGE_KEY = "transactions::rules";

export function getRules(): Rules {
  const rawData = localStorage.getItem(STORAGE_KEY);
  if (rawData == null) {
    return [];
  }
  return RulesSchema.parse(JSON.parse(rawData));
}

export function addRule(rule: Rule) {
  const currentRules = getRules();
  currentRules.push(rule);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentRules));
}

export function deleteRule(id: string) {
  const currentRules = getRules().filter((rule) => rule.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentRules));
}
