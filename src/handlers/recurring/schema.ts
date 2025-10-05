import z from "zod";
import { TransactionType } from "../../schemas";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { DeleteButtonComponent } from "../../components/button";
import { deleteRecurring } from "./api";

export const Recurring = z.object({
  id: z
    .string()
    .nullish()
    .transform((n) => n ?? crypto.randomUUID()),
  transactionType: TransactionType,
  description: z.string(),
  transactionCategory: z.string(),
  amount: z.coerce.number(),
  date: z.coerce.date(),
});

export const RecurringList = z.array(Recurring);

export type Recurring = z.infer<typeof Recurring>;
export type RecurringList = z.infer<typeof RecurringList>;

export const STATEMENT_COLUMN_DEFINITIONS: ColDef<Recurring>[] = [
  {
    field: "description",
    headerName: "Transaction Description",
    flex: 1,
  },
  {
    field: "transactionType",
    headerName: "Transaction Type",
    flex: 1,
  },
  {
    field: "transactionCategory",
    headerName: "Transaction Category",
    flex: 1,
  },
  {
    field: "amount",
    headerName: "Transaction Amount",
    flex: 1,
  },
  {
    field: "id",
    headerName: "Actions",
    flex: 1,
    cellRenderer: DeleteButtonComponent,
    cellRendererParams: {
      onClick: (params: ICellRendererParams) => {
        deleteRecurring(params.value);
        params.api.applyTransaction({
          remove: [{ id: params.value }],
        });
      },
    },
  },
];
