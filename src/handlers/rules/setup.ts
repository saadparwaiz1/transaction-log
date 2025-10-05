import { createGrid } from "ag-grid-community";
import { setupModal, show } from "../../utils";
import { addRule, getRules } from "./api";
import { Rule, RULE_COLUMN_DEFINITIONS } from "./schema";

function setupInternal(
  element: HTMLDivElement,
  button: HTMLButtonElement,
  modal: HTMLDivElement,
) {
  const data = getRules();

  const api = createGrid<Rule>(element, {
    rowData: data,
    columnDefs: RULE_COLUMN_DEFINITIONS,
    getRowId: (rule) => {
      return rule.data.id;
    },
  });

  function addRow(rule: Rule) {
    addRule(rule);
    api.applyTransaction({
      add: [rule],
    });
  }

  button.onclick = () => show(modal);
  setupModal(modal, (raw) => {
    addRow(Rule.parse(raw));
  });
}

export function setup() {
  const RulesTable = document.getElementById(
    "statement-rules",
  ) as HTMLTableElement;
  const RulesAddButton = document.getElementById(
    "add-statement-rule",
  ) as HTMLButtonElement;
  const RulesModal = document.getElementById("rules-modal") as HTMLDivElement;
  setupInternal(RulesTable, RulesAddButton, RulesModal);
}
