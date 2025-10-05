import z from "zod";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { DefaultActionRendererComponent } from "../../components/renderer";
import { deleteRule } from "./api";
import { TransactionCategory } from "../../schemas";

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
        deleteRule(params.value);
        params.api.applyTransaction({
          remove: [{ id: params.value }],
        });
      },
    },
  },
];
