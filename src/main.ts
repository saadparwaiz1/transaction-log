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
import { getElementById } from "./base/utils";

ModuleRegistry.registerModules([AllCommunityModule]);

const GenerateButton = getElementById<HTMLButtonElement>("generate-button");

const RecurringTable = getElementById<HTMLTableElement>(
  "recurring-transactions",
);
const RecurringAddButton = getElementById<HTMLButtonElement>("add-transaction");
const RecurringModal = getElementById<HTMLDivElement>("recurring-modal");
const RulesTable = getElementById<HTMLTableElement>("statement-rules");
const RulesAddButton = getElementById<HTMLButtonElement>("add-statement-rule");
const RulesModal = getElementById<HTMLDivElement>("rules-modal");
const StatementsTable = getElementById<HTMLTableElement>("statements");
const StatementsAddButton = getElementById<HTMLButtonElement>("add-statement");
const StatementsModal = getElementById<HTMLDivElement>("statement-modal");

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
