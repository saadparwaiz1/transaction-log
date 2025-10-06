import { createGrid, type ColDef } from "ag-grid-community";
import type { ID } from "../base/schemas";
import type z from "zod";
import { add, findAll } from "../base/storage";
import { setupModal, show } from "../base/utils";

export function setup<T extends ID>(
  storageKey: string,
  parser: z.ZodSchema<T>,
  columnDefinitions: ColDef<T>[],
  element: HTMLDivElement,
  button: HTMLButtonElement,
  modal: HTMLDivElement,
) {
  const data = findAll(storageKey, parser);

  const api = createGrid<T>(element, {
    rowData: data,
    columnDefs: columnDefinitions,
    getRowId: (rule) => {
      return rule.data.id;
    },
  });

  function addRow(statement: T) {
    add(storageKey, statement, parser);
    api.applyTransaction({
      add: [statement],
    });
  }

  button.onclick = () => show(modal);
  setupModal(modal, (raw) => {
    addRow(parser.parse(raw));
  });
}
