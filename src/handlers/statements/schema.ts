import z from "zod";
import { type ColDef, type ICellRendererParams } from "ag-grid-community";
import { addStatementFile } from "./api";
import { TransactionType } from "../../base/schemas";
import { StatementActionRenderer } from "./renderer";
import { remove } from "../../base/storage";

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

export const STATEMENTS_STORAGE_KEY = "transactions::statements";

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
    cellRenderer: StatementActionRenderer,
    cellRendererParams: {
      onUpload: async (params: ICellRendererParams) => {
        const element = document.createElement("input");
        element.type = "file";
        element.onchange = () => {
          if (element.files != null && element.files.length > 0) {
            addStatementFile(params.value, element.files[0]);
          }
        };
        element.click();
      },
      onDelete: (params: ICellRendererParams) => {
        remove(STATEMENTS_STORAGE_KEY, params.value, Statement);
        params.api.applyTransaction({
          remove: [{ id: params.value }],
        });
      },
    },
  },
];
