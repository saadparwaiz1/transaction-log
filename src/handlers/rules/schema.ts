import z from "zod";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { DefaultActionRendererComponent } from "../../components/renderer";
import { TransactionCategory } from "../../base/schemas";
import { remove } from "../../base/storage";

export const Rule = z.object({
  id: z
    .string()
    .nullish()
    .transform((n) => n ?? crypto.randomUUID()),
  regex: z.string(),
  transactionCategory: TransactionCategory,
});

export const Rules = z.array(Rule);

export type Rule = z.infer<typeof Rule>;
export type Rules = z.infer<typeof Rules>;

export const RULES_STORAGE_KEY = "transactions::rules";

export const RULE_COLUMN_DEFINITIONS: ColDef<Rule>[] = [
  {
    field: "regex",
    headerName: "Regex",
    flex: 1,
  },
  {
    field: "transactionCategory",
    headerName: "Transaction Category",
    flex: 1,
  },
  {
    field: "id",
    headerName: "Actions",
    flex: 1,
    cellRenderer: DefaultActionRendererComponent,
    cellRendererParams: {
      onDelete: (params: ICellRendererParams) => {
        remove(RULES_STORAGE_KEY, params.value, Rule);
        params.api.applyTransaction({
          remove: [{ id: params.value }],
        });
      },
    },
  },
];
