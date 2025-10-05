import { createGrid } from "ag-grid-community";
import { setupModal, show } from "../../utils";
import { addStatement, getStatements } from "./api";
import { Statement, STATEMENT_COLUMN_DEFINITIONS } from "./schema";

function setupInternal(
  element: HTMLDivElement,
  button: HTMLButtonElement,
  modal: HTMLDivElement,
) {
  const data = getStatements();

  const api = createGrid<Statement>(element, {
    rowData: data,
    columnDefs: STATEMENT_COLUMN_DEFINITIONS,
    getRowId: (rule) => {
      return rule.data.id;
    },
  });

  function addRow(rule: Statement) {
    addStatement(rule);
    api.applyTransaction({
      add: [rule],
    });
  }

  button.onclick = () => show(modal);
  setupModal(modal, (raw) => {
    addRow(Statement.parse(raw));
  });
}

export function setup() {
  const RulesTable = document.getElementById("statements") as HTMLTableElement;
  const RulesAddButton = document.getElementById(
    "add-statement",
  ) as HTMLButtonElement;
  const RulesModal = document.getElementById(
    "statement-model",
  ) as HTMLDivElement;
  setupInternal(RulesTable, RulesAddButton, RulesModal);
}
