import z from "zod";
import type { ID } from "./schemas";

export function findAll<T extends ID>(
  key: string,
  parser: z.ZodSchema<T>,
): T[] {
  const rawData = localStorage.getItem(key);
  if (rawData == null) {
    return [];
  }
  return z.array(parser).parse(JSON.parse(rawData));
}

export function add<T extends ID>(
  key: string,
  rule: T,
  parser: z.ZodSchema<T>,
) {
  const currentRules = findAll(key, parser);
  currentRules.push(rule);
  localStorage.setItem(key, JSON.stringify(currentRules));
}

export function remove<T extends ID>(
  key: string,
  id: string,
  parser: z.ZodSchema<T>,
) {
  const currentRules = findAll(key, parser);
  const updatedRules = currentRules.filter((rule) => rule.id !== id);
  localStorage.setItem(key, JSON.stringify(updatedRules));
}
