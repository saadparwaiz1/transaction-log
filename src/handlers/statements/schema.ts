import z from "zod";
import {
  inputStyleBase,
  type ColDef,
  type ICellRendererParams,
} from "ag-grid-community";
import { addStatementFile, deleteStatement } from "./api";
import { TransactionType } from "../../schemas";
import { StatementActionRenderer } from "./renderer";

const FILE_HANDLER = document.getElementById(
  "file-handler",
) as HTMLInputElement;

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
        deleteStatement(params.value);
        params.api.applyTransaction({
          remove: [{ id: params.value }],
        });
      },
    },
  },
];
