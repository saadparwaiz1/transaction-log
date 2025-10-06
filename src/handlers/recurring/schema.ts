import z from "zod";
import { TransactionType } from "../../base/schemas";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { DefaultActionRendererComponent } from "../../components/renderer";
import { remove } from "../../base/storage";

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

export const RECURRING_STORAGE_KEY = "transactions::recurring";

export const RECURRING_COLUMN_DEFINITIONS: ColDef<Recurring>[] = [
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
    cellRenderer: DefaultActionRendererComponent,
    cellRendererParams: {
      onDelete: (params: ICellRendererParams) => {
        remove(RECURRING_STORAGE_KEY, params.value, Recurring);
        params.api.applyTransaction({
          remove: [{ id: params.value }],
        });
      },
    },
  },
];
