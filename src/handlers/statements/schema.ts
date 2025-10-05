import z from "zod";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { deleteStatement } from "./api";
import { TransactionType } from "../../schemas";
import { UploadButtonComponent } from "./renderer";

export const Statement = z.object({
  id: z
    .string()
    .nullish()
    .transform((n) => n ?? crypto.randomUUID()),
  statementType: TransactionType,
});

export const Statements = z.array(Statement);

export type Statement = z.infer<typeof Statement>;
export type Statements = z.infer<typeof Statements>;

export const STATEMENT_COLUMN_DEFINITIONS: ColDef<Statement>[] = [
  {
    field: "statementType",
    headerName: "Statement Type",
    flex: 1,
  },
  {
    field: "id",
    headerName: "Actions",
    flex: 1,
    cellRenderer: UploadButtonComponent,
    cellRendererParams: {
      onClick: (params: ICellRendererParams) => {
        deleteStatement(params.value);
        params.api.applyTransaction({
          remove: [{ id: params.value }],
        });
      },
    },
  },
];
