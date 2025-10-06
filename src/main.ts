import { setup as setupRules } from "./handlers/rules/setup";
import { setup as setupRecurring } from "./handlers/recurring/setup";
import { setup as setupStatement } from "./handlers/statements/setup";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { getStatementFile, getStatements } from "./handlers/statements/api";
import { getRecurring } from "./handlers/recurring/api";
import { getRules } from "./handlers/rules/api";

ModuleRegistry.registerModules([AllCommunityModule]);

const GenerateButton = document.getElementById(
  "generate-button",
) as HTMLButtonElement;

setupRules();
setupRecurring();
setupStatement();

GenerateButton.onclick = () => {
  const statements = getStatements();
  const recurring = getRecurring();
  const rules = getRules();
  console.log(`recurring rules are ${recurring}`);
  console.log(`tagging rules are ${rules}`);
  statements.forEach((statement) => {
    const file = getStatementFile(statement.id);
    console.log(
      `processing statement ${statement.statementType} with file ${file?.name}`,
    );
  });
};
