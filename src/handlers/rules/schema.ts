import z from "zod";
import { TransactionType } from "../../schemas";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { ButtonComponent } from "../../components/button";
import { deleteRule } from "./api";

export const Rule = z.object({
  id: z
    .string()
    .nullish()
    .transform((n) => n ?? crypto.randomUUID()),
  regex: z.string(),
  transactionType: TransactionType,
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
    field: "transactionType",
    headerName: "Transaction Type",
    flex: 1,
  },
  {
    field: "id",
    headerName: "Actions",
    flex: 1,
    cellRenderer: ButtonComponent,
    cellRendererParams: {
      label: "Delete",
      onClick: (params: ICellRendererParams) => {
        deleteRule(params.value);
        params.api.applyTransaction({
          remove: [{ id: params.value }],
        });
      },
    },
  },
];
