import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { getStatementFile } from "./handlers/statements/api";
import { setup } from "./components/grid";
import {
  Statement,
  STATEMENT_COLUMN_DEFINITIONS,
  STATEMENTS_STORAGE_KEY,
} from "./handlers/statements/schema";
import {
  Rule,
  RULE_COLUMN_DEFINITIONS,
  RULES_STORAGE_KEY,
} from "./handlers/rules/schema";
import {
  Recurring,
  RECURRING_COLUMN_DEFINITIONS,
  RECURRING_STORAGE_KEY,
} from "./handlers/recurring/schema";
import { findAll } from "./base/storage";

ModuleRegistry.registerModules([AllCommunityModule]);

const GenerateButton = document.getElementById(
  "generate-button",
) as HTMLButtonElement;

const RecurringTable = document.getElementById(
  "recurring-transactions",
) as HTMLTableElement;
const RecurringAddButton = document.getElementById(
  "add-transaction",
) as HTMLButtonElement;
const RecurringModal = document.getElementById(
  "recurring-modal",
) as HTMLDivElement;

const RulesTable = document.getElementById(
  "statement-rules",
) as HTMLTableElement;
const RulesAddButton = document.getElementById(
  "add-statement-rule",
) as HTMLButtonElement;
const RulesModal = document.getElementById("rules-modal") as HTMLDivElement;

const StatementsTable = document.getElementById(
  "statements",
) as HTMLTableElement;
const StatementsAddButton = document.getElementById(
  "add-statement",
) as HTMLButtonElement;
const StatementsModal = document.getElementById(
  "statement-model",
) as HTMLDivElement;

setup(
  RECURRING_STORAGE_KEY,
  Recurring,
  RECURRING_COLUMN_DEFINITIONS,
  RecurringTable,
  RecurringAddButton,
  RecurringModal,
);

setup(
  RULES_STORAGE_KEY,
  Rule,
  RULE_COLUMN_DEFINITIONS,
  RulesTable,
  RulesAddButton,
  RulesModal,
);

setup(
  STATEMENTS_STORAGE_KEY,
  Statement,
  STATEMENT_COLUMN_DEFINITIONS,
  StatementsTable,
  StatementsAddButton,
  StatementsModal,
);

GenerateButton.onclick = () => {
  const statements = findAll(STATEMENTS_STORAGE_KEY, Statement);
  const recurring = findAll(RECURRING_STORAGE_KEY, Recurring);
  const rules = findAll(RULES_STORAGE_KEY, Rule);
  console.log(`recurring rules are ${recurring}`);
  console.log(`tagging rules are ${rules}`);
  statements.forEach((statement) => {
    const file = getStatementFile(statement.id);
    console.log(
      `processing statement ${statement.statementType} with file ${file?.name}`,
    );
  });
};
