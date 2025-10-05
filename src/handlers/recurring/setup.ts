import { createGrid } from "ag-grid-community";
import { setupModal, show } from "../../utils";
import { addRecurring, getRecurring } from "./api";
import { Recurring, STATEMENT_COLUMN_DEFINITIONS } from "./schema";

function setupInternal(
  element: HTMLDivElement,
  button: HTMLButtonElement,
  modal: HTMLDivElement,
) {
  const data = getRecurring();

  const api = createGrid<Recurring>(element, {
    rowData: data,
    columnDefs: STATEMENT_COLUMN_DEFINITIONS,
    getRowId: (rule) => {
      return rule.data.id;
    },
  });

  function addRow(statement: Recurring) {
    addRecurring(statement);
    api.applyTransaction({
      add: [statement],
    });
  }

  button.onclick = () => show(modal);
  setupModal(modal, (raw) => {
    addRow(Recurring.parse(raw));
  });
}

export function setup() {
  const StatementTable = document.getElementById(
    "recurring-transactions",
  ) as HTMLTableElement;
  const StatementAddButton = document.getElementById(
    "add-transaction",
  ) as HTMLButtonElement;
  const StatmentModal = document.getElementById(
    "recurring-modal",
  ) as HTMLDivElement;
  setupInternal(StatementTable, StatementAddButton, StatmentModal);
}
